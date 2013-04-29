App.SearchInputView = Em.TextField.extend({
  placeholder: 'Search...',
  classNames: ['search-input'],

  keyUp: function(e) {
    var parentView = this.get('parentView');
    var controller = this.get('controller');

    // handle key events
    if(Ember.KEY_EVENTS[e.keyCode] === 'escape') {
      this.$().val('');
    }
    controller.search(this.$().val(), parentView, controller.get('content'));
  }
});
