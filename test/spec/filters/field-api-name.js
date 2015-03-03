'use strict';

describe('Filter: fieldApiName', function () {

  // load the filter's module
  beforeEach(module('sigmaNgApp'));

  // initialize a new instance of the filter before each test
  var fieldApiName;
  beforeEach(inject(function ($filter) {
    fieldApiName = $filter('fieldApiName');
  }));

  it('should return the input prefixed with "fieldApiName filter:"', function () {
    var text = 'angularjs';
    expect(fieldApiName(text)).toBe('fieldApiName filter: ' + text);
  });

});
