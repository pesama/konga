'use strict';

/**
 * @ngdoc directive
 * @name konga.directive:kongaFieldName
 * @description
 * # kongaFieldName
 */
angular.module('konga')
  .directive('kongaFieldName', function ($compile, $parse) {
    return {
      restrict: 'A',
      terminal: true,
      priority: 100000,
      link: function postLink(scope, element, attrs) {
    	  var name = $parse(element.attr('konga-field-name'))(scope);
    	  
    	  element.removeAttr('konga-field-name');
    	  
    	  element.attr('name', name);
    	  
    	  $compile(element)(scope);
      }
    };
  });
