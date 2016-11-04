$.get('scripts/Articles.json', function(result) {
  var json = $.parseJSON(result);
  alert(json.subject);
});
console.log();
