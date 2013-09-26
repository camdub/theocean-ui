var AuthenticatedRoute = Em.Route.extend({
  beforeModel: function(queryParams, transition) {
    var applicationController = this.controllerFor('application');
    if(queryParams.hasOwnProperty('key')) {
      localStorage.setItem('key', queryParams.key);
      var appController = window.opener.App.__container__.lookup('controller:application');
      appController.get('savedTransition').retry();
      window.close();
    }
    else if(localStorage.getItem('key') === null) {
      applicationController.set('savedTransition', transition);
      this.transitionTo('login');
      OAuth.authorize();
    }
    else {
      applicationController.login();
    }
  }
});

export default AuthenticatedRoute;
