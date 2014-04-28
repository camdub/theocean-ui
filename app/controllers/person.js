export default Em.ObjectController.extend({
  actions: {
    highlight: function(industry) {
      var $link = $('a.' + industry).parent('li'),
          had = $link.hasClass('active');

      $('.panel-heading').removeClass('active');
      $('#sidebar li').removeClass('active');


      if(!had) {
        $('div.' + industry).toggleClass('active');
        $link.toggleClass('active');
      }
    }
  }
});
