const searchable = ['type', 'status', 'start', 'end', 'near', 'radius'];

module.exports = exports = function(reqQuery) {
  var dbQuery = {};
  for (var key in reqQuery) {
    if (searchable.indexOf(key) > -1) {
      switch (key) {
        case 'start':
          dbQuery.hasOwnProperty('datetime')
          ? dbQuery.datetime.$gte = new Date(reqQuery.start)
          : dbQuery.datetime = { $gte: new Date(reqQuery.start) };
          break;
        case 'end':
          dbQuery.hasOwnProperty('datetime')
          ? dbQuery.datetime.$lte = new Date(reqQuery.end)
          : dbQuery.datetime = { $lte: new Date(reqQuery.end) };
          break;
        case 'near':
          var coord = reqQuery.near.split(',').map(Number);
          dbQuery.location = {
            $near: {
              $geometry: { type: 'Point', coordinates: coord },
              $maxDistance: Number(reqQuery.radius) || 5 * 1609.34
            }
          };
          break;
        case 'radius':
          break;
        default:
          dbQuery[key] = reqQuery[key];
      }
    }
  }
  return dbQuery;
};
