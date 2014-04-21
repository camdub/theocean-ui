export default DS.RESTSerializer.extend({
    extractMeta: function(store, type, payload) {
      if(!Em.isEmpty(payload.people)) {
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
      var experience = payload.experience;
      var mentor = payload.mentor;

      var projects = [];
      var clients = [];
      experience.forEach(function(exp) {
        exp.person = payload.id;
        projects.push(exp.project);
        clients.push(exp.project.client);
        exp.project.client = exp.project.client.id;
        exp.project = exp.project.id;
      });

      payload = {
        person: payload.id,
        people: [ payload, mentor ],
        experience: experience,
        projects: projects,
        clients: clients
      };
      return this._super(store, type, payload, payload.people[0].id, requestType);
    },
    normalizeHash: {
      people: function(hash) {
        if(hash.mentor)
          hash.mentor = hash.mentor.id;
        if(hash.experience) {
          hash.experience = hash.experience.mapBy('id');
        }
        return hash;
      }
    }
});
