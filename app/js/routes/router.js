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

  actions: {
    selectSearchItem: function(filter) {
      if(filter.type !== 'Person' && filter.type !== 'Client') {
        this.get('controller').get('filters').pushObject(filter.id);
        this.transitionTo({queryParams: {filter: filter.id}});
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
