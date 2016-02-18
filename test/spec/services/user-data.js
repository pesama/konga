'use strict';

describe('Service: userData', function () {

  // load the service's module
  beforeEach(module('kongaApp'));

  // instantiate service
  var userData;
  beforeEach(inject(function (_userData_) {
    userData = _userData_;
  }));

  it('should do something', function () {
    expect(!!userData).toBe(true);
  });

});
