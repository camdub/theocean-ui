App.SearchFilterController = Em.Controller.extend({
	filters: new Ember.Set(),
	people: [],
	projects: [],

	filters_array: function() {
		return this.get('filters').toArray();
	}.property('filters.[]'),

	people_total: function() {
		return this.get('people').length;
	}.property('people.@each'),

	projects_total: function() {
		return this.get('projects').length;
	}.property('projects.@each'),

	removeFilter: function(item) {
		this.get('filters').remove(item.toString());
	}
});