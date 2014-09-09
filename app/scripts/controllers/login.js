'use strict';

/**
 * @ngdoc function
 * @name sigmaNgApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the sigmaNgApp
 */
angular.module('sigmaNgApp')
  .controller('LoginCtrl', ['$scope', '$rootScope', '$http', '$cookieStore', '$location', 'Session', 'auth', 'user', 'TokenHandler', 
  	function($scope, $rootScope, $http, $cookieStore, $location, Session, auth, user, TokenHandler){
		/**
		 * Initialize the controller
		 * @function init {private}
		 */
		this.init = function() {			
			$scope.rememberMe = false;
			$scope.error = null;								
		};
		
		/**
		 * log in the application
		 * @function login
		 */
		$scope.login = function() {	

			/**
			 * Redirects user depending on the number of his operational centers
			 * @function redirectUser {private}
			 */
			this.redirectUser = function() {				
				var roleCoUsers = (Session.data.user.roleCoUser!=null)? Session.data.user.roleCoUser: [];
				var numRoleCoUsers = roleCoUsers.length;
				
				if (numRoleCoUsers==0) {					
					$rootScope.operations.notify('ERROR', 'login.message.contact-administrator');					
					$scope.logout();					
				} else if(numRoleCoUsers==1) {
					var roleCoUser =  roleCoUsers[0];
					var ctrOperat = roleCoUser.ctrOperat;
					$rootScope.operations.completeAuthentication(ctrOperat);									
				} else {
					$location.path("/ctrOperatChoix");
				}						
			};
			
			if ($scope.username != null && $scope.username != "" && $scope.password != null && $scope.password != "") {				
				var loginData = {};
				loginData.username = $scope.username;
				loginData.password = $scope.password;
				var ME = this;

				//Delete prevoius cookie and Session information
				Session.data = {};
	 			$cookieStore.remove('authToken');
	 			$cookieStore.remove('isFullyLogged');
	 			$cookieStore.remove('ctrOperatName');
	 			$cookieStore.remove('roles');
	 			
				auth.auth(loginData) 
					.success(function(token) {
						var authToken = token;
						Session.data.authToken = authToken;
						TokenHandler.set(authToken);
						if ($scope.rememberMe) {
							Session.data.rememberMe = true;
							$cookieStore.put('authToken', authToken);
						}

						// Retrieve the user
						user.get(
							function(user) {
								$rootScope.saveSessionInformation(user);
								ME.redirectUser();
							},
							function(error) {
								Session.data.isLogged = false;
								console.log('POST Error ' + error);
							})

						
					})
					.error(function() {
						Session.data.isLogged = false;
						$rootScope.operations.addAlert(constants.ALERT_TYPE_ERROR, 'login.incorrect-nom-or-pass');
					});				
			} else {
				$rootScope.operations.addAlert(constants.ALERT_TYPE_ERROR, 'login.warning.empty-nom-or-pass');
			}
			
		};
		
		//Execute init functions
		this.init();
	}]);
