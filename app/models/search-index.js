import ajax from 'appkit/utils/ajax';
var env = window.ENV;

export default Em.Object.extend({
  setup: function() {
    var data = '';
    if(!localStorage.getItem('searchterms') || this._isOld()) {
      var url = env.serviceUrl + '/searchterms?accesskey=',
          token = JSON.parse(localStorage['authToken']).authToken,
          _this = this;

      ajax(url + token).then(function(data) {
        _this._populateData(data.searchTerms);
        localStorage['searchterms'] = JSON.stringify(data.searchTerms);
        localStorage['lastCache'] = moment().toString();
      });
    } else {
      data = JSON.parse(localStorage['searchterms']);
      this._populateData(data);
    }
  },

  _isOld: function() {
    var lastCache = moment(localStorage['lastCache']);
    if(lastCache === undefined) { return true; }
    return lastCache < moment();
  },

  _populateData: function(data) {
    var idx = this.get('index'),
        map = this.get('terms');

    data.forEach(function(item) {
      idx.add(item);
      map.set(item.id, item);
    });
  }
});
