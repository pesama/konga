'use strict';

/**
 * @ngdoc controller
 * @name sigmaNgApp.controller:HomeCtrl
 * @description
 * Home controller. It manages the home screen and favorite management, and it's in charge of the metadata api calls to initialize the app.
 * 
 * # Metadata management
 * This controller is in charge of retrieving the information available on the server for the entities the application must manage, and thus it makes the service calls to the {@link sigmaNgApp.Metadata metadata} retrieving operation to get such information. When all information is received from the server, this controller uses {@link sigmaNgApp.Common common} storage to save the metadata for accessing elsewhere.
 *
 *
 * # Product codes
 * For form management purposes, the application receives along with the {@link sigmaNgApp.Metadata metadata} a list of available codes for the different entities available. This information is retrieved via the {@link sigmaNgApp.Metadata.codes codes} {@link sigmaNgApp.Metadata metadata} operation, and once the codes are received they are stored in the {@link sigmaNgApp.Common common} storage.
 *
 *
 *
 * @param {$scope} $scope Local scope for the controller
 * @param {Metadata} Metadata Metadata Service
 * @param {Common} common Common storage
 */
angular.module('sigmaNgApp')
  .controller('HomeCtrl', ['$scope', 'Metadata', 'common', '$rootScope', 
  	function ($scope, Metadata, common, $rootScope) {

	$scope.operations = $rootScope.operations;
	
      // Get page data
      var pageData = $rootScope.pageData;

      if(pageData.init) {
        $scope.favorites    = pageData.favorites;
        $scope.productCodes = pageData.productCodes;
        $scope.messages     = pageData.messages;
      }
      else {
        // Request the app to go loading
    	  $scope.operations.requestLoading('metadata');
    	  // $scope.operations.requestLoading('codes');
        // $rootScope.operations.requestLoading('messages');

        // Get ENTITY information
        $scope.favorites = pageData.favorites = Metadata.get({lang: 'fr'}, function(data) {
          // Store the metadata on common
          common.store('metadata', $scope.favorites);
          util.init(data);
          $scope.operations.freeLoading('metadata');
        });

        // Get product codes
        // $scope.productCodes = pageData.productCodes = Metadata.codes(function() {
        //   common.store('product-codes', $scope.productCodes);
        //   $scope.operations.freeLoading('codes');
        // });

        pageData.init = true;
      }
	}]);
