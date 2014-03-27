export default DS.Model.extend({
  user: DS.belongsTo('person', { async: true }),
  key: DS.attr('string')
});
