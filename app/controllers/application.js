var ApplicationController = Em.Controller.extend({
  savedTransition: null,
  isLoggedIn: false,

  login: function() {
    this.setProperties({ savedTransition: null, isLoggedIn: false });
  }
});

export default ApplicationController;
