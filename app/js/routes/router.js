App.Router.map(function() {
  this.resource('search', function() {
    this.route('filter');
  });
  this.resource('people');
  this.resource('person', { path: 'people/:person_id'});
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
    controller.set('people', App.Person.search(controller.get('filters')));
  },
  events: {
    selectSearchItem: function(term) {
      this.controller.get('filters').add(term);
    }
  }
});

App.PeopleRoute = Em.Route.extend({
  model: function() {
    return App.Person.findAll();
  }
});

App.PersonRoute = Em.Route.extend({  
  model: function(params) {
    return App.Person.find(params.person_id);
  }
});