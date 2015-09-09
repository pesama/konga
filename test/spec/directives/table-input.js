'use strict';

describe('Directive: tableInput', function () {

  // load the directive's module
  beforeEach(module('ui.konga'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<table-input></table-input>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the tableInput directive');
  }));
});
