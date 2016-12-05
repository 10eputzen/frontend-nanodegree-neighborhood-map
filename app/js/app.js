// add to footer
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

var self = this;

var map;

ko.applyBindings({
    listOfObject: [{
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
});

ko.applyBindings(new AppViewModel());

ko.applyBindings({
    people: [
        { firstName: 'Bert', lastName: 'Bertington' },
        { firstName: 'Charles', lastName: 'Charlesforth' },
        { firstName: 'Denise', lastName: 'Dentiste' }
    ]
});

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


    var markers = [];
    var contents = [];
    var infowindows = [];

    for (i = 0; i < self.listOfObject.length; i++) {
        markers[i] = new google.maps.Marker({
            position: self.listOfObject[i].position,
            map: map,
            title: 'marker'
        });

        markers[i].index = i;
        contents[i] = '<div class="popup_container">' + self.listOfObject[i].title + '</div>';


        infowindows[i] = new google.maps.InfoWindow({
            content: contents[i],
            maxWidth: 300
        });

        google.maps.event.addListener(markers[i], 'click', function() {
            infowindows[this.index].open(map, markers[this.index]);
            map.panTo(markers[this.index].getPosition());
        });
    }


    var marker_home = new google.maps.Marker({
        position: home,
        map: map,
        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
        title: 'Work'
    });



    marker_home.addListener('click', function() {
        infowindow.open(map, marker_home);
        map.panTo(marker_home.getPosition());

    });

    var infowindow = new google.maps.InfoWindow({
        content: '<div class="popup_container">' + marker_home.title + '</div>'
    });

}
