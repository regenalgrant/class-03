
var articleView = {};


articleView.handleMainNav = function() {
  $('.main-nav').on('click', '.tab', function() {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });
  $('.main-nav .tab:first').click();
};
articleView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide();

  $('#articles').on('click', 'a.read-on', function(event) {
    event.preventDefault();
    $(this).parent().find('*').fadeIn();
    $(this).hide();
  });
};

// articleView.populateFilters();
// articleView.handleCategoryFilter();
// articleView.handleAuthorFilter();
articleView.handleMainNav();
articleView.setTeasers();
