export default Em.Object.extend({
  open: function () {
    var auth = this;
    var authService = this.container.lookup('service:azure');

    return authService.open().then(function(data) {
      console.log(data);
      debugger
      authService.getUser(data).then(function(user) {
        debugger
      });
    });
  },

  authToken: function (a, c) {
    // setter
    if(arguments.length > 1) {
      if(Em.isEmpty(c)) {
        localStorage.removeItem("authToken");
      } else {
        localStorage.setItem("authToken", c);
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
