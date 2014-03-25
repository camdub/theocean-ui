export default Em.Object.extend({
  isAuthenticated: null,
  isAuthenticating: false,
  currentUser: null,
  afterRedirect: null,

  open: function() {
    var session = this;
    this.set("isAuthenticating", true);
    return this.get("adapter").open(this)
      .then(function(user) {
        session.setProperties({
          isAuthenticated: true,
          currentUser: user
        });
        return user;
      }).catch (function(err) {
        return "canceled" === err ? undefined : Ember.RSVP.reject(err);
      }).finally(function () {
        session.set("isAuthenticating", false);
      });
  },

  close: function() {
    var session = this;
    return this.get('adapter').close(this).then(function() {
      session.setProperties({
        isAuthenticated: false,
        currentUser: null
      });
    });
  },

  checkToken: function() {
    return this.get('adapter').get('authToken');
  }
});
