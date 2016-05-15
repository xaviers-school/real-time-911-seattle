const express = require('express');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const app = express();
const crimeData = [];

// specific url for today data
const url = 'http://www2.seattle.gov/fire/realtime911/getRecsForDatePub.asp?action=Today&incDate=&rad1=des';

// here using request
app.get('/scrape', function(req, res) {
  request(url, function(error, response, html) {
    if(!error){
      // here cheerio loads data into html
      var $ = cheerio.load(html);
      var $data = $("#row_1").parent();
      $data.children().each(function(index) {
        crimeData.push($(this).text());
      });
      // getting the data into an array but looks janky as shit
      console.log(crimeData);
    }
  });
});

const PORT = process.env.PORT || 3000;

module.exports = exports = app.listen(PORT, () => {
  console.log('Server running on port: ' + PORT);
});
