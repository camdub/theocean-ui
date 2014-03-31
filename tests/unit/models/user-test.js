import { test, moduleFor } from 'ember-qunit';
import Person from 'appkit/models/person';

moduleFor('model:person', 'Unit - Person', {}, function(container, context) {
    container.register('store:main', DS.Store);
    var OceanTestAdapter = DS.FixtureAdapter.extend({
        queryFixtures: function(fixtures, query, type) {
            // return only summary object
            return Em.RSVP.resolve([
                {
                    id: 'cameron-woodmansee',
                    firstName: 'Cameron',
                    lastName: 'Woodmansee'
                }
            ]);
        }
    });
    container.register('adapter:application', OceanTestAdapter);
    context.__setup_properties__.store = function() {
        return container.lookup('store:main');
    };
    Person.FIXTURES = [
        {
            id: 'cameron-woodmansee',
            firstName: 'Cameron',
            lastName: 'Woodmansee',
            level: 'A1',
            location: 'New York',
            skills: ['Ember']
        }
    ];
});

test('Summary Person is reloaded to a full user', function() {
    expect(2);

    stop();
    var u = this.store().find(Person, {id: 'cameron-woodmansee'}).then(function(results) {
        start();
        var result = results.get('firstObject');
        equal(result.get('firstName'), 'Cameron');
        stop();
        result.reload().then(function(user) {
            start();
            equal(user.get('location'), 'New York');
        });
    });
});
