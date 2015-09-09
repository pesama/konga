'use strict';

describe('Controller: CatalogCartCtrl', function () {

  // load the controller's module
  beforeEach(module('ui.konga'));

  var CatalogCartCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CatalogCartCtrl = $controller('CatalogCartCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});