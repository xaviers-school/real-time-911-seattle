function getData(userOpt) {
  var defaultOpt = {
    $limit: null,
    type: null
  };

  userOpt = userOpt || {};
  var queryStr = '';
  for (var config in defaultOpt) {
    var opt = (userOpt.hasOwnProperty(config)) ? userOpt : defaultOpt;
    if (opt[config] !== null) {
      queryStr += (queryStr.length) ? '&' : '?';
      queryStr += `${config}=${opt[config]}`
    }
  }
  console.log('query: ', queryStr);

  var endpoint = 'https://data.seattle.gov/resource/grwu-wqtk.json';
  if (queryStr.length) endpoint += queryStr;

  return $.ajax(endpoint, {
    headers: {
      'X-App-Token': 'APIKEY'
    }
  }).then(function(data) {
    var markerData = data.map(function(el) {
      return {
        lat: el['report_location']['coordinates'][1],
        lng: el['report_location']['coordinates'][0],
        dateTime: el['datetime'],
        address: el['address'],
        type: el['type'],
        incidentNum: el['incident_number']
      };
    });
    console.log(`Rendering ${markerData.length} items on map`);
    displayMarkers(markerData);
    return data;
  });
}

getData({ $limit: 20 })
  .then(function(data) {
    console.log('hi');
  });
