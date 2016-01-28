'use strict';

/*
 * @ngdoc directive
 * @name ui.konga.directive:kongaSelect
 * @description
 * # kongaSelect
 */
angular.module('ui.konga')
  .directive('kongaSelect', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        scope.removeItem = function(index) {
          scope.value.entity.splice(index, 1);

          var value = scope.value.text.split(',');
          
          value.splice(index, 1);

          scope.value.text = value.join(',');
        }

        scope.writeValue = function() {
        	if(scope.value.entity instanceof Array) {
        		scope.value.entity.splice(0, scope.value.entity.length);
        	}
        	else {
        		scope.value.entity = {};
        	}
        };
      }
    };
  });
