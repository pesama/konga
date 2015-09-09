'use strict';

describe('Controller: CustomTailoringUpdateCtrl', function () {

  // load the controller's module
  beforeEach(module('presupuestorApp'));

  var CustomTailoringUpdateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CustomTailoringUpdateCtrl = $controller('CustomTailoringUpdateCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
