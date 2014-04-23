export default Em.Route.extend({
    afterModel: function(person, transition) {
        if(Em.isEmpty(person.get('experience')))
            return person.reload();
        return person;
    }
});
