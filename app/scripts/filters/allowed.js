'use strict';

/**
 * @ngdoc filter
 * @name sigmaNgApp.filter:allowed
 * @function
 * @description
 * # allowed
 * Filter in the sigmaNgApp.
 */
angular.module('sigmaNgApp')
  .filter('allowed', ['Session', function (Session) {
    return function (input, mode) {
    	var ret = [];
    	for(var i = 0; i < input.length; i++) {
    		var field = input[i];

    		switch(mode) {
		  	case constants.SCOPE_SEARCH:

		  		// Is it public?
		  		if(!field.searchable.value.length) {
		  			ret.push(field);
		  		}

		  		// Verify permissions
		  		else if(Session.data.roles.indexOf(field.searchable.value) !== -1) {
		  			ret.push(field);
		  		}
		  		break;
		  	case constants.SCOPE_RESULTS:

		  		// Is it public?
		  		if(!field.showInResults.value.length) {
		  			ret.push(field);
		  		}

		  		// Verify permissions
		  		else if(Session.data.roles.indexOf(field.showInResults.value) !== -1) {
		  			ret.push(field);
		  		}
		  		break;
		  	case constants.SCOPE_UPDATE:

		  		// Is it public?
		  		if(!field.showInUpdate.value.length) {
		  			ret.push(field);
		  		}

		  		// Verify permissions
		  		else if(Session.data.roles.indexOf(field.showInUpdate.value) !== -1) {
		  			ret.push(field);
		  		}
		  		break;
			}
    	}

    	return ret;
    };
  }]);
