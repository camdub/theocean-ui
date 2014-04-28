import token from 'appkit/utils/get-token';

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
            return '';
        }
        return env.serviceUrl + this.get('logoUrl') + '?accesskey=' + token();
    }.property('logoUrl')
});
