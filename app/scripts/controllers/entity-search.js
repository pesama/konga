'use strict';

/**
 * @ngdoc controller
 * @name konga.controller:EntitySearchController
 * @description
 * 
 * This controller handles all search operations for konga {@link Standards.Forms `standards`}. It's opened once you request a new search form via {@link Standards.Operations#methods_openEntitySearch `openEntitySearch()`} operation. Once it opens it starts inner `directives` and engages all functionalities.
 *
 * <img src="/static/konga-entity-search-basic-flow.png" width="40%" class="center">
 *
 * The `EntitySearchController` relies on two main directives to render its contents: {@link konga.directive:searchPane `searchPane`} for managing the search form, and {@link konga.directive:resultTable `resultTable`} for rendering the results. Furthermore, it includes access to the {@link konga.controller:EntityUpdateController `EntityUpdateController`} to create new entities, if the metadata for the entity allows creation to user. 
 *
 *
 * # Search flow
 *
 * Once the `EntitySearchController` engages, it passes through several flows depending on the configuration, and on the user interaction with the available actions. Here you have an excerpt of the flows `EntitySearchController` moves through:
 *
 * <img src="/static/konga-search-flow.png" width="50%" class="center">
 *
 * ## Rendering
 *
 * On **rendering** phase, the `EntitySearchController` reads the `metadata` and determines whether the search form is an allowed feature for the entity. If that's the case, it launches the directive `boot`, and stays idle while the directives work, listening for their requests, along with user interactions through them. See how {@link konga.directive:searchPane `searchPane`} and {@link konga.directive:resultTable `resultTable`} boot. 
 *
 * ## Input
 *
 * This is a {@link konga.directive:searchPane `searchPane`} specific behavior, when users interact with the different fields. See the docs about how the `searchPane` handles {@link konga.directive:searchPane#methods_updateField `field updation`}.
 *
 * ## Submit
 *
 * This process is triggered by the {@link konga.directive:searchPane `searchPane`} once the user clicks on 'submit'. In this moment the `EntitySearchController` receives a 'submit' action through its {@link konga.controller:EntitySearchController#methods_dispatchSearchAction `dispatchSearchAction()`} method, who determines the action to dispatch. As you would see on the {@link Action-Driven.Native#properties_search `native search action`}, the default procedure for searching is to launch `EntitySearchController` {@link konga.controller:EntitySearchController#methods_submit `submit`} method.
 *
 * ## Reset
 *
 * This task is executed once the user clicks on the 'clear' button. It's handled internally by the {@link konga.directive:searchPane `searchPane`} through its {@link konga.directive:searchpane#methods_clear `clear`} method. With this process all fields return to their initial state, and a new request is launched to update the results on the {@link konga.directive:resultTable `resultTable`}.
 *
 *
 * @param {$scope} $scope
 * `EntitySearchController`'s `$scope`. It contains all basic attributes and features for searching, and it provides information to the underlying directives. 

 * @param {Object} api 
 <span class="label type-hint type-hint-object">{@link konga.api `api`}</span>
 Service for performing the API calls for retrieving the results. By default any entity consumes the {@link konga.standardApi `standardApi`}. However, controllers rely on the {@link konga.api `api`} service, as it allows you to easily define a different API handler for each entity. See the {@link konga.api `api`} documentation for more details.

 * @param {$routeParams} $routeParams 
 The `EntitySearchController` uses the `$routeParams` to retrieve information about the entities. As you have seen on the {@link Standards.Apps Apps} definition, there are two default `$routes` engaged into any Konga app. That `$routes` contain information about the `:entityName` (the entity metadata's name), used to retrieve the metadata using the {@link Standards.Tools `util`} stystem. 

 * @param {Object} common 
 <span class="label type-hint type-hint-object">{@link konga.common `common`}</span>
 The storage is used internally to handle data-saving operations, mainly for tab management - you go out of this tab, come back, and everything is as you left it.

 * @param {$rootScope} $rootScope 
 Injected to access global {@link Standards.Operations `operations`}.

 * @param {$filter} $filter
 Used for filtering data - e.g. {@link konga.filter:mapField `field mapping`} and other Angular native filtering.

 * @param {Object} scaffold
 <span class="label type-hint type-hint-object">{@link konga.scaffold `scaffold`}</span>
 Used for {@link konga.scaffold `scaffolding`} new queries. 

 * @param {$timeout} $timeout
 Some inner methods and operations are executed delayed.

 * @param {Object} permissionManager
 <span class="label type-hint type-hint-object">{@link konga.permissionManager `permissionManager`}</span>
 Used to determine user permissions on the operations susceptible to be executed on the `search` and `results` functionalities.

 * @param {Object} util
 <span class="label type-hint type-hint-object">{@link Standards.Tools `util`}</span>
 Used to handle metadata easier via the {@link Standards.Tools `util`} provided tools. 

 */
