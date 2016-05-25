var endpoint = 'http://localhost:3000/api/entries';

function getData() {
  return $.ajax(endpoint + '/today')
    .then(function(data) {
      var markerData = data.map(function(el) {
        return {
          lat: el['lat'],
          lng: el['lng'],
          datetime: el['datetime'],
          displayDatetime: el['displayDatetime'],
          address: el['location'],
          type: el['type'],
          incidentNum: el['incidentNumber'],
          status: el['status'],
          units: el['units'],
          level: el['level']
        };
      });

    console.log(`Rendering ${markerData.length} items on map`);

    displayMarkers(markerData);
    displayList(markerData);
    return data;
  });
}

getData();
