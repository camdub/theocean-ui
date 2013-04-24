App.Search = Em.Object.extend({});

App.Search.reopenClass({
  filter: function(filters) {
    var postData = [];
    filters.forEach(function(filter) {
      postData.push({"name":filter});
    });
    return $.post('http://theocean.apiary.io/search/filter', postData);
  }
});