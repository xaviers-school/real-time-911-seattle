const mongoose = require('mongoose');

var entrySchema = new mongoose.Schema({
  datetime: Date,
  displayDatetime: String,
  incidentNumber: String,
  level: Number,
  units: [String],
  address: String,
  type: String,
  status: String,
  location: {
    type: {type: String, default: 'Point'},
    coordinates: []
  },
  lat: String,
  lng: String
});

// entrySchema.index({geo: '2dsphere', datetime: 1}, {expireAfterSeconds: 86400});
entrySchema.index({ location: '2dsphere' });

module.exports = exports = mongoose.model('Entry', entrySchema);
