import Resolver from 'ember/resolver';

var App = Ember.Application.extend({
  LOG_ACTIVE_GENERATION: true,
  LOG_MODULE_RESOLVER: true,
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true,
  LOG_VIEW_LOOKUPS: true,
  modulePrefix: 'appkit',
  Resolver: Resolver['default']
});

App.baseURL = "http://theocean-services.azurewebsites.net";
App.key = "18372d52-822c-4ad7-9648-0b924dc45fcd";

import __ from 'appkit/initializers/auth-initializer';
import __ from 'appkit/initializers/lunr-initializer';

export default App;
