'use strict';

describe('Filter: selectedFields', function () {

  // load the filter's module
  beforeEach(module('sigmaNgApp'));

  // initialize a new instance of the filter before each test
  var selectedFields;
  beforeEach(inject(function ($filter) {
    selectedFields = $filter('selectedFields');
  }));

  it('should return the input prefixed with "selectedFields filter:"', function () {
    var text = 'angularjs';
    expect(selectedFields(text)).toBe('selectedFields filter: ' + text);
  });

});
