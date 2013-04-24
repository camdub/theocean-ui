App.SearchFilterView = Em.View.extend({

  classNames: ['hide'], // hide is display:none

  didInsertElement: function() {
    this.$().fadeIn();
  },

  willDestroyElement: function() {
    console.log('destroy');
    this.$().fadeOut();
  }

});