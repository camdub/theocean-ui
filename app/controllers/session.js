export default Em.Object.extend({
  isAuthenticated: null,
  isAuthenticating: false,
  currentUser: null,
  afterRedirect: null,

  open: function() {
    var session = this;
    this.set("isAuthenticating", true);
    return this.get("adapter").open(this);
    // .then(function(user) {
    //   session.setProperties({
    //     isAuthenticated: !0,
    //     currentUser: user
    //   });
    //   return user;
    // }).catch (function(err) {
    //   return "canceled" === err ? undefined : Ember.RSVP.reject(err);
    // }).finally(function () {
    //   session.set("isAuthenticating", false);
    // });
  }
});
