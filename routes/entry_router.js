const express = require('express');
const moment = require('moment');

const Entry = require(__dirname + '/../models/entry');
const handleDBError = require(__dirname + '/../lib/handle_db_error');
const formatQuery = require(__dirname + '/../lib/format_db_query');


var entryRouter = module.exports = exports = express.Router();

entryRouter.get('/entries/today', (req, res) => {
  // query for datetime day from 00:00:00 to 23:59:59 of current day
  Entry.find({
    datetime: {
      $gte: moment().startOf('day').toDate(),
      $lt: moment().endOf('day').toDate()
    }
  }, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});

entryRouter.get('/entries', (req, res) => {
  console.log('Entries query:', req.query);
  var dbQuery = formatQuery(req.query);
  console.log('Formatted query:', dbQuery);

  Entry.find(dbQuery, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});
