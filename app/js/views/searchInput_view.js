App.SearchInputView = Em.TextField.extend({
  placeholder: 'Search...',

  keyUp: function(e) {
    var parentView = this.get('parentView');
    var controller = this.get('controller');

    // handle key events
    if(Ember.KEY_EVENTS[e.keyCode] === 'escape') {
      this.$().val('');
      controller.search(this.$().val(), parentView, controller);
    }
    else {
      parentView.get('controller').search(this.$().val(), parentView, this.get('controller'));
    }
  }
})