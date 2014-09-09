'use strict';

describe('Controller: FilterManagerCtrl', function () {

  // load the controller's module
  beforeEach(module('sigmaNgApp'));

  var FilterManagerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FilterManagerCtrl = $controller('FilterManagerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
