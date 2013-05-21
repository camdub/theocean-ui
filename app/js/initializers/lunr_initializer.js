App.inx = lunr(function() {
  this.field('name');
  this.ref('id');
});

Ember.Application.initializer({
  name: 'lunr',
  initialize: function(container, application) {
    if(localStorage && !localStorage.getItem('searchterms')) {
      $.ajax({
        type:'GET',
        fake: true,
        url:'http://theocean.com/search',
        success:function(data, textStatus, XMLHttpRequest) {
          localStorage.setItem('searchterms', JSON.stringify(data));
          data.forEach(function(item) {
            App.inx.add(item);
          }, this);
        }
      });  
    } else {
      var items = JSON.parse(localStorage.getItem('searchterms'));
      items.forEach(function(item) {
        App.inx.add(item);
      }, this);
    }
    
  }
});
