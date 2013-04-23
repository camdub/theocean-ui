Ember.debounce = function(func, wait, immediate) {
    var timeout, result;
    timeout = result = null;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) return result = func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) result = func.apply(context, args);
        return result;
    };
};

App.SearchController = Em.ArrayController.extend({
    search: Ember.debounce(function(value, context, _this) {
        if(value === '') { // clear the textbox
            context.set('content', []);
        }
        else {
            console.time('search');
            var ids = App.inx.search(value);
            ids = ids.map(function(obj) {
                return parseInt(obj.ref, 10);
            });
            console.timeEnd('search');
            context.set('content', _this.content.filter(function(item) {
                return ids.contains(parseInt(item.id, 10));
            }));
        }
    }, 300)
});
