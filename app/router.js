var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances
Router.reopen({ location: 'history' });

Router.map(function() {
  this.route('search');
  this.route('login');
  this.route('person', { path: '/people/:person_id' });
  this.resource('client', { path: '/clients/:client_id' }, function() {
    this.resource('project', { path: '/projects/:project_id' });
  });
});

export default Router;
