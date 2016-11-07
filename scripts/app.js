(function (module) {

  function Project(opts) {
    for (key in opts) {
      this[key] = opts[key];
    }
  }

  Project.projects = [];

  Project.prototype.toHtml = function(){
    var source = $('#portfolio-temp').html();
    var templateRender = Handlebars.compile(source);
    return templateRender(this);
  };

  Project.setTeasers = function() {

    $('.body-portfolio-text').hide();

    $('.read-on').on('click', function(event){

      event.preventDefault();
      if($(this).html() === 'Read on →'){
        $(this).parent().find('*').show();
        $(this).text('Collapse');

      } else {
        $(this).text('Read on→');
        $(this).siblings('.body-portfolio-text').hide();
      };
    });
  };
  Project.load = function (data) {
    data.forEach(function (object) {
      Project.projects.push(new Project(object));
    });
  };

  Project.projects.forEach(function(article) {
  $('#projects').append(article.toHtml());
  });
  Project.getJson = function () {
    $.getJSON ('data/Articles.json', function (data) {
      console.log(data);
    });
  };
  module.Project = Project;
})(window);
