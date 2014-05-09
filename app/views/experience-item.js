export default Em.View.extend({
  //classNameBindings: ['isSelected:active'],
  isSelected: false,
  id: Em.computed.alias('content.industry.id'),

  // TODO: remove accordions and remove the jquery
  filterChange: function() {
    if(this.get('controller.filters').contains(this.get('id'))) {
      this.set('isSelected', true);
      this.$('div.panel-heading').addClass('active');
    }
    else {
      this.set('isSelected', false);
      this.$('div.panel-heading').removeClass('active');
    }
  }.observes('controller.filters.@each'),
});
