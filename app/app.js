import Resolver from 'ember/resolver';

var App = Ember.Application.extend({
  // LOG_ACTIVE_GENERATION: true,
  // LOG_MODULE_RESOLVER: true,
  // LOG_TRANSITIONS: true,
  // LOG_TRANSITIONS_INTERNAL: true,
  // LOG_VIEW_LOOKUPS: true,
  modulePrefix: 'appkit',
  Resolver: Resolver['default']
});

import __ from 'appkit/initializers/auth-initializer';
import __ from 'appkit/initializers/lunr-initializer';
Em.Inflector.inflector.irregular('experience', 'experience');

export default App;
