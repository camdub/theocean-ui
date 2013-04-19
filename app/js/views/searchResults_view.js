App.SearchResultsView = Em.CollectionView.extend({
    classNames: ['results'],
    tagName: 'ul',
    contentBinding: 'parentView.content',
    templateBinding: 'parentView.template',

    itemViewClass: Em.View.extend({
      tagName: 'li',
      classNames: ['result'],
      templateBinding: 'parentView.template',

      click: function(e) {
        var mainView = this.get('parentView').get('parentView');
        mainView.set('content', []);
        mainView.get('childViews')[0].set('value', '');

        // prototype stuff, ONLY TEMPORARY
      }
    })
  })