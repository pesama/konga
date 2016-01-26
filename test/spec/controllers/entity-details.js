'use strict';

describe('Controller: EntityDetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('uikongaApp'));

  var EntityDetailsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EntityDetailsCtrl = $controller('EntityDetailsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
