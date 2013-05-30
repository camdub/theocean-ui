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

  search: Ember.debounce(function(value, context) {
    context.set('content', []);

    if(value !== '') {

      console.time('search');
      var results = App.inx.search(value).mapProperty('ref');
      console.timeEnd('search');

      results.forEach(function(result) {
        context.get('content').pushObject(this.get('terms').get(result));
      }, this);
    }
  }, 300)
});
