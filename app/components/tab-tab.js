export default Em.Component.extend({
  tagName: 'li',

  classNames: ['nav-tab'],

  classNameBindings: ['isActive:active'],

  isActive: function() {
    return this.get('paneId') === this.get('parentView.activePaneId');
  }.property('paneId', 'parentView.activePaneId'),

  click: function() {
    this.get('parentView').setActivePane(this.get('paneId'));
  }

});
