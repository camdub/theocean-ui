import Person from 'appkit/models/person';
import Client from 'appkit/models/client';

export default Em.ArrayController.extend({

  needs: ['people','clients'],
  people: Em.computed.alias('controllers.people'),
  clients: Em.computed.alias('controllers.clients'),
  filters: [],

  actions: {
    view: function(item, type) {
      this.transitionToRoute(type, item);
    }
  },

  filtersChanged: function() {
    if(this.get('filters').get('length') > 0) {
      var params = this.get('filters').mapBy('id').join();
      this.get('people').search({filter: params});
      this.get('clients').search({filter: params});
    }
  }.observes('filters.[]'),

  // if the filter is a person or client obj, we want to go directly
  // to that profile
  addFilter: function(item) {
    var type = item.type.toLowerCase();
    if(type === 'person' || type === 'client') {
      this.transitionToRoute(type, item.id);
    }
    else {
      this.get('filters').pushObject(item);
    }
  },

  search: function(query) {
    console.time('search');
    var initial = this.get('search-index.index').search(query.toLowerCase());
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
      var obj = this.get('search-index.terms').get(result);
      results.pushObject(obj);
    }, this);
    return results;
  }
});
