'use strict';

/**
 * @ngdoc directive
 * @name ui.konga.directive:fileInput
 * @description
 * # fileInput
 */
angular.module('ui.konga')
  .directive('fileInput', ['$upload', function () {
    return {
      templateUrl: '/views/file-input.html',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        scope.fileSelected = function(files, event) {
          scope.value.files = files;
        };
      }
    };
  }]);
