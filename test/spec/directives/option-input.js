'use strict';

describe('Directive: optionInput', function () {

  // load the directive's module
  beforeEach(module('ui.konga'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<option-input></option-input>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the optionInput directive');
  }));
});
