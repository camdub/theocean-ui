module("Search page ", {
  setup: function() {
    Ember.run(App, App.advanceReadiness);
    App.inx.add({'id' : 23, 'name' : 'Java'});
  },

  teardown: function(){
    App.reset();
  }
});

// Sample integration test
test('search for java', function() {
  var input = find('.search-input');

  visit('/search').then(function() {
    return fillIn('.search-input', 'java');
  }).then(function() {
    equal(find('.search-input').val(), 'java');
  });
});
