export default Em.Component.extend({
  classNames: ['tab-pane'],

  classNameBindings: ['isActive:active'],

  isActive: function() {
    return this.get('elementId') === this.get('parentView.activePaneId');
  }.property('elementId', 'parentView.activePaneId'),

  didInsertElement: function() {
    this.get('parentView.panes').pushObject(
      {
        paneId: this.get('elementId'),
        name: this.get('name'),
        count: this.get('count')
      });

    if (this.get('parentView.activePaneId') === null) {
      this.get('parentView').setActivePane(this.get('elementId'));
    }
  }

});
