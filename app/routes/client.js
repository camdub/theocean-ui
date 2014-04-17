export default Em.Route.extend({
  afterModel: function(client, transition) {
    if(Em.isEmpty(client.get('projects'))) {
      return client.reload();
    }
    return client;
  }
});
