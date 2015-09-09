'use strict';

describe('Controller: TailoringAddTailoringTypeTailoringTypeFieldCtrl', function () {

  // load the controller's module
  beforeEach(module('ui.konga'));

  var TailoringAddTailoringTypeTailoringTypeFieldCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TailoringAddTailoringTypeTailoringTypeFieldCtrl = $controller('TailoringAddTailoringTypeTailoringTypeFieldCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
