Ember.Handlebars.registerHelper('filterable', function(filter, type, options) {
  if(filter.type === 'person' || filter.type === 'client') {
    return filter.name;
  }
  else {
    return "filterable " + filter.name;
  }
});