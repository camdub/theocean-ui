import { test, moduleForModel } from 'ember-qunit';
import PersonSerializer from 'appkit/serializers/person';
import IsoDateTransform from 'appkit/transforms/isodate';
import Person from 'appkit/models/person';

moduleForModel('person', 'Unit - Person', {
  needs: ['model:experience'],
  setup: function() {
    this.container.register('adapter:application', DS.RESTAdapter.extend({
      namespace: 'api'
    }));
    // TODO: We can get rid of this code once follwing is merged with master
    // https://github.com/rpflorence/ember-qunit/pull/34
    this.container.register('serializer:person', PersonSerializer);
    this.container.register('transform:string', DS.StringTransform);
    this.container.register('transform:boolean', DS.BooleanTransform);
    this.container.register('transform:isodate', IsoDateTransform);
  }
});

test('Person is loaded correctly', function() {
  expect(1);
  stop();
  var store = this.store();
  Em.run(function() {
    store.find('person', 'cameron-woodmansee').then(function(user) {
      start();
      equal(user.get('firstName'), 'Cameron');
    });
  });
});

test('Person has a mentor', function() {
  stop();
  var store = this.store();
  Em.run(function() {
    store.find('person', 'cameron-woodmansee').then(function(user) {
      start();
      equal(user.get('mentor.firstName'), 'Anthony');
    });
  });
});
