'use strict';

/**
 * @ngdoc controller
 * @name sigmaNgApp.controller:EntitySearchCtrl
 * @description
 * Controller used for search ENTITY entities. It's route provides information about what type of entity are we searching for
 * 
 *
 * # Route configuration
 * This controller uses the path to get configured. Depending on the <i>eds</i> type it needs to manage, the parameter `entityType` received via the `$routeParams` would have one value or another. This parameter is used thereafter to determine the local endpoint to perform the calls to. 
 *
 *
 * # Local endpoint
 * Using the {@link sigmaNgApp.Api api} service, and sending the `entityType` parameter defined above, the service returns the proper endpoint, depending on which type of entity is received. Afterwards all CRUD operations between the UI and the web service will be performed to the appropriate endpoint. 
 *
 * 
 * # Using `pageData`
 * Thanks to the {@link sigmaNgApp.Common#methods_getPageData `getPageData`} method of the {@link sigmaNgApp.Common common} storage, this controller can save information about where it was when the tab was changed to one another. Thus, the controller can restore its previous state once we come back to such tab. 
 *
 *
 * # Pagination
 * To avoid retrieving too many results at once, they are paginated so the user could only see the number of results she decides. 
 * <br />
 * TODO Improve
 *
 *
 * @param {$scope} $scope Local scope for the controller
 * @param {Api} api Api connector for REST service connection
 * @param {$routeParams} $routeParams Parameters of the route
 * @param {Common} common Common storage
 * @param {$rootScope} $rootScope Global scope (for receiving propagated data)
 * @param {$filter} $filter Filters for managing data
 * @param {Scaffold} scaffold Used to generate new entities
 */
