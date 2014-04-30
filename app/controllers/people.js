import Pagination from 'appkit/mixins/pagination';
import Columns from 'appkit/mixins/columns';

export default Em.ArrayController.extend(Pagination, Columns, {
  perPage: 10,
  page: 1,
  modelType: 'person'
});
