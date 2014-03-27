var get = Ember.get,
    set = Ember.set,
    setEach = Ember.setEach,
    addObserver = Ember.addObserver,
    removeObserver = Ember.removeObserver;

export default Em.Component.extend({

  classNameBindings: [':autosuggest'],
  minChars: 0,
  searchPath: 'name',
  query: null,
  selectionIndex: -1,
  focused: false,
  displayResults: [],

  didInsertElement: function(){
    Ember.assert('You must supply a source for the autosuggest component', get(this, 'source'));
    Ember.assert('You must supply a destination for the autosuggest component', get(this, 'destination'));

    this.$('ul.suggestions').on('mouseover', 'li', this.mouseOver.bind(this));
    this.$('ul.suggestions').on('mouseout', 'li', this.mouseOut.bind(this));
  },

  willDestroyElement: function() {
    this.$('ul.suggestions').off('mouseover', 'li', this.mouseOver.bind(this));
    this.$('ul.suggestions').off('mouseout', 'li', this.mouseOut.bind(this));
  },

  hasQuery: function(){
    var query = get(this, 'query');

    if(query && query.length > get(this, 'minChars')){
      return true;
    }

    return false;
  }.property('query'),

  queryDidChange: function(){
    var query = get(this, 'query'),
    displayResults = get(this, 'displayResults'),
    hasQuery = get(this, 'hasQuery'),
    self = this;

    if(!hasQuery){
      set(this, 'selectionIndex', -1);
      displayResults.clear();
      return;
    }

    this.processResults(query, this.get('source'));
  }.observes('query'),

  processResults: function(query, source){
    var self = this,
    displayResults = get(this, 'displayResults');

    displayResults.clear();
    var results = this.get('source').search(query);
    if(results.length === 0) {
      return;
    }

    displayResults.pushObjects(results);

    this.set('selectionIndex', -1);
    this.moveSelection('down');
  },


  actions: {
    addSelection: function(selection){
      set(this, 'query', '');
      if(!this.get('destination').contains(selection)) {
        get(this, 'destination').pushObject(selection);
      }
      set(this, 'selectionIndex', -1);
    },
    removeSelection: function(item){
      get(this, 'destination').removeObject(item);
    },

    hideResults: function(){
      var displayResults = get(this, 'displayResults');

      set(this, 'selectionIndex', -1);

      this.set('query', '');
      this.$('.results').addClass('hdn');
    },

    removeOnBackspace: function() {
      // called before the actual backspace happens
      if(this.get('query') === '') {
        var filters = this.get('destination');
        this.set('destination', filters.slice(0, -1));
      }
    }
  },

  moveSelection: function(direction){
    var selectionIndex = get(this, 'selectionIndex'),
    isUp = direction === 'up',
    isDown = !isUp,
    displayResults = get(this, 'displayResults'),
    displayResultsLength = get(displayResults, 'length'),
    searchPath = get(this, 'searchPath'),
    hoverEl;

    displayResults.setEach('active', false);

    if(!displayResultsLength){
      set(this, 'selectionIndex', -1);
      return;
    }

    hoverEl = this.$('li.result.hover');

    if(hoverEl.length){
      var text = Ember.$('.term', hoverEl).text(),
      selected = displayResults.find(function(item){
        return get(item, searchPath) === text;
      });

      selectionIndex = displayResults.indexOf(selected);
      this.$('ul.suggestions li').removeClass('hover');
      this.$('input.autosuggest').focus();
    }

    if(isUp && selectionIndex <= 0){
      selectionIndex =  0;
    }
    else if(isDown && selectionIndex === displayResultsLength -1){
      selectionIndex = displayResultsLength -1;
    }else if(isDown){
      selectionIndex++;
    }else{
      selectionIndex--;
    }

    var active = get(this, 'displayResults').objectAt(selectionIndex);
    set(this, 'selectionIndex', selectionIndex);
    set(active, 'active', true);
  },

  selectActive: function(){
    var selectionIndex = get(this, 'selectionIndex'),
    displayResultsLength = get(this, 'displayResults.length');

    if(!displayResultsLength){
      return;
    }

    var active = get(this, 'displayResults').find(function(item){
      return get(item, 'active');
    });

    if(!active){
      return;
    }

    this.send('addSelection', active);
  },

  /* ------- EVENTS ------- */

  mouseOver: function(evt){
    var el = this.$(evt.target);

    var active = get(this, 'displayResults').filter(function(item){
      return get(item, 'active');
    });

    if(active || active.length){
      active.setEach('active', false);
      set(this, 'selectionIndex', -1);
    }

    if(el.hasClass('no-results')){
      return;
    }

    this.$('ul.suggestions li').removeClass('hover');

    var prop = el.prop('tagName').toLowerCase();
    if(prop === 'span' || prop === 'a') {
      el = el.parents('li.result');
    }
    el.addClass('hover');
  },

  focusOut: function(evt) {
    //this.send('hideResults');
    this.set('focused', false);
  },

  focusIn: function(evt) {
    this.set('focused', true);
  },

  click: function(evt) {
    this.get('childViews')[0].$().focus();
  },

  mouseOut: function(evt){
    var target = $(evt.target);
    this.$('ul.suggestions li').removeClass('hover');
  },

  autosuggest: Ember.TextField.extend({
    KEY_DOWN: 40,
    KEY_UP: 38,
    COMMA: 188,
    TAB: 9,
    ENTER: 13,
    ESCAPE: 27,
    BACKSPACE: 8,
    placeholder: 'Search. . .',

    init: function(){
      this._super.apply(this, arguments);

      var allowedKeyCodes = Ember.A([
        this.KEY_UP,
        this.KEY_DOWN,
        this.COMMA,
        this.TAB,
        this.ENTER,
        this.ESCAPE,
        this.BACKSPACE
      ]);
      this.set('allowedKeyCodes', allowedKeyCodes);
    },

    keyDown: function(e){
      var keyCode = e.keyCode;

      if(!this.get('allowedKeyCodes').contains(keyCode)){
        return;
      }

      var controller = this.get('parentView');

      switch(keyCode){
        case this.KEY_UP:
          controller.moveSelection('up');
          break;
        case this.KEY_DOWN:
          controller.moveSelection('down');
          break;
        case this.ENTER:
          controller.selectActive();
          break;
        case this.ESCAPE:
          controller.send('hideResults');
          break;
        case this.BACKSPACE:
          controller.send('removeOnBackspace');
          break;
        default:
          console.log(keyCode);
      }
    },
  })
});
