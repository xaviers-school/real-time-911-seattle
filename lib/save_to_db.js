const Entry = require(__dirname + '/../models/entry');

module.exports = exports = function(incident) {
  var newEntry = new Entry(incident);
  newEntry.save((err, incident) => {
    if (err) return handleDBError(err);
    console.log(incident);
    console.log('Saved to db!');
  });
};
