var attr = DS.attr;

export default DS.Model.extend({
    id: attr('string'),
    firstName: attr('string'),
    lastName: attr('string'),
    level: attr('string'),
    location: attr('string'),
    active: attr('boolean'),
    phone: attr('string'),
    hireDate: attr('date'),
    email: attr('string'),
});
