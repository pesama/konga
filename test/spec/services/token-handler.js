'use strict';

describe('Service: tokenHandler', function () {

  // load the service's module
  beforeEach(module('sigmaNgApp'));

  // instantiate service
  var tokenHandler;
  beforeEach(inject(function (_TokenHandler_) {
    tokenHandler = _TokenHandler_;
  }));

  it('should do something', function () {
    expect(!!tokenHandler).toBe(true);
  });

});
