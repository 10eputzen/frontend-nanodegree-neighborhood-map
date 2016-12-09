// add to footer
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

var self = this;
var map;



var ObjectList = function() {
    var that = this;
    that.Objects = ko.observableArray();
}


function AppViewModel() {
    self.list = new ObjectList();
    reArrangeObjects(result);

    function reArrangeObjects(res) {
        self.list.Objects.removeAll();

        res.forEach(function(entry) {
            self.list.Objects.push(entry);
        });
    }

    self.getMarkerInfo = function(obj) {
        var mark = markers.find(function(o) {
                return o.name === obj.name;
            })
        createInfoWindow(mark);
    };

    self.currentFilter = ko.observable("");


    self.filterMarkers = function() {
        reArrangeObjects(result);
    };
}

function isInfoWindowOpen(infoWindow) {
    var map = infoWindow.getMap();
    return (map !== null && typeof map !== "undefined");
}


var stringStartsWith = function(string, startsWith) {
    string = string || "";
    if (startsWith.length > string.length)
        return false;
    return string.substring(0, startsWith.length) === startsWith;
};


// ko.applyBindings(new AppViewModel());

var result = [];
var markers = [];
var contents = [];
var infowindow = [];

ko.applyBindings(new AppViewModel());



function initMap() {

    var home = {
        lat: 50.0900539,
        lng: 8.4624332
    };

    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: home.lat,
            lng: home.lng
        },
        zoom: 16
    });


    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: home,
        radius: 500,
        types: ['store']
    }, callback);

    function callback(results, status) {

        if (status === google.maps.places.PlacesServiceStatus.OK) {
            result = results;
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
        }

    }

    function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            name: place.name

        });

        markers.push(marker);
        google.maps.event.addListener(marker, 'click', function() {
            createInfoWindow(marker);
        });
    }
}

function createInfoWindow(marker) {
    var infowindow = new google.maps.InfoWindow({
        maxWidth: 300,
        name: ''
    });
        searchwiki(marker.name)
    infowindow.setContent(marker.name);
    infowindow.open(map, marker);
    map.panTo(marker.getPosition());
}



 function searchwiki(search) {
     $.ajax({
         type: "GET",
         url: 'https://de.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch='+ search +'&callback=?',  
        contentType: "application/json; charset=utf-8",
         async: false,
         dataType: "json",
         success: function(data, textStatus, jqXHR) {
             console.log(data);
         },
         error: function(errorMessage) {
            console.log(errorMessage);
         }
     });
 }
