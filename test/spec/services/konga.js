'use strict';

describe('Service: konga', function () {

  // load the service's module
  beforeEach(module('kongaApp'));

  // instantiate service
  var konga;
  beforeEach(inject(function (_konga_) {
    konga = _konga_;
  }));

  it('should do something', function () {
    expect(!!konga).toBe(true);
  });

});
