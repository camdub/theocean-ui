import Resolver from 'resolver';
var App = Ember.Application.create({
  LOG_ACTIVE_GENERATION: true,
  LOG_VIEW_LOOKUPS: true,
  modulePrefix: 'ocean',
  Resolver: Resolver
});

App.baseURL = "http://theocean-services.azurewebsites.net";
App.key = "18372d52-822c-4ad7-9648-0b924dc45fcd";
App.inx = lunr(function() {
  this.field('name');
  this.ref('id');
});

import __ from 'ocean/initializers/lunr-initializer';

import routes from 'ocean/routes';
App.Router.reopen({ location: 'history' });
App.Router.map(routes);

export default App;
