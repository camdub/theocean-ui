App.Router.map(function() {
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return json;
  }
});
