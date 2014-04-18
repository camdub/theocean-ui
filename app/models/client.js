var attr = DS.attr,
	env = window.ENV,
    hasMany = DS.hasMany;

export default DS.Model.extend({
    name: attr('string'),
    logoUrl: attr('string'),
    industry: attr('string'),
    projects: hasMany('project'),
    clientLogo: function() {
        if(Em.isEmpty(this.get('logoUrl'))) {
            return '/assets/images/default-client.png';
        }
        return env.serviceUrl + this.get('logoUrl');
    }.property('logoUrl')
});
