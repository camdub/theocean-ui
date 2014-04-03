export default Em.Component.extend({
  tagName: 'li',
  classNameBindings: ['isCurrent:active'],
  isCurrent: function() {
    return this.get('currentPage') === this.get('page');
  }.property('currentPage', 'page'),

  actions: {
    pageClicked: function() {
      this.get('parentView').send('goToPage', this.get('page'));
    }
  }
});
