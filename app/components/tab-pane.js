export default Em.Component.extend({
  classNames: ['tab-pane'],

  classNameBindings: ['isActive:active'],

  isActive: function() {
    return this.get('elementId') === this.get('parentView.activePaneId');
  }.property('elementId', 'parentView.activePaneId'),

  pane: function() {
    return this.get('parentView.panes').filterBy('name', this.get('name'))[0];
  }.property('parentView.panes'),

  countChange: function() {
    this.get('pane').set('count', this.get('count'));
  }.observes('count'),

  didInsertElement: function() {
    this.get('parentView.panes').pushObject(Em.Object.create({
      paneId: this.get('elementId'),
      name: this.get('name'),
      count: this.get('count')
    }));

    if (this.get('parentView.activePaneId') === null) {
      this.get('parentView').setActivePane(this.get('elementId'));
    }
  }

});
