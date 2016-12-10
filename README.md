# Stefans Neighborhood Map

## Description
With this Application you can search in google map for a location and receive interesting places around your search result. These places (title, images and description) are downloaded from Wikipedia in a certain radius to your search result.

## Functionality
**Search**
The search is a standard searchbox, provided by the Google Maps Api. It gives you a typeahead dropdown for every character you type into the search box.

**Filter**
The Filter Input Box filteres the Places results on every character input.

**Markers**
The Home Marker should show up as a green marker icon. The places have a default red marker. Clicking a marker should have three effects:

1) Map is panned to the marker
2) Marker is animated for 3 seconds
3) An infowindow will open

**Infowindow**
An infowindow contains the title, a description and an image to the specific place of the marker. There will only be one infowindow at a time.

## Installation

 1. Download the repository
 2. Unzip the repository
 3a) For Testing the application offline, install the following [Chrome Plugin](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=de). It is needed to allow requests to any site with ajax from any source
 
 3b) If you have your own webserver, you don't need to install the plugin.
 4. Open the index.html with Chrome.

