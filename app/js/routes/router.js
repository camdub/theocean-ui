App.Router.map(function() {
	this.resource('search', function() {
		this.route('filter');
	});
});
App.Router.reopen({
	//location: 'history'
});

App.IndexRoute = Em.Route.extend({
	redirect: function() {
		this.transitionTo('search');
	}
})

App.SearchRoute = Em.Route.extend({
  model: function() {
    return json;
  },
  events: {
  	 	selectSearchItem: function(e) {
  			this.transitionTo('search.filter');
  		}
  }
});

App.SearchFilterRoute = Em.Route.extend({
	events: {
		selectSearchItem: function(e) {
			console.log(e);
		}
	}
});
