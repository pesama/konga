'use strict';

/**
 * @ngdoc directive
 * @name ui.konga.directive:recursiveList
 * @description
 * # recursiveList
 */
angular.module('ui.konga')
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
      	scope.contentUrl = '/views/recursive-list.html';
      }
    };
  });
