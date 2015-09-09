'use strict';

describe('Controller: ProductBatchUploadCtrl', function () {

  // load the controller's module
  beforeEach(module('ui.konga'));

  var ProductBatchUploadCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProductBatchUploadCtrl = $controller('ProductBatchUploadCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
