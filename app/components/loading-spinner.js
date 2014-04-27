export default Em.Component.extend({
  lines    : 9, // The number of lines to draw
  length   : 0, // The length of each line
  width    : 23, // The line thickness
  radius   : 41, // The radius of the inner circle
  corners  : 1, // Corner roundness (0..1)
  rotate   : 0, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  color    : '#95a5a6', // 'concrete' color from flat ui
  speed    : 1, // Rounds per second
  trail    : 51, // Afterglow percentage
  shadow   : false, // Whether to render a shadow
  hwaccel  : false, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex   : 2e9, // The z-index (defaults to 2000000000)
  top      : '50%', // Top position relative to parent in px
  left     : '50%', // Left position relative to parent in px

  showSpinner: function() {
    var target = this.get('element');
    target = $('body')[0];
    this.spinner = new Spinner({
        lines    : this.get('lines'),
        length   : this.get('length'),
        width    : this.get('width'),
        radius   : this.get('radius'),
        corners  : this.get('corners'),
        rotate   : this.get('rotate'),
        direction: this.get('direction'),
        color    : this.get('color'),
        speed    : this.get('speed'),
        trail    : this.get('trail'),
        shadow   : this.get('shadow'),
        hwaccel  : this.get('hwaccel'),
        className: this.get('className'),
        zIndex   : this.get('zIndex'),
        top      : this.get('top'),
        left     : this.get('left')
    });
    this.spinner.spin(target);
  }.on('didInsertElement'),

  teardown: function() {
    this.spinner.stop();
  }.on('willDestroyElement')
});
