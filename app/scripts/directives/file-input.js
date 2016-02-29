'use strict';

/**
 * @ngdoc directive
 * @name konga.directive:fileInput
 * @description
 * 
 * Renders a field for uploading files.
 * 
 */
angular.module('konga')
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