angular.module('konga')
  .controller('EntitySearchController', ['$scope', 'api', '$routeParams', 'common', '$rootScope', '$filter', 'scaffold', '$timeout', 'permissionManager', 'util', 'configurationManager', 
  	function ($scope, api, $routeParams, common, $rootScope, $filter, scaffold, $timeout, permissionManager, util, configurationManager) {

      // Get the local params
      var entityType = $scope.entityType = $routeParams.entityType;

      // Get the local endpoint
      var localEndpoint = api.getLocalEndpoint(entityType);
      
      // Get page data
      var pageData = $rootScope.pageData;
      
      /**
       * @ngdoc object
       * @propertyOf konga.controller:EntitySearchController
       * @name searchResults
       * @description
       * 
       * Stores all the search results that come from the api once requested a {@link konga.controller:EntitySearchController#methods_submit `submit`} method.
       */
      $scope.searchResults = [];
      
      /**
       * @ngdoc object
       * @propertyOf konga.controller:EntitySearchController
       * @name pageItems
       * @description
       * 
       * Stores a subset of the elements contained in {@link konga.controller:EntitySearchController#properties_searchResults `searchResults`} array. .
       */
      $scope.pageItems = [];

      var pageData = $rootScope.pageData;

      /**
       * @ngdoc object
       * @propertyOf konga.controller:EntitySearchController
       * @name entityMetadata
       * @description
       * 
       * Holds the metadata of the entity being managed. It's retrieved via {@link konga.common `common`} -> {@link konga.common#methods_getMetadata `getMetadata`} method.
       */
      var metadata = $scope.entityMetadata = common.getMetadata(entityType);

      $scope.config = {
        paging: true,
        quicksearch: true,
        buttons: true
      };

      var _paging = configurationManager.get(util.constants.RESULTS_SHOW_PAGING, $scope.entityMetadata);
      var _quicksearch = configurationManager.get(util.constants.RESULTS_SHOW_QUICK_SEARCH, $scope.entityMetadata);
      var _buttons = configurationManager.get(util.constants.SEARCH_SHOW_BUTTONS, $scope.entityMetadata);

      if(_paging !== undefined) $scope.config.paging = _paging;
      if(_quicksearch !== undefined) $scope.config.quicksearch = _quicksearch;
      if(_buttons !== undefined) $scope.config.buttons = _buttons;

      /**
       * @ngdoc object
       * @propertyOf konga.controller:EntitySearchController
       * @name searchResults
       * @description
       * 
       * Stores whether the entity being managed allows creation. It leverages the {@link konga.permissionManager `permissionManager`} -> {@link konga.permissionManager#methods_isAllowed `isAllowed`} method to determine permissions.
       */
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
        $scope.paginationData = pageData.paginationData;
        
      } else {
        pageData.searchResults = $scope.searchResults;

        if (!$scope.paginationData) {
          $scope.paginationData = {};
          $scope.paginationData.count = 0;
          $scope.paginationData.limit = 20;
          $scope.paginationData.offset = 1;
        }

        /**
         * @ngdoc object
         * @propertyOf konga.controller:EntitySearchController
         * @name quickSearchEnabled
         * @description
         * 
         * Stores whether the entity supports `quick searching`.
         */
        $scope.quickSearchEnabled = pageData.quickSearchEnabled = false;

        /**
         * @ngdoc object
         * @propertyOf konga.controller:EntitySearchController
         * @name query
         * @description
         * 
         * Stores the current query based on the search field's input.
         */
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

      /**
       * @ngdoc object
       * @propertyOf konga.controller:EntitySearchController
       * @name quickSearch
       * @description
       * 
       * Determines the fields to be rendered in the `quick search` pane. It uses the {@link konga.filter:quickSearch `quickSearch`} filter to get such fields based on metadata for the entity being managed. 
       */
      var quickSearchFields = $scope.quickSearch = $filter('quickSearch')(metadata);
      
      /**
       * @ngdoc object
       * @propertyOf konga.controller:EntitySearchController
       * @name fieldsShowInResults
       * @description
       * 
       * Stores all the fields needed to be shown in `results`. The {@link konga.filter:resultParams `resultParams`} filter handles this feature, by selecting all fields with metadata and permissions properly set to show in results. 
       */
      var allFields = $filter('orderBy')(util.getEntityFields($scope.entityMetadata), '+priority.search');
      $scope.fieldsShowInResult = $filter('resultParams')(allFields, $scope.entityMetadata);

      // Inherit root operations
      $scope.operations = $rootScope.operations;
      
      /**
       * @ngdoc function
       * @methodOf konga.controller:EntitySearchController
       * @name resetPaginationData
       * @description
       * 
       * Resets the pagination data to the default values. This method is used when `resetting`, to setup original paging count, and to move to first page. 
       * 
       * @param {Boolean} pagingOnly
       If set to true, paging count - i.e. `limit` - won't be reset to defaults. 
       */
      $scope.resetPaginationData = function (pagingOnly) {
    	  $scope.paginationData.count = 0;
        $scope.paginationData.offset = 1;

        if(!pagingOnly) {
          $scope.paginationData.limit = 20;
        }
      };
      
      /**
       * @ngdoc function
       * @methodOf konga.controller:EntitySearchController
       * @name submit
       * @description
       * 
       * Submits the query to the API and handles data returns, and exception management.
       *
       * @param {Object} query
       <span class="label type-hint type-hint-object">{@link Standards.Data%20types#properties_Query Query}</span>
       * Query to submit to the API
       * @param {Object} [sorting=null]
       <span class="label type-hint type-hint-object">{@link Metadata.Field Field}</span>
       Configures the field to sort by
       */
      $scope.submit = function(query, sorting) {
        // Request a loader
        $rootScope.operations.requestLoading('search_' + entityType);

        var paging = $scope.paginationData;
        
        if (query === undefined) {
        	query = angular.copy($scope.query);
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
        	var count = $scope.paginationData.count = $routeParams.count;
        	$scope.currentItems();
          $rootScope.operations.freeLoading('search_' + entityType);
        }, function(error) {
          var exceptionCode = error.data && error.data.length ? error.data[0].exceptionCode : 'GENERIC_TECHNICAL_ERROR';
          $rootScope.operations.freeLoading('search_' + entityType);
          $rootScope.operations.addAlert(util.constants.ALERT_TYPE_ERROR, exceptionCode);
        });
      };
	
      $scope.submitSorting = function(field, type) {
    	  $scope.submit($scope.query, { field: field, type: type });
      };
      
      /**
       * @ngdoc function
       * @methodOf konga.controller:EntitySearchController
       * @name executeQuickSearch
       * @description
       * 
       * Submits the query, along with the values input on the `quick search` section. This method is executed autommatically once a field on the `quick search` hook changes.
       *
       */
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

            // Verify search action
            var matchingActions = $filter('filter')(scope.entityMetadata.overrideDefaults, { overrides: 'quick-search' }, true);
            if (matchingActions && matchingActions.length) {
              for(var i = 0; i < matchingActions.length; i++) {
                scope.dispatchSearchAction(matchingActions[i], { query: quickSearchQuery });
              }
            }
            else {
              scope.dispatchSearchAction({ name: 'quick-search'}, { query: quickSearchQuery });
            }
        	  
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

      /**
       * @ngdoc function
       * @methodOf konga.controller:EntitySearchController
       * @name toggleFilter
       * @description
       * 
       * Toggles filter visibility
       */
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
      
      /**
       * @ngdoc function
       * @methodOf konga.controller:EntitySearchController
       * @name hideFilter
       * @description
       * 
       * Hides the filters, leaving the result table occupying all the layout.
       */
      $scope.hideFilter = function() {
        $scope.filterOpened = pageData.filterOpened = false;
        $scope.filterClass = pageData.filterClass = 'filterHide';
        $scope.resultTableWidth = pageData.resultTableWidth = 'widthUp';
      };

      /**
       * @ngdoc function
       * @methodOf konga.controller:EntitySearchController
       * @name hideFilter
       * @description
       * 
       * Hides the filters, leaving the result table occupying all the layout.
       */
      $scope.showFilter = function() {
        $scope.filterOpened = pageData.filterOpened = true;
        $scope.filterClass = pageData.filterClass = 'filterShow';
        $scope.resultTableWidth = pageData.resultTableWidth = 'widthDown';
      };

      $scope.currentItems = function() {
    		if ($scope.paginationData.count > 0) {
    			  var items = $scope.paginationData.offset * $scope.paginationData.limit;
    			  $scope.paginationData.currentItems = (items > $scope.paginationData.count)? $scope.paginationData.count : items;
    			  $scope.paginationData.startingItem =  (($scope.paginationData.offset - 1)*$scope.paginationData.limit)+1; // Starts in 1
    			  var endingItem = $scope.paginationData.startingItem +  parseInt($scope.paginationData.limit)-1;
    			  $scope.paginationData.endingItem = (endingItem > $scope.paginationData.count)?$scope.paginationData.count:endingItem;
    		} else {
    			$scope.paginationData.currentItems = 0;
    		}   
  	  };

  	  $scope.paginationSubmit = function() {
    		$scope.submit($scope.oldQuery);
  	  };
  	  
      $scope.paginationUpdate = function() {
        $scope.currentItems();
      };
      
      /**
       * @ngdoc event
       * @eventOf konga.controller:EntitySearchController
       * @name entity-search
       * @description
       * 
       * When this event arrives to `EntitySearchController`, it launches a new search for the entity given on the params. This is useful to update results on any custom action you develop.
       *
       * To successfully use this feature you **need to send the `entity name` on the `data.type` attribute**. 
       * 
       */
      $scope.$on('entity-search', function (conf, data){
    	  if(entityType == data.type) {
    		  $scope.submit();
    	  }
      });

      /**
       * @ngdoc function
       * @methodOf konga.controller:EntitySearchController
       * @name dispatchSearchAction
       * @description
       * Launches a custom action triggered within the `EntitySearchController`. This action will include the following parameters and values:
       <pre>
{
  query: $scope.query,
  metadata: $scope.entityMetadata,
  results: $scope.resultList,
  self: $scope
}
       </pre>

       * @param {Object} action
       <span class="label type-hint type-hint-object">{@link Metadata.Action Action}</span>
       Action to be dispatched. This can be an object with a `name` attribute. Konga will find such name in the {@link konga.customActions `customActions`} array

       */
      $scope.dispatchSearchAction = function(action, actionParams) {
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

        if(actionParams) {
          for(var item in actionParams) {
            parameters[item] = actionParams[item];
          }
        }

        $scope.operations.dispatchAction(action, parameters);
      };

      $scope.$on('entity-search', function(evt, data) {
        if(data.entityType === entityType) {
          $scope.submit();
        }
      })
  	  
  	}]);
