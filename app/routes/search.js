import Person from 'ocean/models/person';
import OAuth from 'ocean/models/oauth';

var SearchRoute = Em.Route.extend({
  setupController: function(controller, model) {
    console.log(this.get('queryParams'));
  }
});

export default SearchRoute;
