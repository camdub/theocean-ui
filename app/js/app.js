/* Dependencies */
require('../dependencies/jquery/jquery');
require('../dependencies/handlebars/handlebars.runtime');
require('../dependencies/ember/ember');
require('../dependencies/ember-model/ember-model');
require('../dependencies/ember-query/jquery-deparam');
require('../dependencies/ember-query/ember-query');
require('../dependencies/compiled/templates');
require('../dependencies/jquery.ajax.fake/jquery.ajax.fake');
require('../dependencies/lunr.js/lunr');
require('data');

/* Setup for integration tests. Unfortunately, this needs to be
   specified prior to the application creation so it can't be combined
   with the if statement below, which need to be done afterwards
 */
if(window.TESTING) {
  Ember.testing = true;
}

//turn on LOG_BINDINGS
//Ember.LOG_BINDINGS = true;

/* Start app */
window.App = Em.Application.create({
  LOG_TRANSITIONS: window.TESTING ? false : true,
  rootElement: window.TESTING ? '#ember-testing' : 'body'
});

/* Required for integration testing with ember-testing */
if(window.TESTING) {
  /* Waits to render app until qunit is ready */
  App.setupForTesting();
  /* injectHelpers adds
   * visit, click, fillIn, and find for integration tests
   */
  App.injectTestHelpers();
}

//App.baseURL = "http://theocean.apiary.io";
App.baseURL = "http://oceanservices-net.cloudapp.net/api";

Ember.KEY_EVENTS = {
  27: 'escape',
  40: 'downArrow',
  38: 'upArrow'
  // return key is handled already by ember's textfield view
};

require('utils/fake_ajax');
require('utils/utils');

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
require('models/client');

/* Controllers */
require('controllers/search_controller');

/* Views */
require('views/searchContainer_view');
require('views/searchFilter_view');
require('views/bookmark_view');

