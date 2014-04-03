export default Em.Component.extend({
  visiblePages: function() {
    var range = function(i) {
      return i ? range(i-1).concat(i) : [];
    }
    return range(this.get('pages'));
  }.property('page', 'pages'),

  hasPrevious: function() {
    return this.get('page') > 1;
  }.property('page'),

  hasNext: function() {
    return this.get('page') + 1 < this.get('pages');
  }.property('page', 'pages'),

  showPagination: Em.computed.gt('pages', 1),
  lastPage: Em.computed.alias('pages'),

  actions: {
    goToPage: function(pageNum) {
      this.set('controller.page', pageNum);
    },
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
