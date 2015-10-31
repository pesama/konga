'use strict';

describe('Controller: AppLoaderCtrl', function () {

  // load the controller's module
  beforeEach(module('uikongaApp'));

  var AppLoaderCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AppLoaderCtrl = $controller('AppLoaderCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AppLoaderCtrl.awesomeThings.length).toBe(3);
  });
});
