'use strict';

describe('Controller: EntityUpdateCtrl', function () {

  // load the controller's module
  beforeEach(module('sigmaNgApp'));

  var EntityUpdateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EntityUpdateCtrl = $controller('EntityUpdateCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
