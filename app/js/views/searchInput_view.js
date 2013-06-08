App.SearchInputView = Em.ContainerView.extend({

  childViews: ['tagsView', 'inputView'],
  elementId: 'search-view',
  classNames: ['tagsinput','search-input'],
  classNameBindings: ['focused'],

  focused: false,

  click: function(e) {
    this.set('focused', true);
    this.get('childViews')[1].focus();
  },

  tagsView: Em.View.extend({
    classNames: ['tags-list'],
    templateName: 'tags',
    filtersBinding: 'controller.filters'
  }),

  inputView: Em.TextField.extend({
    placeholder: 'Search...',
    classNames: ['tagsinput'],

    focus: function() {
      this.$().focus();
    },

    focusOut: function() {
      this.get('parentView').set('focused', false);
    },

    keyUp: function(e) {
      var parentView = this.get('parentView');
      var controller = this.get('controller');

      // handle key events
      if(Ember.KEY_EVENTS[e.keyCode] === 'escape') {
        this.$().val('');
      }
      controller.search(this.$().val(), parentView);
    }
  })

});
