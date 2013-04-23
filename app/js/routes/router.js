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
});

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
					var people = controller.get('people');
					data.results.people.map(function(person) {
						people.push(App.Person.create(person));
					});
					controller.set('projects', data.results.projects);
				}
			);
	},
	events: {
		selectSearchItem: function(term) {
			console.log(term);
			console.log(this.controller.get('filters'));
			this.controller.get('filters').add(term);
		}
	}
});
