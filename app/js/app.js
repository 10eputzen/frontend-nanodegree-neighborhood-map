//Toggle the Menu
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

var self = this;

var ObjectList = function() {
    var that = this;
    that.Objects = ko.observableArray();
};

self.list = new ObjectList();

var dropDownLocation = function(name, lat, lng) {
    this.locationName = name;
    this.lat = lat;
    this.lng = lng;
};

var hofheim = new dropDownLocation("Hofheim(Taunus)", 50.0900539, 8.4624332);
var munich = new dropDownLocation("Munich", 48.1351250, 11.5819810);
var rockenberg = new dropDownLocation("Rockenberg", 50.4302590, 8.7357830);
var berlin = new dropDownLocation("Berlin", 52.5200070, 13.4049540);

function AppViewModel() {
    function reArrangeObjects(res) {
        self.list.Objects.removeAll();

        res.forEach(function(entry) {
            self.list.Objects.push(entry);
        });
    }

    self.getMarkerInfo = function(obj) {
        var mark = markers.find(function(o) {
            return o.name === obj.name;
        });
        createInfoWindow(mark);
    };

    self.currentFilter = ko.observable("");

    self.worker = ko.computed(function() {
        if (self.currentFilter())
            self.filterMarkers();
        else
            reArrangeObjects(markers);
    }, this);


    self.filterMarkers = function() {
        var filteredMarkers = markers.slice();
        var hideMarkers = [];
        var res = [];
        if (!self.currentFilter()) {
            res = filteredMarkers;
        } else {
            res = ko.utils.arrayFilter(filteredMarkers, function(list) {
                if (list.name.toLowerCase().includes(self.currentFilter().toLowerCase()))
                    return list;
                else
                    hideMarkers.push(list);
            });
        }
        removeMarkers(hideMarkers);
        showMarkers(res);
        reArrangeObjects(res);
    };

}


function removeMarkers(list) {
    for (i = 0; i < list.length; i++) {
        list[i].setMap(null);
    }
}

function showMarkers(list) {
    for (i = 0; i < list.length; i++) {
        list[i].setMap(map);
    }
}

var markers = [];



var map, infowindow;
var homeMarkers = [];
var homeIcon = 'https://maps.google.com/mapfiles/ms/icons/green-dot.png';
var firstInit = true;
self.currentLocation = hofheim;

function initMap() {
    var home = self.currentLocation;

    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: home.lat,
            lng: home.lng
        },
        zoom: 16
    });
    if (firstInit) {
        initMarkers();
        firstInit = false;
    }
    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });

    // [START region_getplaces]
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length === 0) {
            return;
        }

        // Clear out the old markers.
        homeMarkers.forEach(function(marker) {
            marker.setMap(null);
        });
        homeMarkers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            // Create a marker for each place.
            homeMarkers.push(new google.maps.Marker({
                map: map,
                title: place.name,
                position: place.geometry.location,
                icon: homeIcon,
                content: 'Home',
            }));

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
        initMarkers();
    });


    function initMarkers() {
        var homeMarker;


        if (homeMarkers.length > 0)
            homeMarker = homeMarkers[0];
        else {
            //Setting the initial Home Marker
            homeMarker = new google.maps.Marker({
                map: map,
                position: home,
                icon: homeIcon,
                content: 'Home',
            });
            homeMarkers.push(homeMarker);
        }

        google.maps.event.addListener(homeMarker, 'click', function() {
            createInfoWindow(homeMarker);
        });


        var wikiPages = {};
        searchwiki(homeMarker).then(function(res) {
            markers = [];
            if (res) {
                wikiPages = res.query.pages;
                //Loop over Every Wikientry and create a marker for the given coordinates
                for (var prop in wikiPages) {
                    createMarker(wikiPages[prop]);
                }

                //Set the Marker Content to the description provided by the Wiki Request
                for (var i = 0; i < markers.length; i++) {
                    setMarkerContent(markers[i]);
                }
                ko.applyBindings(new AppViewModel());
            }
        }, function(err) {
            console.log(err);
            var msg = "An Error has occured while getting data from Wikipedia. \nPlease refresh the page.";
            alert(msg);
        });
    }


    function createMarker(obj) {
        var description;
        if (obj.terms)
            description = obj.terms.description[0];
        var loc = {
            lat: obj.coordinates[0].lat,
            lng: obj.coordinates[0].lon,
        };

        var marker = new google.maps.Marker({
            map: map,
            position: loc,
            name: obj.title,
            image: obj.thumbnail,
            description: description,
            pageId: obj.pageid,
            content: '',
        });
        markers.push(marker);
        google.maps.event.addListener(marker, 'click', function() {
            createInfoWindow(marker);
        });
    }
}

var queryWikiBase = 'https://en.wikipedia.org/w/api.php?action=query&prop=info&pageids=';
var queryWikiAppend = '&inprop=url&format=json';

//Setting the title, image nad description of the Marker/InfoWindow
function setMarkerContent(marker) {
    var name = '<h4>' + marker.name + '</h4>';
    var description = '';
    if (marker.description)
        description = marker.description;

    var imageSource = '';
    if (marker.image) {
        imageSource = '<img src="' + marker.image.source + '">';
        width = marker.image.width + 50;
    }

    if (marker.pageId) {
        var pageId = marker.pageId.toString();
        var url = queryWikiBase + pageId + queryWikiAppend;
        var fullUrl;
        queryWiki(url).then(function(res) {
            if (res) {
                fullUrl = res.query.pages[pageId].fullurl;
                name = '<a href="' + fullUrl + ' " target="_blank">' + name + '</a>';
                var content = name + '<p>' + description + '</p>' + imageSource;
                marker.content = content;
            }
        });
    }
}

// Create the Info Window the the Details provided in each marker
var infowindow = [];

function createInfoWindow(marker) {
    var width = 200;
    if (infowindow.length !== 0)
        infowindow.close();
    infowindow = new google.maps.InfoWindow({
        maxWidth: width,
        name: marker.name,
    });
    infowindow.setContent(marker.content);
    infowindow.open(map, marker);
    map.panTo(marker.getPosition());
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function() {
        marker.setAnimation(null);
    }, 3000);
}


//Searching the Wiki for Places around the Home Marker
function searchwiki(marker) {
    var baseUrl = 'https://en.wikipedia.org/w/api.php?action=query&prop=coordinates%7Cpageimages%7Cpageterms&colimit=50&piprop=thumbnail&pithumbsize=144&pilimit=50&wbptterms=description&generator=geosearch&ggscoord=';
    var pos = marker.position;
    var lat = pos.lat();
    var long = pos.lng();
    var restUrl = lat + '%7C+' + long + '&ggsradius=10000&ggslimit=50&format=json';
    return queryWiki(baseUrl + restUrl);
}

function queryWiki(url) {
    return $.ajax({
        url: url,
        dataType: 'jsonp',
        type: 'GET',
        headers: { 'Api-User-Agent': 'Example/1.0' },
    });
}
