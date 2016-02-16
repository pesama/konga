'use strict';

/**
 * @ngdoc directive
 * @name Konga Reference.directive:Option input
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
