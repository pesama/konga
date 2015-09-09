'use strict';

describe('Filter: custom/stepDependencies', function () {

  // load the filter's module
  beforeEach(module('presupuestorApp'));

  // initialize a new instance of the filter before each test
  var custom/stepDependencies;
  beforeEach(inject(function ($filter) {
    custom/stepDependencies = $filter('custom/stepDependencies');
  }));

  it('should return the input prefixed with "custom/stepDependencies filter:"', function () {
    var text = 'angularjs';
    expect(custom/stepDependencies(text)).toBe('custom/stepDependencies filter: ' + text);
  });

});
