'use strict';

/**
 * @ngdoc filter
 * @name sigmaNgApp.filter:userCtrOperatByRole
 * @function
 * @description
 * # userCtrOperatByRole
 * Filter in the sigmaNgApp.
 */
angular.module('sigmaNgApp')
  .filter('userCtrOperatByRole', function () {
    return function (user) {

    	// Generate the CtrOperat array
    	var result = [];

    	// Aux array to verify ids
    	var resultIds = [];

    	// Get the roles
    	var roles = user.roleCoUser;

    	// Append the ctr operat by default
    	var defaultCtrOperat = user.ctrOperationnel;

    	// Move along the roles
    	for(var i = 0; i < roles.length; i++) {

    		// Get the role
    		var role = roles[i];

    		// Get the ctr operat
    		var ctrOperat = role.ctrOperat;

    		// Append the ctr operat
    		result.push(ctrOperat);

    		// Append the id in the result table
    		resultIds.push(ctrOperat.id);
    	}

    	return result;
    };
  });
