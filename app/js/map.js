// var markerData = [
//   {lat: 47.604, lng: -122.33},
//   {lat: 47.671, lng: -122.28},
//   {lat: 47.610, lng: -122.33}
// ];

var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 47.604, lng: -122.33},
    zoom: 8
  });
}

function displayMarkers(markerData) {
  var bounds = new google.maps.LatLngBounds();

  for (var i = 0; i < markerData.length; i++) {
    var latlng = new google.maps.LatLng(markerData[i].lat, markerData[i].lng);
    var dateTime = markersData[i].dateTime;
    var address = markersData[i].address;
    var type = markersData[i].type;
    var incidentNum = markersData[i].incidentNum;
    createMarker(latlng, dateTime, address, type, incidentNum);
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
