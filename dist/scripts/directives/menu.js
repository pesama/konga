'use strict';

/**
 * @ngdoc directive
 * @name kongaUI.directive:menu
 * @description
 * # menu
 */
angular.module('ui.konga')
  .directive('menu', function () {
    return {
      templateUrl: '/views/menu.html',
      replace: true, 
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      
      }
    };
  });
