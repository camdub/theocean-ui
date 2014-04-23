import { test, moduleForComponent } from 'ember-qunit';
import compile from 'appkit/tests/helpers/utils';

moduleForComponent('tab-view', 'Unit - TabView', {
  needs: ['component:tab-pane','component:tab-tab']
});

test('renders tabs', function() {
  expect(2);

  var component = this.subject({
    template: function() {/*
      {{#tab-view}}
        {{#tab-pane name="Test1" count="4"}}
          Tab content
        {{/tab-pane}}
      {{/tab-view}}
    */}.compile()
  });
  var $component = this.append();
  equal($component.find('li a:contains("Test1")').length, 1);
  equal($component.find('li a span:contains("4")').length, 1);
});
