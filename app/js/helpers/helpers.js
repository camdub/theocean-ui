Ember.Handlebars.registerHelper('filterable', function(filter, type, options) {
  if(filter.type === 'person' || filter.type === 'client') {
    return filter.name;
  }
  else {
    return "filterable " + filter.name;
  }
});

var get = Ember.get,
    set = Ember.set;

Ember.Handlebars.registerBoundHelper('displayHelper', function(searchPath, options) {
  return new Handlebars.SafeString(this.get('name'));
});