angular.module('sigmaNgApp')
  .controller('EntitySearchCtrl', ['$scope', 'api', '$routeParams', 'common', '$rootScope', '$filter', 'scaffold', 'Reports', '$timeout','$log',
  	function ($scope, api, $routeParams, common, $rootScope, $filter, scaffold, Reports,$timeout, $log) {
  		
      // Get the local params
      var entityType = $scope.entityType = $routeParams.entityType;

      // Get the local endpoint
      var localEndpoint = api.getLocalEndpoint(entityType);
      
      // Get page data
      var pageData = $rootScope.pageData;

      var log = $log.getInstance('EntitySearchCtrl', entityType);
      
      // Initialize the search results
      $scope.searchResults = [];
      
      //Keep the current query for search function when doing the paging,  
//      if (!$rootScope.currentQuery) {
//    	  $rootScope.currentQuery = {}; 
//      }
      
      $scope.pageItems = [];
      
      if (!$rootScope.paginationData) {
        $rootScope.paginationData = {};        
      }

      if (!$rootScope.paginationData[entityType]) {
        $rootScope.paginationData[entityType] = {};
        $rootScope.paginationData[entityType].totalItems = 0;
        $rootScope.paginationData[entityType].itemsPerPage = 5;
        $rootScope.paginationData[entityType].currentPage = 1;
        $rootScope.paginationData[entityType].currentItems = 0;
        $rootScope.paginationData[entityType].startingItem = 1;
        $rootScope.paginationData[entityType].endingItem = 0;
      }

      // Initialize the field metadata
      $scope.entityMetadata = common.getMetadata(entityType);

      // If we have pageData, we setup the controller
      // Otherwise we initialize
      if (pageData.init) {
        $scope.searchResults = pageData.searchResults;
        $scope.query = pageData.query;
     
        $scope.filterHideBtn = pageData.filterHideBtn;
        $scope.filterClass = pageData.filterClass;
        $scope.resultTableWidth = pageData.resultTableWidth;
      } else {
        pageData.searchResults = $scope.searchResults;

        $scope.query = pageData.query = scaffold.newQuery($scope.entityMetadata);

        // Init the hiddenFiltre to openFiltre       
        $scope.filterHideBtn = pageData.filterHideBtn = true;
        $scope.filterClass = pageData.filterClass = 'filterShow';
        // pageData.init = true;
      }

      // Quick search by eds code
      // var edsFields = util.getEntityFields($scope.entityMetadata); - jsHint : not used
      var codeField = $scope.codeField = util.getEntityCode($scope.entityMetadata, undefined, true);
      var labelField = util.getEntityLabel($scope.entityMetadata, undefined, true);
      
      // Set up the quick search
      $scope.quickSearchParams = {
        fieldName : codeField,
        fieldLabel: '',
        value: {}
      };
      
      // Set up the value params
      $scope.quickSearchParams.value[codeField] = '';
      $scope.quickSearchParams.fieldLabel = labelField;
      
      // Get product codes
      // var productCodes = $scope.productCodes = common.read('product-codes'); - jsHint : not used

      // Inherit root operations
      $scope.operations = $rootScope.operations;
      
      $scope.submit = function(query) {
        // Request a loader
        $rootScope.operations.requestLoading('search_' + entityType);

        var paging = $rootScope.paginationData;
        
        if (query === undefined) {
        	query = angular.copy($scope.query);
        }
        query.itemsPerPage = paging[entityType].itemsPerPage;
        query.currentPage = paging[entityType].currentPage;
        
//        if (query !== undefined) {
//        	query.itemsPerPage = paging[entityType].itemsPerPage;
//            query.currentPage = paging[entityType].currentPage;
//            
//            //Keep the query for paging
//            $rootScope.currentQuery[entityType] = query;
//        } else {
//        	if (!$rootScope.currentQuery[entityType]) {
//        		query = $rootScope.currentQuery[entityType];
//        	}
//        }
        
        pageData.searchResults = $scope.searchResults = localEndpoint.search(query, function() {
        	//searchResults is a var used to stock the ResultItems shown (by page)
        	$rootScope.paginationData[entityType].totalItems = $routeParams.total;
        	$scope.currentItems();
          $rootScope.operations.freeLoading('search_' + entityType);
        });
        
        
      };
      
      $scope.timeout = 1;
      
      $scope.executeQuickSearch = function() {
    	  
    	  $timeout.cancel($scope.timeout);
    	  $scope.timeout = $timeout(function() {
    		  log.info('codeField: ' + codeField);
        	  log.info('$scope.quickSearchParams.value[codeField]: ' + $scope.quickSearchParams.value[codeField]);
        	  var quickSearchQuery = angular.copy($scope.query);
        	  if (quickSearchQuery[codeField] !== undefined) {
        		  quickSearchQuery[codeField] = $scope.quickSearchParams.value[codeField];
        	  }
        	  //console.log($scope.query);
        	  console.log(quickSearchQuery);
        	  $scope.submit(quickSearchQuery);
        	  
		      }, 1000);
      };
      
      if (!pageData.init) {
    	//first search => Looking for active entities
    	$scope.query.statut=true; 
        $scope.submit($scope.query);
        pageData.init = true;
      }
      
      $scope.closeFiltre = function() {
        $scope.filterHideBtn = pageData.filterHideBtn = false;
        $scope.filterClass = pageData.filterClass = 'filterHide';
        $scope.resultTableWidth = pageData.resultTableWidth = 'widthUp';
      };

      $scope.openFiltre = function() {
        $scope.filterHideBtn = pageData.filterHideBtn = true;
        $scope.filterClass = pageData.filterClass = 'filterShow';
        $scope.resultTableWidth = pageData.resultTableWidth = 'widthDown';
      };

      $scope.currentItems = function() {
    		if ($rootScope.paginationData[entityType].totalItems > 0) {
    			  var items = $rootScope.paginationData[entityType].currentPage * $rootScope.paginationData[entityType].itemsPerPage;
    			  $rootScope.paginationData[entityType].currentItems = (items > $rootScope.paginationData[entityType].totalItems)? $rootScope.paginationData[entityType].totalItems : items;
    			  $rootScope.paginationData[entityType].startingItem =  (($rootScope.paginationData[entityType].currentPage - 1)*$rootScope.paginationData[entityType].itemsPerPage)+1; // Starts in 1
    			  var endingItem = $rootScope.paginationData[entityType].startingItem +  parseInt($rootScope.paginationData[entityType].itemsPerPage)-1;
    			  $rootScope.paginationData[entityType].endingItem = (endingItem > $rootScope.paginationData[entityType].totalItems)?$rootScope.paginationData[entityType].totalItems:endingItem;
    		} else {
    			$rootScope.paginationData[entityType].currentItems = 0;
    		}   
  	  };

  	  $scope.paginationSubmit = function() {
  		var query = angular.copy($scope.query);
  		$scope.submit(query);
  		//  $scope.submit($rootScope.currentQuery[entityType]);
  	  };
  	  
      $scope.paginationUpdate = function (data) {
        //$rootScope.paginationData[entityType].totalItems = $routeParams.total;
        $scope.currentItems();
      };
  	
  	  $scope.report = function (type) {
	      Reports.generate({typeEntity: entityType, typeReport: type}, pageData.searchResults, 
	    		  function (resp) {
			        // Success
			    	  console.log(resp);
			    	  var timestamp = new Date().getTime();
			    	  var href = 'data:' + resp.mimetype + ';base64, ' + resp.value;
	    	  
			    	  //Check if the file is pdf file o excel file
			    	  var extension = (resp.mimetype.indexOf('pdf') > -1) ? '.pdf' : '.xls' ;
			    	  util.downloadFile(href, 'report_' + timestamp + extension);
	      		   }, 
	      		   function (data, status, headers, config) {
	      			   // Error
			    	  console.error('POST Error');
			    	  $rootScope.operations.addAlert(constants.ALERT_TYPE_ERROR, 'global.operation-incomplete'); 
	      		   });
    };
  	  
  	}]);
