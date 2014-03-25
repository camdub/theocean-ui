export default DS.Model.extend({
    user: DS.belongsTo('user', { async: true }),
    key: DS.attr('string')
});
