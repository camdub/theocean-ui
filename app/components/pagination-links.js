export default Em.Component.extend({

  hasPrevious: function() {
    return this.get('page') > 1;
  }.property('page'),

  hasNext: function() {
    return this.get('page') < this.get('pages');
  }.property('page', 'pages'),

  showPagination: Em.computed.gt('pages', 1),
  lastPage: Em.computed.alias('pages'),

  actions: {
    goToNextPage: function() {
      if(this.get('hasNext'))
        this.incrementProperty('controller.page');
    },
    goToPreviousPage: function() {
      if(this.get('hasPrevious'))
        this.decrementProperty('controller.page');
    }
  }
});
