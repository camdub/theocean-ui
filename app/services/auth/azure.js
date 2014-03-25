var env = window.ENV;
import ajax from 'appkit/utils/ajax';

export default Em.Object.extend({
  open: function() {
    return this.login();
  },

  login: function() {
    var url = env.authUrl + '&callback=' + encodeURIComponent(env.authCallback);
    return this.get('popup').open(url, {});
  },

  getUser: function(accessToken) {
    var userUrl = env.serviceUrl + '/user?accesskey=' + accessToken;
    return ic.ajax(userUrl);
  }

});
