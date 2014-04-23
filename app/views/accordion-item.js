export default Em.View.extend({
  defaultTemplate: Ember.Handlebars.compile('{{view.content}}'),
  layoutName: 'components/accordion-layout',
  classNames: 'panel panel-ocean',
  title: function() {
    return this.get('project.name');
  }.property('project'),
  project: null,
  index: 0,
  isActive: false,
  content: Ember.computed.alias('parentView.content'),
  isActiveDidChange: Ember.observer(function() {
    this.set('isActive', this.get('parentView.activeIndex') === this.get('index'));
    if (this.get('isActive')) {
      return this.show();
    } else {
      return this.hide();
    }
  }, 'parentView.activeIndex'),
  didInsertElement: function() {
    var index;
    index = this.get('parentView').$('.panel').index(this.$());
    this.set('index', index);
    return this.isActiveDidChange();
  },
  click: function() {
    if (this.get('isActive')) {
      return this.set('parentView.activeIndex', null);
    } else {
      return this.set('parentView.activeIndex', this.get('index'));
    }
  },
  hide: function() {
    var $accordionBody;
    $accordionBody = this.$('.panel-collapse');
    $accordionBody.height($accordionBody.height())[0].offsetHeight;
    $accordionBody.removeClass('collapse').removeClass('in').addClass('collapsing');
    return $accordionBody.height(0).one($.support.transition.end, (function(_this) {
      return function() {
        return $accordionBody.removeClass('collapsing').addClass('collapse');
      };
    })(this));
  },
  show: function() {
    var $accordionBody;
    $accordionBody = this.$('.panel-collapse');
    $accordionBody.removeClass('collapse').addClass('collapsing').height(0);
    $accordionBody.height($accordionBody[0]['scrollHeight']);
    return this.$().one($.support.transition.end, (function(_this) {
      return function() {
        return $accordionBody.removeClass('collapsing').addClass('in').height('auto');
      };
    })(this));
  }
});
