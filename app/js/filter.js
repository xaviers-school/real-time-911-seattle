var match = {
  '#filter-status': {input: 'checkbox', key: 'status'},
  '#filter-type': {input: 'checkbox', key: 'type'}
};

$('#filters').change(function(event) {
  event.preventDefault();

  var queryObj = {};
  for (var id in match) {
    switch (match[id].input) {
      case 'checkbox':
        var checked = $(`${id} input[type=checkbox]:checked`);
        if (checked.length > 0) {
          queryObj[match[id].key] = checked.map(function(index, el) {
            return $(el).val();
          }).get().join();
        }
        break;
      default:

    }
  }
  formatFilterRequest(queryObj);
  console.log(queryObj);
});

function formatFilterRequest(queryObj) {
  var queryStr = '';
  for (var key in queryObj) {
    var encoded = encodeURI(`${key}=${queryObj[key]}`);
    queryStr += (queryStr.length ? '&' : '?') + encodeURI(`${key}=${queryObj[key]}`);
  }
  console.log(queryStr);
  getData(queryStr)
}
