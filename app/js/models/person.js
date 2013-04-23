attr = Ember.attr;

App.Person = Ember.Model.extend({
  id: attr(),
  firstName: attr(),
  lastName: attr(),
  level: attr(),
  location: attr(),

  first_name: function() {
    return this.get('firstName') + ' ' + this.get('lastName');    
  }.property('firstName', 'lastName')

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