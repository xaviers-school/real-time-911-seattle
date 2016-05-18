const Data = require(__dirname + '/../models/data');

module.exports = exports = function(incident) {
  var newData = new Data(incident);
  newData.save((err, incident) => {
    if (err) return handleDBError(err);
    console.log(incident);
    console.log('Saved to db!');
  });
};
