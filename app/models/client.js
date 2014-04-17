var attr = DS.attr,
    hasMany = DS.hasMany;

export default DS.Model.extend({
    name: attr('string'),
    logoUrl: attr('string'),
    industry: attr('string'),
    projects: hasMany('project')
});
