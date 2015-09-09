'use strict';

describe('Controller: AddRoleStoreUserCtrl', function () {

  // load the controller's module
  beforeEach(module('ui.konga'));

  var AddRoleStoreUserCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddRoleStoreUserCtrl = $controller('AddRoleStoreUserCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
