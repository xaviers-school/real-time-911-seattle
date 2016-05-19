const express = require('express');
const Entry = require(__dirname + '/../models/entry');
const handleDBError = require(__dirname + '/../lib/handle_db_error');

var entryRouter = module.exports = exports = express.Router();

entryRouter.get('/entries', (req, res) => {
  Entry.find({}, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});
