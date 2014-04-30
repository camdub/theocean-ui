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
        session.analyticsUserInit(user);
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

  analyticsUserInit: function(user) {
    var date = new Date();
    mixpanel.identify(user.get('id'));
    mixpanel.people.set({
      '$first_name' : user.get('firstName'),
      '$last_name' : user.get('lastName'),
      'last_login' : date.toISOString(),
      'cohort_level' : user.get('level'),
      'office' : user.get('location'),
      '$email' : user.get('email')
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
