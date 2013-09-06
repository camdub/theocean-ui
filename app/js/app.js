/* Dependencies */
require('../dependencies/jquery/jquery');
require('../dependencies/handlebars/handlebars');
require('../dependencies/ember/ember');
require('../dependencies/ember-model/ember-model');
require('../dependencies/compiled/templates');
require('../dependencies/lunr.js/lunr');

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
ENV = {NEW_MODEL_HOOKS_PARAM_ORDER: true};
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
App.baseURL = "http://theocean-services.azurewebsites.net";
App.key = "18372d52-822c-4ad7-9648-0b924dc45fcd";

Ember.KEY_EVENTS = {
  27: 'escape',
  40: 'downArrow',
  38: 'upArrow'
  // return key is handled already by ember's textfield view
};

require('helpers/helpers');

/* Initializers
 * this loads the initial search data into the lunr index and local storage
 */
require('initializers/lunr_initializer');

require('components/auto-suggest');

/* Routes
 * Currently all of them in this file
 */
require('routes/router');

/* Models */
require('models/person');
require('models/client');

/* Controllers */
require('controllers/search_controller');
