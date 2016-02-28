'use strict';

/**
 * @ngdoc directive
 * @name konga.directive:recursiveList
 * @description
 * # recursiveList
 */
angular.module('konga')
  .directive('recursiveList', function () {
    return {
      template: '<div ng-include="contentUrl"></div>',
      restrict: 'E',
      replace: true,
      scope: {
      	list: '=',
      	clickItem: '=onClickItem',
      	itemClass: '@'
      },
      link: function postLink(scope) {
      	scope.contentUrl = '/konga/views/recursive-list.html';
      }
    };
  });
