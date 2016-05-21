const _ = require('lodash');

module.exports = exports = function(scrapeData) {
  var combinedData = [];
  function arrayMerger(objValue, srcValue) {
    if (_.isArray(objValue)) return objValue.concat(srcValue);
  }

  function findByIncNum(incNum) {
    return _.filter(scrapeData, (obj) => {
      return obj.incidentNumber === incNum;
    });
  }

  scrapeData.forEach((inc) => {
    var sameIncArr = findByIncNum(inc.incidentNumber);

    if (sameIncArr.length > 1) {
      var combinedInc = _.mergeWith({}, ...sameIncArr, arrayMerger);
      for (var i = 1; i < sameIncArr.length; i++) {
        scrapeData.splice(sameIncArr[i].index, 1);
      }
      combinedData.push(combinedInc);
    } else {
      combinedData.push(inc);
    }
  });

  return combinedData;
};
