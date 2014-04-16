var App;

module('Acceptances - Person', {
  setup: function(){
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('renders with name and mentor', function(){
  expect(2);

  visit('/people/cameron-woodmansee').then(function(){
    ok(find('.personal-info:contains("Cameron Woodmansee")').length);
    ok(find('.personal-info:contains("Anthony Yu")').length);
  });
});
