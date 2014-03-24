var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances
Router.reopen({ location: 'history' });

Router.map(function() {
  this.route('search');
});

export default Router;
