import { test } from 'ember-qunit';
import displayDate from 'appkit/helpers/display-date';

module("Unit - Display Date helper");

test('helper displays the year by default', function() {
  var date = new Date(2014,1,1);
  var rendered = displayDate._rawFunction(date);
  equal(rendered, '2014');
});

test('helper returns formatted date by passed in string', function() {
  var date = new Date(2014, 1, 1);
  var rendered = displayDate._rawFunction(date, {hash: { format: 'LL'}});
  equal(rendered, 'February 1 2014');
})
