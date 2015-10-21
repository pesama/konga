'use strict';

/**
 * @ngdoc directive
 * @name ui.konga.directive:File input
 * @description
 * # fileInput
 */
angular.module('ui.konga')
  .directive('fileInput', ['$upload', function () {
    return {
      templateUrl: '/konga/views/file-input.html',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        scope.fileSelected = function(files, event) {
          scope.value.files = files;
        };
      }
    };
  }]);
