/* Dependencies */
require('../dependencies/jquery/jquery');
require('../dependencies/handlebars/handlebars.runtime');
require('../dependencies/ember/ember');
require('../dependencies/ember-model/ember-model');
require('../dependencies/compiled/templates');
require('../dependencies/jquery.ajax.fake/jquery.ajax.fake');
require('../dependencies/lunr.js/lunr');
require('data');
require('utils/fake_ajax');

/* Start app */
App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

App.baseURL = "http://theocean.apiary.io";

Ember.KEY_EVENTS = {
  27: 'escape',
  40: 'downArrow',
  38: 'upArrow'
    // return key is handled already by ember's textfield view
};

/* Initializers
 * this loads the initial search data into the lunr index and local storage
 */
require('initializers/lunr_initializer');

/* Routes
 * Currently all of them in this file
 */
require('routes/router');

/* Models */
require('models/person');

/* Controllers */
require('controllers/search_controller');
require('controllers/search_filter_controller');

/* Views */
require('views/searchContainer_view');

