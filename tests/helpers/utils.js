/*
  Allows you to compile templates by using comment strings:
    template: function() {//* ..template here.. *\/}.compile()

  Simply a conventience over string concatination.
*/
export default Function.prototype.compile = function() {
  var template = this.toString().split('\n').slice(1,-1).join('\n') + '\n';
  return Ember.Handlebars.compile(template);
};
