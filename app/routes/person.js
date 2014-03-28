export default Em.Route.extend({
    afterModel: function(person, transition) {
        if(Em.isEmpty(person.get('phone')))
            return person.reload();
        return person;
    }
});
