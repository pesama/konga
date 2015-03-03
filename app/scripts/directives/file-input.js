'use strict';

/**
 * @ngdoc directive
 * @name sigmaNgApp.directive:fileInput
 * @description
 * # fileInput
 */
angular.module('sigmaNgApp')
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
