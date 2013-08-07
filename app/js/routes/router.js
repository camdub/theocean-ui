App.Router.map(function() {
  this.route('search');
  this.route('auth');

  this.resource('person', { path: 'people/:person_id'});
  this.resource('client', { path: 'clients/:client_id' });
});

App.Router.reopen({
  location: 'query'
});

App.AuthSuperRoute = Em.Route.extend({
  enter: function() {
    var accessKey = localStorage.getItem('accessKey');
    if(accessKey === null) {
      window.location.replace(App.authURL(encodeURIComponent(App.authCallback + '&route=' + this.routeName)));
    }
  }
});

App.IndexRoute = Em.Route.extend({
  redirect: function() {
    this.transitionToRouteWithParams('search', {});
  }
});

App.AuthRoute = Em.Route.extend({
  deserializeParams: function(params, controller) {
    if(params.hasOwnProperty('key')) {
      localStorage.setItem('accessKey', params.key);
    }
    this.transitionToRouteWithParams('search', {});
  }
});

App.SearchRoute = Em.Route.extend({
  serializeParams: function(controller) {
    var filters = controller.get('filters');
    return (filters.length === 0) ? {} : { filter: filters.join() };
  },

  deserializeParams: function(params,controller) {
    if(params.hasOwnProperty('filter')) {
      if(controller.get('filters').length === 0) {
        controller.set('filters', params.filter.split(','));
      }
      controller.set('people', App.Person.search(params.filter));
    }
    else { controller.set('people', []); }
  },

  events: {
    selectSearchItem: function(filter) {
      if(filter.type !== 'Person' && filter.type !== 'Client') {
        this.controller.get('filters').pushObject(filter.id);
      }
      else {
        this.transitionTo(filter.type.toLowerCase(), filter);
      }
    }
  }
});

App.PeopleRoute = Em.Route.extend({
  model: function() {
    return App.Person.findAll();
  }
});
App.PersonController = Em.ObjectController.extend({});

App.PersonRoute = Em.Route.extend({
  setupController: function(controller, model) {
    controller.set('content', App.Person.find(model.get('id')));
  }
});

App.ClientsRoute = Em.Route.extend({
  model: function() {
    return App.Client.findAll();
  }
});
