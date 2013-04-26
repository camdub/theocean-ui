App.SearchFilterController = Em.Controller.extend({
  filters: new Ember.Set(),
  people: [],
  projects: [],

  filtersArray: function() {
    return this.get('filters').toArray();
  }.property('filters.[]'),

  peopleTotal: function() {
    return this.get('people').length;
  }.property('people.@each'),

  projectsTotal: function() {
    return this.get('projects').length;
  }.property('projects.@each'),

  removeFilter: function(item) {
    this.get('filters').remove(item.toString());
  }
});
