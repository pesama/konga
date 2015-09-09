'use strict';

describe('Controller: TailoringTypeTailoringTypeStepManageOptionsCtrl', function () {

  // load the controller's module
  beforeEach(module('ui.konga'));

  var TailoringTypeTailoringTypeStepManageOptionsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TailoringTypeTailoringTypeStepManageOptionsCtrl = $controller('TailoringTypeTailoringTypeStepManageOptionsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
