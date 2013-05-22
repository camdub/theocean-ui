App.SearchController = Em.ArrayController.extend({

  filters: [],
  people: [],
  projects: [],

  observeParams: ['filter', 'filters.@each'],

  peopleTotal: function() {
    return this.get('people').length;
  }.property('people.@each'),

  projectsTotal: function() {
    return this.get('projects').length;
  }.property('projects.@each'),

  removeFilter: function(item) {
    this.get('filters').removeObject(item.toString());
  },

  selectSearchItem: function(filterName) {
    this.get('filters').pushObject(filterName);
  },

  search: Ember.debounce(function(value, context, terms) {
    if(value === '') { // clear the textbox
      context.set('content', []);
    }
    else {
      console.time('search');
      var ids = App.inx.search(value);
      ids = ids.map(function(obj) {
        return parseInt(obj.ref, 10);
      });
      console.timeEnd('search');
      context.set('content', terms.filter(function(item) {
        return ids.contains(parseInt(item.id, 10));
      }));
    }
  }, 300)
});
