export default Em.ObjectController.extend({
  actions: {
    highlight: function(industry) {
	  $('.' + industry).toggleClass('highlighted');
    }
  }
});
