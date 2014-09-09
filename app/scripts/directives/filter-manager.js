'use strict';

/**
 * @ngdoc directive
 * @name sigmaNgApp.directive:filterManager
 * @description
 * # filterManager
 */
angular.module('sigmaNgApp')
  .directive('filterManager', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the filterManager directive');
      }
    };
  });
