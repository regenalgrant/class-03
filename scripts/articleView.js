var portfolioView = [];
var aboutMeView = [];

function portfolioView(opts) {
  for (key in opts) {
    this[key] = opts[key];
  }
}
function AboutMe(opts) {
  for (key in opts) {
    this[key] = opts[key];
  }
}

// Piece.prototype.toHtml = function(){
//   this.daysAgo = parseInt((new Date() - new Date(this.published)) / 60 / 60 / 24 / 1000);
//   this.publishStatus = this.published ? 'published about  ' + this.daysAgo + ' days ago' : '(draft)';
//   var source = $('#portfolio-items-template').html();
//   var templateRender = Handlebars.compile(source);
//   return templateRender(this);
// };
// 
// AboutMe.prototype.toHtml = function () {
//   var source = $('#about-items-template').html();
//   var templateRender = Handlebars.compile(source);
//   return templateRender(this);
// };
// portfolioPieces.handleMainNav = function () {
//   $('.header-menu').on('click', '.contentBtn', function() {
//     $('.contentBtn-content').hide();
//     var $idContent = $(this).data().content;
//     console.log($idContent, 'id Content');
//     $('#' + $idContent).show();
//     $idContent = '';
//   });
//   $('.header-menu .contentBtn:first').click();
// };
//
// portfolioPieces.setTeasers = function() {
//
//   $('.body-portfolio-item').hide();
//
//   $('.read-on').on('click', function(event){
//     console.log('clicked: ', $(this).text());
//     event.preventDefault();
//     if($(this).html() === 'Show More →'){
//       $(this).parent().find('*').show();
//       $(this).text('Show Less');
//       console.log('I should show more now');
//     } else {
//       $(this).text('Show More →');
//       $(this).siblings('.body-portfolio-item').hide();
//       console.log('I should show less now');
//     };
//   });
// };
//
// portfolioItems.sort(function(currentObject, nextObject) {
//   return (new Date(nextObject.published)) - (new Date(currentObject.published));
// });
//
// portfolioItems.forEach(function(ele) {
//   portfolioPieces.push(new Piece(ele));
// });
//
// portfolioPieces.forEach(function(article) {
//   $('#home-top-third').append(article.toHtml());
// });
//
// aboutMeItems.forEach(function(ele) {
//   aboutMePieces.push(new AboutMe(ele));
// });
//
// aboutMePieces.forEach(function(article) {
//   $('#home-middle-third').append(article.toHtml());
// });
//
// portfolioPieces.handleMainNav();
// portfolioPieces.setTeasers();

})(window);
