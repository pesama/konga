'use strict';

describe('Controller: TailoringAddTailoringTypeTailoringTypeStepCtrl', function () {

  // load the controller's module
  beforeEach(module('ui.konga'));

  var TailoringAddTailoringTypeTailoringTypeStepCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TailoringAddTailoringTypeTailoringTypeStepCtrl = $controller('TailoringAddTailoringTypeTailoringTypeStepCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
