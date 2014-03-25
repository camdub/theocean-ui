export default Em.Object.extend({
  open: function () {
    var auth = this;
    var authService = this.container.lookup('service:azure');

    return authService.open().then(function(accessToken) {
      return authService.getUser(accessToken).then(function(userData) {
        var user = auth.get('store').createRecord('user', userData);
        var session = auth.get('store').createRecord('session', {
          user: user,
          key: accessToken
        });
        auth.set('authToken', accessToken);
        debugger
        return session.get('user');
      });
    });
  },

  authToken: function (key, value) {
    // setter
    if(arguments.length > 1) {
      if(Em.isEmpty(value)) {
        localStorage.removeItem("authToken");
      } else {
        localStorage.setItem("authToken", value);
      }
    // getter
    } else {
      localStorage.getItem("authToken");
    }
  }.property(),

  readAccessToken: function () {
    var access_token, match,
        regex = /key=([^&]*)/,
        hash = window.location.search;

    if(window.location.search) {
      if(match = hash.match(regex)) {
        return match[1];
      }
    }
  }
});
