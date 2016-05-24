const request = require('request');

module.exports = exports = function(address) {
  var googleMapsKey = 'API_KEY';
  address = address.replace(/\//g, 'and');
  // console.log('geocoding', address);

  var locationURI = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}, Seattle, WA&key=${googleMapsKey}`;

  return new Promise((resolve, reject) => {
    request(locationURI, function(error, response, body) {
      if (error) return reject(error);

      var locations = JSON.parse(body);
      if (response.statusCode !== 200 || locations.results < 1) return reject(response);
      return resolve({
        lat: locations.results[0].geometry.location.lat,
        lng: locations.results[0].geometry.location.lng
      });
    });
  });
};
