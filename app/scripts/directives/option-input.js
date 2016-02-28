'use strict';

/**
 * @ngdoc directive
 * @name konga.directive:optionInput
 * @description
 * # optionInput
 */
angular.module('konga')
  .directive('optionInput', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the optionInput directive');
      }
    };
  });
