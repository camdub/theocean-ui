// default is just the year (2014). Takes any moment.js date format str
export default Ember.Handlebars.makeBoundHelper(function(date, options) {
  if(options) {
    var format = options.hash.format;
  }
  var momDate = moment(date);
  if(format) {
    return momDate.format(format);
  }
  return momDate.format('YYYY');
});
