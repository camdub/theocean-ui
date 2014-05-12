export default Em.ObjectController.extend({
  queryParams: ['filterString:filter'],
  filters: [],

  filterString: function(key, value, prev) {
    if(value) {
      this.set('filters', value.split(','));
    }
    return this.get('filters').join();
  }.property('filters.@each'),

  filteredExperience: function() {
    var exps = this.get('model.experience'),
        filters = this.get('filters');

    if(Em.isEmpty(filters)) {
      return exps;
    }
    return exps.filter(function(exp) {
      return filters.contains(exp.get('industry.id'));
    }, this);
  }.property('filters.@each'),

  showMatchBadge: function() {
    return this.get('filteredExperience.length') !== this.get('model.experience.length');
  }.property('filteredExperience', 'model.experience'),

  actions: {
    highlight: function(industry) {
      if(this.get('filters').contains(industry)) {
        this.get('filters').removeObject(industry);
      }
      else {
        this.get('filters').pushObject(industry);
      }
    }
  }
});
