'use strict';

describe('Filter: selectData', function () {

  // load the filter's module
  beforeEach(module('sigmaNgApp'));

  // initialize a new instance of the filter before each test
  var selectData;
  beforeEach(inject(function ($filter) {
    selectData = $filter('selectData');
  }));

  it('should return the input prefixed with "selectData filter:"', function () {
    var text = 'angularjs';
    expect(selectData(text)).toBe('selectData filter: ' + text);
  });

});
