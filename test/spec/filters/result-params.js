'use strict';

describe('Filter: resultParams', function () {

  // load the filter's module
  beforeEach(module('sigmaNgApp'));

  // initialize a new instance of the filter before each test
  var resultParams;
  beforeEach(inject(function ($filter) {
    resultParams = $filter('resultParams');
  }));

  it('should return the input prefixed with "resultParams filter:"', function () {
    var text = 'angularjs';
    expect(resultParams(text)).toBe('resultParams filter: ' + text);
  });

});
