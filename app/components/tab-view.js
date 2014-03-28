export default Em.Component.extend({
  classNames: ['tab-view'],

  activePaneId: null,

  didInsertElement: function() {
    this.set('panes', []);
  },

  setActivePane: function(paneId) {
    if (this.get('activePaneId') !== null) {
      if (paneId !== this.get('activePaneId')) {
        this.set('activePaneId', paneId);
      }
    } else {
      this.set('activePaneId', paneId);
    }
  }

});
