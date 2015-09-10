'use strict';

/**
 * @ngdoc directive
 * @name ui.konga.directive:recursiveListItem
 * @description
 * # recursiveListItem
 */
angular.module('ui.konga')
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
