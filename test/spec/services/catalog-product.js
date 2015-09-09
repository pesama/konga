'use strict';

describe('Service: catalogProduct', function () {

  // load the service's module
  beforeEach(module('ui.konga'));

  // instantiate service
  var catalogProduct;
  beforeEach(inject(function (_catalogProduct_) {
    catalogProduct = _catalogProduct_;
  }));

  it('should do something', function () {
    expect(!!catalogProduct).toBe(true);
  });

});
