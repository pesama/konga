'use strict';

describe('Filter: custom/presupuestorFieldMapper', function () {

  // load the filter's module
  beforeEach(module('presupuestorApp'));

  // initialize a new instance of the filter before each test
  var custom/presupuestorFieldMapper;
  beforeEach(inject(function ($filter) {
    custom/presupuestorFieldMapper = $filter('custom/presupuestorFieldMapper');
  }));

  it('should return the input prefixed with "custom/presupuestorFieldMapper filter:"', function () {
    var text = 'angularjs';
    expect(custom/presupuestorFieldMapper(text)).toBe('custom/presupuestorFieldMapper filter: ' + text);
  });

});
