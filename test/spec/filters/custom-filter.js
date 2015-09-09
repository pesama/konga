'use strict';

describe('Filter: customFilter', function () {

  // load the filter's module
  beforeEach(module('ui.konga'));

  // initialize a new instance of the filter before each test
  var customFilter;
  beforeEach(inject(function ($filter) {
    customFilter = $filter('customFilter');
  }));

  it('should return the input prefixed with "customFilter filter:"', function () {
    var text = 'angularjs';
    expect(customFilter(text)).toBe('customFilter filter: ' + text);
  });

});
