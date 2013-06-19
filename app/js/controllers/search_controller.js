App.SearchController = Em.ArrayController.extend({

  filters: [],
  people: [],
  projects: [],
  peopleTab: true,

  observeParams: ['filter', 'filters.@each'],

  peopleTotal: function() {
    return this.get('people').get('length');
  }.property('people.@each'),

  projectsTotal: function() {
    return this.get('projects').get('length');
  }.property('projects.@each'),

  tab: function() {
    this.toggleProperty('peopleTab');
  },

  search: Ember.debounce(function(value, context) {
    context.set('content', []);

    if(value !== '') {
      console.time('search');
      var results = App.inx.search(value).mapProperty('ref');
      console.timeEnd('search');

      results = (results.length > 10) ? results.slice(0,10) : results;
      results.sort(); // alphabetical

      results.forEach(function(result) {
        context.get('content').pushObject(this.get('terms').get(result));
      }, this);
    }
  }, 300)
});
