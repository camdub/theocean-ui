export default DS.RESTSerializer.extend({
  normalizeHash: {
    project: function(hash) {
      debugger
      hash.project = hash.project.id;
      hash.client = hash.client.id;
    }
  }
});
