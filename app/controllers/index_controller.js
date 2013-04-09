App.IndexController = Em.ArrayController.extend({
  search: function(value, context) {
    if(value === '') { // clear the textbox
      context.set('content', []);
    }
    else {
      console.time('search');
      var ids = App.inx.search(value).map(function(obj) {
        return parseInt(obj.ref, 10)
      });
      console.timeEnd('search');
      context.set('content', this.content.filter(function(item) {
        return ids.contains(parseInt(item.id, 10));
      }));
    }
  }
});
