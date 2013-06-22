App.SearchResultsView = Em.CollectionView.extend({
    classNames: ['results', 'dropdown-menu', 'dropdown-inverse'],
    tagName: 'ul',
    templateBinding: 'parentView.template',
    classNameBindings: ['hasContent:show:hide'],

    content: [],
    hasContent: function() {
      return (this.get('content').length === 0) ? false : true;
    }.property('content'),

    filtersChanged: function() {
      this.set('content', []);
    }.observes('controller.filters.@each'),

    itemViewClass: Em.View.extend({
      tagName: 'li',
      classNames: ['result'],
      templateBinding: 'parentView.template'
    })

  });
