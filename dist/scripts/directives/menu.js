'use strict';

/**
 * @ngdoc directive
 * @name ui.konga.directive:Menu
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
