const request = require('request');
module.exports = exports = function(address) {
  var googleMapsKey = 'APIKEY';
  var locationURI = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + ',+Seattle,+WA&key=' + googleMapsKey;
  console.log(locationURI);

  return new Promise((resolve, reject) => {
    request(locationURI, function(error, response, body) {
      if(error) return reject(error);
      if(!error && response.statusCode == 200) {
        var locations = JSON.parse(body);
        return resolve(locations.results[0].geometry.location.lat + ', ' + locations.results[0].geometry.location.lng);
      }
    });
  });
};
