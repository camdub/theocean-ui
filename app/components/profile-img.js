// TODO: Resource interpreted as Image but transferred with MIME type text/html
export default Em.Component.extend({

  classNameBindings: ['size', 'type'],
  type: null,

  defaultImg: function() {
    var path = '/assets/images/';
    var type = this.get('type');
    this.$().html('<img src="'+ path + type+ '.svg" />');
  },

  lazyLoad: function() {
    var image = this.get('image');
    this.defaultImg();

    if(image !== '') {
      var img = new Image();
      var selector = this.$('img');
      img.onload = function() {
        // make sure this component is still in DOM
        if(selector)
          selector.replaceWith(img);
      };
      img.src = image;
    }
  }.on('didInsertElement').observes('image')

});
