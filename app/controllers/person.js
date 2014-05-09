export default Em.ObjectController.extend({
  queryParams: ['filterString:filter'],
  filters: [],

  filterString: function(key, value, prev) {
    if(value) {
      this.set('filters', value.split(','));
    }
    return this.get('filters').join();
  }.property('filters.@each'),

  actions: {
    highlight: function(industry) {
      if(this.get('filters').contains(industry)) {
        this.get('filters').removeObject(industry);
      }
      else {
        this.get('filters').pushObject(industry);
      }
    }
  }
});
