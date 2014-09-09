'use strict';

describe('Directive: rawInput', function () {

  // load the directive's module
  beforeEach(module('sigmaNgApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<raw-input></raw-input>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the rawInput directive');
  }));
});
