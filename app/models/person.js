import token from 'appkit/utils/get-token';

var attr = DS.attr,
    env = window.ENV;

export default DS.Model.extend({
    firstName: attr('string'),
    lastName: attr('string'),
    level: attr('string'),
    cohort: attr('string'),
    location: attr('string'),
    active: attr('boolean'),
    phone: attr('string'),
    school: attr('string'),
    hireDate: attr('isodate'),
    termDate: attr('isodate'),
    email: attr('string'),
    pictureUrl: attr('string'),
    industries: attr(), // pojo
    experience: DS.hasMany('experience'),
    mentor: DS.belongsTo('person'),

    fullName: function() {
        return this.get('firstName') + ' ' + this.get('lastName');
    }.property('firstName', 'lastName'),

    profileImage: function() {
        if(Em.isEmpty(this.get('pictureUrl'))) {
            return '';
        }
        return env.serviceUrl + this.get('pictureUrl') + '?accesskey=' + token();
    }.property('pictureUrl')
});
