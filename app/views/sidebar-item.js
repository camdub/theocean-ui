export default Em.View.extend({
  tagName: 'li',
  classNameBindings: ['isSelected:active'],

  isSelected: function() {
    return this.get('controller.filters').contains(this.get('content.id'));
  }.property('controller.filters.@each')
});
