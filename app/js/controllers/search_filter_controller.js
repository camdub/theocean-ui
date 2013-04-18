App.SearchFilterController = Em.Controller.extend({
	filters: [],
	people: [],
	projects: [],

	people_total: function() {
		return this.get('people').length;
	}.property('people.@each'),

	projects_total: function() {
		return this.get('projects').length;
	}.property('projects.@each'),

	removeFilter: function(item) {
		this.set('filters', this.get('filters').filter(function(filter) {
			item.toString() !== filter;
		}));
	}
});