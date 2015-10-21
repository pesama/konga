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
      templateUrl: '/views/konga/menu.html',
      replace: true, 
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      
      }
    };
  });
