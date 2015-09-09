'use strict';

describe('Directive: categorySelector', function () {

  // load the directive's module
  beforeEach(module('ui.konga'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<category-selector></category-selector>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the categorySelector directive');
  }));
});
