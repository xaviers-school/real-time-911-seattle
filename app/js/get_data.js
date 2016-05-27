var url = 'http://localhost:3000/api/entries';

function getData(query) {
  query = query || '/today';
  return $.ajax(url + query)
    .then(function(data) {
      var markerData = data.map(function(el) {
        return {
          lat: el['lat'],
          lng: el['lng'],
          datetime: el['datetime'],
          displayDatetime: el['displayDatetime'],
          address: el['address'],
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
