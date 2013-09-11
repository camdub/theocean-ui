var SearchRoute = Em.Route.extend({
  setupController: function(controller, model) {
    // handle param changes
    console.log(this.get('queryParams'));
  }
});

export default SearchRoute;