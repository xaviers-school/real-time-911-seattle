const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const Data = require(__dirname + '/../app/models/data');

const convert = require(__dirname + '/../app/lib/convert_location');
const handleDBError = require(__dirname + '/../app/lib/handle_db_error');
const saveToDb = require(__dirname + '/../app/lib/save_to_db');

var scraperRouter = module.exports = exports = express.Router();

// specific url for today data
const url = 'http://www2.seattle.gov/fire/realtime911/getRecsForDatePub.asp?action=Today&incDate=&rad1=des';
const fields = ['datetime', 'incidentNumber', 'level', 'units', 'location', 'type'];

// here using request
scraperRouter.get('/', function(req, res) {
  request(url, function(error, response, html) {
    if (error)
      return res.status(500).json({ msg: 'Error reaching Seattle Real Time 911' });

    // here cheerio loads data into html
    var $ = cheerio.load(html);
    var $data = $("#row_1").parent();
    $data.children().each(function() {
      var incident = {};
      var $row = $(this);

      // extract each cell and put data into object
      $row.children()
        .each(function(i, cell) {
          switch (fields[i]) {
            case 'level':
              incident[fields[i]] = Number($(this).text());
              break;
            case 'units':
              incident[fields[i]] = $(this).text().split(' ');
              break;
            default:
              incident[fields[i]] = $(this).text();
          }
        });

      // read incident status from class
      var rowStatus = $row.find('td:first-child').attr('class');
      incident.status = rowStatus;

      Data.findOne({ incidentNumber: incident.incidentNumber }, (err, data) => {
        if (err) return handleDBError(err);
        if (!data) {
          console.log('New data found');
          convert(incident.location)
            .then(data => {
              incident.lat = data.lat;
              incident.lng = data.lng;
              console.log('incident latlng ' + incident.lat + ', ' + incident.lng);
              saveToDb(incident);
            }, err => {
              console.log(err);
              res.status(500).json({ msg: 'Error in geocoding location' });
            });
        } else {
          console.log('Data already saved');
        }
      });

    });
  });
});
