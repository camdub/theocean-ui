var env = window.ENV;

export default Em.Application.initializer({
  name: 'search',
  initialize: function(container, app) {

    var map = Em.Map.create();
    var idx = lunr(function() {
      this.field('name');
      this.ref('id');
    });

    if(!localStorage.getItem('searchterms')) {
      app.deferReadiness();
      Ember.$.getJSON(env.serviceUrl + '/searchterms?accesskey=' + app.key).then(function(data) {

        data.forEach(function(item) {
          idx.add(item); // create search index
          map.set(item.id, item); // populate map
        });

        app.advanceReadiness(); // GO TIME!
        localStorage.setItem('searchterms', JSON.stringify(data)); // cache
      });
    } else {
      var data = JSON.parse(localStorage.getItem('searchterms'));
      data.forEach(function(item) {
        idx.add(item);
        map.set(item.id, item);
      });
    }

    container.register('data:searchterms', map, { instantiate: false, singleton: true });
    container.injection('controller:search', 'searchterms', 'data:searchterms');
    container.register('data:searchindex', idx, { instantiate: false, singleton: true });
    container.injection('controller:search', 'searchidx', 'data:searchindex');
  }
});
