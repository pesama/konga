'use strict';

describe('Directive: custom/presupuestorTailoringField', function () {

  // load the directive's module
  beforeEach(module('presupuestorApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<custom/presupuestor-tailoring-field></custom/presupuestor-tailoring-field>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the custom/presupuestorTailoringField directive');
  }));
});
