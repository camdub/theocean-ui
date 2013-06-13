App.Router.map(function() {
  this.route('search');

  //this.resource('people');
  this.resource('person', { path: 'people/:slug'});

  //this.resource('clients');
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
        this.controller.get('filters').pushObject(filter.name);
      }
      else {
        this.transitionTo(filter.type.toLowerCase(), filter.name);
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
    var slug = (model.hasOwnProperty('slug')) ? model.slug : model.get('id');
    controller.set('content', App.Person.find(slug));
  },
  serialize: function(model) {
    return { slug: model.get('id') };
  }
});

App.ClientsRoute = Em.Route.extend({
  model: function() {
    return App.Client.findAll();
  }
});
