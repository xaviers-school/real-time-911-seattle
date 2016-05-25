const express = require('express');
const moment = require('moment');

const scrapeOne = require(__dirname + '/../lib/scrape_one');
const scrapeMultiple = require(__dirname + '/../lib/scrape_multiple');

var scraperRouter = module.exports = exports = express.Router();

scraperRouter.get('/', function(req, res) {
  scrapeOne(res, moment().format('M-D-YYYY'))
    .then(function(summary) {
      res.status(200).json({
        msg: `${summary.combinedData.length} unique incidents scanned for today`
      });
    });
});

scraperRouter.get('/multiple', function(req, res) {
  console.log(req.query);
  scrapeMultiple(res, Number(req.query.period), req.query.endDate)
    .then(function(data) {
      var msg = data.reduce(function(prev, curr) {
        return prev + `${curr.combinedData.length} unique incidents scanned for ${curr.incDate}\n`;
      }, '');
      console.log('multiple scrape summary:\n', msg);
      res.status(200).json({ msg });
    });
});
