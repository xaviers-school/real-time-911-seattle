const mongoose = require('mongoose');

var entrySchema = new mongoose.Schema({
  datetime: Date,
  displayDatetime: String,
  incidentNumber: String,
  level: Number,
  units: [String],
  location: String,
  type: String,
  status: String,
  lat: String,
  lng: String
});

entrySchema.index({datetime: 1}, {expireAfterSeconds: 86400});

module.exports = exports = mongoose.model('Entry', entrySchema);
