const express = require('express');
const request = require('request');
const cheerio = require('cheerio');

const handleDBError = require(__dirname + '/../lib/handle_db_error');
const combineDuplicates = require(__dirname + '/../lib/combine_duplicates');
const updateDB = require(__dirname + '/../lib/update_db');

var scraperRouter = module.exports = exports = express.Router();

// specific url for today data
const url = 'http://www2.seattle.gov/fire/realtime911/getRecsForDatePub.asp?action=Today&incDate=&rad1=des';
// url for special date:
// const url = 'http://www2.seattle.gov/fire/realtime911/getRecsForDatePub.asp?incDate=5-20-2016&rad1=des'
const fields = ['displayDatetime', 'incidentNumber', 'level', 'units', 'location', 'type'];

// here using request
scraperRouter.get('/', function(req, res) {
  request(url, function(error, response, html) {
    if (error)
      return res.status(500).json({ msg: 'Error reaching Seattle Real Time 911' });

    // here cheerio loads data into html
    var $ = cheerio.load(html);
    var $data = $("#row_1").parent();

    var allData = [];
    $data.children().each(function(index) {
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

      // add datetime to ISO Date object
      incident.datetime = new Date(incident.displayDatetime);

      // add index for filtering (combining duplicates)
      incident.index = index;

      allData.push(incident);
    });

    console.log('-----> before:', allData.length);
    var combinedData = combineDuplicates(allData);
    console.log('-----> after :', combinedData.length);

    updateDB(res, combinedData);
    res.status(200).json({ msg: `${combinedData.length} unique incidents scanned` })
  });
});
