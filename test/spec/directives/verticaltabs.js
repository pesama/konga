'use strict';

describe('Directive: verticalTabs', function () {

  // load the directive's module
  beforeEach(module('sigmaNgApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<vertical-tabs></vertical-tabs>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the verticalTabs directive');
  }));
});
