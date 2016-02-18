'use strict';

describe('Service: kongaConfig', function () {

  // load the service's module
  beforeEach(module('kongaApp'));

  // instantiate service
  var kongaConfig;
  beforeEach(inject(function (_kongaConfig_) {
    kongaConfig = _kongaConfig_;
  }));

  it('should do something', function () {
    expect(!!kongaConfig).toBe(true);
  });

});
