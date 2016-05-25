const express = require('express');
const moment = require('moment');

const Entry = require(__dirname + '/../models/entry');
const handleDBError = require(__dirname + '/../lib/handle_db_error');

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
  Entry.find({}, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});
