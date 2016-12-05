/* off-canvas sidebar toggle */
$('[data-toggle=offcanvas]').click(function() {
    $('.row-offcanvas').toggleClass('active');
    $('.collapse').toggleClass('in').toggleClass('hidden-xs').toggleClass('visible-xs');
});


var map;
// Function to initialize the map within the map div
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 40.74135,
            lng: -73.99802
        },
        zoom: 14
    });
    // Create a single latLng literal object.
    var singleLatLng = {
        lat: 40.74135,
        lng: -73.99802
    };
    // TODO: Create a single marker appearing on initialize -
    // Create it with the position of the singleLatLng,
    // on the map, and give it your own title!
    var marker = new google.maps.Marker({
        position: singleLatLng,
        map: map,
        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
        title: 'Hello World!'
    });

    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });

    var contentString = '<label> Lat: ' + singleLatLng.lat + ' Long: ' + singleLatLng.lng;
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    // TODO: create a single infowindow, with your own content.
    // It must appear on the marker

    // TODO: create an EVENT LISTENER so that the infowindow opens when
    // the marker is clicked!
}
