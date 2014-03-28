import Person from 'appkit/models/person';
import Client from 'appkit/models/client';

export default Em.ArrayController.extend({

  //queryParams: ['filters'],
  filters: [],
  people: [],
  clients: [],

  // if the filter is a person or client obj, we want to go directly
  // to that profile
  filtersChanged: function() {
    var newest = this.get('filters').get('lastObject');
    if(newest &&
        (newest.type !== 'Person' || newest.type !== 'Client')) {
      var params = this.get('filters').mapBy('id').join();
      var r = this.store.find('person', {filter: params});
      var p = this.store.find('client', {filter: params});
      this.set('people', r);
      this.set('clients', p);
    }
  }.observes('filters.@each'),

  search: function(query) {
    console.time('search');
    var initial = this.get('searchidx').search(query.toLowerCase());
    console.timeEnd('search');
    initial = initial.mapProperty('ref');

    if(initial.length === 0) {
      return [];
    }

    // take top 10 matches and sort alphabetically
    var top = initial.slice(0,10).sort();

    // remove terms that are already selected and
    // get matching item from pre-populated map
    var results = [];
    top.forEach(function(result) {
      var obj = this.get('searchterms').get(result);
      results.pushObject(obj);
    }, this);
    return results;
  }
});
