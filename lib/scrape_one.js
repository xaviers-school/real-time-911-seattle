const request = require('request');
const cheerio = require('cheerio');

const handleDBError = require(__dirname + '/handle_db_error');
const combineDuplicates = require(__dirname + '/combine_duplicates');
const updateDB = require(__dirname + '/update_db');

// url for special date:
const fields = ['displayDatetime', 'incidentNumber', 'level', 'units', 'location', 'type'];

module.exports = exports = function(res, incDate) {
  var url = `http://www2.seattle.gov/fire/realtime911/getRecsForDatePub.asp?incDate=${incDate}&rad1=des`
  console.log('REQUESTING', url);
  return new Promise(function(resolve, reject) {
    // here using request
    request(url, function(error, response, html) {
      if (error)
        return reject('Error reaching Seattle Real Time 911');
      if (response.statusCode !== 200)
        return reject(`Page responded with status code ${response.statusCode}`);

      // here cheerio loads data into html
      var $ = cheerio.load(html);

      var $data = $('#row_1').parent();
      var rowPointer = 2;
      while (!$data.children().length && rowPointer < 200) {
        console.log('trying pointer', rowPointer);
        $data = $('#row_' + rowPointer).parent();
        rowPointer++;
      }

      if (!$data.children().length)
        return reject('Error reaching Seattle Real Time 911');

      console.log($data.children().length);

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
      resolve({incDate, combinedData});
    });
  });
};
