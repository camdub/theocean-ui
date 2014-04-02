// default is just the year (2014). Takes any moment.js date format str
export default Ember.Handlebars.makeBoundHelper(function(date, options) {
  var format = null;
  if(options) {
    format = options.hash.format;
  }
  var momDate = moment(date);
  if(format) {
    return momDate.format(format);
  }
  return momDate.format('YYYY');
});
