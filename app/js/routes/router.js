App.Router.map(function() {
  this.route('search', { queryParams: ['filter'] });
  this.route('auth');

  this.resource('person', { path: 'people/:person_id'});
  this.resource('client', { path: 'clients/:client_id' });
});

App.Router.reopen({
  location: 'history'
});

App.IndexRoute = Em.Route.extend({
  redirect: function() {
    this.transitionTo('search');
  }
});

App.SearchRoute = Em.Route.extend({
  setupController: function(controller, model) {
    // handle param changes
    console.log(this.get('queryParams'));
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
