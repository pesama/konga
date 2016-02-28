'use strict';

/**
 * @ngdoc directive
 * @name konga.directive:recursiveListItem
 * @description
 * # recursiveListItem
 */
angular.module('konga')
  .directive('recursiveListItem', function () {
    return {
      templateUrl: '/konga/views/recursive-list-item.html',
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
