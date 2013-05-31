App.inx = lunr(function() {
  this.field('name');
  this.ref('id');
});

App.initializer({
  name: 'search index',
  initialize: function(container, application) {

    var content = Ember.Map.create(); // map for easy filtering

    if(!localStorage.getItem('searchterms')) {
      App.deferReadiness();
      Ember.$.getJSON(App.baseURL + '/searchterms').then(function(data) {

        data.forEach(function(item) {
          App.inx.add(item); // create search index
          content.set(item.id, item); // populate map
        });

        container.lookup('controller:search').set('terms', content); // set value on search controller
        App.advanceReadiness(); // GO TIME!
        localStorage.setItem('searchterms', JSON.stringify(data)); // cache
      });
    } else {
      var data = JSON.parse(localStorage.getItem('searchterms'));
      data.forEach(function(item) {
        App.inx.add(item);
        content.set(item.id, item);
      });
      container.lookup('controller:search').set('terms', content);
    }
  }
});
