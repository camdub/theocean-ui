App.Router.map(function() {
	// url: /search
	this.resource('search', function() {
		// url: /search/filter
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
		selectSearchItem: function(filterName) {
			this.controllerFor('searchFilter').get('filters').push(filterName);
			this.transitionTo('search.filter');
		}
	}
});

App.SearchFilterRoute = Em.Route.extend({
	setupController: function(controller) {
		this._super(controller);
		// get filters
		var postdata = [];
		controller.get('filters').forEach(function(filter) {
			postdata.push({"name":filter});
		});

		// return results from /search/filter POST
		var post = $.post('http://theocean.apiary.io/search/filter', 
			postdata).then(
				function(data) {
					controller.set('people', data.results.people);
					controller.set('projects', data.results.projects);
				}
			);
	},
	events: {
		selectSearchItem: function(term) {
			this.controller.get('filters').push(term);
		}
	}
});
