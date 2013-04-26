var Person = App.Person;

module('App.Person', {
  setup:function() {
    Person.adapter = Ember.FixtureAdapter.create();
    Person.FIXTURES = [
      {
        id: 1,
        firstName: 'Cam',
        lastName: 'Wood'
      }
    ];
  },
  teardown: function() {}
});

test('a Person has a fullName', function() {
  var person = App.Person.create({
    "id" : 1,
    "firstName":"Cameron",
    "lastName" :"Woodmansee"
  });
  equal(person.get('fullName'), 'Cameron Woodmansee');
});

test('.merge(data) merges with existing records', function() {
  expect(3);

  var first = Ember.run(Person, Person.find, 1);
  ok(first.get('isLoading'));
  stop(); //wait for async tests

  first.on('didLoad', function() {
    start();
    ok(first.get('isLoaded'));
    Ember.run(Person, Person.merge, {'id': 1, 'location': 'New York'});
    equal(first.get('location'), 'New York');
  });
});

test('.merge(data) creates a new record of none exist', function() {
  expect(2);

  var record = Ember.run(Person, Person.merge, {'id' : 1, 'firstName' : 'David' });

  equal(record.get('firstName'), 'David');
  equal(record.get('id'), 1);
});
