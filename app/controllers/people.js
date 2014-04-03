import PaginationMixin from 'appkit/mixins/pagination';

export default Em.ArrayController.extend(PaginationMixin, {
  perPage: 5,
  page: 1,
  total: function() {
    return this.store.metadataFor('person').total;
  }.property('content.[]')
});
