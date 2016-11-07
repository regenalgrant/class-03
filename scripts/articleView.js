var projectV = {};

projectV.handleMainNav = function () {
  $('.main-nav').on('click', '.tab', function() {
    $('.tab-content').hide();
    console.log($(this)[0].attributes[1].value);
    $('main section[id=\"' + $(this)[0].attributes[1].value + '\"]').fadeIn();
  });
};

projectV.render = function () {
  Project.projects.forEach(function (article) {
    $('#projects').append(article.toHtml());
  });
  projectV.handleMainNav();
};

Project.getJson();
