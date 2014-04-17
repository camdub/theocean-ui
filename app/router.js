var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances
Router.reopen({ location: 'history' });

Router.map(function() {
  this.route('search');
  this.route('login');
  this.route('person', { path: '/people/:person_id' });
  this.route('client', { path: '/clients/:client_id' });
});

export default Router;
