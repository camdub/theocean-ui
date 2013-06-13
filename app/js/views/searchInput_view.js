App.SearchInputView = Em.ContainerView.extend({

  childViews: ['tagsView', 'inputView'],
  elementId: 'search-view',
  classNames: ['tagsinput','search-input'],
  classNameBindings: ['focused'],

  focused: false,

  click: function(e) {
    this.set('focused', true);
    this.get('inputView').focus();
  },

  tagsView: Em.View.extend({
    classNames: ['tags-list'],
    templateName: 'tags',
    filtersBinding: 'controller.filters',

    removeTag: function(tag) {
      this.get('controller').get('filters').removeObject(tag.toString());
    }
  }),

  inputView: Em.TextField.extend({
    placeholder: 'Search...',
    classNames: ['tagsinput'],

    focus: function() {
      this.$().focus();
    },

    focusOut: function() {
      this.get('parentView').set('focused', false);
      this.set('value', '');
    },

    keyUp: function(e) {
      // parentView of inputView = searchInputView, its parent view
      // is the container view that we are using for the context
      var containerView = this.get('parentView').get('parentView');
      var controller = this.get('controller');

      // handle specific key events
      if(Ember.KEY_EVENTS[e.keyCode] === 'escape') {
        this.set('value', '');
      }
      controller.search(this.get('value'), containerView.get('resultView'));
    }
  })

});
