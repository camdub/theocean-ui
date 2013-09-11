import app from 'ocean/app';

var attr = Ember.attr;

var Person = Em.Model.extend({
  id: attr(),
  firstName: attr(),
  lastName: attr(),
  pictureUrl: attr(),
  level: attr(),
  active: attr(),
  phone: attr(),
  hireDate: attr(Date),
  email: attr()
});

Person.adapter = Em.Adapter.create({
  findAll: function(klass, records) {
    var url = app.baseURL + '/people?accesskey=' + app.key;
    return this._ajax(url, 'GET').then(function(data) {
      records.load(klass, data);
      return records;
    });
  },
  _ajax: function(url, params, method) {
    var settings = {
      url: url,
      method: method,
      dataType: 'json'
    };
    return Ember.$.ajax(settings);
  }
});

export default Person;