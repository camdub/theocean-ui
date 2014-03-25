export default Em.Route.extend({
  actions: {
    login: function() {
      var session = this.get('session'),
      route = this;

      session.open().then(function() {
        var lastTransition = session.get('afterRedirect');
        if(lastTransition && !route.router.isActive('login')) {
          lastTransition.retry();
        } else {
          route.transitionTo('index');
        }
      });
    },
    logout: function() {
      var route = this;
      this.get('session').close().then(function() {
        route.transitionTo('login');
      });
    }
  },

  beforeModel: function(transition) {
    var session = this.get('session');
    if(!session.get('isAuthenticated')) {

      if(Em.isEmpty(session.checkToken())) {
        session.set('afterRedirect', transition);
        this.transitionTo('login');
      }
      else {
        transition.send('login');
      }
    }
  }
});
