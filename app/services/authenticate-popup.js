export default Em.Object.extend({

  closeExistingWindow: function () {
    if(this.popup && !this.popup.closed) {
      $(window).off("message", this.boundMessageHandler);
      this.popup.close();
      this.popup = null;
    }
  },

  rejectExistingDeferred: function(status) {
    if(this.deferred) {
      this.deferred.reject(status);
      this.deferred = null;
    }
  },

  resolveExistingDeferred: function(status) {
    if(this.deferred) {
      this.deferred.resolve(status);
      this.deferred = null;
    }
  },

  generateNewDeferred: function() {
    this.deferred = Ember.RSVP.defer();
    return this.deferred;
  },

  open: function(url, options) {
    this.closeExistingWindow();
    this.rejectExistingDeferred("canceled");
    var deferred = this.generateNewDeferred(),
        defaultedOptions = this.applyDefaultOptions(options);
    this.popup = window.open(url, "authentication", this.parameterize(defaultedOptions));

    if(this.popup) {
      this.popup.focus();
      $(window).on("message", this.boundMessageHandler);
    }
    else {
      this.rejectExistingDeferred("failed to open popup");
    }
    return deferred.promise;
  },

  applyDefaultOptions: function(options) {
    var w = options.width || 500,
        h = options.height || 500;
    return $.merge({
        left: window.screen.width / 2 - w / 2,
        top: window.screen.height / 2 - h / 2,
        height: h,
        width: w
    }, options);
  },

  parameterize: function(options) {
    var result = '';
    Object.keys(options).forEach(function(opt) {
      result += opt + '=' + options[opt] + ',';
    });
    return result;
  },

  createBoundMessageHandler: function () {
    this.boundMessageHandler = function (event) {
      var matches, message = event.originalEvent.data;
      if(!message || !(matches = message.match(/^setAccessToken:(.*)/))) {
        return;
      }
      if(matches[1]) {
        Em.run(this, function() {
          this.closeExistingWindow();
          this.resolveExistingDeferred(matches[1]);
        });
      }
    }.bind(this);
  }.on("init")

});
