var SearchController = Em.ArrayController.extend({

  filters: [],
  people: [],
  projects: [],

  filtersChanged: function(context) {
    var results = false;
    if(this.get('filters').length !== 0) {
      results = this.get('filters').mapBy('id').toArray().join('-');
    }
    this.transitionToRoute({queryParams: { filter: results }});
  }.observes('filters.@each'),

  peopleTotal: function() {
    return this.get('people').get('length');
  }.property('people.@each'),

  projectsTotal: function() {
    return this.get('projects').get('length');
  }.property('projects.@each')

});

export default SearchController;
