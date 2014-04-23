var env = window.ENV;

export default Em.Object.extend({

  close: function(session) {
    this.store.deleteRecord(session.get('currentUser'));
    this.store.deleteRecord(this.store.all('session').get('firstObject'));
    return Em.RSVP.resolve();
  },

  open: function () {
    var auth = this;
    var authService = this.container.lookup('service:azure');
    var authToken = this.get('authToken');

    // if a token exists, use that to create a session,
    // otherwise authenticate via the service
    if(!Em.isEmpty(authToken)) {
      return authService.getUser(authToken).then(function(userData) {
        return auth.createSessionRecords(userData, auth, authToken).get('user');
      });
    }
    else {
      return authService.open().then(function(accessToken) {

        return authService.getUser(accessToken).then(function(userData) {
          auth.set('authToken', accessToken);
          var session = auth.createSessionRecords(userData, auth, accessToken);
          return session.get('user');
        });
      });
    }
  },

  createSessionRecords: function(userData, auth, token) {
    var store = auth.get('store');
    var user = store.push('person', userData);
    return store.createRecord('session', {
      user: user,
      key: token
    });
  },

  authToken: function (key, value) {
    // setter with expiration of 1 month
    var record;
    if(arguments.length > 1) {
      if(Em.isEmpty(value)) {
        localStorage.removeItem(key);
      } else {
        var expiration = new Date().getTime() + env.TOKEN_EXPIRATION;
        record = { authToken: value, timeStamp: expiration };
        localStorage.setItem(key, JSON.stringify(record));
      }
    // getter
    } else {
      record = JSON.parse(localStorage.getItem(key));
      if(record && new Date().getTime() < record.timeStamp) {
        return record.authToken;
      }
      else {
        localStorage.removeItem(key);
        return '';
      }
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
