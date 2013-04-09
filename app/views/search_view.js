App.SearchView = Em.ContainerView.extend({
  content: null,
  childViews: ['inputView', 'resultView'],

  inputView: Em.TextField.extend({
    keyUp: function(e) {
      var parentView = this.get('parentView');
      parentView.get('controller').search(this.$().val(), parentView);
    }
  }),

  resultView: Em.CollectionView.extend({
    classNames: ['results'],
    tagName: 'ul',
    contentBinding: 'parentView.content',
    templateBinding: 'parentView.template',

    itemViewClass: Em.View.extend({
      tagName: 'li',
      classNames: ['result'],
      templateBinding: 'parentView.template'
    })
  })

});
