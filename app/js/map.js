var markersData = [
  {lat: 47.604, lng: -122.33},
  {lat: 47.671, lng: -122.28},
  {lat: 47.610, lng: -122.33}
];

var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 47.604, lng: -122.33},
    zoom: 8
  });
  displayMarkers();
}

function displayMarkers() {
  var bounds = new google.maps.LatLngBounds();

  for (var i = 0; i < markersData.length; i++) {
    var latlng = new google.maps.LatLng(markersData[i].lat, markersData[i].lng);
    createMarker(latlng);
    bounds.extend(latlng);
  }

  map.fitBounds(bounds);
}

function createMarker(latlng) {
  var marker = new google.maps.Marker({
    map: map,
    position: latlng
  });
}
