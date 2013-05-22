Ember.debounce = function(func, wait, immediate) {
  var timeout, result;
  timeout = result = null;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) {
        return result = func.apply(context, args);
      }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
    }
    return result;
  };
};

Ember.slugify = function(value) {
  if($.isArray(value)) {
    return value.map(function(item) {
      return Ember._slugify(item);
    }); 
  }
  else {
    return Ember._slugify(value);
  }
};

Ember._slugify = function(value) {
  return value
      .toLowerCase()
      .replace(/[^\w ]+/g,'')
      .replace(/ +/g,'-');
};
