'use strict';

describe('Filter: uglifyRef2', function () {

  // load the filter's module
  beforeEach(module('ui.konga'));

  // initialize a new instance of the filter before each test
  var uglifyRef2;
  beforeEach(inject(function ($filter) {
    uglifyRef2 = $filter('uglifyRef2');
  }));

  it('should return the input prefixed with "uglifyRef2 filter:"', function () {
    var text = 'angularjs';
    expect(uglifyRef2(text)).toBe('uglifyRef2 filter: ' + text);
  });

});
