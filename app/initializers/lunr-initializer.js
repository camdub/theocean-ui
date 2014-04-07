import SearchIndex from 'appkit/models/search-index';
var env = window.ENV;

export default Em.Application.initializer({
  name: 'search',
  initialize: function(container, app) {

    var map = Em.Map.create();
    var idx = lunr(function() {
      this.field('name');
      this.ref('id');
    });

    container.register('search:terms', map, {instantiate: false});
    container.register('search:lunrindex', idx, {instantiate: false});
    container.register('search:searchindex', SearchIndex);

    app.inject('search:searchindex', 'index', 'search:lunrindex');
    app.inject('search:searchindex', 'terms', 'search:terms');
    app.inject('route', 'search-index', 'search:searchindex');
    app.inject('controller:search', 'search-index', 'search:searchindex');
  }
});
