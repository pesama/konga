'use strict';

/**
 * @ngdoc directive
 * @name sigmaNgApp.directive:listInput
 * @description
 * # listInput
 */
angular.module('sigmaNgApp')
  .directive('listInput', function () {
    return {
  		templateUrl : 'views/list-input.html',
  		restrict: 'E',
  		transclude : false,
  		scope : {
  			fields : '=',
  			list : '=',
  			edsType : '@',
  			setSelectedElements : '=',
  			disabledIds : '='
  		},
  		controller: function ($scope, $filter) {
  			$scope.selectAllItmsData = false;
  			$scope.displaySelectedItmsData = false;
  			$scope.paginationData = {
	  			currentItems : 0,
	  			totalItems : 0,
	  			pageItems : 5,
	  			currentPage : 1,
	  			maxPages : 1
  			};

  			$scope.selected = [];

  			$scope.selectedIds = {};
  			// Set up the quick search
			$scope.quickSearchParams = {
				value: '',
				param:{}
			};

  			$scope.getTotalItems = function () {
  				var totalItems = $scope.paginationData.totalItems = ($scope.list)? $scope.list.length:0;
		  		var count = 0;
		  		if ($scope.displaySelectedItmsData) {
		  			angular.forEach($scope.list, function (item) {
		  				if (item.selected) {
		  					count++;
		  				}
		  			});
		  			totalItems = count;
		  		}
		  		return totalItems;
  			}
  			
  			$scope.currentItems = function() {
  				var totalItems = $scope.getTotalItems();
		    	if (totalItems>0) {
		    		var items = $scope.paginationData.currentPage*$scope.paginationData.pageItems;
		    		$scope.paginationData.currentItems = (items > totalItems)? totalItems : items;
		    	} else {
		    		$scope.paginationData.currentItems =  0;
		    	}   
		  	};
		  	  
		  	  
		  	$scope.maxPages = function () {
		  		var totalItems = $scope.getTotalItems();
		  		$scope.paginationData.maxPages = Math.ceil(totalItems/$scope.paginationData.pageItems);
		  		if ($scope.paginationData.maxPages < $scope.paginationData.currentPage && $scope.paginationData.maxPages > 0) {
		  			$scope.paginationData.currentPage = $scope.paginationData.maxPages;
		  		}
		  	};
		  	/**
		  	 * Handle Table pagination
		  	 * @function pageChanged
		  	 */	
		  	$scope.pageChanged = function(orientation) {
		  		switch (orientation) {
		  			case 'first':
		  				$scope.paginationData.currentPage = 1;
		  				break;
		  			case 'previous':
		  				$scope.paginationData.currentPage = ($scope.paginationData.currentPage-1 > 1)? $scope.paginationData.currentPage-1: 1;
		  				break;
		  			case 'next':
		  				$scope.paginationData.currentPage = ($scope.paginationData.currentPage+1 < $scope.paginationData.maxPages)? $scope.paginationData.currentPage+1: $scope.paginationData.maxPages;
		  				break;
		  			case 'last':
		  				$scope.paginationData.currentPage = $scope.paginationData.maxPages;
		  				break;
		  		}
		  		if (!orientation || typeof orientation == 'undefined') {
		  			$scope.maxPages();
		  		}   
		  	   
		  	    $scope.currentItems();
		  	};

		  	$scope.selectAllHandler = function () {
				var length = ($scope.list)? $scope.list.length:0;
				for (var i = 0; i < length; i++) {
					if ((typeof $scope.disabledIds !== 'undefined' && !$scope.disabledIds[$scope.list[i].id]) 
							|| (typeof $scope.disabledIds === 'undefined')) {
						$scope.list[i].selected = $scope.selectAllItmsData;
					}
				}
				$scope.pageChanged();
			};
			$scope.onDisplaySelectedItems = function() {
				$scope.paginationData.currentPage = 1;
				$scope.pageChanged();
			};

			$scope.onSelectListEds = function () {
				$scope.pageChanged();
			};

			$scope.quickSearchHandler = function () {
				var result = {};
				angular.forEach($scope.quickSearchParams.param, function (item, key) {
					if (key.indexOf('.')>0) {
						var keyList = key.split('.');
						result[keyList[0]] = {};
						switch (keyList.length) {
							case 2:
								result[keyList[0]][keyList[1]] = item;
							break;
							case 3:
								result[keyList[0]][keyList[1]] = {};
								result[keyList[0]][keyList[1]][keyList[2]] = item;
							break;
							case 4:
								result[keyList[0]][keyList[1]] = {};
								result[keyList[0]][keyList[1]][keyList[2]] = {};
								result[keyList[0]][keyList[1]][keyList[2]][keyList[3]] = item;
							break;
						}
					}else{
						result[key]=item;
					}
				});
				$scope.quickSearchParams.value =	result;
				$scope.paginationData.currentPage = 1;
				$scope.pageChanged();
			};

  			$scope.validate = function () {
  				var dataFilter = $filter('displaySelectedItms')($scope.list, true);
  		// 		var listIds = [];
  		// 		for (var i = 0; i < dataFilter.length; i++) {
				// 	listIds[dataFilter[i].id]=true;
				// };
  		// 		$scope.selectedIds[$scope.edsType] = listIds;
  				$scope.setSelectedElements($scope.edsType, dataFilter);
  			};

  			$scope.cancel = function () {
  				$scope.selectAllItmsData = false;
  				$scope.selectAllHandler();
  			};

  		},
  		link : function (scope, element, attrs, ctrl) {
			scope.$watchCollection('selectAllItmsData', scope.selectAllHandler);
			scope.$watchCollection('displaySelectedItmsData', scope.onDisplaySelectedItems);
			scope.$watchCollection('list', scope.onSelectListEds);
			scope.$watchCollection('quickSearchParams.param',scope.quickSearchHandler);
			scope.$watchCollection('disabledIds', function () {
				console.log('disabledIds '+scope.disabledIds);	
			})
  		}
  	};
  });
