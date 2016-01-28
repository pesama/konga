'use strict';

/*
 * @ngdoc controller
 * @name ui.konga.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the ui.konga
 */
angular.module('ui.konga')
  .controller('LoginCtrl', ['$scope', '$rootScope', '$http', '$cookieStore', '$location', 'Session', 'auth', 'User', 'TokenHandler', 'Metadata', 'common',
  	function($scope, $rootScope, $http, $cookieStore, $location, Session, auth, User, TokenHandler){
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
			
			if ($scope.username != null && $scope.username != "" && $scope.password != null && $scope.password != "") {				
				var loginData = {};
				loginData.email = $scope.username;
				loginData.password = $scope.password;

				//Delete prevoius cookie and Session information
				Session.data = {};
	 			$cookieStore.remove('authToken');
	 			$cookieStore.remove('isFullyLogged');
	 			
				auth.auth(loginData) 
					.success(function(token) {
						var authToken = token;
						Session.data.authToken = authToken;
						TokenHandler.set(authToken);
						if ($scope.rememberMe) {
							Session.data.rememberMe = true;
							$cookieStore.put('authToken', authToken);
						}

						User.get({ id: token.user.id }, 
							function(data) {
								// Retrieve the user
								$rootScope.saveSessionInformation(data);

								// Setup roles
								if(data.admin) { 
									Session.data.roles.push("ADMIN");
								}
								if(data.superadmin) { 
									Session.data.roles.push("SUPERADMIN");
								}
								if(data.sales) { 
									Session.data.roles.push("SALES");
								}
								if(data.salesmaster) { 
									Session.data.roles.push("SALESMASTER");
								}

								$rootScope.operations.goHome();
							},
							function(error) {
								// TODO Notify error
							}
						);
					})
					.error(function() {
						Session.data.isLogged = false;
						$rootScope.operations.addAlert(constants.ALERT_TYPE_ERROR, 'message.login.incorrect-data');
					});				
			} else {
				$rootScope.operations.addAlert(constants.ALERT_TYPE_ERROR, 'login.warning.empty-nom-or-pass');
			}
			
		};
		
		//Execute init functions
		this.init();
	}]);
