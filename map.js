mapboxgl.accessToken = 'pk.eyJ1IjoiaHVpcnUwNTE5IiwiYSI6ImNqY3Y0c21pbTAwcGcyd3QzMnBnaTEwOTYifQ.lLOU5KBQL4PyOt1wpeDfwQ';

var mapCenter = [-121.307928,38.490950];
var mapZoom = 10.7;

var map = new mapboxgl.Map({
	container: 'map',
    center: mapCenter,
    zoom: mapZoom,
	style: 'mapbox://styles/huiru0519/cjuh81g4055g11fmng5kqr5rz', 	
	// customAttribution: 'City of Charlottesville Open Data Portal (http://opendata.charlottesville.org/)'
});

$("#about").on('click', function() {
    $("#screen").fadeToggle();
    $(".modal").fadeToggle();
});

$(".modal>.close-button").on('click', function() {
    $("#screen").fadeToggle();
    $(".modal").fadeToggle();
});

$("#btnn").on('click', function() {
    $("#screen").fadeToggle();
    $(".upload").fadeToggle();
});

$(".upload>.close-button").on('click', function() {
    $("#screen").fadeToggle();
    $(".upload").fadeToggle();
});


// Timeline map filter (timeline of building permit issue dates)
    
    // Create array of  dates from Mapbox layer (in this case, Charlottesville Building Permit application dates)
    map.on('load', function () {

        // Get all data from a layer using queryRenderedFeatures
        var permits = map.queryRenderedFeatures(null, { // when you send "null" as the first argument, queryRenderedFeatures will return ALL of the features in the specified layers
            layers: ["chinese"]
        });

        var permitDesArray = [];

        // push the values for a certain property to the variable declared above (e.g. push the permit dates to a permit date array)
        for (i=0; i<permits.length; i++) {
            var permitDes = permits[i].properties.tl_2018_06;
            
            permitDesArray.push(permitDes);    // Replace "AppliedDat" with the field you want to use for the timeline slider
        }
 
 // Create event listener for when the slider with id="timeslider" is moved
        $("#timeslider").change(function(e) {
            var Des = this.value; 
            // console.log(parseInt(Des));
            // map.setFilter("chinese", ["==","tl_2018_06", 281]);
            map.setFilter("chinese", [">=","tl_2018_06", parseInt(Des)]);
         });

   });



// SHOW/HIDE LAYERS
    
    var layers = [  // an array of the layers you want to include in the layers control (layers to turn off and on)

        // [layerMachineName, layerDisplayName]
        // layerMachineName is the layer name as written in your Mapbox Studio map layers panel
        // layerDisplayName is the way you want the layer's name to appear in the layers control on the website
        ['chinese', 'Chinese Immigrants Density'], 
        ['othercommunity', 'Other Groups Density'],   
        ['economic', 'Economy Development'],   
        ['mobility', 'Mobility'],
         // add additional live data layers here as needed
];

map.on('load', function () {
        
        for (i=0; i<layers.length; i++) {

            $("#layers-control").append("<a href='#' class='active' id='" + layers[i][0] + "'>" + layers[i][1] + "</a>");
        }

        $("#layers-control>a").on('click', function(e) {

                var clickedLayer = e.target.id;
                e.preventDefault();
                e.stopPropagation();

                var visibility = map.getLayoutProperty(clickedLayer, 'visibility');
                // console.log(visibility);

                if (visibility === 'visible') {
                    map.setLayoutProperty(clickedLayer, 'visibility', 'none');
                    $(e.target).removeClass('active');
                } else {
                    $(e.target).addClass('active');
                    map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
                }
        });
    });



var layerss = [
        ['flooding', 'Flooding Zone'],
        ['over60', 'Aging Over 60']
];

map.on('load', function () {
        
        for (i=0; i<layerss.length; i++) {

            $("#layers-control-2").append("<a href='#' class='active' id='" + layerss[i][0] + "'>" + layerss[i][1] + "</a>");

        }

        $("#layers-control-2>a").on('click', function(e) {

                var clickedLayer = e.target.id;
                e.preventDefault();
                e.stopPropagation();

                var visibility = map.getLayoutProperty(clickedLayer, 'visibility');
                // console.log(visibility);

                if (visibility === 'visible') {
                    map.setLayoutProperty(clickedLayer, 'visibility', 'none');
                    $(e.target).removeClass('active');
                } else {
                    $(e.target).addClass('active');
                    map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
                }
        });
    });


// RESET MAP BUTTON
    
    $("#reset").click(function() {
        map.setCenter(mapCenter);
        map.setZoom(mapZoom);
        map.setFilter("chinese","othercommunity","mobility","economic", null); // reset building permits filters
        
        
        // Reset all layers to visible
        for (i=0; i<layers.length; i++) {
            map.setLayoutProperty(layers[i][0], 'visibility', 'visible'); 
            $("#" + layers[i][0]).addClass('active');
        }                   

    });


map.on('load', function () {

        var permits = map.queryRenderedFeatures(null, {
            layers: ["othercommunity"]
        });

        var permitDes2Array = [];

        for (i=0; i<permits.length; i++) {
            var permitDes2 = permits[i].properties.other;
            
            permitDes2Array.push(permitDes2);
        }
 
        $("#timeslider2").change(function(e) {
            var Des2 = this.value; 
            // console.log(parseInt(Des2));
            map.setFilter("othercommunity", [">=","other", parseInt(Des2)]);
         });

   });

map.on('load', function () {

        var permits = map.queryRenderedFeatures(null, {
            layers: ["economic"]
        });

        var permitDevArray = [];

        for (i=0; i<permits.length; i++) {
            var permitDev = permits[i].properties.ECONOMY;
            
            permitDevArray.push(permitDev);
        }
 
        $("#timeslider3").change(function(e) {
            var Dev = this.value; 
            // console.log(parseInt(Des2));
            map.setFilter("economic", [">=","ECONOMY", parseInt(Dev)]);
         });

   });

map.on('load', function () {

        var permits = map.queryRenderedFeatures(null, {
            layers: ["mobility"]
        });

        var permitMobArray = [];

        for (i=0; i<permits.length; i++) {
            var permitMob = permits[i].properties.MOBILITY;
            
            permitMobArray.push(permitMob);
        }
 
        $("#timeslider4").change(function(e) {
            var Mob = this.value; 
            console.log(parseInt(Mob));
            map.setFilter("mobility", [">=","MOBILITY", parseInt(Mob)]);
         });

   });

