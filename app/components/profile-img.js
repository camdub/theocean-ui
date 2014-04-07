// TODO: Resource interpreted as Image but transferred with MIME type text/html
export default Em.Component.extend({
  didInsertElement: function() {
    var image = this.get('image');
    if(image !== '') {
      var img = new Image();
      var selector = this.$('.profile-img img');
      img.onload = function() {
        // make sure this component is still in DOM
        if(selector)
          selector.replaceWith(img);
      };
      img.src = image;
    }
  }
});
