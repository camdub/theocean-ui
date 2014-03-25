var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances
Router.reopen({ location: 'history' });

Router.map(function() {
  this.route('search');
  this.route('login');
});

// protect all routes but the login route
Em.Route.reopen({
  beforeModel: function(transition) {
    var session = this.get('session'),
        routeCond = this.routeName !== 'login' && this.routeName !== 'application';
    if(!session.get('isAuthenticated') && routeCond) {
      session.set('afterRedirect', transition);
      this.transitionTo('login');
    }
  }
});

export default Router;
