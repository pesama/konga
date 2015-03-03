'use strict';

describe('Filter: queryParser', function () {

  // load the filter's module
  beforeEach(module('sigmaNgApp'));

  // initialize a new instance of the filter before each test
  var queryParser;
  beforeEach(inject(function ($filter) {
    queryParser = $filter('queryParser');
  }));

  it('should return the input prefixed with "queryParser filter:"', function () {
    var text = 'angularjs';
    expect(queryParser(text)).toBe('queryParser filter: ' + text);
  });

});
