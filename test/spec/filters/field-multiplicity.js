'use strict';

describe('Filter: fieldMultiplicity', function () {

  // load the filter's module
  beforeEach(module('ui.konga'));

  // initialize a new instance of the filter before each test
  var fieldMultiplicity;
  beforeEach(inject(function ($filter) {
    fieldMultiplicity = $filter('fieldMultiplicity');
  }));

  it('should return the input prefixed with "fieldMultiplicity filter:"', function () {
    var text = 'angularjs';
    expect(fieldMultiplicity(text)).toBe('fieldMultiplicity filter: ' + text);
  });

});
