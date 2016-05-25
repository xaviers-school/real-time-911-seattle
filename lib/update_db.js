const Entry = require(__dirname + '/../models/entry');
const handleDBError = require(__dirname + '/handle_db_error');
const geocode = require(__dirname + '/convert_location');

module.exports = exports = function(res, combinedData) {

  function saveToDb(inc) {
    var newEntry = new Entry(inc);
    newEntry.save((saveErr) => {
      if (saveErr) return handleDBError(saveErr, res);
      console.log(`${inc.incidentNumber} added`);
    });
  }

  combinedData.forEach((inc) => {
    delete inc.index;

    return Entry.findOne({ incidentNumber: inc.incidentNumber }, (err, data) => {
      if (err) return handleDBError(err, res);

      // current incident is not in DB
      if (!data) {
        geocode(inc.location)
          .then((geocodeData) => {
            inc.lat = geocodeData.lat;
            inc.lng = geocodeData.lng;
            saveToDb(inc);
          }, geocodeErr => {
            console.log(geocodeErr.body);
            // res.status(500).json({ msg: 'Error in geocoding location' });
            inc.lat = '';
            inc.lng = '';
            saveToDb(inc);
          });
      }

      // change in status
      else if (data.status !== inc.status) {
        Entry.update(
          { incidentNumber: inc.incidentNumber },
          { $set: { status: inc.status } },
          (updateErr) => {
            if (updateErr) return handleDBError(err, res);
            console.log(`${inc.incidentNumber} updated (${data.status} => ${inc.status})`);
          }
        );
      }
    });
  });
};
