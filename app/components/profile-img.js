// TODO: Resource interpreted as Image but transferred with MIME type text/html
export default Em.Component.extend({
  didInsertElement: function() {
    var image = this.get('image');
    if(image !== '') {
      var img = new Image();
      var _this = this;
      img.onload = function() {
        _this.$('.profile-img img').replaceWith(img);
      };
      img.src = image;
    }
  }
});
