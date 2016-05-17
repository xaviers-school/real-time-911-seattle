const express = require('express');
const Data = require(__dirname + '/../app/models/data');
const handleDBError = require(__dirname + '/../app/lib/handle_db_error');

var dataRouter = module.exports = exports = express.Router();

dataRouter.get('/getData', (req, res) => {
  Data.find({}, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});
