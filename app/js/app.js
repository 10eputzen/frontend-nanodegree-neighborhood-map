// add to footer
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

var self = this;
var map;
var infowindow;

self.listOfObject = [{
    position: {
        lat: 50.08877,
        lng: 8.4579088,
    },
    map: map,
    title: 'Feuerwehr'

}, {
    position: {
        lat: 50.09071,
        lng: 8.4603596
    },
    map: map,
    title: 'Polizei'
}]


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
            // var info = infowindows.find(function(o) {
            //     return o.name === obj.name;
            // })

        createInfoWindow(mark);

        // if (isInfoWindowOpen(info)) {
        //     info.close(map, mark);
        // } else {
        //     map.panTo(mark.getPosition());
        //     info.open(map, mark);
        // }

        // infowindows.push(infowindow);
    };

    self.currentFilter = ko.observable("");


    self.filterMarkers = function() {
        reArrangeObjects(result);
        // var res = [];
        // if (!self.currentFilter()) {
        //     res = self.listOfObject;
        // } else {
        //     res = ko.utils.arrayFilter(self.listOfObject, function(list) {

        //         return stringStartsWith(list.title.toLowerCase(), self.currentFilter());
        //     });
        // }
        // reArrangeObjects(res);
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
var infowindows = [];

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


    // for (i = 0; i < self.listOfObject.length; i++) {
    //     markers[i] = new google.maps.Marker({
    //         position: self.listOfObject[i].position,
    //         map: map,
    //         title: listOfObject[i].title
    //     });

    //     markers[i].index = i;
    //     contents[i] = '<div class="popup_container">' + self.listOfObject[i].title + '</div>';


    // infowindows[i] = new google.maps.InfoWindow({
    //     content: contents[i],
    //     maxWidth: 300,
    //     title: listOfObject[i].title
    // });

    //     google.maps.event.addListener(markers[i], 'click', function() {
    //         map.panTo(markers[this.index].getPosition());
    //         infowindows[this.index].open(map, markers[this.index]);
    //     });
    // }


    // var marker_home = new google.maps.Marker({
    //     position: home,
    //     map: map,
    //     icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
    //     title: 'Work'
    // });



    // marker_home.addListener('click', function() {
    //     infowindow.open(map, marker_home);
    //     map.panTo(marker_home.getPosition());

    // });

    // var infowindow = new google.maps.InfoWindow({
    //     content: '<div class="popup_container">' + marker_home.title + '</div>'
    // });

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
    infowindow = new google.maps.InfoWindow({
        maxWidth: 300,
        name: marker.name
    });
    infowindow.setContent(marker.name);
    infowindow.open(map, marker);
    map.panTo(marker.getPosition());
}
