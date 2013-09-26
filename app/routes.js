function Routes() {

  // all routes requiring login should be nested under the authenticated route
  this.resource('authenticated', { path: '/', queryParams: ['key'] }, function() {
    this.resource('search', { queryParams: ['filter'] });
  });

  // list all routes not requiring login here
  this.resource('login');
}

export default Routes;
