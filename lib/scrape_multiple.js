const moment = require('moment');
const scrapeOne = require(__dirname + '/scrape_one');

var test = module.exports = exports = function(res, daysToScrape, endDate) {
  daysToScrape = daysToScrape || 1;
  queryDate = endDate ? moment(new Date(endDate)) : moment();

  var promiseArr = [];
  for (var i = 0; i < daysToScrape; i++) {
    var displayDate = queryDate.format('M-D-YYYY');
    var scrapePromise = scrapeOne(res, displayDate);
    promiseArr.push(scrapePromise);

    // mutates queryDate
    queryDate.subtract(1, 'days');
  }

  return Promise.all(promiseArr);
};
