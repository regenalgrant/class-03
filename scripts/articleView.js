var projectV = {};

projectV.handleMainNav = function () {
  $('.header-menu').on('click', '.contentBtn', function() {
    $('.contentBtn-content').hide();
    var $idContent = $(this).data().content;
    $('#' + $idContent).show();
    $idContent = '';
  });
  $('.header-menu .contentBtn:first').click();
};
