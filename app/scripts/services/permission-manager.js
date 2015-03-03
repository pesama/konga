'use strict';

/**
 * @ngdoc service
 * @name kongaUI.permissionManager
 * @description
 * # permissionManager
 * Provider in the sigmaNgApp.
 */
angular.module('sigmaNgApp')
  .provider('permissionManager', function () {

    // Private constructor
    function Greeter(Session) {
      this.isAllowed = function (permission) {
      	// Get the user roles
		var rolesNative = Session.data.roles;

		// We need to stringify each role, as all come in array-form (as a buffer)
		var userRoles = [];
		for(var i = 0; i < rolesNative.length; i++) {
			var role = "";
			var f = -1;
			while(rolesNative[i][++f] !== undefined) {
			  role += rolesNative[i][f];
			}
			userRoles.push(role);
		}
      	
      	if(!permission.length) {
      		return true;
      	}
        return userRoles.indexOf(permission) !== -1;
      };
    }

    // Method for instantiating
    this.$get = function ($injector) {
      var session = $injector.get('Session');
      return new Greeter(session);
    };
  });
