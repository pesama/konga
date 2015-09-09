'use strict';

describe('Controller: CatalogProductDetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('ui.konga'));

  var CatalogProductDetailsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CatalogProductDetailsCtrl = $controller('CatalogProductDetailsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
