# leaflet-challenge

## Background

![logo](https://github.com/Amarilli/leaflet-challenge/blob/main/Images/1-Logo.png)

The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world daily but lack a meaningful way of displaying it. 
I developed a way to visualize USGS data to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

## Part 1: Create the Earthquake Visualization

I visualized an earthquake dataset.

The USGS provides earthquake data in a number of different formats, updated every 5 minutes. I visited [the USGS GeoJSON](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) and chose [the dataset about all earthquakes of the past 30 days](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson). 

I used the URL of that JSON to pull in the data for the visualization. 

Using Leaflet, I created a map that plots all the earthquakes from the dataset based on their longitude and latitude.

The data markers reflected the earthquake's magnitude by their size and the earthquake's depth by color. Earthquakes with higher magnitudes appear larger, and earthquakes with greater depth appear darker in color.

I included popups that provide information when its associated marker is clicked. Information is about:

- Location,
- Date,
- Magnitude,
- Depth,
- Number of reports.

I created a legend that provides context about the earthquake depth.

## Part 2: Gather and Plot More Data

I created a layer illustrating the relationship between tectonic plates and seismic activity. The JSON data on tectonic plates I used was found  at https://github.com/fraxen/tectonicplates.

In the finale result there are 2 different base map to choose from: 

- Terrain Map
- Street Map
  
Each dataset I chose (Earthquakes and Tectonic Plates) is situated into separate overlays that can be turned on and off independently.

The deployment of the map is visible at [GitHub Pages](https://amarilli.github.io/leaflet-challenge/)

![mappa](

