export default Ember.Route.extend({
  actions: {
    login: function() {
      var session = this.get('session'),
          route = this;
      session.open()
        .then(function() {
            var lastTransition = session.get('afterRedirect');
            if(lastTransition) {
              lastTransition.retry();
            } else {
              route.transitionTo('index');
            }
        });
    }
  }
});
