'use strict';

/**
 * @ngdoc function
 * @name sigmaNgApp.controller:FilterManagerCtrl
 * @description
 * # FilterManagerCtrl
 * Controller of the sigmaNgApp
 */
angular.module('sigmaNgApp')
  .controller('FilterManagerCtrl',
		  ['$scope', '$filter', '$routeParams', '$rootScope','$modalInstance', '$log','items', 'model', 'method', 'formProperties', 'FilterManager',
         function ($scope, $filter, $routeParams, $rootScope, $modalInstance, $log, items, model, method, formProperties, FilterManager) {
		   
  	$scope.sourceList = items;
  	$scope.model = model;
  	$scope.method = method;
  	$scope.page = '';
  	var entityType = $scope.entityType = $routeParams.entityType;
  	$scope.formProperties = formProperties;
  	// $scope.searchFormParams; jsHint 
  	// $scope.filterName;
  	$scope.filterManager = FilterManager;
  	$scope.filter = { name: ''};
  	$scope.savedFilters = [];
  	// $scope.selectedFilter;
  	var log = $log.getInstance('FilterManagerCtrl', entityType);
  	//Call below code if we disable logger
  	//log.enableLogging(false);
	
  	//Call methods below to log your message
  	log.log('Test log message');
  	log.info('Test info message');
  	log.warn('Test warn message');
  	log.error('Test error message');
  	/**
	 * TODO Document
	 */
	$scope.openFilterModel = {
		title: method === 'post' ? 'Save Favorite Filter' : 'Load Favorite Filter',
		contentUrl: '',
		animation: '',
		save: function() {
			var filtermanager = $scope.filterManager;
			$scope.searchFormParams = $scope.formProperties;
			var filterName = $scope.filter.name;
			
			if ($scope.method === 'post') {
				log.info('Begin execute save favorite filter');
				var myFilter = angular.copy($scope.formProperties);
				//process for Search by date: Convert to String
				if ($scope.entityType === constants.SOURCE_ENTITY_CHANTIERS) {
					myFilter.dateDebut.startDate = "" + myFilter.dateDebut.startDate;
					myFilter.dateDebut.endDate = "" + myFilter.dateDebut.endDate;
					myFilter.dateFin.startDate = "" + myFilter.dateFin.startDate;
					myFilter.dateFin.endDate = "" + myFilter.dateFin.endDate;
				}
				
				var request = {
					name: filterName,
					pageName: $scope.entityType,
					search: myFilter //$scope.formProperties
				};
						
				filtermanager.create(request, 
						function success() {
							$rootScope.operations.addAlert(constants.ALERT_TYPE_SUCCESS, 'favori.create-success');
							log.info('Filter Favorit created successfully');
							$modalInstance.close();
						}, 
						function err(error) {
							log.error('Cannot save favorite filter. Error: ' + error);
							$rootScope.operations.addAlert(constants.ALERT_TYPE_ERROR, 'global.operation-incomplete'); 
						});
				log.info('End execute save favorite filter');
			} else {
				//$scope.formProperties.name = $scope.selectedFilter.name;
				//$scope.formProperties.search = $scope.selectedFilter.search;
				$modalInstance.close($scope.selectedFilter.search);
			}			
		},

		cancel: function () {
			$modalInstance.dismiss('cancel');
		}
	};
	
	$scope.operations = {
		init: function() {
			if ('ctrOperat' === entityType) {
				$scope.page = 'Centre Operationel';
			} else {
				$scope.page = entityType.charAt(0).toUpperCase() + entityType.slice(1);
			}
			
			//Load saved filter
			if ($scope.method === 'get') {
				var filtermanager = $scope.filterManager;
				filtermanager.search({pageName:$scope.entityType}, function(resp) {
					console.log(resp);
					$scope.savedFilters = resp;
				});
			}
		},
		
		selectFilter: function(selectedFilter) {
			$scope.selectedFilter = selectedFilter;
			console.log($scope.selectedFilter);
		}
	};
 }]);
