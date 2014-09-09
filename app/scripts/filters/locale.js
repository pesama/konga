'use strict';

/**
 * @ngdoc filter
 * @name sigmaNgApp.filter:locale
 * @function
 * @description
 * # locale
 * Filter in the sigmaNgApp.
 */
angular.module('sigmaNgApp')
  .filter('locale', ['common', 
  	function (common) {
	    return function (input) {
	    	var messages = common.read('messages');

	    	if(!input || !messages || !messages.messages) {
	    		return null;
	    	}

	     	return messages.messages[input];
	    };
	  }]);
