'use strict';

/**
 * @ngdoc function
 * @name sigmaNgApp.controller:CtrOperatChoixCtrl
 * @description
 * # CtrOperatChoixCtrl
 * Controller of the sigmaNgApp
 */
angular.module('sigmaNgApp')
  .controller('CtrOperatChoixCtrl',['$scope', '$rootScope', '$http', '$modal', '$location', 'Session', '$cookieStore', 'CtrOperat', 'common',
  	function($scope, $rootScope, $http, $modal, $location, Session, $cookieStore, CtrOperat, common){

	   /**
		 * Initialize the controller
		 * @function init {private}
		 */
		this.init = function() {			
			// Get the user logged in
			$scope.user = Session.data.user;
			
			$scope.ctrOperatChoix = {
					selectedCtrOperat : $scope.user.ctrOperationnel.id
			};
		};
		
		/**
		 * Go to Home
		 * @function getCtrOperationals
		 */
		$scope.valider = function() {
			// TODO Request loader

			// Get the selected ctr operat
			var ctrOperatId = $scope.ctrOperatChoix.selectedCtrOperat;
			
			if(ctrOperatId!=null){
				
				CtrOperat.get({ id: ctrOperatId }, 
						function(ctrOperat) {
							// Store the centre operat
							common.store('ctr-operat', ctrOperat);

							// Complete authentication
							$rootScope.operations.completeAuthentication(ctrOperat);								
						},
						function (error) { // Error when getting the operational center
							$scope.logout();
							console.log('POST Error' + error);
						});
				
			} else {
				$rootScope.operations.addAlert(constants.ALERT_TYPE_ERROR, 'message.ctrOperatChoix.select-ctr-operat');
			}

		};
		
		/**
		 * Go to User Log-in
		 * @function getCtrOperationals
		 */
		$scope.annuler = function() {
			$scope.logout();
		};
		
		//Execute init functions
		 this.init();	
	}]);