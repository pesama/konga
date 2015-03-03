'use strict';

/**
 * @ngdoc directive
 * @name sigmaNgApp.directive:recursiveListItem
 * @description
 * # recursiveListItem
 */
angular.module('sigmaNgApp')
  .directive('recursiveListItem', function () {
    return {
      templateUrl: '/views/recursive-list-item.html',
      restrict: 'E',
      replace: true,
      scope: {
      	item: '=',
      	click: '=onClick',
      	ngClass: '@'
      },
      link: function postLink(scope, element, attrs) {
      }
    };
  });
