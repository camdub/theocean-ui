App.inx = lunr(function() {
  this.field('name');
  this.ref('id');
});

Ember.Application.initializer({
  name: 'lunr',
  initialize: function(container, application) {
    $.ajax({
      type:'GET',
      fake: true,
      url:'http://theocean.com/search',
      success:function(data, textStatus, XMLHttpRequest) {
        data.forEach(function(item) {
          App.inx.add(item);
        }, this);
      }
    });
  }
});
