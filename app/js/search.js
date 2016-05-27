$('#search').keyup(function(){
  var searchQuery = $(this).val();
  $('.query').each(function(){
    var text = $(this).text().toLowerCase();
    (text.indexOf(searchQuery) === -1) ? $(this).hide() : $(this).show();
  });
});
