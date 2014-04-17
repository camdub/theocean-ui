export default DS.RESTSerializer.extend({
  extractSingle: function(store, type, payload, id, requestType) {
    var projects = payload.projects;

    projects.forEach(function(project) {
      project.client = payload.id;
    });
    payload.projects = projects.mapBy('id');
    payload = { client: payload, projects: projects };
    return this._super(store, type, payload, id, requestType);
  }
});
