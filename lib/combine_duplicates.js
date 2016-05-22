const _ = require('lodash');

module.exports = exports = function(scrapeData) {
  var combinedData = [];
  function arrayMerger(objValue, srcValue) {
    if (_.isArray(objValue)) return objValue.concat(srcValue).sort();
  }

  function findByIncNum(incNum) {
    return _.filter(scrapeData, (obj) => {
      return (obj) ? obj.incidentNumber === incNum : obj;
    });
  }

  scrapeData.forEach((inc) => {
    if (inc !== null) {
      var sameIncArr = findByIncNum(inc.incidentNumber);

      if (sameIncArr.length > 1) {
        console.log(`combining ${sameIncArr.length} occurences of ${inc.incidentNumber}`);
        var combinedInc = _.mergeWith({}, ...sameIncArr, arrayMerger);

        for (var i = 1; i < sameIncArr.length; i++) {
          scrapeData.splice(sameIncArr[i].index, 1, null);
        }
        combinedData.push(combinedInc);
      } else {
        combinedData.push(inc);
      }
    }
  });

  return combinedData;
};
