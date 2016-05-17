const mongoose = require('mongoose');

var dataSchema = new mongoose.Schema({
  datetime: String,
  incidentNumber: String,
  level: Number,
  units: [String],
  location: String,
  type: String,
  status: String,
  lat: String,
  lng: String
});

module.exports = exports = mongoose.model('Data', dataSchema);
