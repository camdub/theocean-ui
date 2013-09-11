Em.Application.initializer({
  name: 'search',
  initialize: function(container, app) {

    var map = Em.Map.create();

    if(!localStorage.getItem('searchterms')) {
      app.deferReadiness();
      Ember.$.getJSON(app.baseURL + '/searchterms?accesskey=' + app.key).then(function(data) {

        data.forEach(function(item) {
          app.inx.add(item); // create search index
          map.set(item.id, item); // populate map
        });

        app.advanceReadiness(); // GO TIME!
        localStorage.setItem('searchterms', JSON.stringify(data)); // cache

        container.register('data:searchterms', map, { instantiate: false, singleton: true });
        container.injection('controller:search', 'terms', 'data:searchterms');
      });
    } else {
      var data = JSON.parse(localStorage.getItem('searchterms'));
      data.forEach(function(item) {
        app.inx.add(item);
        map.set(item.id, item);
      });
      container.register('data:searchterms', map, { instantiate: false, singleton: true });
      container.injection('controller:search', 'terms', 'data:searchterms');
    }
  }
});
