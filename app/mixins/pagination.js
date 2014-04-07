export default Em.Mixin.create({
  pages: function() {
    if(this.get('length') === 0) return 0;
    var pages = parseInt(this.get('total') / this.get('perPage'));
    if(this.get('total') % this.get('perPage') > 0)
      pages++;
    return pages;
  }.property('perPage', 'content.[]'),

  paginatedContent: function() {
    var start = (this.get('page') - 1) * this.get('perPage'),
        end = this.get('page') * this.get('perPage');

    if(this.get('length') === start)
      this.getNextPage(start);

    return this.get('content').slice(start, end);
  }.property('content.[]', 'page', 'perPage'),

  search: function(params) {
    params.limit = this.get('limit');

    this.searchReset();
    this.set('params', params);
    console.time('getNext');
    this.set('results', this.store.find(this.get('modelType'), params));
  },

  searchReset: function() {
    this.get('content').clear();
    this.set('page', 1);
  },

  limit: function() {
    return this.get('perPage') * 2;
  }.property('perPage'),

  total: function() {
    return this.store.metadataFor(this.get('modelType')).total;
  }.property('content.[]'),

  length: Em.computed.alias('content.length'),

  getNextPage: function(offset) {
    var params = this.get('params');
    console.time('getNext');

    params.offset = offset;
    this.set('results', this.store.find(this.get('modelType'), params));
  },

  // the store.find method returns immutable arrays, we
  // use this to observe a record holding array
  resultsLoaded: function(sender, key) {
    if(sender.get(key)) {
      console.timeEnd('getNext');
      this.get('content').pushObjects(this.get('results').toArray());
    }
  }.observes('results.length')
});
