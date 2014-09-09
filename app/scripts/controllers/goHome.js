'use strict';

/**
 * @ngdoc controller
 * @name sigmaNgApp.controller:goHomeCtrl
 * @description
 * goHome controller. It redirects to Home using the function goHome
 * 
 *
 * @param {$scope} $scope Local scope for the controller
 * @param {Metadata} Metadata Metadata Service
 * @param {Common} common Common storage
 */
angular.module('sigmaNgApp')
  .controller('GoHomeCtrl', ['$scope', 'Metadata', 'common', '$rootScope','$routeParams', 
  	function ($scope, Metadata, common, $rootScope, $routeParams) {	  
	  $rootScope.operations.goHome();      
	}]);
