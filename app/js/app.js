/* Dependencies */
require('../dependencies/jquery/jquery');
require('../dependencies/handlebars/handlebars.runtime');
require('../dependencies/ember/ember');
require('../dependencies/compiled/templates');
require('../dependencies/jquery.ajax.fake/jquery.ajax.fake');
require('../dependencies/lunr.js/lunr');
require('data');

$.ajax.fake.registerWebservice('http://theocean.com/search', function(data) {
    return json;
});

/* Start app */
App = Ember.Application.create({
	LOG_TRANSITIONS: true,
});

/* Initializers
 * this loads the initial search data into the lunr index and local storage
 */
require('initializers/lunr_initializer');

/* Routes
 * Currently all of them in this file
 */
require('routes/router');

/* Controllers */
require('controllers/search_controller');

/* Views */
require('views/searchInput_view');

