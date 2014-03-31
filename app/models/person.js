var attr = DS.attr;

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
    experiences: DS.hasMany('experience'),

    fullName: function() {
        return this.get('firstName') + ' ' + this.get('lastName');
    }.property('firstName', 'lastName'),

    profileImage: function() {
        if(Em.isEmpty(this.get('pictureUrl'))) {
            // URL for a general user pic from avatar service
            return "http://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y&d=mm&s=150";
        }
        return this.get('pictureUrl');
    }.property('pictureUrl')
});
