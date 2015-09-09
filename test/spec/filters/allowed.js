'use strict';

describe('Filter: allowed', function () {

  // load the filter's module
  beforeEach(module('ui.konga'));

  // initialize a new instance of the filter before each test
  var allowed;
  beforeEach(inject(function ($filter) {
    allowed = $filter('allowed');
  }));

  it('should return the input prefixed with "allowed filter:"', function () {
    var text = 'angularjs';
    expect(allowed(text)).toBe('allowed filter: ' + text);
  });

});
