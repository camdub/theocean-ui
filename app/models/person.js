var attr = DS.attr,
    env = window.ENV;

export default DS.Model.extend({
    firstName: attr('string'),
    lastName: attr('string'),
    level: attr('string'),
    location: attr('string'),
    active: attr('boolean'),
    phone: attr('string'),
    hireDate: attr('isodate'),
    email: attr('string'),
    pictureUrl: attr('string'),
    experience: DS.hasMany('experience'),
    mentor: DS.belongsTo('person'),

    fullName: function() {
        return this.get('firstName') + ' ' + this.get('lastName');
    }.property('firstName', 'lastName'),

    profileImage: function() {
        if(Em.isEmpty(this.get('pictureUrl'))) {
            return '';
        }
        return env.serviceUrl + this.get('pictureUrl');
    }.property('pictureUrl')
});
