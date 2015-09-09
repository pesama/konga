'use strict';

describe('Directive: presupuestorTailoringStatic', function () {

  // load the directive's module
  beforeEach(module('ui.konga'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<presupuestor-tailoring-static></presupuestor-tailoring-static>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the presupuestorTailoringStatic directive');
  }));
});
