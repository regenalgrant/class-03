var portfolios = [];

function Portfolio (opts) {
  for (key in opts) {
    this[key] = opts[key];
  }
};

Portfolio.prototype.toHtml = function() {
  var source = $('#portfolio-template').html();
  var templateRender = Handlebars.compile(source);
  return templateRender(this);
};

portfolioDataSet.forEach(function(portfoliosObject) {
  portfolios.push(new Portfolio(portfoliosObject));
});

portfolios.forEach(function(ourNewPortfolioObject){
  $('#portfolio').append(ourNewPortfolioObject.toHtml());
});
