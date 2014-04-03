export default Em.Mixin.create({
  pages: function() {
    var pages = parseInt(this.get('total') / this.get('perPage'));
    if(this.get('content.length') % this.get('perPage') > 0)
      pages++;
    return pages;
  }.property('perPage', 'content.[]'),

  paginatedContent: function() {
    var start = (this.get('page') - 1) * this.get('perPage'),
        end = this.get('page') * this.get('perPage');

    return this.get('content').slice(start, end);
  }.property('content.[]', 'page', 'perPage')
});
