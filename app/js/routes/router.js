App.Router.map(function() {
  this.route('search');
  this.resource('people');
  this.resource('person', { path: 'people/:person_id'});
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
    return (filters.length === 0) ? {} : { filter: filters.join('|') };
  },

  deserializeParams: function(params,controller) {
    if(params.hasOwnProperty('filter')) {
      controller.set('people', App.Person.findAll());
    }
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

App.PersonRoute = Em.Route.extend({  
  model: function(params) {
    return App.Person.find(params.person_id);
  }
});
