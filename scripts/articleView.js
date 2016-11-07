var portfolioView = [];
var aboutMeView = [];

function portfolioV(opts) {
  for (key in opts) {
    this[key] = opts[key];
  }
}
function AboutMe(opts) {
  for (key in opts) {
    this[key] = opts[key];
  }
}

PortfolioV.prototype.toHtml = function(){
  this.daysAgo = parseInt((new Date() - new Date(this.published)) / 60 / 60 / 24 / 1000);
  this.publishStatus = this.published ? 'published about  ' + this.daysAgo + ' days ago' : '(draft)';
  var source = $('#portfolio-items-template').html();
  var templateRender = Handlebars.compile(source);
  return templateRender(this);
};

AboutMe.prototype.toHtml = function () {
  var source = $('#about-items-template').html();
  var templateRender = Handlebars.compile(source);
  return templateRender(this);
};
portfolioView.handleMainNav = function () {
  $('.header-menu').on('click', '.contentBtn', function() {
    $('.contentBtn-content').hide();
    var $idContent = $(this).data().content;

    $('#' + $idContent).show();
    $idContent = '';
  });
  $('.header-menu .contentBtn:first').click();
};

portfolioView.setTeasers = function() {

  $('.body-portfolio-text').hide();

  $('.read-on').on('click', function(event){

    event.preventDefault();
    if($(this).html() === 'Read on →'){
      $(this).parent().find('*').show();
      $(this).text('Collapse');

    } else {
      $(this).text('Read on→');
      $(this).siblings('.body-portfolio-item').hide();

    };
  });
};

portfolioItems.sort(function(currentObject, nextObject) {
  return (new Date(nextObject.published)) - (new Date(currentObject.published));
});

portfolio.forEach(function(ele) {
  portfolioView.push(new Piece(ele));
});

portfolioView.forEach(function(article) {
  $('#home-top-third').append(article.toHtml());
});

aboutMeView.forEach(function(ele) {
  aboutMeView.push(new AboutMe(ele));
});

aboutMeView.forEach(function(article) {
  $('#home-middle-third').append(article.toHtml());
});

portfolioView.handleMainNav();
portfolioView.setTeasers();

 })(window);
