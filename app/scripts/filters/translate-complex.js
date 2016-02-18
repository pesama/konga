'use strict';

/*
 * @ngdoc filter
 * @name Konga Reference.filter:translateComplex
 * @function
 * @description
 * # translateComplex
 * It receives a String (input) and extra (if any), and it returns a complex field to be translated using standard `translate` filter.
 *  @param {String} input Defines the name of label of the field
 *  @param {Object=} extra Defines the extra expression object for filter 
 */
angular.module('konga')
  .filter('translateComplex', ['$filter', 
  	function ($filter) {
	    return function (input, extra) {
	      if(typeof input !== 'string') {
	      	// TODO Verify
	      	return input;
	      }
	      else {
	      	return $filter('translate')(input, extra);
	      }
	    };
	  }]);
