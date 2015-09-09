'use strict';

describe('Filter: priceWithPolicy', function () {

  // load the filter's module
  beforeEach(module('ui.konga'));

  // initialize a new instance of the filter before each test
  var priceWithPolicy;
  beforeEach(inject(function ($filter) {
    priceWithPolicy = $filter('priceWithPolicy');
  }));

  it('should return the input prefixed with "priceWithPolicy filter:"', function () {
    var text = 'angularjs';
    expect(priceWithPolicy(text)).toBe('priceWithPolicy filter: ' + text);
  });

});
