// Create a variable to store the API endpoint as queryURL
let queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";
let tectonicPlatesQueryURL = "PB2002_boundaries.json";

// Define variables to hold the earthquake and tectonic plates layers
let earthquakesLayer;
let tectonicPlatesLayer;

// get the earthquake data
d3.json(queryURL).then(function(earthquakeData) {
    // console log earthquake data
    console.log(earthquakeData);
    //Create earthquake features
    createFeatures(earthquakeData.features);
});

// get the tectonic plates data
d3.json(tectonicPlatesQueryURL).then(function(tectonicPlatesData) {
    // console log tectonic plates data
    console.log(tectonicPlatesData);
    //Create tectonic plates features
    tectonicPlatesLayer = createTectonicPlates(tectonicPlatesData);
});

//Markers should reflect depth of the earthquake by color
function colorDepth(depth) {
    switch(true){
        case(10 <= depth && depth <= 30):
            return  "#FFFF00"; // Pale yellow
        case (30 <= depth && depth <=50):
            return "#FFD700"; // Dark yellow
        case (50 <= depth && depth <=70):
            return "#FFA500"; // Orange
        case (70 <= depth && depth <= 90):
            return  "#FF6961"; // Pale red
        case (90 <= depth && depth <=500):
            return "#BC0000";
        default:
            return "#008000"; // Green 
    }
}

//Include popups that provide additional information
function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>Location: ${feature.properties.place}<h3><hr><p>Date: ${new Date(feature.properties.time)}<p><p>Magnitude:${feature.properties.mag}</p><p>Depth: ${feature.geometry.coordinates[2]}</p><hr><p>Number of Reports: ${feature.properties.felt}`);
}

//Create a function to determine marker size and color for earthquakes
function markerSize(feature, latlng) {
    let options = {
        radius: feature.properties.mag * 5,
        fillColor: colorDepth(feature.geometry.coordinates[2]),
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
    return L.circleMarker(latlng, options);
}

// Create earthquake features
function createFeatures(earthquakeData)  {
    earthquakesLayer = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
        pointToLayer: markerSize
    });

    //Call the createMap function to render the map with earthquakes data
    createMap(earthquakesLayer);
}

// Create tectonic plates features
function createTectonicPlates(tectonicPlatesData) {
    return L.geoJSON(tectonicPlatesData, {
        style: function(feature) {
            return {
                color: "#8B4513", // Brown color for plate boundaries
                weight: 4
            };
        }
    });
}

// Create map
function createMap(earthquakesLayer) {
    // Define terrain map layer
    let terrainMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 17,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
            'Elevation data &copy; <a href="https://www.opentopomap.org">OpenTopoMap</a>'
    });

    let streetstylemap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors",
        maxZoom: 20
    });

    let baseMaps = {
        "Terrain Map": terrainMap, // Add terrain map as a base map
        "Street Map": streetstylemap
    };

    let overlayMaps = {
        "Earthquakes": earthquakesLayer
    };

    if (tectonicPlatesLayer) {
        overlayMaps["Tectonic Plates"] = tectonicPlatesLayer; // Add tectonic plates layer if available
    }

    // Create map, giving it the terrain map, earthquakes, and tectonic plates layers to display on load
    let myMap = L.map("map", {
        center: [39.8282, -98.5795],
        zoom: 4,
        layers: [terrainMap, earthquakesLayer] // Set terrain map and earthquakes layer as default
    });

    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(myMap);

    // Create legend
    let legend = L.control({position: "bottomright"});

    legend.onAdd = function() {
        var div = L.DomUtil.create('div', 'info legend');
        var grades = [-10, 10, 30, 50, 70, 90];
        var labels = [];
        var legendInfo = "<h2>Depth</h2>";

        div.innerHTML = legendInfo;
        // Loop through depth intervals and generate a label with a colored box for each interval
        for (let i = 0; i < grades.length; i++) {
            if (i === 0) {
                // For the first interval, add a green stripe for depths less than 10
                labels.push('<ul style="background-color:#008000"> <span>&lt;10</span></ul>');
            } else if (i === 1) {
                // For the second interval, add a yellow stripe for depths between 10 and 30
                labels.push('<ul style="background-color:#FFFF00"> <span>10&ndash;30</span></ul>');
            } else {
                // For the other intervals, continue adding labels with colored squares
                labels.push('<ul style="background-color:' + colorDepth(grades[i] + 1) + '"> <span>' + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '' : '+') + '</span></ul>');
            }
        }


        // Add each label list item to the div under the <ul> tag
        div.innerHTML += "<ul>" + labels.join("") + "</ul>";

        return div;
    };

    // Add legend to the map
    legend.addTo(myMap);
}
//Create variable 
function createFeatures(earthquakeData)  {
    earthquakesLayer = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
        pointToLayer: markerSize
    });

    //Call the createMap function to render the map with earthquakes data
    createMap(earthquakesLayer);
}
