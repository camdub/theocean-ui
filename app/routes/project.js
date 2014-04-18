export default Em.Route.extend({
    afterModel: function(project, transition) {
        if(Em.isEmpty(project.get('summary')))
            return project.reload();
        return project;
    }
});
