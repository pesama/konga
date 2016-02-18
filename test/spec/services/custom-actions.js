'use strict';

describe('Service: customActions', function () {

  // load the service's module
  beforeEach(module('kongaApp'));

  // instantiate service
  var customActions;
  beforeEach(inject(function (_customActions_) {
    customActions = _customActions_;
  }));

  it('should do something', function () {
    expect(!!customActions).toBe(true);
  });

});
