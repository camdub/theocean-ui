attr = Ember.attr;

App.Person = Ember.Model.extend({
  id: attr(),
  firstName: attr(),
  lastName: attr(),
  level: attr(),
  location: attr(),

  fullName: function() {
    return this.get('firstName') + ' ' + this.get('lastName');
  }.property('firstName', 'lastName')

});

App.Person.reopenClass({
  merge: function(data) {
    if(!data.hasOwnProperty('id')) {
      this.create(data);
    }
    var record = this.cachedRecordForId(data['id']);
    // merge if the record has been loaded (it already exists)
    if(record.get('isLoaded')) {
      for(var prop in data) {
        record.set(prop, data[prop]);
      }
      return record;
    }
    // If no record with this ID exists, make a new record
    return this.create(data);
  },
  search: function(filters) {
    var records = Ember.RecordArray.create();
    this.adapter.search(filters, records, this);
    return records;
  }
});

App.Person.adapter = Ember.Adapter.create({
  findAll: function(klass, recordArray) {
    return this.ajax('/people', 'GET').then(function(data) {
      Ember.run(recordArray, recordArray.load, klass, data.people);
    });
  },
  find: function(record, id) {
    return this.ajax('/people/' + id, 'GET').then(function(data) {
      Ember.run(record, record.load, id, data);
    });
  },
  search: function(filters, recordArray, klass) {
    return this.ajax('/people?filter=' + Ember.slugify(filters).join(), 'GET')
    .then(function(data) {
      Ember.run(recordArray, recordArray.load, klass, data.people);
    });
  },
  ajax: function(url, params, method) {
    var settings = {
      url: App.baseURL + url,
      method: method,
      dataType: 'json'
    };
    return Ember.$.ajax(settings);
  }
});
