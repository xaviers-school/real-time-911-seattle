$('#filter').keyup(function(){
  var filterQuery = $(this).val();
  $('.query').each(function(){
    var text = $(this).text().toLowerCase();
    (text.indexOf(filterQuery) === -1) ? $(this).hide() : $(this).show();
  });
});
