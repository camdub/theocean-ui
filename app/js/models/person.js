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
    // merge if the record has been loaded (it alredy exists)
    if(record.get('isLoaded')) {
      for(var prop in data) {
        record.set(prop, data[prop]);
      }
      return record;
    }
    // If no record with this ID exists, make a new record
    return this.create(data);
  }
});

App.Person.adapter = Ember.Adapter.create({
  findAll: function(klass, recordArray) {
    $.getJSON(App.baseURL + "/people", {}, function(data) {
      Ember.run(function() {
        return recordArray.load(klass, data.people);
      });
    });
  },
  find: function(record, id) {
    $.getJSON(App.baseURL + "/people/1", {}, function(data) {
      Ember.run(function() {
        return record.load(data);
      });
    });
  }
});
