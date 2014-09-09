'use strict';

/**
 * @ngdoc directive
 * @name sigmaNgApp.directive:recapTable
 * @description
 * # recapTable
 */
angular.module('sigmaNgApp')
  .directive('recapTable', function () {
    return {
      templateUrl: 'views/recap-table.html',
      restrict: 'E',
      scope : {
      	fields : '=',
      	selectedEds : '=',
      	title : '@'
      },
      controller : function ($scope) {
      	$scope.paginationData = {
	  			currentItems : 0,
	  			totalItems : 0,
	  			pageItems : 2,
	  			currentPage : 1,
	  			maxPages : 1
  			};

  		//Get eds elements length
  		$scope.getTotalItems = function () {
			var totalItems = $scope.paginationData.totalItems = ($scope.selectedEds)? $scope.selectedEds.length:0;
	  		return totalItems;
		};

		$scope.currentItems = function(){
			var totalItems = $scope.getTotalItems();
	    	if(totalItems>0){
	    		var items = $scope.paginationData.currentPage*$scope.paginationData.pageItems;
	    		$scope.paginationData.currentItems = (items > totalItems)? totalItems : items;
	    	}else{
	    		$scope.paginationData.currentItems =  0;
	    	};   
	  	};
	  	  
	  	  
	  	$scope.maxPages = function () {
	  		var totalItems = $scope.getTotalItems();
	  		$scope.paginationData.maxPages = Math.ceil(totalItems/$scope.paginationData.pageItems);
	  		if ($scope.paginationData.maxPages<$scope.paginationData.currentPage && $scope.paginationData.maxPages>0) {
	  			$scope.paginationData.currentPage = $scope.paginationData.maxPages
	  		};
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
	  		if (!orientation || typeof orientation == 'undefined' || typeof orientation !== 'string') {
	  			$scope.maxPages();
	  		};   
	  	   
	  		//$scope.currentItems();
	  	};

      },
      link: function postLink(scope, element, attrs) {
        scope.$watchCollection('selectedEds', scope.pageChanged);        
      }
    };
  });
