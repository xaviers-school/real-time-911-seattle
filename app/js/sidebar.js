function displayList(markerData) {
  var theTemplate;
  var content = {};

  $.get('/../template/sidebar_template.html', function(data){
    theTemplate = Handlebars.compile(data);
  }).done(function(){
    content.entriesList = markerData.map(theTemplate);
    content.entriesList.forEach(function(el) {
      $('#sidebar').append(el);
    });
  });
}
