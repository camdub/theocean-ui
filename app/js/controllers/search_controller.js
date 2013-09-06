App.SearchController = Em.ArrayController.extend({

  filters: [],
  people: [],
  projects: [],
  tags: Em.A(),
  peopleTab: true,

  tagsChanged: function(context) {
    var results = false;
    if(this.get('tags').length !== 0) {
      results = this.get('tags').mapBy('id').toArray().join('-');
    }
    this.transitionToRoute({queryParams: { filter: results }});
  }.observes('tags.@each'),

  peopleTotal: function() {
    return this.get('people').get('length');
  }.property('people.@each'),

  projectsTotal: function() {
    return this.get('projects').get('length');
  }.property('projects.@each'),

  tab: function() {
    this.toggleProperty('peopleTab');
  },

  actions: {
    removeTag: function(tag) {
      this.get('filters').removeObject(tag.toString());
      this.transitionToRoute({queryParams: { filter: false }});
    }
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
