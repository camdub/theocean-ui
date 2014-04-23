var attr = DS.attr,
    belongsTo = DS.belongsTo,
    hasMany = DS.hasMany;

export default DS.Model.extend({
  name: attr('string'),
  tenroxProjectCode: attr('string'),
  start: attr('isodate'),
  end: attr('isodate'),
  summary: attr('string'),
  oic: belongsTo('person'),
  location: attr('string'),
  client: belongsTo('client'),
  people: hasMany('person')
});
