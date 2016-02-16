'use strict';

/*
 * @ngdoc directive
 * @name Konga Reference.directive:fileInput
 * @description
 * # fileInput
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
