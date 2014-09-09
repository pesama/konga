'use strict';

describe('Controller: MultiSelectCtrl', function () {

  // load the controller's module
  beforeEach(module('sigmaNgApp'));

  var MultiSelectCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MultiSelectCtrl = $controller('MultiSelectCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
