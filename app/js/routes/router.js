App.Router.map(function() {
  this.resource('search', function() {
    this.route('filter');
  });
});

App.Router.reopen({
  //location: 'history'
});

App.IndexRoute = Em.Route.extend({
  redirect: function() {
    this.transitionTo('search');
  }
});

App.SearchRoute = Em.Route.extend({
  model: function() {
    return json;
  },
  events: {
    selectSearchItem: function(filterName) {
      this.controllerFor('searchFilter').get('filters').push(filterName);
      this.transitionTo('search.filter');
    }
  }
});

App.SearchFilterRoute = Em.Route.extend({
  setupController: function(controller) {
    this._super(controller);

    App.Search.filter(controller.get('filters')).then(function(data) {
      var people = controller.get('people');
      data.results.people.map(function(person) {
        people.push(App.Person.merge(person));
      });
      controller.set('projects', data.results.projects);
    });
  },
  events: {
    selectSearchItem: function(term) {
      this.controller.get('filters').add(term);
    }
  }
});
