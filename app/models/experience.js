var attr = DS.attr,
    belongsTo = DS.belongsTo;

export default DS.Model.extend({
    person: DS.belongsTo('person'),
    role: attr('string'),
    start: attr('isodate'),
    end: attr('isodate'),
    type: attr('string'),
	industry: attr(),
    project: belongsTo('project')
});
