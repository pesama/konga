'use strict';

/*
 * @ngdoc controller
 * @name Konga Reference.controller:EntitySearchCtrl
 * @description
 * Controller used for search ENTITY entities. It's route provides information about what type of entity are we searching for
 * 
 *
 * # Route configuration
 * This controller uses the path to get configured. Depending on the entity type it needs to manage, the parameter `entityType` received via the `$routeParams` would have one value or another. This parameter is used thereafter to determine the local endpoint to perform the calls to. 
 *
 *
 * # Local endpoint
 * Using the {@link Konga Reference.Api api} service, and sending the `entityType` parameter defined above, the service returns the proper endpoint, depending on which type of entity is received. Afterwards all CRUD operations between the UI and the web service will be performed to the appropriate endpoint. 
 *
 * 
 * # Using `pageData`
 * Thanks to the {@link Konga Reference.Common#methods_getPageData `getPageData`} method of the {@link Konga Reference.Common common} storage, this controller can save information about where it was when the tab was changed to one another. Thus, the controller can restore its previous state once we come back to such tab. 
 *
 *
 * # Pagination
 * To avoid retrieving too many results at once, they are paginated so the user could only see the number of results she decides. 
 * <br />
 *
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
angular.module('konga')
  .controller('EntitySearchCtrl', ['$scope', 'api', '$routeParams', 'common', '$rootScope', '$filter', 'scaffold', '$timeout', '$log', 'permissionManager', 'util', 
  	function ($scope, api, $routeParams, common, $rootScope, $filter, scaffold, $timeout, $log, permissionManager, util) {
  		
      // Get the local params
      var entityType = $scope.entityType = $routeParams.entityType;

      // Get the local endpoint
      var localEndpoint = api.getLocalEndpoint(entityType);
      
      // Get page data
      var pageData = $rootScope.pageData;

      //var log = $log.getInstance('EntitySearchCtrl', entityType);
      
      // Initialize the search results
      $scope.searchResults = [];
      
      //Keep the current query for search function when doing the paging,  
//      if (!$rootScope.currentQuery) {
//    	  $rootScope.currentQuery = {}; 
//      }
      
      $scope.pageItems = [];

      var pageData = $rootScope.pageData;
      
      if (!$rootScope.paginationData) {
        $rootScope.paginationData = {};
      }

      if (!$rootScope.paginationData[entityType]) {
        $rootScope.paginationData[entityType] = {};
        $rootScope.paginationData[entityType].count = 0;
        $rootScope.paginationData[entityType].limit = 20;
        $rootScope.paginationData[entityType].offset = 1;
      }

      $scope.paginationCount = $rootScope.paginationData[entityType].limit + "";

      // Initialize the field metadata
      var metadata = $scope.entityMetadata = common.getMetadata(entityType);

      $scope.isCreateable = metadata.createable !== null && permissionManager.isAllowed(metadata.createable);

      // If we have pageData, we setup the controller
      // Otherwise we initialize
      if (pageData.init) {
        $scope.searchResults = pageData.searchResults;
        $scope.query = pageData.query;
        $scope.filterOpened = pageData.filterOpened;
        $scope.filterClass = pageData.filterClass;
        $scope.resultTableWidth = pageData.resultTableWidth;
        $scope.quickSearchEnabled = pageData.quickSearchEnabled;
        
      } else {
        pageData.searchResults = $scope.searchResults;
        $scope.quickSearchEnabled = pageData.quickSearchEnabled = false;

        $scope.query = pageData.query = scaffold.newQuery($scope.entityMetadata);

        // Init the hiddenFilter to showFilter       
        $scope.filterOpened = pageData.filterOpened = true;
        
        // pageData.init = true;
      }

      $scope.init = function() {
        if($scope.entityMetadata.searchable === null) {
          $scope.hideFilter();
        }
        else {
          $scope.showFilter();
        }
      };

      var quickSearchFields = $scope.quickSearch = $filter('quickSearch')(metadata);

      // Quick search by eds code
      // var edsFields = util.getEntityFields($scope.entityMetadata); - jsHint : not used
      //var codeField = $scope.codeField = util.getEntityCode($scope.entityMetadata, undefined, true);
      //var labelField = util.getEntityLabel($scope.entityMetadata, undefined, true);
      
      //Get Fields show in search result
      var allFields = $filter('orderBy')(util.getEntityFields($scope.entityMetadata), '+priority.search');
      $scope.fieldsShowInResult = $filter('resultParams')(allFields, $scope.entityMetadata);
      
      // Get product codes
      $scope.productCodes = common.read('product-codes'); 

      // Inherit root operations
      $scope.operations = $rootScope.operations;
      
      $scope.resetPaginationData = function (onlyPagination) {
    	  $rootScope.paginationData[entityType].count = 0;
        $rootScope.paginationData[entityType].offset = 1;

        if(!onlyPagination) {
          $rootScope.paginationData[entityType].limit = 20;
        }
      };
      
      $scope.submit = function(query, sorting) {
        // Request a loader
        $rootScope.operations.requestLoading('search_' + entityType);

        var paging = $rootScope.paginationData;
        
        if (query === undefined) {
        	query = angular.copy($scope.query);
        }
        
        if (query.resetPaging) {
            $scope.resetPaginationData(true);
            query.resetPaging = false;
        }
        
        if (query.resetSorting) {
        	$scope.fieldsShowInResult = $filter('resultParams')($scope.fieldsShowInResult, $scope.entityMetadata);
          query.resetSorting = false;
        }

        $scope.query = query;
        
        //Set paging
        query.limit = paging[entityType].limit;
        query.offset = (paging[entityType].offset - 1) * paging[entityType].limit;
        
        //Set sorting
            
        // Do we have an api name?
        if(sorting) {
          var apiName = sorting.field.apiName;
          if(!apiName) apiName = sorting.field.name;

          query.sortBy = apiName;
          query.sortAs = sorting.type;
        }
        
        console.log(query);

        var sendQuery = $scope.oldQuery = {};
        rootifyQuery(sendQuery, query);
        
        var path = metadata.apiPath;

        sendQuery.path = path;

        pageData.searchResults = $scope.searchResults = localEndpoint.search(sendQuery, function() {
        	//searchResults is a var used to stock the ResultItems shown (by page)
        	var count = $rootScope.paginationData[entityType].count = $routeParams.count;
        	$scope.currentItems();
          $rootScope.operations.freeLoading('search_' + entityType);
        }, function(error) {
          var exceptionCode = error.data && error.data.length ? error.data[0].exceptionCode : 'GENERIC_TECHNICAL_ERROR';
          $rootScope.operations.freeLoading('search_' + entityType);
          $rootScope.operations.addAlert(util.constants.ALERT_TYPE_ERROR, exceptionCode);
        });
      };
	
      $scope.submitSorting = function(field, type) {
    	  // $scope.fieldsShowInResult = sortBy;
    	  //console.log(sortBy);
    	  //$scope.resetPaginationData();
    	  $scope.submit($scope.query, { field: field, type: type });
      };
      
      $scope.timeout = 1;
      $scope.executeQuickSearch = function() {
    	  $timeout.cancel($scope.timeout);
    	  $scope.timeout = $timeout(function() {
            $scope.quickSearchEnabled = pageData.quickSearchEnabled = false;
        	  var quickSearchQuery = angular.copy($scope.query);

            for(var i = 0; i < quickSearchFields.length; i++) {
              var field = quickSearchFields[i];
              var name = field.metadata.apiName ? field.metadata.apiName : field.metadata.name;
              // TODO Verify validation and all

              quickSearchQuery[name] = field.value;

              if(!quickSearchQuery[name].length) {
                delete quickSearchQuery[name];
              }
              else {
                $scope.quickSearchEnabled = pageData.quickSearchEnabled = true;
              }
            }

        	  $scope.submit(quickSearchQuery);
        	  
		      }, 1000);
      };

      function rootifyQuery(query, obj, metadata, fields) {
          function getField(fields, name) {
            // Get the field
            var field = $filter('filter')(fields, { name: name }, true)[0];

            // Is it defined by its api name?
            if(!field) {
              field = $filter('filter')(fields, { apiName: name }, true)[0];
            }

            return field;
          }

          if(!metadata) {
            metadata = $scope.entityMetadata;
          }
          if(!fields) fields = util.getEntityFields(metadata);

          for(var i in obj) {
            var value = obj[i];

            var field = getField(fields, i);

            // TODO Other cases
            if(typeof(value) === 'object') {
              if(field.type.type === util.constants.FIELD_COMPLEX) {
                var complexMetadata = util.getMetadata(field.type.complexType);

                if(field.fieldType.search === util.constants.FIELD_COMPLEX) {
                  var complexFields = util.getEntityFields(complexMetadata);
                  var nestFields = field.searchable.fields;

                  var selectedFields = $filter('selectedFields')(complexFields, nestFields, field);

                  rootifyQuery(query, value, complexMetadata, selectedFields);

                  continue;
                }

                rootifyQuery(query, value, complexMetadata);

                continue;
              }

              // Multiplicity many
              if(field.searchConf.multiplicity === util.constants.MULTIPLICITY_MANY) {
                if(!value instanceof Array) {
                  // TODO Launch exception
                }

                value = value.join(',');
              }

              // Search policy RANGE
              else if(field.searchConf.policy === util.constants.VALIDATOR_RANGE) {
                // Do nothing. Value = value :D
              }
            }

            // Non-object values go as-is
            if(!!value || value === false || value === null || value === 0) {
              query[i] = value;
            }
          }
        }
      
      if (!pageData.init) {
        var query = rootifyQuery($scope.query);
        $scope.submit(query);
        pageData.init = true;
      } else {
    	  //Refresh search after doing create update entity
          var refreshSearchKey = util.constants.REFRESH_SEARCH_KEY + entityType;
          console.log(common.read(refreshSearchKey));
          if (common.read(refreshSearchKey)) {
        	  $scope.submit($scope.query);
        	  common.deleteKey(refreshSearchKey);
          }
      }

      $scope.toggleFilter = function() {
        if($scope.entityMetadata.searchable === null) {
          return;
        }

        if($scope.filterOpened) {
          $scope.hideFilter();
        }
        else {
          $scope.showFilter();
        }
      };
      
      $scope.hideFilter = function() {
        $scope.filterOpened = pageData.filterOpened = false;
        $scope.filterClass = pageData.filterClass = 'filterHide';
        $scope.resultTableWidth = pageData.resultTableWidth = 'widthUp';
      };

      $scope.showFilter = function() {
        $scope.filterOpened = pageData.filterOpened = true;
        $scope.filterClass = pageData.filterClass = 'filterShow';
        $scope.resultTableWidth = pageData.resultTableWidth = 'widthDown';
      };

      $scope.currentItems = function() {
    		if ($rootScope.paginationData[entityType].count > 0) {
    			  var items = $rootScope.paginationData[entityType].offset * $rootScope.paginationData[entityType].limit;
    			  $rootScope.paginationData[entityType].currentItems = (items > $rootScope.paginationData[entityType].count)? $rootScope.paginationData[entityType].count : items;
    			  $rootScope.paginationData[entityType].startingItem =  (($rootScope.paginationData[entityType].offset - 1)*$rootScope.paginationData[entityType].limit)+1; // Starts in 1
    			  var endingItem = $rootScope.paginationData[entityType].startingItem +  parseInt($rootScope.paginationData[entityType].limit)-1;
    			  $rootScope.paginationData[entityType].endingItem = (endingItem > $rootScope.paginationData[entityType].count)?$rootScope.paginationData[entityType].count:endingItem;
    		} else {
    			$rootScope.paginationData[entityType].currentItems = 0;
    		}   
  	  };

  	  $scope.paginationSubmit = function() {
        $scope.paginationData[entityType].limit = parseInt($scope.paginationCount);
    		$scope.submit($scope.oldQuery);
  		//  $scope.submit($rootScope.currentQuery[entityType]);
  	  };
  	  
      $scope.paginationUpdate = function() {
        //$rootScope.paginationData[entityType].count = $routeParams.total;
        $scope.currentItems();
      };
      
      $scope.$on('entity-search', function (conf, data){
    	  if(entityType == data.type) {
    		  $scope.submit();
    	  }
      });
  	
  	  $scope.report = function (type) {
        var queryReport = angular.copy($scope.query);
        var sendQuery = {};
 	      rootifyQuery(sendQuery, queryReport);
 	      sendQuery.path=metadata.apiPath;
		  delete sendQuery.limit;
		  delete sendQuery.offset;
  		  // $rootScope.operations.requestLoading('searchReport_' + type);
  		  // var searchReport = localEndpoint.search(sendQuery, function() {
      //   	//searchResults is a var used to stock the ResultItems shown (by page)

      //   	$rootScope.operations.freeLoading('searchReport_' + entityType);
  	   //    	Reports.generate({typeEntity: entityType, typeReport: type}, searchReport, 
	    	// 	  function (resp) {
			   //      // Success
			   //  	  console.log(resp);
			   //  	  var timestamp = new Date().getTime();
			   //  	  var href;
	    	  
			   //  	  //Check if the file is pdf file o excel file
					 //  var extension;
					 //  if (resp.mimetype.indexOf("pdf") > -1) {
						// href = 'data:' + resp.mimetype + ';base64, ' + resp.value;
						// extension = ".pdf";
					 //  }	else if (resp.mimetype.indexOf("excel") > -1) {
						// href = 'data:' + resp.mimetype + ';base64, ' + resp.value;
						// extension = ".xls" ;
					 //  } else {
						// var unBase64 = escape(window.atob(resp.value));
						// var encoded = util.convertUtf8ToWindow1250(unBase64);
						// var reBase64 = window.btoa(encoded);
						// href = 'data:' + resp.mimetype + ';base64, ' + reBase64;
						// extension = ".csv" ;
					 //  }
			   //  	  util.downloadFile(href, 'report_' + timestamp + extension);
	     //  		   }, 
	     //  		   function () {
	     //  			   // Error
			   //  	  console.error('POST Error');
			   //  	  $rootScope.operations.addAlert(util.constants.ALERT_TYPE_ERROR, 'global.operation-incomplete'); 
	     //   });
  		  // });

	      
  	 	};

      /*
       * Launch a custom action for search scope
       */
      $scope.dispatchSearchAction = function(action) {
        var queryObj = {};

        rootifyQuery(queryObj, $scope.query);

        // Generate the parameter list
        var parameters = {
          // closeTab: true,
          query: queryObj,
          metadata: $scope.entityMetadata,
          results: $scope.searchResults,
          self: $scope
        };

        $scope.operations.dispatchAction(action, parameters);
      };

      $scope.$on('entity-search', function(evt, data) {
        if(data.entityType === entityType) {
          $scope.submit();
        }
      })
  	  
  	}]);
