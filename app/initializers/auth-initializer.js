import Session from 'appkit/controllers/session';
import Auth from 'appkit/models/auth';
import popup from 'appkit/services/authenticate-popup';
import azure from 'appkit/services/auth/azure';

export default Em.Application.initializer({

  name: 'authentication',
  initialize: function(container, app) {

    container.register('session:main', Session);
    app.inject('controller', 'session', 'session:main');
    app.inject('route', 'session', 'session:main');

    container.register('session:adapter', Auth);
    app.inject('session:adapter', 'store', 'store:main');
    app.inject('session:main', 'adapter', 'session:adapter');

    container.register('service:azure', azure);
    container.register('popup:authentication', popup);
    app.inject('service:azure', 'popup', 'popup:authentication');

    // popup logic
    var token = container.lookup('session:adapter').readAccessToken();
    if(token && window.opener) {
      // don't continue with app, we are just a popup
      app.deferReadiness();
      window.opener.postMessage('setAccessToken:'+token, window.location.origin);
    }
  }

});
