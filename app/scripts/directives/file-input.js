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
  .directive('fileInput', ['Upload', 'configurationManager', function (Upload, configurationManager) {
    return {
      templateUrl: '/konga/views/file-input.html',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        
        // Determine submit method
        // IMMEDIATE OR COMMIT

        scope.fileConfig = {
          method: 'COMMIT',
          path: null,
          accept: '*',
          drop: '',
          select: '',
          maxSize: '256M',
          icon: 'fa fa-cloud-upload'
        };

        // Get configuration
        var config_method = configurationManager.get('FILE_INPUT_METHOD', scope.property);
        var config_path = configurationManager.get('FILE_INPUT_PATH', scope.property);
        var config_accept = configurationManager.get('FILE_INPUT_ACCEPT', scope.property);
        var config_drop = configurationManager.get('FILE_INPUT_DROP', scope.property);
        var config_select = configurationManager.get('FILE_INPUT_SELECT', scope.property);
        var config_maxSize = configurationManager.get('FILE_INPUT_MAXSIZE', scope.property);
        var config_icon = configurationManager.get('FILE_INPUT_ICON', scope.property);

        if(config_method) {
          scope.fileConfig[method] = config_method;
        }

        if(config_path) {
          scope.fileConfig[path] = config_path;
        }

        if(config_accept) {
          scope.fileConfig[accept] = config_accept;
        }

        if(config_drop) {
          scope.fileConfig[drop] = config_drop;
        }

        if(config_select) {
          scope.fileConfig[select] = config_select;
        }

        if(config_maxSize) {
          scope.fileConfig[maxSize] = config_maxSize;
        }

        if(config_icon) {
          scope.fileConfig[icon] = config_icon;
        }        

        // Select files
        scope.selectFiles = function(files, event) {
          scope.value.files = files;
        };

        scope.dropFiles = function(files, event) {

        }
      }
    };
  }]);
