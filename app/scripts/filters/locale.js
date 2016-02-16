'use strict';

/**
 * @ngdoc filter
 * @name Konga Reference.filter:locale
 * @function
 * @description
 * # locale
 * It receives an input , and it returns a message which locate in index equal input.
 * @param {Number} input Defines the index of message
 */
angular.module('konga')
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
