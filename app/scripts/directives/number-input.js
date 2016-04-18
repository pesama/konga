'use strict';

/**
 * @ngdoc directive
 * @name konga.directive:numberInput
 * @description
 * # numberInput
 */
angular.module('konga')
  .directive('numberInput', ['util', 'configurationManager', 
  	function (util, configurationManager) {
	    return {
	      templateUrl: '/konga/views/number-input.html',
	      restrict: 'E',
	      link: function postLink(scope, element, attrs) {
	        
	        // Get step
	        var stepConf = configurationManager.get(util.constants.NUMBER_CONF_STEP);
	        if(stepConf === undefined) {
	        	stepConf = 1;
	        }

	        scope.stepConf = stepConf;


	      }
	    };
	  }]);
