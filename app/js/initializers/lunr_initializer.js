App.inx = lunr(function() {
  this.field('name');
  this.ref('id');
});

Ember.Application.initializer({
  name: 'lunr',
  initialize: function(container, application) {
    if(localStorage && !localStorage.getItem('searchterms')) {
      Ember.$.ajax({
        url: App.baseURL + '/searchterms',
        method: 'GET',
        dataType: 'json'
      }).then(function(data) {
        localStorage.setItem('searchterms', JSON.stringify(data.terms));
        data.terms.forEach(function(item) {
          App.inx.add(item);
        }, this);
      });  
    } else {
      var items = JSON.parse(localStorage.getItem('searchterms'));
      items.forEach(function(item) {
        App.inx.add(item);
      }, this);
    }
    
  }
});
