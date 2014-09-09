'use strict';

describe('Directive: tabContent', function () {

  // load the directive's module
  beforeEach(module('sigmaNgApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<tab-content></tab-content>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the tabContent directive');
  }));
});
