'use strict';

/**
 * @ngdoc filter
 * @name Konga Reference.filter:allowed
 * @function
 * @description
 * # allowed
 * Filter in the Konga Reference.
 */
angular.module('konga')
  .filter('allowed', ['userData', 'util', function (userData, util) {
    return function (input, mode) {
    	var ret = [];
    	for(var i = 0; i < input.length; i++) {
    		var field = input[i];

    		switch(mode) {
		  	case util.constants.SCOPE_SEARCH:

		  		// Is it public?
		  		if(!field.searchable.value.length) {
		  			ret.push(field);
		  		}

		  		// Verify permissions
		  		else if(userData.roles.indexOf(field.searchable.value) !== -1) {
		  			ret.push(field);
		  		}
		  		break;
		  	case util.constants.SCOPE_RESULTS:

		  		// Is it public?
		  		if(!field.showInResults.value.length) {
		  			ret.push(field);
		  		}

		  		// Verify permissions
		  		else if(userData.roles.indexOf(field.showInResults.value) !== -1) {
		  			ret.push(field);
		  		}
		  		break;
		  	case util.constants.SCOPE_UPDATE:

		  		// Is it public?
		  		if(!field.showInUpdate.value.length) {
		  			ret.push(field);
		  		}

		  		// Verify permissions
		  		else if(userData.roles.indexOf(field.showInUpdate.value) !== -1) {
		  			ret.push(field);
		  		}
		  		break;
			}
    	}

    	return ret;
    };
  }]);
