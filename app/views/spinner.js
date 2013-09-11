var SpinnerView = Em.View.extend({
  didInsertElement: function() {
    this.spinner = new Spinner({
      lines: 9,
      length: 0,
      width: 14,
      radius: 24,
      corders: 1,
      color: '#aaa'
    }).spin(this.$()[0]);
  }
});

export default SpinnerView;