export default DS.RESTSerializer.extend({
  extractMeta: function(store, type, payload) {
    if(!Em.isEmpty(payload.clients)) {
      store.metaForType(type, {
        total: payload.total,
        offset: payload.offset,
        limit: payload.limit
      });
    }
    delete payload.total;
    delete payload.offset;
    delete payload.limit;
  },

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
