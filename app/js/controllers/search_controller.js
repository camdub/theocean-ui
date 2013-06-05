App.SearchController = Em.ArrayController.extend({

  filters: [],
  people: [],
  projects: [],

  observeParams: ['filter', 'filters.@each'],

  peopleTotal: function() {
    return this.get('people').get('length');
  }.property('people.@each'),

  projectsTotal: function() {
    return this.get('projects').get('length');
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

      // Take the top 10 highest matches by score, then sort those
      // alphabetically
      results = (results.length > 10) ? results.slice(0, 10) : results;
      results.sort();

      results.forEach(function(result) {
        context.get('content').pushObject(this.get('terms').get(result));
      }, this);
    }
  }, 300)
});
