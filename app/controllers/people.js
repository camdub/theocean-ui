import PaginationMixin from 'appkit/mixins/pagination';

export default Em.ArrayController.extend(PaginationMixin, {
  perPage: 10,
  page: 1,
  modelType: 'person'
});
