export default Ember.Route.extend({
  actions: {
    login: function() {
      this.get('session').open();
    }
  }
});
