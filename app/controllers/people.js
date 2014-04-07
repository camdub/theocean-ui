import PaginationMixin from 'appkit/mixins/pagination';
import SearchMixin from 'appkit/mixins/search';

export default Em.ArrayController.extend(PaginationMixin, {
  perPage: 5,
  page: 1,
  modelType: 'person'
});
