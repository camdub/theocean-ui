App.Router.map(function() {
  this.route('search');

  this.resource('people');
  this.resource('person', { path: 'people/:person_id'});
  
  this.resource('clients');
  this.resource('client', { path: 'clients/:client_id' });
});

App.Router.reopen({
  location: 'query'
});

App.IndexRoute = Em.Route.extend({
  redirect: function() {
    this.transitionTo('search');
  }
});

App.SearchRoute = Em.Route.extend({
  serializeParams: function(controller) {
    var filters = controller.get('filters');
    return (filters.length === 0) ? {} : { filter: Ember.slugify(filters).join() };
  },

  deserializeParams: function(params,controller) {
    if(params.hasOwnProperty('filter')) {
      controller.set('people', App.Person.search(params.filter));
    }
    else { controller.set('people', []); }
  },

  model: function() {
    return JSON.parse(localStorage.getItem('searchterms'));
  }
});

App.PeopleRoute = Em.Route.extend({
  model: function() {
    return App.Person.findAll();
  }
});

App.ClientsRoute = Em.Route.extend({
  model: function() {
    return App.Client.findAll();
  }
});
