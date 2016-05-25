function displayList(markerData) {
  var theTemplate;
  var content = {};

  markerData.sort(function (a, b) {
    if (a.datetime < b.datetime) return 1;
    if (a.datetime > b.datetime) return -1;
    return 0;
  });

  $.get('/../template/sidebar_template.html', function(data){
    theTemplate = Handlebars.compile(data);
  }).done(function(){
    content.entriesList = markerData.map(theTemplate);
    content.entriesList.forEach(function(el) {
      $('#sidebarList').append(el);
    });
  });
}
