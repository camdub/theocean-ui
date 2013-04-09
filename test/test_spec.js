var should = require('chai').should();

describe('Array', function() {
  describe('#add()', function() {
    it('should add two numbers together', function() {
      var num1 = 2;
      var num2 = 4;
      (num1 + num2).should.equal(6);
    });
  });
});
