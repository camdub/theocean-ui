import Person from 'ocean/models/person';

var SearchRoute = Em.Route.extend({
  setupController: function(controller, model) {
    // handle param changes
    controller.set('people', Person.findAll());
  }
});

export default SearchRoute;