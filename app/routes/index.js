var IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('search');
  }
});

export default IndexRoute;
