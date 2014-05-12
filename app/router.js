var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances
Router.reopen({ location: 'history' });

Router.map(function() {
  this.route('search');
  this.route('login');
  this.route('person', { path: '/people/:person_id' });
  this.resource('client', { path: '/clients/:client_id' }, function() {
    this.resource('project', { path: '/projects/:project_id' });
  });
});

Router.reopen({
  notifyAnalytics: function() {
    if(window.mixpanel) {
      return mixpanel.track('pageview', {'url': this.get('url')});
    }
  }.on('didTransition')
});

// AUTHENTICATION helper hooks
Em.Route.reopen({
  setupController: function(controller, model) {
    this._super(controller, model);

    if(!this.get('session.isAuthenticated'))
      this.controllerFor('application').set('showNavBar', false);
    else
      this.controllerFor('application').set('showNavBar', true);
  },

  beforeModel: function(transition) {
    var session = this.get('session');

    if(transition.targetName !== 'login' && !session.get('isAuthenticated') && !Em.testing) {
      session.set('afterRedirect', transition);
      if(Em.isEmpty(session.checkToken())) {
        this.transitionTo('login');
      }
      else {
        this.transitionTo('loading');
        transition.send('login');
      }
    }
  }
});

export default Router;
