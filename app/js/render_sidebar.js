var listTemplate;

function displayList(markerData) {
  $('#sidebarList').empty();
  var entriesList = markerData.sort(function(a, b) {
    if (a.datetime < b.datetime) return 1;
    if (a.datetime > b.datetime) return -1;
    return 0;
  });

  if (listTemplate) {
    entriesList.forEach(function(el) {
      $('#sidebarList').append(listTemplate(el));
    });
  } else {
    $.get('/../template/sidebar_template.html', function(data){
      listTemplate = Handlebars.compile(data);
    }).done(function() {
      entriesList.forEach(function(el) {
        $('#sidebarList').append(listTemplate(el));
      });
    });
  }
}
