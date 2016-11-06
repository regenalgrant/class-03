(function(module){
  var articleView = {};

  articleView.handleMainNav = function() {
    $('.main-nav').on('click', '.tab', function() {
      $('.tab-content').hide();
      $('#' + $(this).data().content()).fadeIn();
    });
    $('.main-nav .tab:first').click();
  };
  articleView.setTeasers = function() {
    $('#portfolio *:nth-of-type(n+2)').hide();

    $('#portfolio').on('click', 'a.read-on', function(event) {
      event.preventDefault();
      $(this).parent().find('*').fadeIn();
      $(this).hide();
    });
  };
  articleView.renderIndexPage = function() {
    Article.allArticles.forEach(function(article) {
      $('#portfolio').append(article.toHtml('#portfolio-template'));
    });
    $('#numFacts').text(Article.numWordsAll());
    articleView.handleMainNav();
    articleView.setTeasers();
  };
  module.articleView = articleView;
})(window);
