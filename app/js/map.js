var map;
var infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 47.604, lng: -122.33},
    zoom: 8
  });

  infoWindow = new google.maps.InfoWindow();
  google.maps.event.addListener(map, 'click', function() {
    infoWindow.close();
  });
}

function displayMarkers(markersData) {
  var bounds = new google.maps.LatLngBounds();

  for (var i = 0; i < markersData.length; i++) {
    var latlng = new google.maps.LatLng(markersData[i].lat, markersData[i].lng);
    var dateTime = markersData[i].dateTime;
    var address = markersData[i].address;
    var type = markersData[i].type;
    var incidentNum = markersData[i].incidentNum;
    createMarker(latlng, dateTime, address, type, incidentNum);
    bounds.extend(latlng);
  }

  map.fitBounds(bounds);
}

function createMarker(latlng, dateTime, address, type, incidentNum) {
  var marker = new google.maps.Marker({
    map: map,
    position: latlng,
    title: type
  });

  google.maps.event.addListener(marker, 'click', function() {
    var content = '<div>Type: ' + type + '</div>' +
      '<div>Date: ' + dateTime + '<br />' +
      'Address: ' + address + '<br />' +
      'Incident Number: ' + incidentNum + '</div>';

    infoWindow.setContent(content);

    infoWindow.open(map, marker);
  });
}
