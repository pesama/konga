'use strict';

describe('Controller: CustomPresupuestorTailoringPriceTableSelectorCtrl', function () {

  // load the controller's module
  beforeEach(module('presupuestorApp'));

  var CustomPresupuestorTailoringPriceTableSelectorCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CustomPresupuestorTailoringPriceTableSelectorCtrl = $controller('CustomPresupuestorTailoringPriceTableSelectorCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
