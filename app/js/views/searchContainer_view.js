require('views/searchResults_view');
require('views/searchInput_view');

App.SearchContainerView = Em.ContainerView.extend({
  content: null,
  childViews: ['inputView', 'resultView'],
  selected: null,

  inputView: App.SearchInputView,
  resultView: App.SearchResultsView

});
