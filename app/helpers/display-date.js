// TODO: get moment to require as a module
export default Ember.Handlebars.makeBoundHelper(function(date) {
  return moment(date).format('YYYY');
});
