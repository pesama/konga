'use strict';

// TODO Fix this

/**
 * @ngdoc directive
 * @name sigmaNgApp.directive:edsSelectabelTable
 * @description
 * # edsSelectabelTable
 */
angular.module('sigmaNgApp')
	.filter('startFrom', function() {
	    return function(input, start) {
	        start = +start; //parse to int
	        if(input){
	        	return input.slice(start);
	        }else{
	        	return [];
	        }
	    };
	})
	.filter('displaySelectedItms', function () {
		return function (input, display) {
			if(display){
				var selectedItems= [];
				angular.forEach(input, function (item) {
					if (item.selected) {
						selectedItems.push(item);
					}
				});
				return selectedItems;
			}else{
				return input;
			}
		};
	})
	.filter('displayObjectData', function () {
		return function (obj, param) {
			var result = {};
			if(param.indexOf('.')>0){
				var paramList = param.split('.');
				result = obj[paramList[0]];
				for (var i = 1; i < paramList.length; i++) {
					result = result[paramList[i]];
				};
			}else{
				result = obj[param];
			}
			return result;
		};
	})
  .directive('edsSelectabelTable', function () {
  	var directiveDefinitionObject = {
  		templateUrl : 'views/edsselectabeltable.html',
  		restrict: 'E',
  		transclude : false,
  		scope : {
  			fields : '=',
  			listEds : '=',
  			edsType : '@',
  			setSelectedElements : '=',
  			disabledIds : '=',
  			selectedEds :'='
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

  			$scope.selectedIds = {};
  			// Set up the quick search
			$scope.quickSearchParams = {
				value: '',
				param:{}
			};

//			for(var i = 0; i < $scope.selectList.length; i++) {
//				for(var j = 0; j < $scope.listEds.length;j++) {
//					if($scope.listEds[j].id == $scope.selectList[i]) {
//						$scope.listEds[j].selected = true;
//					}
//				};
//			};
			
  			$scope.getTotalItems = function () {
  				var totalItems = $scope.paginationData.totalItems = ($scope.listEds) ? $scope.listEds.length : 0;
		  		var count = 0;
		  		if($scope.displaySelectedItmsData) {
		  			angular.forEach($scope.listEds, function (item) {
		  				if (item.selected) {
		  					count++;
		  				};
		  			});
		  			totalItems = count;
		  		}
		  		return totalItems;
  			}
  			
  			$scope.currentItems = function() {
  				var totalItems = $scope.getTotalItems();
		    	if (totalItems > 0) {
		    		var items = $scope.paginationData.currentPage * $scope.paginationData.pageItems;
		    		$scope.paginationData.currentItems = (items > totalItems)? totalItems : items;
		    	} else {
		    		$scope.paginationData.currentItems =  0;
		    	}   
		  	};
		  	  
		  	  
		  	$scope.maxPages = function () {
		  		var totalItems = $scope.getTotalItems();
		  		$scope.paginationData.maxPages = Math.ceil(totalItems/$scope.paginationData.pageItems);
		  		if ($scope.paginationData.maxPages < $scope.paginationData.currentPage && $scope.paginationData.maxPages > 0) {
		  			$scope.paginationData.currentPage = $scope.paginationData.maxPages
		  		}
		  	};
		  	/**
		  	 * Handle Table pagination
		  	 * @function pageChanged
		  	 */	
		  	$scope.pageChanged = function(orientation) {
		  		switch (orientation){
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
				var length = ($scope.listEds)? $scope.listEds.length:0;
				for (var i = 0; i < length; i++) {
					if((typeof $scope.disabledIds !== 'undefined' && !$scope.disabledIds[$scope.listEds[i].id]) || (typeof $scope.disabledIds === 'undefined')){
						$scope.listEds[i].selected = $scope.selectAllItmsData;
					}
				}
				$scope.pageChanged();
			};
			$scope.onDisplaySelectedItems = function(){
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
  				var dataFilter = $filter('displaySelectedItms')($scope.listEds, true);
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
  			$scope.setDisabledIds = function () {
  				if(typeof $scope.listEds !== 'undefined') {
  					for(var i = 0; i < $scope.selectedEds.length;i++) {
  						for(var j = 0; j < $scope.listEds.length; j++) {
  							if($scope.selectedEds[i] == $scope.listEds[j].id) { 
  								$scope.listEds[j].selected = true;
  							}
  						}
  					}
  					var dataFilter = $filter('displaySelectedItms')($scope.listEds, true);

  					$scope.setSelectedElements($scope.edsType, dataFilter);	
  				}
			};
  		},
  		link : function (scope, element, attrs, ctrl) {
			scope.$watchCollection('selectAllItmsData', scope.selectAllHandler);
			scope.$watchCollection('displaySelectedItmsData', scope.onDisplaySelectedItems);
			scope.$watchCollection('listEds', scope.onSelectListEds);
			scope.$watchCollection('quickSearchParams.param',scope.quickSearchHandler);
			scope.$watchCollection('setDisabledIds', scope.setDisabledIds);	
  		}
  	};
    return directiveDefinitionObject;
  });
