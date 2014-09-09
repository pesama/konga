'use strict';

/**
 * @ngdoc filter
 * @name sigmaNgApp.filter:selectedFields
 * @function
 * @description
 * # selectedFields
 * Filter in the sigmaNgApp.
 */
angular.module('sigmaNgApp')
  .filter('selectedFields', function () {
    return function (real, names) {
    	// If no name is given, return all
    	var result = [];
      	for(var i = 0; i < real.length; i++) {
      		if(names.indexOf(real[i].name) !== -1) {
      			result.push(real[i]);
      		}
      	}
      	return result;
    };
  });
