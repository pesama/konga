'use strict';

/**
 * @ngdoc controller
 * @name ui.konga.controller:HomeCtrl
 * @description
 * Home controller. It manages the home screen and favorite management, and it's in charge of the metadata api calls to initialize the app.
 * 
 * # Metadata management
 * This controller is in charge of retrieving the information available on the server for the entities the application must manage, and thus it makes the service calls to the {@link ui.konga.Metadata metadata} retrieving operation to get such information. When all information is received from the server, this controller uses {@link ui.konga.Common common} storage to save the metadata for accessing elsewhere.
 *
 *
 * # Product codes
 * For form management purposes, the application receives along with the {@link ui.konga.Metadata metadata} a list of available codes for the different entities available. This information is retrieved via the {@link ui.konga.Metadata.codes codes} {@link ui.konga.Metadata metadata} operation, and once the codes are received they are stored in the {@link ui.konga.Common common} storage.
 *
 *
 *
 * @param {$scope} $scope Local scope for the controller
 * @param {Metadata} Metadata Metadata Service
 * @param {Common} common Common storage
 */
angular.module('presupuestorApp')
  .controller('AdminCtrl', ['$scope', 'Metadata', 'common', '$rootScope', 
  	function ($scope, Metadata, common, $rootScope) {

      $scope.operations = $rootScope.operations;
      
      // Get page data
      var pageData = $rootScope.pageData;

      if(pageData.init) {
        
      }
      else {
        pageData.init = true;
      }

      $scope.metadata = common.read('metadata');
	}]);
