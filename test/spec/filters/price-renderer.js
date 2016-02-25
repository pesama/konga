'use strict';

describe('Filter: priceRenderer', function () {

  // load the filter's module
  beforeEach(module('kongaApp'));

  // initialize a new instance of the filter before each test
  var priceRenderer;
  beforeEach(inject(function ($filter) {
    priceRenderer = $filter('priceRenderer');
  }));

  it('should return the input prefixed with "priceRenderer filter:"', function () {
    var text = 'angularjs';
    expect(priceRenderer(text)).toBe('priceRenderer filter: ' + text);
  });

});
