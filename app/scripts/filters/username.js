'use strict';

/**
 * @ngdoc filter
 * @name sigmaNgApp.filter:username
 * @function
 * @description
 * # username
 * Filter in the sigmaNgApp.
 */
angular.module('sigmaNgApp')
  .filter('username', function() {
		return function(input) {
			if(input && input.nom) {
				return input.nom;
			}
			return '';
		}
	});