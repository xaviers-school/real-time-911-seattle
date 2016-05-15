const express = require('express');
const request = require('request');
const cheerio = require('cheerio');

var scraperRouter = module.exports = exports = express.Router();

// specific url for today data
const url = 'http://www2.seattle.gov/fire/realtime911/getRecsForDatePub.asp?action=Today&incDate=&rad1=des';
const fields = ['datetime', 'incidentNumber', 'level', 'units', 'location', 'type'];

// here using request
scraperRouter.get('/', function(req, res) {
  var crimeData = [];  // reset it here to avoid duplicates - can work on updating later
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

      crimeData.push(incident);
    });

    console.log(crimeData.length);
    res.send({ data: crimeData, length: crimeData.length });
  });
});
