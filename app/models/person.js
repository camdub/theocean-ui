var attr = DS.attr;

export default DS.Model.extend({
    firstName: attr('string'),
    lastName: attr('string'),
    level: attr('string'),
    location: attr('string'),
    active: attr('boolean'),
    phone: attr('string'),
    hireDate: attr('date'),
    email: attr('string'),
    pictureUrl: attr('string'),

    fullName: function() {
        return this.get('firstName') + ' ' + this.get('lastName');
    }.property('firstName', 'lastName')
});
