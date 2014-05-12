export default Em.Route.extend({
  actions: {
    login: function() {
      var session = this.get('session'),
          index = this.get('search-index'),
          route = this;

      session.open().then(function() {
        index.setup();
        var lastTransition = session.get('afterRedirect');
        if(lastTransition && lastTransition.targetName !== 'loading') {
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
  }
});
