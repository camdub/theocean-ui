import Person from 'appkit/models/person';
import Client from 'appkit/models/client';

export default Em.ArrayController.extend({

  needs: ['people','clients'],
  people: Em.computed.alias('controllers.people'),
  clients: Em.computed.alias('controllers.clients'),

  queryParams: ['filterString:filter'],
  filters: [],

  filterString: function(key, value, prev) {
    console.log(this.get('filters').mapBy('id').join());
    if(value) {
      value.split(',').forEach(function(f) {
        var filter = this.get('search-index.terms').get(f);
        if(!this.get('filters').contains(filter))
          this.get('filters').pushObject(filter);
      }, this);
    }
    return this.get('filters').mapBy('id').join();
  }.property('filters.@each'),

  actions: {
    view: function(item, type) {
      this.transitionToRoute(type, item, { queryParams: { filter: this.get('filters').mapBy('id') }});
    }
  },

  // TOOD: make a DI mixpanel proxy obj that does the if(window.mixpanel) check
  filtersChanged: function() {
    if(this.get('filters').get('length') > 0) {
      var params = this.get('filterString');
      if(window.mixpanel) {
        mixpanel.track('search', {'query': params});
      }
      this.get('people').search({filter: params});
      this.get('clients').search({filter: params});
    }
  }.observes('filters.@each'),

  // if the filter is a person or client obj, we want to go directly
  // to that profile
  addFilter: function(item) {
    var type = item.type.toLowerCase();
    if(type === 'person' || type === 'client') {
      if(window.mixpanel) {
        mixpanel.track('search', {'query': item.id});
      }
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
    var top = initial.slice(0,15);

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
