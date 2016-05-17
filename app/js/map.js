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
    var incidentNum = markersData[i].incidentNum;
    var level = markersData[i].level;
    var address = markersData[i].address;
    var status = markersData[i].status;
    var type = markersData[i].type;
    var units = markersData[i].units;

    var markerColor;
    if (markersData[i].status == 'active') markerColor = '../img/green-dot.png';
    else if (markersData[i].type.match(/Medic/gi)) markerColor = '../img/first-aid.png';
    else if (markersData[i].type.match(/MVI/gi)) markerColor = '../img/blue-dot.png';
    else if (markersData[i].type.match(/Fire/gi)) markerColor = '../img/fire.png';
    else markerColor = '../img/red-dot.png';

    createMarker(latlng, dateTime, address, type, incidentNum, markerColor, status);
    bounds.extend(latlng);
  }

  map.fitBounds(bounds);
}

function createMarker(latlng, dateTime, address, type, incidentNum, markerColor, status) {
  var marker = new google.maps.Marker({
    map: map,
    position: latlng,
    // animation: google.maps.Animation.DROP,
    title: type,
    icon: markerColor
  });

  google.maps.event.addListener(marker, 'click', function() {
    var content = '<div><strong>Type: ' + type + '</strong><br />' +
      '<strong>Status: ' + status + '</strong><br />' +
      'Date: ' + dateTime + '<br />' +
      'Address: ' + address + '<br />' +
      'Incident Number: ' + incidentNum + '</div>';

    infoWindow.setContent(content);

    infoWindow.open(map, marker);
  });
}
