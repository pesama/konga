'use strict';

 /**
 * @ngdoc overview
 * @name konga
 * @module konga
 * @description
 * # Konga Engine
 * 
 * Konga Engine is a tool for constructing <i>AngularJS-powered</i> forms using metadata that defines the entities forms should manage. It's based on two sub-projects (i.e. `Konga Metadata` and `Konga UI`). This documentation describes how the UI works, every component it has, and how the flow is.
 *
 * ## Runtime flow
 * 
 * <b>TODO</b> Describe flow and append diagram.
 *
 * ## Components
 * 
 * `konga` contains several components, that build the application and all its parts.
 * 
 * ### Controllers
 * 
 * * {@link konga.controller:EntitySearchController `entity-search`}: This controller builds-up a standard {@link konga.directive:searchPane search pane} with all fields configured in the metadata to be <i>searchable</i>. It also appends a {@link konga.directive:resultTable result table} with the search results (having as columns every one declared to be <i>shown in results</i>).
 * * {@link konga.controller.EntityUpdateController `entity-update`}: This controller builds-up a standard {@link konga.directive:updateForm update form} with all fields configured in the metadata to be <i>shown in update</i>.
 *
 * #### Component controllers
 *
 * * {@link konga.controller.MultiSelectController multi-select}: Controls all processes for the multi-select UI component. <b>TODO</b> Move to a directive, and `deprecate`.
 * * {@link konga.controller.SingleSelectController single-select}: Controls all processes for the single-select UI component. <b>TODO</b> Move to a directive, and `deprecate`.
 *
 *
 * ### Directives
 * 
 * #### Form directives
 * 
 * * {@link konga.directive:searchPane `search-pane`}: Creates a search pane with all the fields configured to be <i>searchable</i>.
 * * {@link konga.directive:resultTable `result-pane`}: Creates a result table with all fields configured to be <i>shown in results</i>.
 * * {@link konga.directive:updateForm `update-form`}: Creates a form with all fields configured to be <i>shown in update</i>.
 *
 * #### Component directives
 *
 * * {@link konga.directive:rawInput `raw-input`}: Creates a form field that changes it's appearance depending on the field type.
 * * {@link konga.directive:listInput `list-input`}: Creates a list to render a complex field.
 * * {@link konga.directive:tableHeader `table-header`}: Creates a header for a table column.
 * * {@link konga.directive:tableCell `table-cell`}: Creates a cell for a table.
 * * {@link konga.directive:kongaSelect `konga-select`}: Provides functionality to the `single-select` and `multi-select` components.
 *
 * #### Util directives
 * 
 * * {@link konga.directive:scrollWatcher `scroll-watcher`}: Provides a method for listening to scroll changes on the target UI component.
 *
 * #### Misc directives
 *
 * * {@link konga.directive:menu `menu`}: Renders a menu for the application (i.e. navbar).
 * * {@link konga.directive:menuItem `menu-item`}: Renders a menu item.
 * * {@link konga.directive:formInfo `form-info`}: Creates a component that displays basic data for the entity being shown in update mode.
 *
 *
 * ### Filters
 *
 * * {@link konga.filter:mapField `map-eds-field`}: Receives an entity and a field metadata definition, and returns the value of such field within the entity. 
 * * {@link konga.filter:quickSearch `quick-search`}: Returns the fields within an entity definition configured to be used as <i>quick search</i> fields.
 * * {@link konga.filter:searchParams `search-params`}: Returns all fields from a entity metadata definition configured to be <i>searchable</i>
 * * {@link konga.filter:resultParams `result-params`}: Returns all fields from a entity metadata definition configured to be <i>shown in results</i>
 * * {@link konga.filter:updateParams `update-params`}: Returns all fields from a entity metadata definition configured to be <i>shown in updates</i>
 * * {@link konga.filter:selectData `select-data`}: Receives a set of entities, and returns the same list but with only the fields required for a single-select or multi-select.
 * * {@link konga.filter:shortify `shortify`}: Receives an String and a length, and returns a substring of that length.
 * * {@link konga.filter:tableRendererComplex `table-renderer-complex`}: Serializes a complex field to be shown in a table cell.
 * * {@link konga.filter:translateComplex `translate-complex`}: Configures a complex field to be translated using standard `translate` filter. 
 *
 *
 * ### Services
 *
 * * {@link konga.actionManager `action-manager`}: Defines and controls all available actions to dispatch from the application. <b>TODO</b> extract the action definitions elsewhere.
 * * {@link konga.api `api`}: Connects the UI with the REST services that handle the information.
 * * {@link konga.Common `common`}: Stores stuff that's accessible all across the application.
 * * {@link konga.configurationManager `configuration-manager`}: Handles all configuration for the application (defined via metadata).
 * * {@link konga.fieldMapper `field-mapper`}: Helps mapping a field's value into a given entity. 
 * * {@link konga.metadata `metadata`}: Connects to the metadata REST service to receive all application definition.
 * * {@link konga.permissionManager `permission-manager`}: Handles the permissions for the application.
 * * {@link konga.Scaffold `scaffold`}: Builds-up new entities for creating, and queries for searching.
 *
 */

/**
 * @ngdoc overview
 * @name konga
 * @module konga
 * @description
 * #New konga UI
 * # Processes
 * 
 * ## Authentication
 * TODO Document
 * 
 * ## Metadata retrieval
 * Once the user is authenticated, all service calls for the api will have an authentication header, that will be used in the service to verify the identity, and provide the permissions the user has. 
 * Such permissions would allow the user to manage entities from the interface, and perform some of the <i>CRUD</i> operations (those she has permissions for). 
 *
 * ## Interface management
 * Entity information is received from the api, and it contains enough information to build a user interface using it. Thus, the metadata information must contain all fields involved, including its data types, validation information, default values, etcetera (please see the <a href="NGE_DEV_GUIDE">Technical Documentation</a> for details on available metadata information).
 * The system is capable of building user interfaces for searching entities, updating them, or creating new ones. Thanks to Angular's `$resource` class, all entities are engaged to the service they come from, and therefore you can permanently persist a change on the database by just calling the methods `$save` and `$create`, and scaffold new service-engaged entities by instantiating the class.
 *
 * # Routes
 * `/home`: Goes to the home screen and displays the favorites and other stuff.
 * `/eds/:edsType/search`: Allows to search for entities.
 * `/eds/:edsType/:edsId`: Updates an entity. If the `edsId` value is 'new', it creates a new entity.
 * `/login`: Logs in into the application
 */
angular.module('konga', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'ui.bootstrap',
  'ui.bootstrap.datetimepicker',
  'mgcrea.ngStrap.popover',
  'mgcrea.ngStrap.select',
  'pascalprecht.translate',
  'dialogs.main',
  'config',
  'ui.calendar'
])
.config(['$httpProvider',  function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    // Configure routes
    $routeProvider
      .when('/entity/:entityType/search/', {
        templateUrl: '/konga/views/entity-search.html',
        controller: 'EntitySearchController'
      })
      .when('/entity/:entityType/:entityId/', {
        templateUrl: '/konga/views/entity-update.html',
        controller: 'EntityUpdateController'
      });
  }
])
.config(['$translateProvider', 'i18n', function($translateProvider, i18n) {

    for(var lang in i18n) {
      $translateProvider.translations(lang, i18n[lang]);
    }
    

    // Setting up spanish as default
    $translateProvider.preferredLanguage('en');
    //moment.locale('en');
  }]);
'use strict';

/**
 * @ngdoc object
 * @name konga.constants
 * @description
 * Stores common constants used all across the application
 * @property {string} API_HOST Defines where is the api located
 * @property {string} ENTITY_ID_PREFFIX Defines the preffix for ENTITY operations
 * @property {string} SEARCH_SUFFIX Defines the suffix for search purposes
 * @property {string} STRING_SEPARATOR Defines the separator for Strings
 * @property {string} NEW_ENTITY_ID Defines the eds id when creating a new one
 * @property {string} SOURCE_METADATA Defines the entity name of the metadata
 * @property {string} SCOPE_SEARCH Defines the search scope name
 * @property {string} SCOPE_UPDATE Defines the update scope name
 * @property {string} FIELD_BOOLEAN Defines the type name of a boolean field
 * @property {string} FIELD_CHECKBOX Defines the type name of a checkbox field
 * @property {string} FIELD_DATE Defines the type name of a date field
 * @property {string} FIELD_TEXT Defines the type name of a text field
 * @property {string} FIELD_COMPLEX Defines the type name of a complex field
 * @property {string} DATE_DEFAULT_NOW Defines the default value for date objects, to set-up as current date
 * @property {string} MULTIPLICITY_ONE Defines the String to define one-to-one multiplicity
 * @property {string} MULTIPLICITY_MANY Defines the String to define many-to-many multiplicity
 *
 */
var constants = {

	ALERT_TYPE_ERROR 					: 'danger',
	ALERT_TYPE_SUCCESS 					: 'success',
	ALERT_TYPE_DEFAULT 					: 'default',
	ALERT_TYPE_WARNING 					: 'warning',

	ENTITY_ID_PREFFIX 					: 'entity_',

	SEARCH_SUFFIX 						: '_search',

	STRING_SEPARATOR					: '_',

	NEW_ENTITY_ID 						: 'new',

	REFRESH_SEARCH_KEY 					: 'refreshSearchKey_',

	SCOPE_SEARCH 						: 'search',
	SCOPE_RESULTS 						: 'results',
	SCOPE_UPDATE 						: 'update',

	FIELD_STRING 						: 'STRING',
	FIELD_NUMBER 						: 'NUMBER',
	FIELD_PLAIN 						: 'PLAIN',
	FIELD_PASSWORD 						: 'PASSWORD',
	FIELD_BOOLEAN 						: 'BOOLEAN',
	FIELD_CHECKBOX 						: 'CHECKBOX',
	FIELD_COMBOBOX 						: 'COMBOBOX',
	FIELD_DATE 							: 'DATE',
	FIELD_DATETIME 						: 'DATETIME',
	FIELD_DATESEARCH 					: 'DATE-SEARCH',
	FIELD_TEXT 							: 'TEXT',
	FIELD_TEXTAREA 						: 'TEXTAREA',
	FIELD_COMPLEX 						: 'COMPLEX',
	FIELD_LIST 							: 'LIST',
	FIELD_PICK_LIST 					: 'PICK_LIST',
	FIELD_SELECT 						: 'SELECT',
	FIELD_FILTERED_SELECT 				: 'FILTERED_SELECT',
	FIELD_TICS 							: 'TICS',
	FIELD_COLOR 						: 'COLOR',
	FIELD_CSS 							: 'CSS',
	FIELD_FILE 							: 'FILE',
	FIELD_IMAGE 						: 'IMAGE',
	FIELD_PRICE 						: 'PRICE',
	FIELD_CUSTOM 						: 'CUSTOM',
	FIELD_PLAIN_FILTERED 				: 'PLAIN_FILTERED',
	FIELD_TABLE 						: 'TABLE',
	// FIELD_LIST_SEARCH					: 'list_search',
	// FIELD_LIST_LINK						: 'list_link',

	DATE_DEFAULT_NOW 					: 'now',

	MULTIPLICITY_ONE 					: 'ONE',
	MULTIPLICITY_MANY 					: 'MANY',

	TRIGGER_MOMENT_IMMEDIATE 			: 'IMMEDIATE',
	TRIGGER_MOMENT_COMMIT 				: 'COMMIT',
	TRIGGER_TYPE_CONFIRM 				: 'CONFIRM',
	TRIGGER_TYPE_ALERT 					: 'ALERT',
	TRIGGER_PARAM_LABEL 				: 'label',

	TRIGGER_MATCH_VALUE 				: 'VALUE',
	TRIGGER_MATCH_LENGTH 				: 'LENGTH',

	TRIGGER_MATCH_TYPE_EXACT			: 'EXACT_MATCH',
	TRIGGER_MATCH_TYPE_RANGE	  		: 'RANGE',

	CASCADE_FORM 						: 'CASCADE',
	TABBED_FORM 						: 'TABBED',
	CUSTOM_TABBED_FORM 					: 'CUSTOM_TABBED',
	CUSTOM_FORM 						: 'CUSTOM',

	CATEGORIZED_CASCADE_FORM 			: 'CATEGORIZED_CASCADE',

	LANGUAGE_MESSAGE_PREFFIX 			: 'message.languages.',

	DATE_COMPARATOR_LOWER_THAN 			: 'LOWER_THAN',
	DATE_COMPARATOR_LOWER_EQUALS 		: 'LOWER_EQUALS',
	DATE_COMPARATOR_EQUALS 				: 'EQUALS',
	DATE_COMPARATOR_GREATER_EQUALS 		: 'GREATER_EQUALS',
	DATE_COMPARATOR_GREATER_THAN 		: 'GREATER_THAN',
	DATE_COMPARATOR_BETWEEN 			: 'BETWEEN',

	NUMBER_COMPARATOR_LOWER_THAN 		: 'LOWER_THAN',
	NUMBER_COMPARATOR_LOWER_EQUALS 		: 'LOWER_EQUALS',
	NUMBER_COMPARATOR_EQUALS 			: 'EQUALS',
	NUMBER_COMPARATOR_GREATER_EQUALS 	: 'GREATER_EQUALS',
	NUMBER_COMPARATOR_GREATER_THAN 		: 'GREATER_THAN',
	NUMBER_COMPARATOR_BETWEEN 			: 'BETWEEN',

	VALIDATOR_EXACT_MATCH 				: 'EXACT_MATCH',
	VALIDATOR_RANGE 					: 'RANGE',

	
	MAXLEN_FILTER_NAME              	: 30,

	ACTION_TYPE_MODAL 					: 'modal',
	ACTION_TYPE_NOTIFY 					: 'notify',
	ACTION_TYPE_CONFIRM 				: 'confirm',
	ACTION_TYPE_TAB 					: 'tab',
	ACTION_TYPE_FUNCTION 				: 'function',
	
	ACTION_RESTRICTION_POLICY_ALL 		: 'all'	,

	USER_ID								: 'userId',
	
	COMBO_NATURE_TIERS					: 'natTiers',	

	CONFIGURATION_IGNORE_PARENT_FIELD 	: 'IGNORE_PARENT_FIELD',
	CONFIGURATION_USE_VIEW 				: 'USE_VIEW',

	TAB_TYPE_SEARCH 					: 'glyphicon glyphicon-search',
	TAB_TYPE_UPDATE 					: 'glyphicon glyphicon-pencil',
	TAB_TYPE_HOME 						: 'glyphicon glyphicon-home',
	TAB_TYPE_TASKS 						: 'glyphicon glyphicon-tasks',
	TAB_TYPE_GRID 						: 'glyphicon glyphicon-th',
	TAB_TYPE_GRID_LARGE 				: 'glyphicon glyphicon-th-large',
	TAB_TYPE_STORE 						: 'glyphicon glyphicon-shopping-cart',
	TAB_TYPE_CONFIG 					: 'glyphicon glyphicon-cog',

	FORM_STYLE_HORIZONTAL 				: 'HORIZONTAL',
	USE_SHORT_LABEL 					: 'USE_SHORT_LABEL',
	
	FILE_TYPE_PDF						: 'application/pdf',
	FILE_TYPE_PNG						: 'image/png',
	FILE_TYPE_JPG						: 'image/jpeg',
	FILE_TYPE_GIF						: 'image/gif',
	FILE_EXT_PNG						: '.png',
	FILE_EXT_JPG						: '.jpg',
	FILE_EXT_GIF						: '.gif',

	CASCADE_UPDATE 						: 'CASCADE_UPDATE',
	PROPAGATE_UPDATE 					: 'PROPAGATE_UPDATE',
	DISABLE_COMPLEX_FIELD 				: 'DISABLE_FIELD',

	SELF_FIELD 							: '$self',
	COMPLEX_FIELD_AS					: 'as',
	
	UPDATE_CUSTOM_VIEW 					: 'UPDATE_CUSTOM_VIEW',
	SEARCH_CUSTOM_VIEW 					: 'SEARCH_CUSTOM_VIEW',

	UPDATE_HIDE_BUTTONS 				: 'UPDATE_HIDE_BUTTONS',

	WEEKDAYS 							: ['day.sunday', 'day.monday', 'day.tuesday', 'day.wednesday', 'day.thursday', 'day.friday', 'day.saturday'],
	WEEKEND_DAYS 						: ['day.saturday', 'day.sunday'],

	MONTHS 								: ['month.january', 'month.february', 'month.march', 'month.april', 'month.may', 'month.june', 'month.july', 'month.august', 'month.september', 'month.october', 'month.november', 'month.december'],

	SEARCH_USE_CATEGORY 				: 'USE_SEARCH_CATEGORY',
	RESULTS_USE_CATEGORY 				: 'USE_RESULTS_CATEGORY',
	HIDE_CATEGORY_HEADER 				: 'HIDE_CATEGORY_HEADER',

	QUERY_PARAM_REGEXP 					: /^{\w+}$/,
	QUERY_COMPLEX_PARAM_REGEXP 			: /^{(\w+\.\w+)*}$/,

	SHOW_PAGINATION 					: 'SHOW_PAGINATION',
	TABLE_CELL_RENDERER 				: 'TABLE_CELL_RENDERER',
	TABLE_CELL_FILTER 					: 'TABLE_CELL_FILTER',
	READ_ONLY 							: 'READ_ONLY',

	TABLE_CONF_X_AXIS_PROPERTY 			: 'X_AXIS_PROPERTY',
	TABLE_CONF_Y_AXIS_PROPERTY 			: 'Y_AXIS_PROPERTY',
	TABLE_CONF_X_AXIS_MIN 				: 'X_AXIS_MIN',
	TABLE_CONF_Y_AXIS_MIN 				: 'Y_AXIS_MIN',
	TABLE_CONF_X_AXIS_MAX 				: 'X_AXIS_MAX',
	TABLE_CONF_Y_AXIS_MAX 				: 'Y_AXIS_MAX',
	TABLE_CONF_X_AXIS_STEP 				: 'X_AXIS_STEP',
	TABLE_CONF_Y_AXIS_STEP 				: 'Y_AXIS_STEP',

	LOOK_AND_FEEL_PLAIN 				: 'plain',
	LOOK_AND_FEEL_TABS 					: 'tabs',
	CONFIG_LOOK_AND_FEEL 				: 'look-and-feel',

	HIDE_WHEN_CREATING 					: 'hide-when-creation',
	HIDE_WHEN_UPDATING 					: 'hide-when-updating'
};
'use strict';

/*
 * @ngdoc function
 * @name konga.controller:EntityDetailsController
 * @description
 * # EntityDetailsController
 * Controller of the konga
 */
angular.module('konga')
  .controller('EntityDetailsController', function ($scope) {
    // TODO
  });

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
  .controller('EntitySearchController', ['$scope', 'api', '$routeParams', 'common', '$rootScope', '$filter', 'scaffold', '$timeout', 'permissionManager', 'util', 
  	function ($scope, api, $routeParams, common, $rootScope, $filter, scaffold, $timeout, permissionManager, util) {
  		
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
      
      if (!$rootScope.paginationData) {
        $rootScope.paginationData = {};
      }

      if (!$rootScope.paginationData[entityType]) {
        $rootScope.paginationData[entityType] = {};
        $rootScope.paginationData[entityType].count = 0;
        $rootScope.paginationData[entityType].limit = 20;
        $rootScope.paginationData[entityType].offset = 1;
      }

      /**
       * @ngdoc object
       * @propertyOf konga.controller:EntitySearchController
       * @name paginationCount
       * @description
       * 
       * Stores the current limit setup in the pagination configuration. 
       */
      $scope.paginationCount = $rootScope.paginationData[entityType].limit + "";

      /**
       * @ngdoc object
       * @propertyOf konga.controller:EntitySearchController
       * @name entityMetadata
       * @description
       * 
       * Holds the metadata of the entity being managed. It's retrieved via {@link konga.common `common`} -> {@link konga.common#methods_getMetadata `getMetadata`} method.
       */
      var metadata = $scope.entityMetadata = common.getMetadata(entityType);

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
        
      } else {
        pageData.searchResults = $scope.searchResults;

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
    	  $rootScope.paginationData[entityType].count = 0;
        $rootScope.paginationData[entityType].offset = 1;

        if(!pagingOnly) {
          $rootScope.paginationData[entityType].limit = 20;
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

        var paging = $rootScope.paginationData;
        
        if (query === undefined) {
        	query = angular.copy($scope.query);
        }
        
        if (query.resetPaging) {
            $scope.resetPaginationData(true);
            query.resetPaging = undefined;
        }
        
        if (query.resetSorting) {
        	$scope.fieldsShowInResult = $filter('resultParams')($scope.fieldsShowInResult, $scope.entityMetadata);
          query.resetSorting = undefined;
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

'use strict';

/**
 * @ngdoc controller
 * @name konga.controller:EntityUpdateController
 * @description
 * # EntityUpdateController

 * Responsible for handling updating - and creating - operations with entities, for Konga {@link Standards.Forms `standards`}. Same as happens with search, this controller it's normally initialised once user requests an {@link Standards.Operations#methods_openEntityUpdate `openEntityUpdate()`} - for updating an existing entity, or {@link Standards.Operations#methods_openEntityCreate `openEntityCreate()`} to create a new one.
 *
 * <img src="/static/konga-entity-update-basic-flow.png" width="40%" class="center">
 *
 * The `EntityUpdateController`'s responsibility is just for operation management, whilst the graphical - rendering, validating... - responsibility lays on the {@link konga.directive:updateForm `updateForm`} directive. 
 *
 *
 * # Updation/Creation flow
 *
 * Once the `EntityUpdateController` engages, it passes through several flows depending on the configuration, and on the user interaction with the available actions. Here you have an excerpt of the flows `EntityUpdateController` moves through:
 *
 * <img src="/static/konga-update-flow.png" width="50%" class="center">
 *
 * ## Rendering
 *
 * On **rendering** phase, the `EntityUpdateController` reads the `metadata` and determines whether the user can perform the operation rquested. After that, using the input the controller asks the {@link konga.api `api`} to return the existing entity (for updating) or the {@link konga.scaffold `scaffold`} service to craft a new one. This, along with entity deletion - which in `creation` mode it will never be enabled - is the only feature who makes updation and creation differ. 
 *
 * Once the permissions are dealt with, the entity got, and the mode resolved, the `EntityUpdateController` leaves the rendering responsibility to the {@link konga.directive:updateForm `updateForm`}, who continues the process.
 *
 * ## Input
 *
 * Every time a field's value changes, a process is launched. This process will handle validation, data mapping - to store the field's value within the entity, and any propagation or linking defined on the {@link Metadata.Field field's metadata}. On the {@link konga.directive:rawInput `rawInput`} documentation there's the full guide on how changes are tracked and the validation and mapping processes work.
 *
 * ## Submit
 *
 * On submit, the {@link Customisation.Action_Driven#properties_save `save`} action is launched. This action basically sends the entity to your API, letting you know the result via a `toastr`. If the operation went right, the view will close, coming back to where you were before.
 *
 * @param {$scope} $scope
 * `EntityUpdateController`'s `$scope`. It contains all basic attributes and features for searching, and it provides information to the underlying directives. 

 * @param {Object} api 
 <span class="label type-hint type-hint-object">{@link konga.api `api`}</span>
 Service for performing the API calls for retrieving the results. By default any entity consumes the {@link konga.standardApi `standardApi`}. However, controllers rely on the {@link konga.api `api`} service, as it allows you to easily define a different API handler for each entity. See the {@link konga.api `api`} documentation for more details.

 * @param {$routeParams} $routeParams 
 The `EntityUpdateController` uses the `$routeParams` to retrieve information about the entities. As you have seen on the {@link Standards.Apps Apps} definition, there are two default `$routes` engaged into any Konga app. That `$routes` contain information about the `:entityName` (the entity metadata's name), used to retrieve the metadata using the {@link Standards.Tools `util`} stystem. 

 * @param {Object} common 
 <span class="label type-hint type-hint-object">{@link konga.common `common`}</span>
 The storage is used internally to handle data-saving operations, mainly for tab management - you go out of this tab, come back, and everything is as you left it.

 * @param {$rootScope} $rootScope 
 Injected to access global {@link Standards.Operations `operations`}.

 * @param {$filter} $filter
 Used for filtering data - e.g. {@link konga.filter:mapField `field mapping`} and other Angular native filtering.

 * @param {Object} fieldMapper
 <span class="label type-hint type-hint-object">{@link konga.fieldMapper `fieldMapper`}</span>
 Used to map input's value into the entity.

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
.controller('EntityUpdateController', ['$scope', 'api', '$routeParams', 'common', '$rootScope', '$filter', 'fieldMapper', 'scaffold', '$timeout', 'permissionManager', 'util', 
  	function ($scope, api, $routeParams, common, $rootScope, $filter, fieldMapper, scaffold, $timeout, permissionManager, util) {
	  	// Get the local params
		var entityType = $routeParams.entityType;
		var entityId	= $routeParams.entityId;

		$scope.alreadyValidated = false;

		function updateChanges() {
			// See if there are changes
			var hasChanges = false;
			if ($scope.changes.length > 0) {
			  // Emit the changes notification
			  hasChanges = true;
			}

			$scope.$emit('changes', { pageId: pageData.pageId, hasChanges: hasChanges });
			$scope.$emit('changesCtrOperat', { type: entityType, hasChanges : hasChanges });
		}

		function verifyMatchType(matchType, fieldValue, triggerValue) {
			var matches = false;
			switch(matchType) {
	        	case util.constants.TRIGGER_MATCH_TYPE_EXACT:
	        		matches = (fieldValue+"") === triggerValue;
	        		break;
	        	case util.constants.TRIGGER_MATCH_TYPE_RANGE:
	        		matches = fieldValue >= triggerValue;
	        		break;
	        	}
	        	//TODO others type match

	        return matches;
		}

		function verifyTrigger(trigger, value, okHandler, koHandler) {
			var matchType = trigger.matchType;
        	var matches = false;

        	// TODO Verify trigger type
        	switch(trigger.match) {
        	case util.constants.TRIGGER_MATCH_VALUE:
        		matches = verifyMatchType(matchType, value, trigger.value);
        		break;
        	case util.constants.TRIGGER_MATCH_LENGTH:
        		var length = 0;
        		if (value != null) length = value.length;
        		matches = verifyMatchType(matchType, length, trigger.value);
        		break;
        	}

	          // Does the trigger criteria match?
          if (matches) {
            // TODO Verify 'changed' flag
          
          	// Convert parameters
          	var params = [];
          	for(var f = 0; f < trigger.parameters.length; f++) {
          		var strParam = trigger.parameters[f];
          		var arrParam = strParam.split('#');
          		var param = null;
          		switch(arrParam[0]) {
          		case util.constants.TRIGGER_PARAM_LABEL:
          			param = arrParam[1];
          			break;
          		}

          		params.push(param);
          	}

            // Verify trigger type
            switch (trigger.type) {
            case util.constants.TRIGGER_TYPE_CONFIRM:
				// TODO Change appearance
            	if(trigger.moment == util.constants.TRIGGER_MOMENT_IMMEDIATE && trigger.name == 'disable-entity'){
            		
            		if($scope.creating == undefined || $scope.creating == null || $scope.creating == false) {

            			// Is the form valid?
            			if($scope.entityUpdate.$invalid || $scope.invalid) {
            				var actionDefinition = {
            					name: 'action-form-invalid'
            				};

            				$rootScope.operations.dispatchAction(actionDefinition);
            				return;
            			}

            			$rootScope.operations.confirm(params[0], params[1], okHandler, koHandler);
            		}
            	}
            	else{
            		$rootScope.operations.confirm(params[0], params[1], okHandler, koHandler);
            	}
              break;
             case util.constants.TRIGGER_TYPE_ALERT:
             	$rootScope.operations.notify(params[0], params[1]);
              break;
            // TODO Other types
            default:
              break;
            }
          }
		}

		function verifyTriggers(moment, metadata, value, okHandler, koHandler) {
	        // TODO Verify scope

			switch (moment) {
			// Verify immediate triggers
 			case util.constants.TRIGGER_MOMENT_IMMEDIATE:
 				var triggers = $filter('filter')(metadata.triggers, { moment: moment });

		      	for (var i = 0; i < triggers.length; i++) {
	 				verifyTrigger(triggers[i], value, okHandler, koHandler);
		        }
 				break;

 			case util.constants.TRIGGER_MOMENT_COMMIT:
 				angular.forEach(metadata.fields, function(field) {
 					var triggers = $filter('filter')(field.triggers, { moment: moment });
 					var fieldValue = value[field.name];

			      	for (var i = 0; i < triggers.length; i++) {
		 				verifyTrigger(triggers[i], fieldValue);
			        }
 				});
 				break;
			}
		}

		// Get the search element
		// TODO Conditionalify (¿?¿?¿?¿?)
		var metadata = $scope.entityMetadata = common.getMetadata(entityType);

		var localEndpoint = api.getLocalEndpoint(metadata.name);

		// Initialize the entity
		$scope.entity = {};
		$scope.params = {};

		// Setup the form style
      	// By default we append no class, as it's a 'standard' form
      	$scope.formStyle = '';

      	switch($scope.metadata.updateStyle) {
      	case util.constants.FORM_STYLE_HORIZONTAL:
      		$scope.formStyle = 'form-horizontal';
      		break;
      	}
		
	    // See if the entity is eresable
	    $scope.deletable = $scope.entityMetadata.deleteable != null && (entityId !== util.constants.NEW_ENTITY_ID);
	    $scope.disabledDelete = false;
	    
		var allFields = util.getEntityFields($scope.entityMetadata);
		$scope.fields = $filter('filter')(allFields, { editable: true });

		// Get product codes
		//var productCodes = $scope.productCodes = common.read('product-codes');

		// Get configuration for showing buttons
		$scope.showActions = true;
		var configuration = $scope.entityMetadata.configuration;
		var buttonConfiguration = $filter('filter')(configuration, { key: util.constants.UPDATE_HIDE_BUTTONS }, true)[0];
		if(buttonConfiguration && buttonConfiguration.value === 'true') {
			$scope.showActions = false;
		}

		var pageData = $rootScope.pageData;
		
		var validationData = null;

		$scope.invalid = false;
		$scope.customDisableValider = false;

		if(pageData.init) {
			$scope.entity = pageData.entity;
			$scope.changes = pageData.changes;
			validationData = pageData.validationData;
			if($rootScope.pageData.creating){
				$scope.creating = $rootScope.pageData.creating;
			}
			
			updateChanges();
		} 
		else {

			validationData = pageData.validationData = {};

			// Verify if we are creating or updating
			if (entityId != util.constants.NEW_ENTITY_ID) {

			  // Request a loader
			  $rootScope.operations.requestLoading('update_' + entityId);

			  // Get the path for the call
			  var path = metadata.apiPath;

			  // Try and get from storage
			  var entity = common.read(entityId);
			  if(entity) {
			  	$scope.entity = pageData.entity = entity;
			  	entityId = util.getEntityId(metadata, entity);
			  }
			  else {
				  // Get the current entity
				  $scope.entity = pageData.entity = localEndpoint.get({path: path, id: entityId}, function(data) {
				    pageData.original = angular.copy($scope.entity);
				    $rootScope.operations.freeLoading('update_' + entityId);
				  });
			  }

			} else {
			  $scope.creating = true;
			  $rootScope.pageData.creating = $scope.creating;

			  var newEntity = scaffold.newEntity($scope.entityMetadata, localEndpoint);
			  
			  $scope.entity = pageData.entity = newEntity;
			  pageData.original = angular.copy($scope.entity);

			  // Delete the new entity from common
			  // FIXME Find a place to do this
			  // common.deleteKey('new-entity'); 
			}

			$scope.changes = pageData.changes = [];
			pageData.init = true;
		}

		function waitEntityResolve(escaped, path, extraPath) {
			// Verify if it's resolved
	        // if(escaped.$resolved !== false) {
	        //   // TODO Propagate
	        // }
	        // else {
	          var resolveWatcher = $scope.$watch('entity.' + path + extraPath + '.$resolved', function() {
	            if(escaped.$resolved) {
	              
	              /*
	               * Let's propagate!!
	               */

	              // Get all fields
	              var fields = util.getEntityFields($scope.entityMetadata);

	              // Move along the fields
	              for(var i = 0; i < fields.length; i++) {
	                // Get the field
	                var field = fields[i];

	                // Get the path
	                var fieldPath = field.fieldPath;

	                /*
	                 * With the path of the updated field, we could know if a field is related
	                 * by comparing index of.
	                 * e.g. path = 'parentAgence' & fieldPath = 'parentAgence.parentSociete.codeEds' => RELATED
	                 */
	                var fieldRelated = fieldPath.indexOf(path) === 0;

	                // Is it related?
	                if (fieldRelated) {
	                  var message = {
	                    value: $filter('mapField')($scope.entity, fieldPath)
	                  };
	                  $scope.$broadcast('update_' + fieldPath, message);
	                }
	              }

	              resolveWatcher();
	            }
	          });
	        // }
		}

		
		function hasPermission(permission) {
			var isAllowed = false;
			// Verify permissions
  			if(permissionManager.isAllowed(permission)) {
  				  isAllowed = true;
  			}
  			
  			if(!isAllowed) {
  				$rootScope.operations.dispatchAction({ name: 'action-forbidden'}, {});
  			}
  			return isAllowed;
		}
		
		
		/*
		* TODO Document
		*/
		$scope.operations = {
				
			dispatchEntityAction: function(name) {

				// Disable the validate button
				$scope.alreadyValidated = true;

				// Re-enable the validate button (delayed)
				$timeout(function() {
					$scope.alreadyValidated = false;
				}, 3000);

				// Get the defaults override
		  		var overrideDefaults = $scope.entityMetadata.overrideDefaults;
		  		var matchingActions = null;
		  		if(overrideDefaults.length) {
		  			matchingActions = $filter('filter')(overrideDefaults, { overrides: name });
		  		}
				
		  		var actionParams =  {
	  					id: entityId, 
	  					entityType: entityType, 
	  					self: $scope, 
	  					item: $scope.entity,
	  					data: $scope.params
	  			};
		  		
				switch(name){
			  	case 'save':
			  		var permission = $scope.entityMetadata.editable;
					// Verify permissions
					if (hasPermission(permission)) {
			  		
				  	    // Custom action
				  		if(matchingActions && matchingActions.length) {
				  			$rootScope.operations.dispatchActionBatch(matchingActions, actionParams);
				  		} else {
				  		// Default action
				  			$scope.operations.saveEntity();
				  		}
				  		
				  		//Set refreshSearch = true, when we comeback to search screen, it will run the search again
						var refreshSearchKey = util.constants.REFRESH_SEARCH_KEY + entityType;
						common.store(refreshSearchKey,true);
				  		
					} 
			  		
			  		break;
			  	case 'delete':
			  		//TODO
			  		break;
				}
			},	
				
			
			updateChanges: function() {
				updateChanges();
			},
			
			/*
			 * TODO Document
			 */
			saveEntity: function(handlerOK, handlerKO) {
				var actionParams =  {
		  					id: entityId, 
		  					entityType: entityType, 
		  					self: $scope, 
		  					item: $scope.entity,
		  					params: $scope.params
				};

				// Verify commit triggers
			    verifyTriggers(util.constants.TRIGGER_MOMENT_COMMIT, $scope.entityMetadata, $scope.entity);

				var entity = $scope.entity;

				function handlerDefaultOK(data) {
					actionParams.data = data;
					$rootScope.operations.dispatchAction({name: 'save-ok'}, actionParams);
				}
				function handlerDefaultKO(error) {
					actionParams.error = error;
					$rootScope.operations.dispatchAction({name: 'save-ko'}, actionParams);
				}
				if (!handlerOK) handlerOK = handlerDefaultOK;
				if (!handlerKO) handlerKO = handlerDefaultKO;

				$scope.params.path = metadata.apiPath;
				
				 // Verify if the entity is new
				if(entityId === util.constants.NEW_ENTITY_ID) {
				    // Create eds
				    entity.$create($scope.params, handlerOK, handlerKO);
				  } else { 
				    // Save eds
					entity.$save($scope.params, handlerOK, handlerKO);
				  }

			},

			cancelUpdate: function() {
				
			  // Remove all page parameters
			  pageData.init = false;

			  // Close the page
			  $rootScope.operations.closeTabById(pageData.pageId);
			},
			
//			confirmCtrOperat : function () {
//				function okSaveEntity() {
//					$scope.operations.saveEntity();
//				}
//				function koSaveEntity() {
//				}
//			
//				 $rootScope.operations.confirm('message.entiteDeletable.deleting.title', 'message.entiteDeletable.deleting.message', okSaveEntity, koSaveEntity);
//			},
			

			deleteEntity: function() {		
				
				var actionParams =  {
	  					id: entityId, 
	  					entityType: entityType, 
	  					self: $scope, 
	  					item: $scope.entity,
	  					params: $scope.params
			    };
				
				function okDeleteEntity() {
					var path = $scope.entityMetadata.apiPath;
					localEndpoint.delete({ path: path, id: util.getEntityId($scope.entityMetadata, entity)}, 
							function success() {
								$rootScope.operations.addAlert(util.constants.ALERT_TYPE_SUCCESS, 'message.action-confirmation.delete.success'); 
								// Remove all page parameters
								pageData.init = false;
								$scope.$emit('changes', { pageId: pageData.pageId, hasChanges: false });
								// Close the page
								$rootScope.operations.closeTabById(pageData.pageId);
							}, 
							function error(error) {							
								
								actionParams.error = error;
								$rootScope.operations.dispatchAction({name: 'delete-ko'}, actionParams);
								
							});
				}			
				
				function koDeleteEntity() {					
				}
		      
				// Verify permissions
				var permission = $scope.entityMetadata.deleteable;
	  			if(permissionManager.isAllowed(permission)) {
					var entity = $scope.entity;
	
	 			    // Verify if the entity is not new
				    if (entityId !== util.constants.NEW_ENTITY_ID) {
					  $rootScope.operations.confirm('message.delete-entity.title', 'message.delete-entity.message', okDeleteEntity, koDeleteEntity);
				    }	
				    
				    //Set refreshSearch = true, when we comeback to search screen, it will run the search again
					  var refreshSearchKey = util.constants.REFRESH_SEARCH_KEY + entityType;
					  common.store(refreshSearchKey,true);
	  			} else {
		  			 var forbidden = {
		  			 	name: 'action-forbidden'
		  			 };
		  			$rootScope.operations.dispatchAction(forbidden);
	  			}	  
			},

		
			changeEntityField: function(metadata, result) {
				// Trigger callbacks
				function okHandler() {
					var refreshSearchKey = util.constants.REFRESH_SEARCH_KEY + entityType;
					common.store(refreshSearchKey,true);
            		$scope.operations.saveEntity();
            	}

            	function koHandler() {
            		// TODO Change when storing actions.
	                var undoValue = angular.copy(result);
	                undoValue.text = oldValue;

	                $scope.operations.updateEntityField(metadata, undoValue, $scope.entity);

	                $scope.$broadcast('update_' + metadata.owner + '_' + metadata.name, {/* TODO Add something here */});
            	}

				var fieldValue = result.text;
				if ($scope.entity.$resolved === false) {
					return;
				}

				// Is there any difference?
				var oldValue = $filter('mapField')(pageData.original, metadata);
				var differs = fieldValue !== oldValue;

			    var index = $scope.changes.indexOf(metadata.name);

			    // Has changes?
			    if (differs && index === -1) {
			      $scope.changes.push(metadata.fieldName);

			      	// Verify immediate triggers
			   		verifyTriggers(util.constants.TRIGGER_MOMENT_IMMEDIATE, metadata, fieldValue, okHandler, koHandler);
			    } else if(!differs && index !== -1) {
				  // Or not?
			      $scope.changes.splice(index, 1);
			    }
			    updateChanges();
			    
			    return differs;
			},

			/*
			 * TODO Document
			 */
			updateEntityField: function(metadata, value, entity, parentField, parentEntity) {
			  // Persist the changes on the entity
			  var result = fieldMapper.unmapField(metadata, entityType, entity, value, parentField, parentEntity);
			  
			  if (result) {
			    // Get the escaped value
			    var escaped = result.escaped;
			    if (escaped) {

			      // Verify if it's a resource (see if field type is 'complex')
			      var fieldType = metadata.fieldType;
			      var multiplicity = metadata.multiplicity;
			      if (fieldType === util.constants.FIELD_COMPLEX || fieldType == util.constants.FIELD_LIST) {
			    	// If multiplicity is one, we create an array only with it
			      	// Otherwise we use the source array
			      	var path = result.path;
			      	var extraPath = '';
			      	if(escaped.$resolved !== false) {

				      	// If no item is selected, we update the field as-is
				      	if (!escaped.length) {
				      		var eventName = 'update_' + metadata.owner + '_' + metadata.name;
				      		$scope.$broadcast(eventName, {/* TODO Add something here */});
				      	}

				      	// Now let's listen to changes
				      	for (var i = 0; i < escaped.length; i++) {
				      		if (multiplicity === util.constants.MULTIPLICITY_MANY) {
				      			extraPath += '[' + i + ']';
				      		}
				      		waitEntityResolve(escaped[i], path, extraPath);
				      	}
			      	} else {
			      		waitEntityResolve(escaped, path, '');
			      	}
			      }
			    }
			  }
			  return result;
			}
		};

		$scope.$on('entity-deletable', function(conf, data) {
			$scope.deletable = data.deletable;
			$scope.disabledDelete = data.disabledDelete;		
		});
		
		$scope.$on('entity-updatable-custom', function(conf, data) {
			$scope.customDisableValider = data.disabledUpdate;				
		});
		
		$scope.$on('discard', function(conf, data) {
			if (data.pageId === pageData.pageId) {
			  // Are we updating?
			  if (entityType !== 'new') {
			    // we charge from REST because we have it cached
			    $scope.entity = pageData.entity = localEndpoint.get({id: entityType});
			  }
			}
		});

		$scope.$on('tab-has-changes', function(conf, data) {
			
			(data.hasChange) ? $scope.changes.push(data.field) : $scope.changes.pop(data.field);
			updateChanges();
		});
		function controlValidation() {
			$scope.invalid = false;
			for(var field in validationData) {
				if(validationData[field].length) {
					$scope.invalid = true;
					break;
				}
			}
		}

		controlValidation();

		$scope.$on('form-invalid', function(conf, invalid) {
			var fieldName = invalid.owner + '-' + invalid.field;
			var validation = invalid.validation;
			var valid = invalid.valid;

			if(valid) {
				if(validationData[fieldName]) {
					var index = validationData[fieldName].indexOf(validation);
					if(index !== -1) {
						validationData[fieldName].splice(index, 1);
					}
					if(!validationData[fieldName].length) {
						delete validationData[fieldName];
					}
				}
			}
			else {
				if(!validationData[fieldName]) {
					validationData[fieldName] = [];
				}

				var index = validationData[fieldName].indexOf(validation);

				if(index === -1) {
					validationData[fieldName].push(validation);
				}
			}

			controlValidation();
		});
		
		$scope.$on('form-reset-invalid-date', function() {
			// check all dates validation to ensure no errors are present in form
			for (var name in validationData) {
			    if (validationData.hasOwnProperty(name)) {
			    	var clone = validationData[name].slice(0);
			    	for (var i = 0 ; clone != undefined && i < clone.length; i++) {
				        // do stuff
						switch (clone[i]) {
						case "DATE_GE":
						case "DATE_GT":
						case "DATE_LE":
						case "DATE_LT":	
							validationData[name].splice(i, 1);
							if (validationData[name].length == 0) {
								delete validationData[name];
							}
							break;
						}
			    	}
			    }
			}
			controlValidation();
		});
		$scope.$on('closeCtrOperat', function() {
			$rootScope.operations.closeTabById(pageData.pageId);
		});
		$scope.$on('createCtrOperat', function() {
			var refreshSearchKey = util.constants.REFRESH_SEARCH_KEY + entityType;
			common.store(refreshSearchKey,true);
			$scope.operations.saveEntity();
		});
  }]);

'use strict';

/**
 * @ngdoc controller
 * @name konga.controller:KongaController
 * @module konga
 * @description
 * This must be the root controller of the application, and it's suggested to be placed at the `<body>` element. It contains all common {@link Standards.Operations `operations`}. 
 *  
 * 
 *
 * # Tab management
 * The application uses tabs to locate their content, and separate it from other sections with different content. All functionalities of this tab management are located within this controller. 
 * ## Adding a tab
 * You can add a new tab by including a new <i>tab definition</i> object inside the tab stack, which lays under the `$scope`. This stack is propagated to the `$rootScope` to allow other controllers to access such information.
 * A <i>tab definition</i> must be a plain JS object, with the following structure:
 * ```
 * {
 *		// Id of the tab
 *		id: tabId, 
 *
 *		// Title for the tab
 *		title: tabTitle, 
 *
 *		// Link of the tab (i.e. the route)
 *		href:'/entity/' + entityMetadata.name + '/search', 
 *
 *		// Whether the tab could be closed
 *		closable: true,
 *
 *		// Entity metadata
 *		entityMetadata : entityMetadata
 *	}
 * ```
 * The example above is the exact tab object that's used to launch an <b>ENTITY search</b> form, with a given <i>metadata</i>. Within the `entityMetadata` parameter is located the definition of the entity, which may be required elsewhere.
 *
 * ## Remove tabs
 * Tabs are configured so they could be closed directly by the user via a small &2718; located on the tab's header. This is only possible if the tab has its `closable` flag set to `true`.
 * Internally, tab closing is just a matter of removing its definition from the stack. `Angular` and `ui.bootstrap` will handle its removal from the view.
 *
 * ## Predefined methods
 * There are several methods within this controller that provide tab management for the existing tabs that the application use. This eases the development as the methods generate the tab object automatically, and the tab is brought to front when created. All such methods are part of an object called `operations`, that belongs to the local `$scope` and it's furthermore propagated through the `$rootScope` to be accessible by the other controllers. 
 * 
 * ### goHome
 * By calling this function, a `/home` tab will be created, and the location will change to the application's home page.
 * 
 * ### openEntitySearch
 * It creates a new tab for <i>entity</i> searching. It <b>must</b> receive an entity definition, like the ones defined within the {@link konga.Metadata metadata} service calls.
 *
 * ### openEntityUpdate
 * When called, it launches a new tab whose purpose is to update an <i>entity</i> It must receive the {@link konga.Metadata metadata} information from the entity, as well as the entity itself.
 *
 * ### openEntityCreate
 * This method does the exactly same operation as the `openEntityUpdate`, but with the purpose of creating a new <i>entity</i>. It only requires to receive the {@link konga.Metadata metadata} information, and a new {@link konga.Scaffold scaffold} object for the received entity type will be created. 
 * 
 * # Notifications
 * This controller handles the notifications, that are shown to the user in the form of a <i>bootstrap</i> `alert`. Every controller within the application can use this system, by calling the operation `addAlert` available on the `$rootScope`. It's useful to notify the user when a server-related operation finished, both for success and error response types. Notification system is engaged on any place where the `$rootScope` dependency is included. 
 *
 * 
 * # Loading processes
 * When the data required to use some specific view is not yet received, you can append a loader to the application, that would block every possible interaction with the interface until the loading process ends. For such purpose, you have the possibility of <b>requesting a load</b>, and of <b>freeing it</b> once your data is ready. You can use the operations `requestLoading(code)` and `freeLoading(code)`, where `code` is a unique string that identifies the source who requested the loader. The value of such variable is up to you, but it should be unique in order for the loader to work properly. Both operations are available from the `$rootScope.Operations` object. 
 *
 * @param {$scope} $scope Contains the scope variables for the controller
 * @param {$location} $location Controls the location of the app (for changing paths)
 * @param {$filter} $filter Uses filters to manage data
 * @param {$rootScope} $rootScope Propagates functionality to other levels
 * @param {Common} common Common methods for storing data 
 * @param {Scaffold} scaffold Used to create new objects for the entities
 */
angular.module('konga')
	.controller('KongaController', ['$scope', '$location', '$filter', '$rootScope', '$timeout','common', 'scaffold', '$translate', 'userData', '$cookieStore', 'actionManager', '$modal', 'permissionManager', 'kongaConfig', 'util', 'dialogs',
		function($scope, $location, $filter, $rootScope, $timeout,common, scaffold, $translate, userData, $cookieStore, actionManager, $modal, permissionManager, kongaConfig, util, dialogs) {

			$scope.configConstants = kongaConfig;

			/*
			 * @name tabs
			 * @object
			 * @description
			 * Tabs array
			 * Object for home tab. 
			 * Tab must have id, title to display, href if change controller needed,
			 * closable set true to display close tab button, templateInclude is the html template to display in the tab content.
			 */
			$rootScope.tabs = $scope.tabs = [];

			// Contains the current tab's id
			$scope.tabId = null;
			$scope.tabExtra = {};
			$rootScope.alerts = $scope.alerts = [];

			$rootScope.tabWatch = $scope.tabWatch = {
				enabled: true
			};

			$scope.loading = [];
			$scope.loadingMessage = null;

			/**
			 * @ngdoc object
			 * @name Standards.Operations
			 * @description 

			 Konga comes with several built-in operations to easy you perform quick-common tasks - with your app, the metadata, the user...

			 # Graphical aids <span class="label label-success">UI</span>

			 ## Alerts

			 Konga includes quick functionality for launching alerts to the user. An alert adopts the form of a `toastr`, and functionality for dissapearing after a few seconds. 

			 This functionality is triggered using the {@link Standards.Operations#methods_addAlert `addAlert`} method.

			 Alerts could be configured for showing different kinds of information. If you want to show an error, you'd like to use the `error` type, while for notifying a successful operation result you'd use `success`. Here you have an example of all types:

			<div class="alert-container row" style="margin-top: 2em;">
				<div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 text-center">
					<div class="alert bg-success">
						I'm a <strong>success</strong> alert
					</div> 
				</div>
				<div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 text-center">
					<div class="alert bg-primary">
						I'm an <strong>info</strong> alert
					</div> 
				</div>
				<div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 text-center">
					<div class="alert bg-warning">
						I'm a <strong>warning</strong> alert
					</div> 
				</div>
				<div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 text-center">
					<div class="alert bg-danger">
						I'm an <strong>error</strong> alert
					</div> 
				</div>
			</div>

			If you want to remove an alert before it's `$timeout` finishes and it removes autommatically, you can use {@link Standards.Operations#methods_removeAlert `removeAlert`} method, that will immediately remove it from the stack.

			## Modal dialogs

			Sometimes is useful to ask user for explicit confirmation upon certain action execution. Other times becomes handy to show a notification dialog with some info, warning, exception... Konga includes built-in features for handling these things:

			### Notifications

			Notifications are handled by the {@link Standards.Operations#methods_notify `notify`} method. With this method you will launch a modal dialog with some information, and user will only be able to close it and keep doing what he was doing. 

			### Confirmations

			If you need explicit user confirmation for executing a task, you can leverage {@link Standards.Operations#methods_confirm `confirm`} method, and you will have your confirmation shown. Depending on the user's choice on the confirmation, you will have triggered your `okHandler` or your `koHandler`, where you should continue doing the functionalities you were asking confirmation for. 

			* **TODO Example**

			### Loaders

			Your application might rely heavily on one or further data providers - i.e. APIs. When data is loading, normally users are disallowed to perform operations that require such data to be ready. To overcome this, you can use Konga's {@link Standards.Operations#methods_requestLoading `requestLoading`} operation, providing it with a unique String identifying what is what you are trying to load. Once the data comes, and the app is again ready to serve it, you can call the {@link Standards.Operations#methods_freeLoading `freeLoading`} method, with the same String, and that loader will be released. 

			Konga loading uses a {@link KongaController.loading `loaders`} array, and the two methods menctioned above insert and removes elements into that array. If the `loaders` array has any element, a global loader will appear, blocking the whole screen from users to operate with the application. Once every element is removed from the `loaders` array, the graphical loader will disappear, and the user could resume the usage of the app.

			* **TODO Example**

			When your app is loading everything would be blocked, and the user wouldn't be able to perform any operation. It the estimated loading time is real short, user wouldn't mind about this. But it you are about to perform a heavy data load - or any other operation that would leave the user unable to use the app for a long time - you can append a message to the graphical loader, so the users have some more info about what's going on. This is achieved using the {@link Standards.Operations#methods_setLoadingMessage `setLoadingMessage`} method, that receives a String, tries to translate it, and renders the result into the loading view.

			Konga uses the loaders for all standard operations that require data retrieval.

			# Views <span class="label label-success">UI</span>

			## Modal views

			Sometimes along your app's development, you will find yourself wanting to open a modal for rendering some content. Konga supports native modal opening, using {@link Standards.Operations#methods_openModal `openModal`} method. This method receives a {@link Standards.Data%20types#properties_Modal `Modal`} object definition and renders a modal with the configuration you set up on it.

			* **TODO Example**

			To maintain controlled the `$watcher` count, once a modal opens natively, all `$watchers` enabled on the elements behind the modal are suspended, and resumed back once the modal closes. 

			## Tabs

			As we have seen on the {@link Standards.Apps `apps`} page, Konga is in its basis a tab-based engine. 

			Furthermore the standard tabs - created on standard operations {@link Standards.Operations#methods_openEntitySearch `openEntitySearch`} and {@link Standards.Operations#methods_openEntityUpdate `openEntityUpdate`} - you can append custom tabs to your own features, by using {@link Standards.Operations#methods_addTab}. Tabs are stored at {@link konga.controller:KongaController#properties_tabs `tabs`} array, accessible everywhere via `$rootScope`. You can close them using {@link Standards.Operations#methods_closeTab `closeTab`}, {@link Standards.Operations#methods_closeTabById `closeTabById`}, and {@link Standards.Operations#methods_closeAllTabs `closeAllTabs` methods}.

			Structure of a tab is defined on the {@link Standards.Data%20types#properties_Tab `Tab`} specification. 

			* **TODO Example**

			# Standard forms <span class="label label-danger">CORE</span>

			Form generation features let you generate rich forms based on a metadata for an entity. Metadata objects could be easily retrieved using {@link Standards.Tools#methods_getMetadata `util.getMetadata('entityName')`} method. Once we have a metadata object we want a form from, there are three operations you could use:

			* * **{@link Standards.Operations#methods_openEntitySearch `openEntitySearch`}:** Opens a search form.
			* * **{@link Standards.Operations#methods_openEntityUpdate `openEntityUpdate`}:** Opens an update form.
			* * **{@link Standards.Operations#methods_openEntityCreate `openEntityCreate`}:** Opens an update form, with a brand new {@link konga.scaffold `scaffolded`} entity.

			These methods generate the {@link Standards.Forms forms}, appends a tab into the system, and redirects the user to it. Except for creating, an API call will be needed, so a loader appends whilst the request is flying. Once it returns, the loader is released and the data rendered, and the user is able to start using the form.

			# Customisation <span class="label label-danger">CORE</span>

			## Action dispatching

			TODO

			## Redirections

			 */
		  	$rootScope.operations = $scope.operations = {

		  		/**
		  		 * @ngdoc method
		  		 * @name addAlert
		  		 * @methodOf Standards.Operations
		  		 * @param {string} type The type of alert (e.g. `success`, `error`). It inherites _Bootstrap_'s `bg-...` classes.
		  		 * @param {string} message The message for the alert
		  		 * @param {Object=} parameters If the message provided is a placeholder for a locale-provided text, you can give the translator a key-value parameters for the message.
		  		 * @description
		  		 * Show a toast alert to the user, with a translatable/parametrizeable message.
		  		 */
		  		addAlert: function(type, msg, parameters) {
		  			var alert = {
		  				type: type,
		  				msg: msg,
		  				parameters: parameters ? parameters : {},
		  				expired: false
		  			};

		  			 var newLength = $scope.alerts.push(alert);
		  			
		  			//Automatically remove the alert
		  			$timeout(function() {
		  				//$scope.alerts.splice(newLength-1, 1);
		  				 alert.expired = true;
		  	          }, 4000); // TODO KONGA_ALERT_TIMEOUT
		  		},

		  		/**
		  		 * @ngdoc method
		  		 * @name removeAlert
		  		 * @methodOf Standards.Operations
		  		 * @param {Number} index the position of the alert within the stack.
		  		 * @description
		  		 * Removes an alert from the stack, and therefore from the screen. This method is executed automatically after alert timeout's reached
		  		 */
		  		removeAlert: function(index) {
		  			$scope.alerts.splice(index, 1);
		  		},

		  		/**
		  		 * @ngdoc method
		  		 * @name confirm
		  		 * @methodOf Standards.Operations
		  		 * @param {string} title The title for the confirmation dialog.
		  		 * @param {string} message The message for the confirm dialog
		  		 * @param {Function=} okHandler Callback to execute when the user confirms
		  		 * @param {Function=} koHandler Callback to execute when the user cancels
		  		 * @param {Object=} params Parameters for the translation messages and the handlers.
		  		 * @description
		  		 * Shows a confirm dialog, and execute custom actions depending on user's response.
		  		 */
		  		confirm: function(title, message, okHandler, koHandler, params) {
		  			var dlg = null;

		  			var localeTitle = $filter('translate')(title, params);
		  			var localeMessage = $filter('translate')(message, params);

		  			dlg = dialogs.confirm(localeTitle, localeMessage);
			        dlg.result.then(function(btn) {
			        	if (okHandler) {
			        		okHandler(btn, params);
			        	}
			        },function(btn){
			        	if (koHandler) {
			        		koHandler(btn, params);
			        	}
			        });
		  		},
		  		
		  		/**
		  		 * @ngdoc method
		  		 * @name notify
		  		 * @methodOf Standards.Operations
		  		 * @param {string} title The title for the confirmation dialog.
		  		 * @param {string} message The message for the confirm dialog
		  		 * @param {String=} [type=notify] Type of dialog (inherited from Bootstrap's `bg...` classes)
		  		 * @param {Object=} params Parameters for the translation messages and the handlers.
		  		 * @description
		  		 * Shows a notification to the user.
		  		 */ 
		  		notify: function(title, message, type, params) {
		  			// If no type is provided, we notify
		  			if(!type) type = 'notify';

		  			var actionParameters = params ? params.parameters : {};

		  			if(type === 'confirm') {
		  				this.confirm(title, message, params.okHandler, params.koHandler, actionParameters);
		  				return;
		  			}

		  			var dlg = null;

		  			var localeTitle = $filter('translate')(title, actionParameters);
		  			var localeMessage = $filter('translate')(message, actionParameters);

		  			dlg = dialogs[type](localeTitle, localeMessage);
		  		},

		  		/**
		  		 * @ngdoc method
		  		 * @name openEntitySearch
		  		 * @methodOf Standards.Operations
		  		 * @param {Entity|String} metadata The metadata of the entity (or it's name) to be searched.
		  		 * @oaram {Object=} params Parameters to create custom configuration for the pane
		  		 * @description
		  		 * Opens an entity-search tab to search an entity.
		  		 */
		  		openEntitySearch: function(entityMetadata, params) {
		  			if(typeof entityMetadata === 'string') {
		  				entityMetadata = util.getMetadata(entityMetadata);
		  			}

		  			// Generate the id for the new tab
		  			var tabId = util.constants.ENTITY_ID_PREFFIX + 
		  						entityMetadata.name + 
		  						util.constants.SEARCH_SUFFIX;

		  			var tabTitle = 'message.tabs.entity.search';

		  			var extra = $scope.tabExtra[tabId] = {};
		  			extra.label = $filter('translate')(entityMetadata.label);
		  			extra.labelPlaceholder = entityMetadata.label;

		  			var tab = {
						id : tabId, 
						title : tabTitle, 
						href : '/entity/' + entityMetadata.name + '/search/', 
						closable : true,
						// Entity metadata
						entityMetadata : entityMetadata,
						type: util.constants.TAB_TYPE_SEARCH
					};

					if(params) {
						for(var param in params) {
							tab[param] = params[param];
						}
					}

					// Add the tab
					$scope.operations.addTab(tab);
		  		},

		  		/**
		  		 * @ngdoc method
		  		 * @name openEntityUpdate
		  		 * @methodOf Standards.Operations
		  		 * @param {Entity|String} metadata The metadata of the entity (or it's name) to be updated.
		  		 * @param {Object} entity The entity to be updated
		  		 * @oaram {Object=} params Parameters to create custom configuration for the pane
		  		 * @description
		  		 * Opens an entity-update tab to update a given entity.
		  		 */
		  		openEntityUpdate: function(entityMetadata, entity, params) {
		  			if(typeof entityMetadata === 'string') {
		  				entityMetadata = util.getMetadata(entityMetadata);
		  			}

		  			var entityId = null;
		  			if(!params || !params.useEntity) {
		  				entityId = util.getEntityId(entityMetadata, entity);
		  			}
		  			else {
		  				entityId = 'stored-entity-' + new Date().getTime();
		  				common.store(entityId, entity);
		  			}

		  			// Generate the id for the new tab
		  			var tabId = util.constants.ENTITY_ID_PREFFIX + 
		  					entityMetadata.name + util.constants.STRING_SEPARATOR + entityId;

		  			var entityCode = util.getEntityCode(entityMetadata, entity);

		  			// TODO Externalize
		  			var tabTitle = entity ? 
		  					'message.tabs.entity.update' : 'message.tabs.entity.create';

	  				var extra = $scope.tabExtra[tabId] = {};

	  				extra.label = $filter('translate')(entityMetadata.label);
	  				extra.code = entityCode;
	  				extra.labelPlaceholder = entityMetadata.label;
	  				
	  				var tab = {
	  						id : tabId, 
	  						title : tabTitle, 
	  						href : '/entity/' + entityMetadata.name + '/' + entityId + '/',
	  						closable : true,
	  						hasChanges : false,
	  						// Entity metadata
	  						entityMetadata : entityMetadata,
							type: util.constants.TAB_TYPE_UPDATE
	  				};

	  				if(params) {
						for(var param in params) {
							tab[param] = params[param];
						}
					}

					// Add the tab
					$scope.operations.addTab(tab);
		  		},

		  		/**
		  		 * @ngdoc method
		  		 * @name openEntityCreated
		  		 * @methodOf Standards.Operations
		  		 * @param {Entity} metadata The metadata of the entity to be updated.
		  		 * @description
		  		 * Opens an entity-update tab to create a new entity of the metadata given.
		  		 */
		  		openEntityCreate: function(entityMetadata, params) {
		  			if(typeof entityMetadata === 'string') {
		  				entityMetadata = util.getMetadata(entityMetadata);
		  			}

		  			// Verify permissions
		  			var permission = entityMetadata.createable;
		  			if(permissionManager.isAllowed(permission)) {
		  				$scope.operations.openEntityUpdate(entityMetadata, null, params);
		  			}
		  			else {
		  				var forbidden = {
		  					name: 'action-forbidden'
		  				};
		  				$scope.operations.dispatchAction(forbidden);
		  			}
		  		},

		  		/**
		  		 * @ngdoc method
		  		 * @name openModal
		  		 * @methodOf Standards.Operations
		  		 * @param {Modal} parameters The parameters that define the action. {@link lib.konga.types.Modal `See Modal specification`}
		  		 * @description
		  		 * Opens an entity-update tab to update a given entity. The parameters are given in a {@link lib.konga.types.Modal `Modal`} object.
		  		 */
		  		openModal: function(action) {
		  			var config = action.parameters.config || {
		  				size: 'md'
		  			};

		  			$rootScope.$broadcast('suspend', {});

		  			var currentTab = null;
			  	
		  			var modalInstance = $modal.open({
				      templateUrl: action.template,
				      controller: action.controller,
				      size: config.size,
				      resolve:{
				  		params: function(){
				  			return action.parameters;
				  		}	
				      }
				    });
		
				    modalInstance.result.then(function() {
				    	$rootScope.$broadcast('resume', {});
				    	action.okHandler.apply(action, arguments);
				    }, function() {
				    	$rootScope.$broadcast('resume', {});
				    	action.koHandler.apply(action, arguments);
				    });
		  		},

		  		/**
		  		 * @ngdoc method
		  		 * @name addTab
		  		 * @methodOf Standards.Operations
		  		 * @param {Tab} tab The tab configuration
		  		 * @description
		  		 * Opens a tab with the configured {@link DataTypes.Tab `parameters`}.
		  		 */
				addTab : function(newTab) {
					// Get the active tab
					var tabActive = $filter('filter')($scope.tabs, { active: true })[0];

					// Verify existence
					var existingTabs = $filter('filter')($scope.tabs, { id: newTab.id }, true);
					if (!existingTabs.length) {
						if (newTab.type === util.constants.TAB_TYPE_UPDATE) {
							var indexActive = $scope.tabs.indexOf(tabActive);
							$scope.tabs.splice(indexActive + 1, 0, newTab);

							existingTabs.push(newTab);

						} else {

							// Push the new tab						
							$rootScope.tabs.push(newTab);
							existingTabs.push(newTab);
						}

						// Do we need to set-up the metadata?
						if(!newTab.entityMetadata && newTab.entityType) {
							newTab.entityMetadata = util.getMetadata(newTab.entityType);
						}
					}
					
					// Save the previous tab
					existingTabs[0].previousTab = tabActive;

					$scope.operations.redirectTo(existingTabs[0]);
				},

				/**
		  		 * @ngdoc method
		  		 * @name closeTab
		  		 * @methodOf Standards.Operations
		  		 * @param {Tab} tab tab to be closed
		  		 * @param {Boolean=} force whether to force closing (and discard changes - if any)
		  		 * @description
		  		 * Closes the tab given. If the tab has change management enabled, and there is any change on the model, a confirmation will show. If you pass force=true, you will override confirmation and the tab will be instantly closed.
		  		 */
				closeTab : function(tab, force) {
					var changesOKHandler = function() {
						deleteTab(i, tab);

						// Reset the changes
						$scope.$broadcast('discard', { pageId: tab.id });
					};

					var changesKOHandler = function() {
						// Do nothing
					};

					for (var i = 0; i < $rootScope.tabs.length; i++) {
						if ($scope.tabs[i].id === tab.id) {							
							// Are there new changes?
							if (tab.hasChanges && !force) {
								$scope.operations.confirm(
									"message.discard-changes.title", 
									"message.discard-changes.message",
									changesOKHandler,
									changesKOHandler
								);
							} else {
								deleteTab(i, tab);
							}
							return;
						}
					}

					function deleteTab(index, tab) {
						$rootScope.tabs.splice(i,1);
						if ($scope.updateData && $scope.updateData['tab.id']) {
							delete $scope.updateData['tab.id'];
						}

						// Delete pageData from common
						common.deletePageData(tab.id);

						// On tab close, go to previously opened one
						if(tab.previousTab && $rootScope.tabs.indexOf(tab.previousTab) !== -1) {
							$timeout(function() {
								$scope.operations.redirectTo(tab.previousTab);
							}, 500);
						}
						
					}
				},

				/**
		  		 * @ngdoc method
		  		 * @name closeTabById
		  		 * @methodOf Standards.Operations
		  		 * @param {id} id id of the tab to be closed
		  		 * @description
		  		 * Closes the tab that matches an id given. If no tab is found, it doesn't do anything.
		  		 */				
				closeTabById: function(id) {
					for(var i=0; i<$rootScope.tabs.length; i++){
						if ($scope.tabs[i].id === id) {
							$scope.operations.closeTab($scope.tabs[i], false);
							break;
						}
					}
				},
				
				/**
		  		 * @ngdoc method
		  		 * @name closeAllTabs
		  		 * @methodOf Standards.Operations
		  		 * @param {Boolean=} force whether to force closing (and discard changes - if any)
		  		 * @description
		  		 * Closes all opened tabs
		  		 */
				closeAllTabs: function(force) {
					var copyTabs = $rootScope.tabs.slice(0);
					for(var i=0; i<copyTabs.length; i++){
						$scope.operations.closeTab(copyTabs[i], force);
					}
				},

				/**
		  		 * @ngdoc method
		  		 * @name redirectTo
		  		 * @methodOf Standards.Operations
		  		 * @param {Tab} tab tab to be focused
		  		 * @description
		  		 * Switches the system into a tab. The tab <b>must be</b> in the `tab stack`.
		  		 */
				redirectTo : function(tab) {					
					angular.forEach($rootScope.tabs, function(item){item.active = false;});
					// Select the tab
					$rootScope.pageData = $scope.pageData = common.getPageData(tab.id);
					$rootScope.pageData.parameters = tab.parameters;
					$rootScope.tabs[$rootScope.tabs.indexOf(tab)].active = true;
					if ($location.path() !== tab.href) {
						$location.path(tab.href);
					}

					// Setup the tab id
					$scope.tabId = tab.id;
				},

				/**
		  		 * @ngdoc method
		  		 * @name requestLoading
		  		 * @methodOf Standards.Operations
		  		 * @param {string} id Unique id for the loader. It will be identified with this parameter for deletion when freed.
		  		 * @param {String=} message If defined, appends a message to the loader (useful for heavy loading)
		  		 * @description
		  		 * Appends a loader into the `loader stack`. When the stack contains elements, the whole screen is blocked until all loaders are freed.
		  		 */
				requestLoading: function(source, message) {
					$scope.loading.push(source);
					$scope.loadingMessage = message;
				},

				/**
		  		 * @ngdoc method
		  		 * @name freeLoading
		  		 * @methodOf Standards.Operations
		  		 * @param {string} id Unique id for the loader. It must be the same id given when the loader was requested.
		  		 * @description
		  		 * Removes a loader from the `loader stack`. When the stack is emptied, the user recovers control of the screen.
		  		 */
				freeLoading: function(source) {
					var index = $scope.loading.indexOf(source);
					if (index === -1) {
						// TODO Throw exception
					}
					$scope.loading.splice(index, 1);
				},

				/**
		  		 * @ngdoc method
		  		 * @name setLoadingMessage
		  		 * @methodOf Standards.Operations
		  		 * @param {String=} message The message to set into the loading process
		  		 * @description
		  		 * During longer loading processes, you can redefine the message being shown via this method. The message will be live-updated, and you could provide the user with more information. This method is useful for uploading progresses.
		  		 */
				setLoadingMessage: function(message) {
					$scope.loadingMessage = message;
				},

				/**
		  		 * @ngdoc method
		  		 * @name changeLocale
		  		 * @methodOf Standards.Operations
		  		 * @param {String=} locale The language to change to
		  		 * @description
		  		 * This mehtod changes the language of the full engine and its running application. It also notifies via a {@link Events.locale-change `locale-change`} event broadcasted to all listening controllers.
		  		 */
				changeLocale: function(newLocale) {
					$scope.selectedLanguage = util.constants.LANGUAGE_MESSAGE_PREFFIX + newLocale;

					// Get the old locale
					var oldLocale = $translate.use();

					// Change the language
					$translate.use(newLocale);
					//moment.locale(newLocale);

					$scope.$broadcast('locale-change', { 'old': oldLocale, 'new': newLocale });
				},

				/**
				 * @ngdoc method
				 * @methodOf Standards.Operations
				 * @name dispatchAction
				 * @description
				 * Dispatches an action, within the scope the user's at, and attaching to it's execution the given parameters.
				 * 
				 * @param {Object} action
				 It contains the action to execute. It **must be an object**, and include a property called `name`, which must store the name for the action. 
				 * @param {Object} [parameters=new Object]
				 Add a set of parameters to the action's execution environment
				 */
		  		dispatchAction: function(action, parameters) {
		  			if(!parameters) parameters = {}; 
		  			actionManager.dispatch(action, parameters);
		  		},

		  		dispatchActionBatch: function(actions, parameters) {
		  			for(var i = 0; i < actions.length; i++) {
		  				$scope.operations.dispatchAction(actions[i], parameters);
		  			}
		  		}
		  		
		  	};

		  	// Listen to changes on the entities
		  	$scope.$on('changes', function(conf, data) {
		  		// Get the tab
		  		var tabs = $scope.tabs;
		  		var tab = null;
		  		for(var i = 0; i < tabs.length; i++) {
		  			tab = tabs[i];
		  			if (tab.id === data.pageId) {
		  				break;
		  			}
		  		}

		  		if (!tab) {
		  			// TODO Throw exception
		  		}

		  		// Setup the flag
		  		tab.hasChanges = data.hasChanges;
		  	});

		  	// Listen to language changes
		  	$scope.$on('locale-change', function() {
		  		// Change the locale in the tabs
		  		for(var item in $scope.tabExtra) {
		  			var extra = $scope.tabExtra[item];
		  			extra.label = $filter('translate')(extra.labelPlaceholder);
		  		}
		  	});
		}]);
'use strict';

/*
 * @ngdoc controller
 * @name konga.controller:MultiSelectController
 * @description
 * # MultiSelectController
 * Controller of the ui.konga
 */
angular.module('konga')
  .controller('MultiSelectController', ['$scope', '$filter', '$modalInstance', 'model', 'field', 'parentField', 'common', 'api', 'entity', 'metadata', 'items', '$timeout', '$rootScope', 'util', 
  	function ($scope, $filter, $modalInstance, model, field, parentField, common, api, entity, metadata, items, $timeout, $rootScope, util) {
   
   		$scope.id = 'multi-select';

	  	$scope.model = model;      
      	// Stores the selected value
      	$scope.selected = null;      	
      	
      	$scope.filter = {
      		value: ''
      	};

      	$scope.idField = null;

      	$scope.limit = 50;
      	$scope.offset = 0;

      	$scope.field = null;

      	$scope.loading = true;

      	var localEndpoint = null;

      	var relatedMetadata = null;

      	var scrollWatchEnabled = true;

      	var allFetched = false;

      	var query = null;

      	var quickSearchFields = $scope.quickSearch = [];

	  	/**
		 * TODO Document
		 */
		$scope.multiselectModal = {
			contentUrl: '/konga/views/multi-select-modal.html',
			animation: 'am-fade-and-slide-top',
			save: function() {
				var newValue = $scope.model;			
				$modalInstance.close(newValue);
			},

			cancel: function () {
				$modalInstance.dismiss('cancel');
			}
		};

	  	function updateValue() {
      		var codes = [];
      		var ids = [];
      		var entity = [];
      		var selectedItems = $filter('filter')($scope.sourceList, { added: true });
      		if(selectedItems.length) {
      			for(var i = 0; i < selectedItems.length; i++) {
   					ids.push(selectedItems[i].id);
   					codes.push(selectedItems[i].key);
	      		}	

      			for(var f = 0; f < $scope.realList.length; f++) {
      				if(ids.indexOf($scope.realList[f][$scope.idField]) !== -1) {
      					entity.push($scope.realList[f]);
      				}
      			}
      		}
			$scope.model = {
				text: ids,
				ids: ids,
				entity: entity,
				metadata: relatedMetadata
			};
		}

		/**
		 * TODO Document
		 */
		$scope.operations = {
			init: function() {

				var entityType = null;
				if(field.type.type === util.constants.FIELD_COMPLEX) {
					entityType = field.type.complexType;
					$scope.field = field;
				}
				else if(field.isKey) {
					entityType = field.owner;
					$scope.field = field;
				}
				else {
					// TODO careful! :)
					entityType = parentField.type.complexType;
					$scope.field = parentField;
				}

				$scope.id = 'multi-select-' + entityType;

				relatedMetadata = util.getMetadata(entityType);

				quickSearchFields = $scope.quickSearch = $filter('quickSearch')(relatedMetadata);

				// Get the id fieldname to use it afterwards
        		$scope.idField = util.getEntityId(relatedMetadata, null, true);

				$scope.sourceList = [];
				$scope.realList = [];

				localEndpoint = api.getLocalEndpoint(entityType);

				$scope.callService();

				$scope.$on($scope.id + '-scroll-watcher', function(event, msg) {
					if(msg.relative > 0.7 && scrollWatchEnabled) {
						scrollWatchEnabled = false;
						$scope.scroll(msg);
					}
				});
			},

			toggle: function(item, selected) {
				if(selected === undefined) {
					selected = !item.selected;
				} 
				item.selected = selected;
			},

			add : function() {
				for (var code = 0; code < $scope.sourceList.length; code++) {
					// Get the item
					var item = $scope.sourceList[code];

					// Is it selected?
					if(item.selected) {
						item.added = true;
					}
					item.selected = false;
				}
				updateValue();
			},
		
			remove : function() {
				for (var code = 0; code < $scope.sourceList.length; code++) {
					// Get the item
					var item = $scope.sourceList[code];

					// Is it selected?
					if(item.selected) {
						item.added = false;
					}
					item.selected = false;
				}
				updateValue();
			},
		
			addAll : function() {
				if(allFetched) {
					for (var code = 0; code < $scope.sourceList.length; code++) {
						var item = $scope.sourceList[code];
						item.added = true;
						item.selected = false;
					}
					updateValue();
				}
				else {
					var configuration = {
						offset: 1,
						limit: 0
					};

					$scope.callService(configuration, function() {
						for (var code = 0; code < $scope.sourceList.length; code++) {
							var item = $scope.sourceList[code];
							item.added = true;
							item.selected = false;
						}
						updateValue();
					});
				}
			},
		
			removeAll : function() {
				for (var code = 0; code < $scope.sourceList.length; code++) {
					var item = $scope.sourceList[code];
					item.added = false;
					item.selected = false;
				}
				updateValue();
			}
		};

		$scope.scroll = function() {
        	$scope.offset += $scope.limit;

        	if(!allFetched) {
        		$scope.callService(undefined, function() {
					// try {
					// 	$scope.$apply();
					// } catch(e) {}
					// $scope.$broadcast('set-scroll', { relative: newScroll });
				});
        	}
		};

		$scope.treatData = function(data, callback) {
			if(data.length < $scope.limit) {
				allFetched = true;
			}

			// Is there any filter configured?
			var filter = $scope.field.type.filter;

			var newList = null;

			if(filter && filter.length) {
				try {
					newList = $filter(filter)(data);
				} catch(e) {
					// TODO Throw exception
					newList = data;
				}
			}
			else {
				newList = data;
			}

			var verifiedList = [];
			if($scope.offset > 1) {
				// Let's remove duplicates
				var idField = util.getEntityId(relatedMetadata, null, true);
				for(var i = 0; i < newList.length; i++) {
					var ok = true;
					for(var f = 0; f < $scope.realList.length; f++) {
						if(newList[i][idField] === $scope.realList[f][idField]) {
							ok = false;
							break;
						}
					}
					if(ok) {
						verifiedList.push(newList[i]);
					}
				}
			}
			else {
				verifiedList = newList;
			}

			var parsedList = $filter('selectData')(relatedMetadata, verifiedList);

			if($scope.offset === 0) {
				$scope.sourceList = parsedList;
				$scope.realList = verifiedList;
			}
			else {
				$scope.sourceList = $scope.sourceList.concat(parsedList);
				$scope.realList = $scope.realList.concat(verifiedList);
			}

			if($scope.model.entity) {
				// Configure already added
				var selectedIds = [];
				var selectedItems = [];
				for(var i = 0; i < $scope.model.entity.length; i++) {
					selectedIds.push($scope.model.entity[i][$scope.idField]);
					selectedItems.push($scope.model.entity[i]);
				}

				// Configure 'added' value
				for(var i = 0; i < $scope.sourceList.length; i++) {
					var index = selectedIds.indexOf($scope.sourceList[i].id);
					if(index !== -1) {
						$scope.sourceList[i].added = true;
						selectedItems.splice(index, 1);
						selectedIds.splice(index, 1);
					}
				}

				// Add added values who are not yet in the list
				var parsedEntities = $filter('selectData')(relatedMetadata, selectedItems, { added: true });
				$scope.sourceList = $scope.sourceList.concat(parsedEntities);
				$scope.realList = $scope.realList.concat(selectedItems);
			}

			if(callback) {
				callback();
			}

			scrollWatchEnabled = true;
			$scope.loading = false;
		};

		$scope.callService = function(configuration, callback) {
			$scope.loading = true;

			var oldQuery = query;

			query = $filter('queryParser')($scope.field, entity, oldQuery);

			query.path = relatedMetadata.apiPath;


			// Configure pagination
			query.offset = configuration && configuration.offset !== undefined ? configuration.offset : $scope.offset;
			query.limit = configuration && configuration.limit !== undefined ? configuration.limit : $scope.limit;

			// Configure ordering
			if(!query.sortBy) {
				query.sortBy = $scope.idField;
				query.sortAs = 'asc';
			}

			// TODO Find a better place to do this!
			var from = $scope.field.type.from;
			if(from) {
				var action = {
					name: from
				};

				var parameters = {
					query: query,
					metadata: relatedMetadata,
					self: $scope,
					okHandler: function(data) {
						$scope.treatData(data, callback);
					},
					koHandler: function() {
						// TODO Do something
					}
				};

				$rootScope.operations.dispatchAction(action, parameters);
			}
			else {
				localEndpoint.search(query, function(data) {
					$scope.treatData(data, callback);
				}, 
				function() {
					// TODO
				});
			}

			// localEndpoint.search(query, function(data) {
				
			// }, 
			// function(error) {
			// 	// TODO
			// });
		};

		$scope.timeout = 1;
		$scope.executeQuickSearch = function() {
			$scope.loading = true;
			$timeout.cancel($scope.timeout);
			$scope.timeout = $timeout(function() {

				for(var i = 0; i < quickSearchFields.length; i++) {
	              var field = quickSearchFields[i];
	              var name = field.metadata.apiName ? field.metadata.apiName : field.metadata.name;
	              // TODO Verify validation and all

	              query[name] = field.value;

	              if(!query[name].length) {
	                delete query[name];
	              }
	            }

				$scope.offset = 0;
				allFetched = false;
				$scope.callService(function() {
					// TODO Do something
				});			
			  
		  	}, 1000);
		};

	  }]);

'use strict';

/*
 * @ngdoc controller
 * @name konga.controller:SingleSelectController
 * @description
 * # SingleSelectController
 * Controller of the ui.konga
 */
angular.module('konga')
  .controller('SingleSelectController', ['$scope', '$filter', '$modalInstance', 'model', 'field', 'parentField', 'common', 'api', 'entity', 'metadata', 'items', '$timeout', '$rootScope', 'util', 
  	function ($scope, $filter, $modalInstance, model, field, parentField, common, api, entity, metadata, items, $timeout, $rootScope, util) {

  		$scope.id = 'single-select';

      	$scope.model = model;      
      	// Stores the selected value
      	$scope.selected = null;      	

      	$scope.filter = {
      		value: ''
      	};

      	$scope.idField = null;

      	$scope.limit = 50;
      	$scope.offset = 0;

      	$scope.field = null;

      	$scope.loading = true;

      	var localEndpoint = null;

      	var relatedMetadata = null;

      	var scrollWatchEnabled = true;

      	var allFetched = false;

      	var query = null;

      	var quickSearchFields = $scope.quickSearch = [];

      	/**
		 * TODO Document
		 */
		$scope.singleselectModal = {
			contentUrl : '/konga/views/multi-select-modal.html',
			animation : 'am-fade-and-slide-top',
			save: function() {
				var newValue = $scope.model;			
				$modalInstance.close(newValue);
			},

			cancel: function () {
				$modalInstance.dismiss('cancel');
			}
		};

      	function updateValue() {
      		var codes = [];
      		var ids = [];
      		var entity = null;
      		if($scope.selected) {
      			
      			var selected = [];
      			for(var i = 0; i < $scope.realList.length; i++) {
      				if($scope.realList[i][$scope.idField] === $scope.selected.id) {
      					selected.push($scope.realList[i]);
      				}
      			}

				// We are single-selecting, so get the first one of them
				if(selected.length) {
					entity = selected[0];
					codes.push($scope.selected.key);
					ids.push($scope.selected.id);
				}
      		}
			$scope.model = {
				text: ids,
				ids: ids,
				entity: entity,
				metadata: relatedMetadata
			};
		}

      	/*
         * TODO Document
         */
        $scope.operations = {
        	init: function() {

				//var list = [];
				
				var entityType = null;
				if(field.type.type === util.constants.FIELD_COMPLEX) {
					entityType = field.type.complexType;
					$scope.field = field;
				}
				else {
					// TODO careful! :)
					entityType = parentField.type.complexType;
					$scope.field = parentField;
				}

				$scope.id = 'single-select-' + entityType;

				relatedMetadata = util.getMetadata(entityType);

				quickSearchFields = $scope.quickSearch = $filter('quickSearch')(relatedMetadata);

				// Get the id fieldname to use it afterwards
        		$scope.idField = util.getEntityId(relatedMetadata, null, true);

				$scope.sourceList = [];
				$scope.realList = [];

				localEndpoint = api.getLocalEndpoint(entityType);

				$scope.callService();

				$scope.$on($scope.id + '-scroll-watcher', function(event, msg) {
					if(msg.relative > 0.7 && scrollWatchEnabled) {
						scrollWatchEnabled = false;
						$scope.scroll(msg);
					}
				});
			},

			toggle: function(item) {

				// Is it already selected?
				if (item == $scope.selected) {
					$scope.selected = null;
				} else {
					$scope.selected = item;
				}
				updateValue();
			}
        };

        $scope.scroll = function() {
        	$scope.offset += $scope.limit;

        	if(!allFetched) {
        		$scope.callService(function() {
					// try {
					// 	$scope.$apply();
					// } catch(e) {}
					// $scope.$broadcast('set-scroll', { relative: newScroll });
				});
        	}
		};

	$scope.treatData = function(data, callback){
			
			if(data.length < $scope.limit) {
				allFetched = true;
			}

			// Is there any filter configured?
			var filter = $scope.field.type.filter;

			var newList = null;

			// Do the field and the entity have the same type?
			if(entity && metadata.name === $scope.field.type.complexType) {
				// We need to remove the same element
				var idField = util.getEntityId(metadata, null, true);
				var filterObj = {};
				filterObj[idField] = entity[idField];

				var same = filterObj[idField] ? $filter('filter')(data, filterObj, true) : [];

				if(same.length) {
					var elt = same[0];
					var index = data.indexOf(elt);

					if(index !== -1) {
						data.splice(index, 1);
					}
				}
			}

			// Is there any filter configured?
			var filter = $scope.field.type.filter;

			var newList = null;

			if(filter && filter.length) {
				try {
					newList = $filter(filter)(data);
				} catch(e) {
					// TODO Throw exception
					newList = data;
				}
			}
			else {
				newList = data;
			}

			var parsedList = $filter('selectData')(relatedMetadata, newList);

			if($scope.offset === 1) {
				$scope.sourceList = parsedList;
				$scope.realList = newList;	
			}
			else {
				$scope.sourceList = $scope.sourceList.concat(parsedList);
				$scope.realList = $scope.realList.concat(newList);
			}

			if($scope.model.entity) {
				// Configure already added
				var selectedId = $scope.model.entity[$scope.idField];

				// Configure selected variable
				for(var i = 0; i < $scope.sourceList.length; i++) {
					if(selectedId === $scope.sourceList[i].id) {
						$scope.selected = $scope.sourceList[i];
						break;
					}
				}
			}

			if(callback) {
				callback();
			}

			scrollWatchEnabled = true;
			$scope.loading = false;
			
		};
		
		$scope.callService = function(callback) {
			$scope.loading = true;
			
			var oldQuery = query;

			query = $filter('queryParser')($scope.field, entity, oldQuery);

			query.path = relatedMetadata.apiPath;
	
			// Configure pagination
			query.offset = $scope.offset;
			query.limit = $scope.limit;
		

			// TODO Find a better place to do this!
			var from = $scope.field.type.from;
			if(from) {
				var action = {
					name: from
				};

				var parameters = {
					query: query,
					metadata: relatedMetadata,
					self: $scope,
					okHandler: function(data) {
						$scope.treatData(data, callback);
					},
					koHandler: function(error) {
						// TODO Do something
					}
				};

				$rootScope.operations.dispatchAction(action, parameters);
			}
			else {
				localEndpoint.search(query, function(data) {
					$scope.treatData(data, callback);
				}, 
				function(error) {
					// TODO
				});
			}
		};

		$scope.timeout = 1;
		$scope.executeQuickSearch = function() {
			$scope.loading = true;
			$timeout.cancel($scope.timeout);
			$scope.timeout = $timeout(function() {

				for(var i = 0; i < quickSearchFields.length; i++) {
	              var field = quickSearchFields[i];
	              var name = field.metadata.apiName ? field.metadata.apiName : field.metadata.name;
	              // TODO Verify validation and all

	              query[name] = field.value;

	              if(!query[name].length) {
	                delete query[name];
	              }
	            }

				$scope.offset = 0;
				allFetched = false;
				$scope.callService(function() {
					// TODO Do something
				});			
			  
		  	}, 1000);
		};
  }]);

'use strict';

/**
 * @ngdoc directive
 * @name konga.directive:calendarInput
 * @restrict E
 * @description
 *
 * The `calendarInput` is a {@link konga.directive:rawInput `rawInput`} field type that renders a {@link http://fullcalendar.io/ `fullcalendar`} as field's layout, if the {@link Metadata.Field field's} `fieldType` is set to {@link Metadata.FieldTypes#properties_CALENDAR `CALENDAR`}.
 *
 * The calendar field is just a container of objects, that have properties for defining an {@link http://fullcalendar.io/docs/event_data/Event_Object/ `Event Object`}. The calendar takes these properties and renders the events into the ui, giving you full access to your events - and the calendar for including new - through events.
 *
 * # <span class="text-success"><i class="fa fa-rocket"></i>Events</span>
 *
 * The `calendarInput` communicates with the outside via events. Events are fired on the ui component once an user triggers an action within its bounds. The events the `calendarInput` fires are:
 *
 * * **`calendar-day-clicked`:** Fired when the user clicks on a calendar day.
 * * **`calendar-event-clicked`:** Fired when the user clicks on an existing event.
 * * **`calendar-event-render`:** Used when an event finishes its `rendering` process.
 *
 * All events include a data object that gives enough contextual information about where the event has its origin, letting you fully interact with the calendar creating events on `day click`, or opening modals with an existing event information...
 * 
 * TODO Examples
 * 
 */
angular.module('konga')
  .directive('calendarInput', function () {
    return {
      templateUrl: '/konga/views/calendar-input.html',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        scope.uiConfig = {
	      calendar:{
	        height: 600,
	        editable: true,
	        header:{
	          left: '',
	          center: 'title',
	          right: 'today prev,next'
	        },
	        firstDay: 1,
	        events: scope.value.entity,
	        dayClick: function(date, jsEvent, view, resourceObj) {
	        	scope.$emit('calendar-day-click', 
	        		{ 
	        			date: date, 
	        			jsEvent: jsEvent, 
	        			view: view, 
	        			resourceObj: resourceObj 
	        		});
	        },
	        eventClick: function(date, jsEvent, view) {
	        	scope.$emit('calendar-event-click', {
	        		date: date,
	        		jsEvent: jsEvent,
	        		view: view
	        	});
	        },
	        eventDrop: function() {
	        },
	        eventResize: function() {

	        },
	        eventRender: function(event, element, view) {
	        	scope.$emit('calendar-event-render', 
	        		{ 
	        			event: event, 
	        			element: element,
	        			view: view
	        		});
	        }
	      }
	    };
      }
    };
  });

'use strict';

/**
 * @ngdoc directive
 * @name konga.directive:fileInput
 * @description
 * 
 * Renders a field for uploading files.
 * 
 */
angular.module('konga')
  .directive('fileInput', ['$upload', function () {
    return {
      templateUrl: '/konga/views/file-input.html',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        scope.fileSelected = function(files, event) {
          scope.value.files = files;
        };
      }
    };
  }]);

'use strict';

/**
 * @ngdoc directive
 * @name konga.directive:inputFormat
 * @description
 * # inputFormat
 */
angular.module('konga')
.directive('inputFormat', ['$filter', function ($filter) {
    return {
        require: '?ngModel',
        link: function (scope, elem, attrs, ctrl) {
            if (!ctrl) return;


            ctrl.$formatters.unshift(function (a) {
                return $filter(attrs.format)(ctrl.$modelValue)
            });


            ctrl.$parsers.unshift(function (viewValue) {
                var plainNumber = viewValue.replace(/[^\d|\-+|\.+]/g, '');
                elem.val($filter(attrs.format)(plainNumber));
                return plainNumber;
            });
        }
    };
}]);
'use strict';

/**
 * @ngdoc directive
 * @name konga.directive:kongaContent
 * @description
 * # kongaContent
 */
angular.module('konga')
  .directive('kongaContent', ['$filter', 'util', 
  	function ($filter, util) {
	    return {
	      templateUrl: '/konga/views/konga-content.html',
	      restrict: 'E',
	      replace: true,
	      link: function postLink(scope, element, attrs) {

	        function init() {
	        	var appConfiguration = util.getConfiguration();
	        
		        var appLookAndFeel = util.constants.LOOK_AND_FEEL_PLAIN;
		        var lookAndFeelConf = $filter('filter')(appConfiguration, { key: util.constants.CONFIG_LOOK_AND_FEEL }, true)[0];
		        if(lookAndFeelConf) {
		        	appLookAndFeel = lookAndFeelConf.value;
		        }

		        scope.contentView = '/konga/views/konga-content-' + appLookAndFeel + '.html';
	        }

	        if(util.metadataObject) {
	        	init();
	        }
	        else {
	        	scope.$on('metadata-ready', function() {
	        		init();
	        	});
	        }
	      }
	    };
	  }]);

'use strict';

/**
 * @ngdoc directive
 * @name konga.directive:kongaFieldName
 * @description
 * # kongaFieldName
 */
angular.module('konga')
  .directive('kongaFieldName', function ($compile, $parse) {
    return {
      restrict: 'A',
      terminal: true,
      priority: 100000,
      link: function postLink(scope, element, attrs) {
    	  var name = $parse(element.attr('konga-field-name'))(scope);
    	  
    	  element.removeAttr('konga-field-name');
    	  
    	  element.attr('name', name);
    	  
    	  $compile(element)(scope);
      }
    };
  });

'use strict';

/**
 * @ngdoc directive
 * @name konga.directive:kongaSelect
 * @description
 * # kongaSelect
 */
angular.module('konga')
  .directive('kongaSelect', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        scope.removeItem = function(index) {
          scope.value.entity.splice(index, 1);

          var value = scope.value.text.split(',');
          
          value.splice(index, 1);

          scope.value.text = value.join(',');
        }

        scope.writeValue = function() {
        	if(scope.value.entity instanceof Array) {
        		scope.value.entity.splice(0, scope.value.entity.length);
        	}
        	else {
        		scope.value.entity = {};
        	}
        };
      }
    };
  });

'use strict';

/**
 * @ngdoc directive
 * @name konga.directive:listInput
 * @description
 * # listInput
 */
angular.module('konga')
  .directive('listInput', ['util', '$filter', function (util, $filter) {
    return {
  		templateUrl : '/konga/views/list-input.html',
  		restrict: 'E',
  		transclude : false,
  		replace: true,
  		scope : {
  			originalFields : '=fields',
  			list : '=',
  			actions: '=',
  			metadata : '=',
  			property: '=?',
  			setSelectedElements : '=',
  			disabledIds : '=',
  			dispatchFieldAction : '='
  		},
  		link : function (scope) {
  			scope.paginate = true;

  			// Read configuration
  			var configuration = scope.property.fieldType.configuration[0];

  			// Pagination
  			var paginationConfiguration = $filter('filter')(configuration, { key: util.constants.SHOW_PAGINATION, value: 'false' }, true);

  			if(paginationConfiguration && paginationConfiguration.length) {
  				scope.paginate = false;
  			}

  			scope.filteredList = scope.list;

  			function filterList() {
				// Is there any filter configured?
				if (scope.property) {
					var filter = scope.property.type.filter;

					var newList = scope.list;
					if(filter && filter.length) {
						newList = $filter(filter)(scope.list);
					}
					scope.filteredList = newList;
				}
  			}

  			var listenerName = scope.property.owner + '_' + scope.property.name;
 			scope.$on('updateFilter_'+listenerName, function() {
	         	filterList();
	        });

  			scope.$watchCollection('originalFields', function(newFields){
  				
	  			scope.originalFields = newFields;
	  			// Generate fields
		        // var allFields = $filter('orderBy')(scope.originalFields, '+priority.results');
		        var allFields = newFields;
		        
		        scope.fields = [];
		
		        function divideComplexField(field) {
		          var relatedMetadata = util.getMetadata(field.type.complexType);
		          var relatedFields = util.getEntityFields(relatedMetadata);
		          var nestFields = field.showInResults.fields;
		          var selectedFields = $filter('selectedFields')(relatedFields, nestFields);
		          for(var fi = 0; fi < selectedFields.length; fi++) {
		            if(selectedFields[fi].fieldType.results === util.constants.FIELD_COMPLEX) {
		              divideComplexField(selectedFields[fi]);
		            }
		            else {
		              // Append the source
		              selectedFields[fi].derivedPath.splice(0, 0, field);

		              // Push the field
		              scope.fields.push(selectedFields[fi]);
		            }
		          }
		        }

		        // Control complex fields
		        for(var f = 0; f < allFields.length; f++) {
		          var field = allFields[f];
		          if(field.type.type === util.constants.FIELD_COMPLEX && field.fieldType.results === util.constants.FIELD_COMPLEX && field.showInResults.fields.length) {
		            divideComplexField(field);
		          }
		          else {
		            scope.fields.push(field);
		          }
        		}
  			});
  			
  			scope.selectAllItmsData = false;
  			scope.selectedData = false;
  			scope.paginationData = {
	  			currentItems : 0,
	  			totalItems : 0,
	  			limit : scope.paginate ? 10 : 1000, // TODO Change this
	  			offset : 1,
	  			maxPages : 1
  			};

  			scope.selected = [];

  			scope.selectedIds = {};
  			// Set up the quick search
			scope.quickSearchParams = {
				value: '',
				param:{}
			};

  			scope.getTotalItems = function () {
  				var totalItems = scope.paginationData.count = (scope.list)? scope.list.length:0;
		  		var count = 0;
		  		if (scope.selectedData) {
		  			angular.forEach(scope.list, function (item) {
		  				if (item.selected) {
		  					count++;
		  				}
		  			});
		  			totalItems = count;
		  		}
		  		return totalItems;
  			};
  			
  			scope.currentItems = function() {
  				var totalItems = scope.getTotalItems();
		    	if (totalItems>0) {
		    		var items = scope.paginationData.offset * scope.paginationData.limit;
		    		scope.paginationData.currentItems = (items > totalItems)? totalItems : items;
		    	} else {
		    		scope.paginationData.currentItems =  0;
		    	}   
		  	};
		  	  
		  	  
		  	scope.maxPages = function () {
		  		var totalItems = scope.getTotalItems();
		  		scope.paginationData.maxPages = Math.ceil(totalItems/scope.paginationData.limit);
		  		if (scope.paginationData.maxPages < scope.paginationData.offset && scope.paginationData.maxPages > 0) {
		  			scope.paginationData.offset = scope.paginationData.maxPages;
		  		}
		  	};
		  	/*
		  	 * Handle Table pagination
		  	 * @function pageChanged
		  	 */	
		  	scope.pageChanged = function(orientation) {
		  		switch (orientation) {
		  			case 'first':
		  				scope.paginationData.offset = 1;
		  				break;
		  			case 'previous':
		  				scope.paginationData.offset = (scope.paginationData.offset-1 > 1)? scope.paginationData.offset-1: 1;
		  				break;
		  			case 'next':
		  				scope.paginationData.offset = (scope.paginationData.offset+1 < scope.paginationData.maxPages)? scope.paginationData.offset+1: scope.paginationData.maxPages;
		  				break;
		  			case 'last':
		  				scope.paginationData.offset = scope.paginationData.maxPages;
		  				break;
		  		}
		  		if (!orientation || typeof orientation == 'undefined') {
		  			scope.maxPages();
		  		}   
		  	   
		  	    scope.currentItems();
		  	};

		  	scope.selectAllHandler = function () {
				var length = (scope.list)? scope.list.length:0;
				for (var i = 0; i < length; i++) {
					if ((typeof scope.disabledIds !== 'undefined' && !scope.disabledIds[scope.list[i].id]) 
							|| (typeof scope.disabledIds === 'undefined')) {
						scope.list[i].selected = scope.selectAllItmsData;
					}
				}
				scope.pageChanged();
			};
			scope.onDisplaySelectedItems = function() {
				scope.paginationData.offset = 1;
				scope.pageChanged();
			};

			scope.onSelectListEds = function () {
				scope.pageChanged();
				scope.filteredList = scope.list;
			};

			scope.quickSearchHandler = function () {
				var result = {};
				angular.forEach(scope.quickSearchParams.param, function (item, key) {
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
				scope.quickSearchParams.value =	result;
				scope.paginationData.offset = 1;
				scope.pageChanged();
			};
			
			if(scope.property.fieldType.update == util.constants.FIELD_PICK_LIST) {
				var validation = scope.property.validation;

				var length = scope.list ? scope.list.length : 0;
				
				if(validation.minLength && length < validation.minLength) {
//					realInput.addClass('invalid-min-length');
					scope.$emit('form-invalid', {
						field: scope.property.name,
						owner: scope.property.owner,
						validation: 'min-length',
						valid: false
					});
				}
			}
  			scope.validate = function () {
  				var dataFilter = $filter('filter')(scope.list, { selected: true }, transclude);
  		// 		var listIds = [];
  		// 		for (var i = 0; i < dataFilter.length; i++) {
				// 	listIds[dataFilter[i].id]=true;
				// };
  		// 		scope.selectedIds[scope.edsType] = listIds;
  				scope.setSelectedElements(scope.edsType, dataFilter);
  			};

  			scope.cancel = function () {
  				scope.selectAllItmsData = false;
  				scope.selectAllHandler();
  			};
  			
  			/*scope.dispatchFieldAction = function(action, entitySelected) {
		  		var actions = scope.actions;
		  		var matchingActions = null;
		  		if(actions.length) {
		  			matchingActions = $filter('filter')(actions, { name: action.name });
		  		}

		  		// Custom actions
		  		if(matchingActions && matchingActions.length) {
		  			$rootScope.operations.dispatchActionBatch(matchingActions, { id: util.getEntityId(scope.metadata, scope.entity), entityType: scope.metadata.name, self: $scope, item: scope.entity, field: scope.property, entitySelected : entitySelected});
		  		}
			};*/

			var watchers = null;
	        scope.$on('suspend', function() {
	          watchers = scope.$$watchers;
	          scope.$$watchers = [];
	        });

	        scope.$on('resume', function() {
	          scope.$$watchers = watchers;
	        });

			scope.$watchCollection('selectAllItmsData', scope.selectAllHandler);
			scope.$watchCollection('selectedData', scope.onDisplaySelectedItems);
			scope.$watchCollection('list', scope.onSelectListEds);
			scope.$watchCollection('quickSearchParams.param',scope.quickSearchHandler);
			scope.$watchCollection('disabledIds', function () {
				console.log('disabledIds '+scope.disabledIds);	
			});
  		}
  	};
  }]);

'use strict';

/**
 * @ngdoc directive
 * @name konga.directive:optionInput
 * @description
 * # optionInput
 */
angular.module('konga')
  .directive('optionInput', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the optionInput directive');
      }
    };
  });

'use strict';

/**
 * @ngdoc directive
 * @name konga.directive:priceInput
 * @description
 * # priceInput
 */
angular.module('konga')
  .directive('priceInput', ['$filter', '$timeout', function ($filter, $timeout) {
    return {
      templateUrl: 'views/price-input.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.currency = '';
        scope.showCurrency = true;

        scope.inner = {
          text: ''
        };

        function init(first) {
          var configuration = scope.property.fieldType.configuration[0];
          var currency = $filter('filter')(configuration, {key: 'CURRENCY'}, true)[0];

          var configurationSource = $filter('filter')(configuration, { key: 'CURRENCY_SOURCE' }, true)[0];

          if(!configurationSource) {
            scope.currency = currency.value;
          }
          else {
            switch(configurationSource.value) {
            case 'translate':
              scope.currency = $filter('translate')(currency.value);
              break;
            case 'entity':
              var unitSplit = currency.value.split('.');
              var source = scope.entity;
              for(var i = 0; i < unitSplit.length && source; i++) {
                source = source[unitSplit[i]];
              }
              scope.currency = source;
              
              if(first) {
                // Setup watcher
                scope.$watch('entity.' + currency.value, function() {
                  init();
                });
              }
              break;
            case 'none':
              scope.showCurrency = false;
              scope.currency = 'N/A'; 
              break;
            default:
              scope.currency = currency.value;
            }
          }
        }

        init(true);

        scope.$watch('value.text', function(newValue, oldValue) {
          scope.formatInput(true);
        });

        scope.formatInput = function(inverse, validate) {

          if(validate) {
            // Invalidate form to wait for formatting
            scope.$emit('form-invalid', {
              field: scope.property.name,
              owner: scope.property.owner,
              validation: 'price-formatting',
              valid: false
            });
          }

          var value = null;
          if(inverse) {
            value = $filter('priceRenderer')(scope.value.text, scope.property);
            scope.inner.text = value;

          }
          else {
            if(scope.inner.timeout) {
              $timeout.cancel(scope.inner.timeout);
            }
            scope.inner.timeout = $timeout(function() {
              var input = scope.inner.text ? scope.inner.text
                            .replace(',', '.')
                            .replace(/\s/g, '') : scope.inner.text;
                            
              scope.value.text = input ? parseFloat(input) : null;
              scope.formatInput(true);

              scope.$emit('form-invalid', {
                field: scope.property.name,
                owner: scope.property.owner,
                validation: 'price-formatting',
                valid: true
              });
            }, 1500);
          }
        };
      }
    };
  }]);

'use strict';

/**
 * @ngdoc directive
 * @name konga.directive:quantityInput
 * @description
 * # quantityInput
 */
angular.module('konga')
  .directive('quantityInput', ['$filter', function ($filter) {
    return {
      templateUrl: 'views/quantity-input.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        // Setup default unit
        scope.unit = 'u.';
        scope.decimal = 0;
        scope.step = 1;

        function init(first) {
          // Find configuration parameters
          var configuration = scope.property.fieldType.configuration[0];
          
          // Unit
          var configurationUnit = $filter('filter')(configuration, { key: 'QUANTITY_UNIT' }, true)[0];
          var configurationUnitSource = $filter('filter')(configuration, { key: 'QUANTITY_UNIT_SOURCE' }, true)[0];

          // Decimals
          var configurationDecimal = $filter('filter')(configuration, { key: 'QUANTITY_DECIMAL' }, true)[0];
          var configurationDecimalSource = $filter('filter')(configuration, { key: 'QUANTITY_DECIMAL_SOURCE' }, true)[0];

          // Configure unit
          if(configurationUnit) {
            var unit = configurationUnit.value;
            var source = configurationUnitSource ? configurationUnitSource.value : null;
            switch(source) {
            case 'translate':
              scope.unit = $filter('translate')(unit);
              break;
            case 'entity':
              var unitSplit = unit.split('.');
              var source = scope.entity;
              for(var i = 0; i < unitSplit.length && source; i++) {
                source = source[unitSplit[i]];
              }

              if(first) {
                // Setup watcher
                scope.$watch('entity.' + unit, function() {
                  init();
                });
              }

              scope.unit = source;
              break;
            default: 
              scope.unit = unit;
              break;
            }
          }

          // Configure decimals
          if(configurationDecimal) {
            var decimal = configurationDecimal.value;
            var source = configurationDecimalSource ? configurationDecimalSource.value : null;
            switch(source) {
            case 'plain':
              scope.decimal = parseInt(decimal);
              break;
            case 'entity':
              var decimalSplit = decimal.split('.');
              var source = scope.entity;
              for(var i = 0; i < decimalSplit.length && source; i++) {
                source = source[decimalSplit[i]];
              }

              if(first) {
                // Setup watcher
                scope.$watch('entity.' + decimal, function() {
                  init();
                });
              }

              scope.decimal = source;
              break;
            default: 
              scope.decimal = decimal;
              break;
            }
          }

          // Configure step
          for(var i = 0; i < scope.decimal; i++) {
            scope.step /= 10;
          }
        }

        if(scope.entity.$resolved !== false) {
          init(true);
        }
        else {
          scope.$watch('entity.$resolved', function() {
            if(scope.entity.$resolved) {
              init(true);
            }
          })
        }
      }
    };
  }]);

'use strict';

/**
 * @ngdoc directive
 * @name konga.directive:rawInput
 * @scope
 * @restrict E
 * @description
 *
 * This is a directive for rendering a field into a form, using the {@link Metadata.Field field's metadata} defined. The `rawInput` does not have an appeareance itself, instead is `raw`, allowing multiple views - i.e. the specific field types - to use its features, yet keeping a particular appeareance defined within the view itself.
 *
 * <img src="/static/raw-input-init.png" width="50%" class="center">
 *
 * # Init/Update
 *
 * `update` is the process the `rawInput` uses to `map` the entity's field value into the `rawInput` {@link konga.directive:rawInput#properties_value `value`} object. To achieve this the `rawInput` leverages the {@link konga.filter:mapField `mapField`} filter.
 *
 * # Rendering
 * 
 * Once the values are loaded and the configuration interpreted, the `rawInput` proceeds to render your field. Depending on the `fieldType` assigned, the `rawInput` will adopt different appeareances.
 *
 * <img src="/static/raw-input-rendering.png" width="60%" class="center">
 *
 * ## Complex `fieldTypes`
 *
 * When a `fieldType` is marked as {@link Metadata.FieldTypes#properties_COMPLEX `COMPLEX`}, insted of rendering the field itself, a subset of fields is taken from the inner entity, depending on the configuration given to the complex field. When the `rawInput` detects it's dealing with a `COMPLEX` input, it renders a view consisting on more nested `rawInputs`. Then each field is treatedly independently, but using as field - and entity - the inner value corresponding to the parent field.
 * 
 *
 * ## Custom `fieldTypes`
 *
 * Sometimes Konga's standard inputs would not be enough for your needs. When this comes along, you'd find handy to create your own custom `fieldTypes` and configure your entity's fields to render using them. See the docs on {@link Customisation.Custom%20views#properties_fields custom fields}.
 *
 *
 * # Value `$watcher`
 * 
 * `rawInput` has a built-in feature to detect changes on your fields, and apply field mapping immediately. Yes, this is a native feature of Angular - bi-directional binding on inputs - but it's normally applied to plain inputs. `rawInput`'s  value `$watcher` initialise different `$watchers` depending on {@link Metadata.Field field's metadata}, so you always get notified when the real value needed for the entity is assigned to the `rawInput`. This allows you to render complex inputs who require an inner process to select the items - such as {@link Metadata.FieldTypes#properties_SELECT `select`} or {@link Metadata.FieldTypes#properties_PICK_LIST `pick list`} inputs. The value `$watcher` also handles casting, to give you the format and data type needed for the field.
 *
 * <img src="/static/raw-input-watcher.png" width="60%" class="center">
 *
 * # Data validation
 *
 * `rawInput` also reads the metadata for data validation. When an input changes, it's value is mapped against several validation processes - e.g. required, patterns, lengths, ... - to verify it's data maintains integrity with the requirements. If that's so, field's marked as valid, and hence the form will be submitted - once all fields become valid. On the other hand, if any parameter does not match the needs, the `$validity` object is leveraged to append data irregularities, which are shown to the user via tooltips.
 *
 * # Manual operation
 *
 * Sometimes you are handling data different than the standards, and native features won't satisfy the characteristics you need. To let you interact manually with the `rawInput`, from your custom code outside, you have several events that you can `$broadcast`, that will be listened by the `rawInput`, and apply manually the operations you want:
 *
 * * **'cascade_update'** (w/ `listenerName`) - Triggers a cascade downwards. This is launched on complex fields when a {@link Metadata.ConfigurationParam#properties_CASCADE_UPDATE `cascade`} is defined. It applies queries on inner objects defined on the `cascade` expression.
 * * **'complex_update'** (w/ `listenerName`) - It's `$broadcasted` (and listened) when a complex `fieldType` changes. Its listener handles the {@link Metadata.ConfigurationParam#properties_PROPAGATE_UPDATE `propagation`}.
 * * **'field-updated'** - Listened by linked fields, once the source field of its linking changes its value. Its listener executes the linking action on the target field.
 * * **'force-validation'** - Force the execution of a validation.
 * * **'locale-change'** - When language changes, the `rawInput` adapts its labels to the new language. While translation is autommatically engaged with the new language, Konga's {@link konga.filter:translateComplex `complex translation`} needs this event to adapt.
 * * **'manually_change'** (w/ `listenerName`) - If you changed the value of your field and yet the `$watchers` weren't executed, you can manually force a change `$watcher` process. This is never needed on Standard types, but may happen on {@link Customisation.Custom%20views#properties_Fields `custom`}.
 * * **'reset-form'** - On search mode, when user requests a `reset` the {@link konga.directive:searchPane `searchPane`} broadcasts an 'reset-form' event. This event is listened on underneath `rawInputs` and their values are reset to defaults.
 * * **'reset'** (w/ `listenerName`) - This does the same as the `reset-form`, but it's targeted to a targeted field.
 * * **'reset_cascade'** (w/ `listenerName`) - Resets the cascade procedures applied to the affected fields.
 * * **'setup-cascade'** - Allows you to enable/disable cascades, to avoid infinite loops on certain operations (such as batch updating). On init, cascades are disabled to avoid this issue.
 * * **'setup-propagation'** - Allows you to enable/disable propagations, to avoid infinite loops on certain operations (such as batch updating). On init, propagations are disabled to avoid this issue.
 * * **'setup-watchers'** - Allows you to enable/disable value watchers, to avoid erroneous `$digest` loops.
 * * **'update'** (w/ `listenerName`) - Launch an update process on the field. This is useful if something changed the value of the entity itself, but outside the bounds of the `rawInput`. In this case, you need to notify the `rawInput` to adopt the new value within the rendered field.
 *
 * ## <i class="fa fa-tag"></i> **`listenerName`**
 *
 * Most of the events you saw above are used along a `listenerName`. This means the event name changes, suffixing it with a value obtained for reading **`field.owner`-`field.name`** from the metadata - e.g. for calling an `update` under a `vehicle` -> `color` field, you should broadcast the event `update_vehicle_color`. With this method the event is completely mono-directional, and no extra process is launch upon its submittal.
 *
 * # <i class="fa fa-th-large"></i> Component catalog
 *
 * Here you have the full native `fieldType` catalog. You could build forms codelessly using any of these types. Click on anyone to see its particular details.
 *
 <div class="row">
   <div class="col-xs-12">
   	Plain inputs
   </div>
   <div class="col-xs-4 col-md-3">
   	Abc
   </div>
   <div class="col-xs-4 col-md-3">
   	123
   </div>
   <div class="col-xs-4 col-md-3">
   	Feb 29
   </div>
   <div class="col-xs-12">
   	Reference inputs
   </div>
   <div class="col-xs-12">
   	Complex inputs
   </div>
   <div class="col-xs-12">
   	Custom inputs
   </div>
 </div>
 * 
 * @param {Object} property Field to modify with the input
 * @param {*} vertical TODO Document
 * @param {Boolean} disabled Defines whether the field is disabled
 * @param {Function} setValues Function called to set up the values (for complex inputs)
 * @param {Object} operations Available operations for the directive
 * @param {Boolean} ngRequired Defines whether the field is required
 * @param {Object} entity Defines the real entity to manage
 * @param {Object=} rootEntity Defines the root entity (for complex fields)
 * @param {Object} metadata Defines the metadata of the entity
 * @param {Object=} rootMetadata Defines the root metadata (for complex fields)
 * @param {Function} updateEntity Function to call when the field is updated to update the entity
 * @param {Function} changeEntity Function to call when the field is updated to control changes
 * @param {string} mode Defines the mode of the field (i.e. Search, Update). See {@link kongaTools.Constants constants}
 * @param {Boolean} creating Defines whether the field is in creation mode or in update
 * @param {Object} parentField Defines the parent field (for complex fields)
 * @param {Object=} style If set, it overrides the default styling options for the field
 */
angular.module('konga')
  .directive('rawInput', ['$filter', '$modal', '$timeout', 'common', 'api', '$rootScope', 'configurationManager', 'standardApi', 'permissionManager', 'util', 'mapper', 
  	function($filter, $modal, $timeout, common, api, $rootScope, configurationManager, standardApi, permissionManager, util, mapper) {
	    return {
	      restrict: 'E',
	      replace: true,
	      scope: {
	    	property: '=',
	    	vertical: '=',
	    	disabled: '=',
	    	setValues: '&',
	    	operations: '=',
	    	ngRequired: '=',
	    	entity: '=',
	    	rootEntity: '=?',
	    	metadata: '=',
	    	rootMetadata: '=?',
	    	updateEntity: '=onUpdate',
	    	changeEntity: '=onChange',
	    	mode: '@',
	    	creating: '=',
	    	parentField: '=',
			style: '=?',
			index: '=?'

	      },
	      link: function(scope, element, attrs) {

	      	/*
	      	 * Old controller
	      	 */

	      	var resolveWatcher = null, valueWatcher = null;
	      	var init = undefined, initCheck = false, initactive = true, initinactive = false;
	      	
	      	// Global validation
	      	scope.globalValidation = true;

	      	// Flags for the cascade and propagation
	      	scope.cascadeEnabled = true;
	      	scope.propagateEnabled = true;
	      	scope.watchersEnabled = true;

	      	if(!scope.rootMetadata) {
	      		scope.rootMetadata = scope.metadata;
	      	}

	      	if(!scope.rootEntity) {
	      		scope.rootEntity = scope.entity;
	      	}

	      	var fieldConfig = scope.config = {
	      		hidden: false,
	      		init: true,
	      		showHint: true
	      	};

	      	var fieldValue = scope.value = {
	      		text: '',
	      		list: [],
	      		entity: {},
	      		date: {
	      			startDate: '',
	      			endDate: '',
	      			comparator: util.constants.DATE_COMPARATOR_EQUALS
	      		},
	      		range: {
	      			from: '',
	      			to: '',
	      			comparator: util.constants.NUMBER_COMPARATOR_BETWEEN
	      		},
	      		fields: [],
	      		files: []
	      	};

	      	// Setup the label
	      	scope.fieldLabel = scope.property.label;
	      	var configurationSource = [];

	      	var sourceField = scope.parentField ? scope.parentField : scope.property;

	        switch(scope.mode) {
	        case util.constants.SCOPE_SEARCH:
	          configurationSource = sourceField.searchable.configuration;
	          break;
	        case util.constants.SCOPE_UPDATE:
	          configurationSource = sourceField.showInUpdate.configuration;
	          break;
	        }

	        // Short label
	        var shortLabelConf = $filter('filter')(configurationSource, { key: util.constants.USE_SHORT_LABEL });

	      	if(shortLabelConf && shortLabelConf.length && shortLabelConf[0].value === 'true') {
	      		scope.fieldLabel = scope.property.shortLabel;
	      	}

	      	// Show hint
	      	var hintKey = scope.mode === util.constants.SCOPE_SEARCH ? util.constants.SHOW_HINT_SEARCH : util.constants.SHOW_HINT_UPDATE;
	      	var hintConf = configurationManager.get(hintKey, scope.property);
	      	if(hintConf !== undefined) {
	      		fieldConfig.showHint = hintConf;
	      	}

	      	// Read only
	      	scope.readonly = false;
  			var readonlyConf = $filter('filter')(configurationSource, { key: util.constants.READ_ONLY, value: 'true' }, true);

  			if(readonlyConf && readonlyConf.length) {
  				scope.readonly = true;
  			}

	      	// Trying to fix object duplicates
	      	function getList() {
	      		return fieldValue.list;
	      	}

	      	scope.label = '';

	      	var related = scope.parentField != null;
	      	var entityLabel = null;
	      	var entityLabelPlaceholder = null;
	      	// If the field is not related, the entity type is the entity being updated
	      	// TODO Translate on change!
	      	if(!related) {
	      		entityLabel = $filter('translate')(scope.metadata.label);
	      		entityLabelPlaceholder = scope.metadata.label;
	      	}
	      	else {
	      		var relatedMetadata = util.getMetadata(scope.property.owner);
	      		entityLabel = $filter('translate')(relatedMetadata.label);
	      		entityLabelPlaceholder = relatedMetadata.label;
	      	}

	      	// Extra parameters for the internationalization
	      	scope.extra = {
	      		label: entityLabel,
	      		labelPlaceholder: entityLabelPlaceholder
	      	};

			scope.update = function(init) {
				var value = '';
				if(this.entity && this.entity.$resolved !== false) {
					var value;
					if(this.mode === util.constants.SCOPE_UPDATE) {
					    value = $filter('mapField')(scope.entity, scope.property);
					} else {
						value = scope.entity[scope.property.name];
					}
					//try to get values based on the parent object
					if (value == null ) {
						var parent = scope.parentField;
						if (parent) {
							var apiNames = parent.apiName;
							// TODO Control other modes
							// var fields = scope.mode === util.constants.SCOPE_SEARCH ? parent.searchable.fields : parent.showInUpdate.fields;
							// var index = fields.indexOf(scope.property.name);
							// if(scope) {
								value = scope.entity[scope.property.apiName];
							// }
						}
					}

					// If the field is complex, get the source list for the related entity
					var complexProperty = null;
					var complexEntity = scope.entity;

					// TODO Move somewhere else to put this
					if(scope.property.isSelf) {
						complexEntity = scope.rootEntity;
					}

					if(scope.property.type.type === util.constants.FIELD_COMPLEX) {
						complexProperty = scope.property;
					}
					else if(scope.parentField && scope.parentField.type.type === util.constants.FIELD_COMPLEX) {
						complexProperty = scope.parentField;
					}

					if(complexProperty) {

						var related = complexProperty.type.complexType;

						// Get the real metadata
						var realMetadata = common.getMetadata(related);

						// Store the entity
						this.value.metadata = realMetadata;

						// If updating do some extra stuff
						if(scope.mode === util.constants.SCOPE_UPDATE) {
							var realEntity;
							if(!scope.parentField || scope.parentField.multiplicity === util.constants.MULTIPLICITY_ONE) {
								realEntity = $filter('mapField')(complexEntity, scope.property);
							}
							else {
								realEntity = [];
								for(var i = 0; i < complexEntity.length; i++) {
									realEntity.push($filter('mapField')(complexEntity[i], scope.property));
								}
							}

							// Try and set a label
							try {
								scope.setLabel(realMetadata, realEntity);
							}catch(e) {
								// XXX muahahahahahhahahaha
							}

							
							//FIXME The metadata contain the value of the field extended and maybe this is not the best place
							if (scope.property.isExtended){
								scope.value.extended = scope.property.labelExtended;
								scope.value.isExtended = scope.property.isExtended; 
							}
							
							scope.value.entity = realEntity;

							var entityCode = util.getEntityCode(realMetadata, realEntity);

							// TODO Control multiplicity
							if(entityCode !== null) {
								scope.value.text = entityCode;
							}
							else {
								scope.value.text = '';
							}
							
							$timeout(function(){
								// Lookup for cascade filters
								if(scope.property.derived) {
									var source = scope.parentField;
									var	configuration = source.showInUpdate.configuration;
									var listenerName = scope.parentField.owner + '_' + scope.parentField.name;
									var cascadeConfiguration = $filter('filter')(configuration, { key: util.constants.CASCADE_UPDATE });
									if(cascadeConfiguration.length) {
										scope.$emit('reset_cascade_' + listenerName, { reset: false, source: scope.property, configuration: cascadeConfiguration, query: scope.value.text });
									}
								}
							}, 50);

						}

						// If there are some nested fields used, go on
						var nestFields = null;
						if(scope.mode === util.constants.SCOPE_SEARCH && scope.property.searchable.fields && scope.property.searchable.fields.length) {
							nestFields = scope.property.searchable.fields;
						} // for search :)
						else if(scope.mode === util.constants.SCOPE_UPDATE && scope.property.showInUpdate.fields.length) { // And for update!
							nestFields = scope.property.showInUpdate.fields;
						}

						// Is there some field to nest?
						if(nestFields && init) {
							var allFields = util.getEntityFields(realMetadata);
							var selectedFields = $filter('selectedFields')(allFields, nestFields, scope.property);
							for (var i = 0; i < selectedFields.length; i++){
								// Setup the path source
								// selectedFields[i].derivedPath.splice(0, 0, scope.property);

								scope.value.fields.push(selectedFields[i]);
							}								
						}
						if(scope.mode === util.constants.SCOPE_SEARCH) {
							scope.value.text = value;
						}
					}

					switch(scope.property.type.type) {
					case util.constants.FIELD_COMPLEX:
						// Nothing to do here
						break;
					case util.constants.FIELD_BOOLEAN:
						if(scope.mode === util.constants.SCOPE_SEARCH) {
							scope.value.text = value;
							if(scope.value.text === '' || scope.value.text === null) {
								scope.value.active = true;
								scope.value.inactive = true;
							}								
							else {
								scope.value.active = !!scope.value.text;
								scope.value.inactive = !scope.value.text;
							}
						}
						else {
							scope.value.text = !!value;
						}
						break;
					case util.constants.FIELD_DATE:
						if (scope.mode === util.constants.SCOPE_UPDATE) {
							scope.value.text = value;
							if (scope.property.fieldType.update == util.constants.FIELD_DATE) {
								scope.value.text = $filter('date')(value, 'yyyy-MM-dd');
							} 
							
						} else if (scope.mode === util.constants.SCOPE_SEARCH) {
							scope.value.date = value;
						}
						break;
					default:
						if(scope.property.type.type === util.constants.FIELD_NUMBER && value!="" && value!=null){
							scope.value.text = Number(value);
						}else{
							scope.value.text = value;
						}
						if(scope.property.type.list) {
							scope.value.list = angular.copy(scope.property.type.list);

							var multi = null;
							if(scope.mode === util.constants.SCOPE_SEARCH) {
								multi = fieldToMatch.searchConf.multiplicity;
							}
							else {
								multi = fieldToMatch.multiplicity;
							}

							// if multiplicity is one, append a null value to de-select
							if(multi === util.constants.MULTIPLICITY_ONE) {
								scope.value.list.splice(0, 0, { key: null, value: 'combobox.placeholder'});
							}
						}

						if (value == undefined && scope.property.defaults != undefined && scope.creating) {
							// set default property value if any
							scope.value.text = scope.property.defaults;
						}
					}
				}
				else if(this.entity && this.entity.$resolved === false) {
					resolveWatcher = scope.$watch('entity.$resolved', function() {
						if(scope.entity.$resolved !== false) {
							resolveWatcher();
							scope.update(true);
						}
					});

				}

				if(init && (this.entity && this.entity.$resolved !== false || scope.creating)) {
					// Start watchers
					// Listen to value updates
					scope.$watch('value.text', function(newValue, oldValue) {
						if(scope.watchersEnabled && newValue !== oldValue) {
							scope.fieldValidation();
							$timeout(valueWatcher, 50);
						}
					});
					
					if (scope.value.entity && scope.value.entity instanceof Array) {
						scope.$watchCollection('value.entity', function(newValue, oldValue) {
							if(!angular.equals(newValue, oldValue)) {
								scope.fieldValidation();
								$timeout(valueWatcher, 50);
							}
						}, true);
					}
					else if(scope.property.type.type === util.constants.FIELD_COMPLEX) {
						scope.$watch('value.entity', function(newValue, oldValue) {
							if(!angular.equals(newValue, oldValue)) {
								scope.fieldValidation();
								$timeout(valueWatcher, 50);
							}
						}, true);
					}

					// Special treatment for checkboxes on search
					if(scope.mode === util.constants.SCOPE_SEARCH && scope.property.type.type == util.constants.FIELD_BOOLEAN) {
						scope.$watch('value.active', valueWatcher);
						scope.$watch('value.inactive', valueWatcher);
					}

					// Special treatment for dates on search
					if(scope.mode === util.constants.SCOPE_SEARCH && scope.property.type.type == util.constants.FIELD_DATE) {
						scope.$watch('value.date.startDate', valueWatcher);
						scope.$watch('value.date.endDate', valueWatcher);
						scope.$watch('value.date.comparator', valueWatcher);
					}

					// Special treatment for numbers on range mode
					// on search
					if(scope.mode === util.constants.SCOPE_SEARCH && scope.property.type.type == util.constants.FIELD_NUMBER && scope.property.searchConf.policy === util.constants.VALIDATOR_RANGE) {
						scope.$watch('value.range.from', valueWatcher);
						scope.$watch('value.range.to', valueWatcher);
						scope.$watch('value.range.comparator', valueWatcher);
					}

					// Special treatment for files
					if(scope.property.type.type == util.constants.FIELD_FILE) {
						scope.$watchCollection('value.files', valueWatcher);
					}

					// Notify linked fields
					$timeout(function() {
						$rootScope.$broadcast('field-updated', { field: scope.property, value: scope.value, init: true });
					}, 50);
				}
			};

			scope.reset = function() {
				// Reset boolean values
				// TODO Change this by check-boxes
				if(scope.property.fieldType.search === util.constants.FIELD_BOOLEAN) {
					scope.value.active = scope.property.defaults === 'true';
					scope.value.inactive = scope.property.defaults !== 'true';
				}

				else if(scope.property.fieldType.search === util.constants.FIELD_DATE) {
					// TODO Configuration
					scope.value.date.comparator = util.constants.DATE_COMPARATOR_EQUALS;
					scope.value.date.startDate = 0;
					scope.value.date.endDate = 0;
				}
				else if(scope.property.searchConf.policy === util.constants.VALIDATOR_RANGE) {
					// TODO Configuration
					scope.value.range.comparator = util.constants.NUMBER_COMPARATOR_BETWEEN;
					scope.value.range.from = '';
					scope.value.range.to = '';
				}

				// Reset only non-complex fields
				else if(scope.property.fieldType[scope.mode] !== util.constants.FIELD_COMPLEX) {
					scope.value.text = scope.property.defaults == null ? '' : scope.property.defaults;
					if(scope.property.multiplicity === util.constants.MULTIPLICITY_MANY) {
						var length = scope.value.entity.length;
						scope.value.entity.splice(0, length);
					}
					else {
						scope.value.entity = {};
					}
				}

				scope.label = "";
			};

			/*
	  		 * Determines whether to disable a field based on their properties
	  		 */
	  		scope.disableField = function(mode, field) {

	  			// Get the editable flag
	  			var editable = field.editable;

				// Get the is id flag
	  			var isId = field.isId;

	  			/* 
	  			 * If we are in search mode and the field is shown, 
	  			 * it will NEVER be disabled
	  			 */
	  			if(mode === util.constants.SCOPE_SEARCH) {
	  				return false;
	  			}

	  			// Lookup for complex configuration
	  			if(scope.property.derived) {
	  				var configuration = scope.parentField.showInUpdate.configuration;
	  				var matchingConfiguration = $filter('filter')(configuration, { key: util.constants.DISABLE_COMPLEX_FIELD, value: scope.property.apiPath }, true);
	  				if(matchingConfiguration.length) {
	  					return true;
	  				}
	  			}

	  			/*
	  			 * In update mode, the disabled fields are:
	  			 * - Non-editable fields
	  			 * - Entity ids (on update mode only)
	  			 */
	  			var isEditable = editable.value !== null;
	  			var isAllowed = null;
	  			if(isEditable) {
	  				isAllowed = permissionManager.isAllowed(editable.value);
	  			}
	  			var bEditable = !isEditable || !isAllowed || (isId && !scope.creating);
	  			return bEditable;
	  		};
	  		
	  		/*
	  		 * Condition to display Remove button of a field
	  		 */
	  		scope.showRemove = function(field) {
	  			return scope.value.text !== null && scope.value.text !== '' && (scope.mode === util.constants.SCOPE_SEARCH || !scope.disableField(scope.mode, scope.property));
	  		};
	  		
	  		/*
	  		 * Determines whether to disable a multi/single select based on their properties
	  		 */
	  		scope.disableSelect = function(field) {
	  			if (typeof(field.singleSelectCustom) === 'object' && field.singleSelectCustom.disableSelect) {
	  				return true;
	  			} else {
	  				return scope.disableField(scope.mode, scope.property);
	  			}
	  		};

	  		// TODO Remove this field when fixing bug #7422
	  		scope.disableSelectInput = function(mode, field) {
	  			var editable = field.editable;

	  			// TODO Move this elsewhere
	  			// 'SELECT' field types are disabled on update mode (avoid user writing stuff)
	  			if(mode === util.constants.SCOPE_UPDATE && field.fieldType.update === util.constants.FIELD_SELECT) {
	  				if (field.disabledSelect) {
	  					return true;
	  				}
	  				if (editable.value === 'true') {
	  					return false;
	  				}
	  				return true;
	  			}
	  			return false;
	  		};
	  		
	  		/*
	  		 * Remove value of a field
	  		 */
	  		scope.removeField = function(field) {
				scope.value.text = null;
				scope.value.list = [];
				scope.value.entity = null;
				scope.value.date.startDate = '';
				scope.value.date.endDate = '';
				scope.value.date.comparator = util.constants.DATE_COMPARATOR_EQUALS;
	  			scope.label = '';
	  			if (typeof(field.singleSelectCustom) === 'object') {
	  				 field.singleSelectCustom.deleteField = false;
	  				 field.singleSelectCustom.updateOtherFields = true;
	  			}
	  		};

	  		scope.validation = {
	  			pattern: function() {

	  				// On search mode we don't need validation
	  				if(scope.mode === util.constants.SCOPE_SEARCH) {
	  					return ".*";
	  				}
                    
	  				// TODO work only for REGEXP annotation
	  				if (scope.property.validation.validators && scope.property.validation.validators.length > 0
	  						&& scope.property.validation.validators[0].type == "REGEXP") {	  						
	  					var regexp = scope.property.validation.validators[0].value;
	  					return regexp;
	  				}

	  				//default return
	  				var regexp = ".*";
	  				return regexp;
	  			},
	  			
	  			forbiddenCharacters: function() {
	  				return ["/","\\"];
	  			},
	  			required: function() {
	  				// On search mode we don't need validation
	  				if(scope.mode === util.constants.SCOPE_SEARCH) {
	  					return false;
	  				}

	  				return scope.property.validation.required;
	  			},

	  			minlength: function() {
	  				// On search mode we don't need validation
	  				if(scope.mode === util.constants.SCOPE_SEARCH) {
	  					return 0;
	  				}

	  				var minLength = scope.property.validation.minLength;

	  				return minLength !== null ? minLength : 0;
	  			},

	  			maxlength: function() {
	  				// On search mode we don't need validation
	  				if(scope.mode === util.constants.SCOPE_SEARCH) {
	  					return 524288;
	  				}

	  				var maxLength = scope.property.validation.maxLength;

	  				return !maxLength ? maxLength : 524288;
	  			},

	  			minvalue: function() {
	  				var minLength = scope.property.validation.minLength;

	  				return minLength !== null ? minLength : Number.MIN_SAFE_INTEGER;
	  			},

	  			maxvalue: function() {
	  				var maxLength = scope.property.validation.maxLength;

	  				return maxLength !== null ? maxLength : Number.MAX_SAFE_INTEGER;
	  			},

	  			valid_required: function() {
	  				switch(scope.property.type.type) {
	  				case util.constants.FIELD_STRING:
	  					return scope.validation.required() ? scope.value.text && scope.value.text.length > 0 : true;
	  				case util.constants.FIELD_COMPLEX:
	  					var relatedMetadata = util.getMetadata(scope.property.type.complexType);
	  					var idField = util.getEntityId(relatedMetadata, null, true);

	  					// TODO Control multiplicity many
	  					return scope.validation.required() ? scope.value.entity && scope.value.entity[idField] !== undefined : true;
	  					break;
	  				case util.constants.FIELD_FILE:
	  					return scope.validation.required() ? scope.value.files.length > 0 : true;
	  					break;
	  				}
	  				return scope.value.text !== null && scope.value.text !== undefined;
	  			},

	  			valid_pattern: function() {
	  				if(!scope.value.text || scope.property.type.type !== util.constants.FIELD_STRING) {
	  					return true;
	  				}

	  				// TODO Put here to avoid integer validation. To fix on bug #7424
	  				if(!scope.value.text.match) {
	  					return true;
	  				}

	  				var parts = scope.value.text.split("\n");
	  				for(var i = 0; i<parts.length; i++){
	  					 var matches = parts[i].match(scope.validation.pattern());
		  				 if(!matches || !matches.length || matches[0] != parts[i]){
		  					 return false;
		  				 }
	  				}
	  				
	  				return true;
	  			},
	  			
	  			valid_minlength: function() {
	  				// On search mode we don't need validation
	  				if(scope.mode === util.constants.SCOPE_SEARCH) {
	  					return true;
	  				}

	  				var minLength = scope.minLength = scope.property.validation.minLength;
					if (scope.property.type.type === util.constants.FIELD_COMPLEX) {
						return minLength ? scope.value.entity.length >= minLength : true;
					}
	  				return minLength ? scope.value.text.length > minLength : true;
	  			},

	  			valid_maxlength: function() {
	  				// On search mode we don't need validation
	  				if(scope.mode === util.constants.SCOPE_SEARCH) {
	  					return true;
	  				}

	  				var maxLength = scope.property.validation.maxLength;

	  				return maxLength ? scope.value.text.length < maxLength : true;
	  			}
	  		};

	  		
  			scope.templating = {
	  			inputSize: 'col-md-8',
	  			fieldSize: 'col-md-6',
	  			labelStyle: 'col-md-12',
	  			labelWeight: 'font-normal',
	  			labelDecoration: '',
	  			validationStyle: 'col-md-12',
	  			adjusted : false
	  		};
	  		
	  		// TODO Change this!
	  		scope.classFormInput = ([util.constants.FIELD_PICK_LIST, util.constants.FIELD_TABLE].indexOf(scope.property.fieldType[scope.mode]) === -1) ? "form-input-content" : "";
	  		scope.displayMode = ([util.constants.FIELD_PICK_LIST, util.constants.FIELD_TABLE].indexOf(scope.property.fieldType[scope.mode]) === -1) ? "" : "pickListDispBlock padding-cero";

	  		// Adjust templating size
	  		if(scope.mode === util.constants.SCOPE_UPDATE) {
	  			// Selects are rendered as medium
		  		switch(scope.property.fieldType.update) {
		  		case util.constants.FIELD_SELECT:
		  			if(!(!scope.parentField && scope.property.isKey)) {
		  				scope.templating.inputSize = 'col-md-12';
		  				scope.templating.fieldSize = 'col-md-8';
		  				scope.templating.adjusted = true;
		  			}
		  			break;
		  		case util.constants.FIELD_DATE:
		  		case util.constants.FIELD_NUMBER:
		  		case util.constants.FIELD_COMBOBOX:
		  		case util.constants.FIELD_PRICE:
		  			scope.templating.inputSize = 'col-md-6';
		  			scope.templating.fieldSize = 'col-md-4';
		  			scope.templating.adjusted = true;
		  			break;
		  		case util.constants.FIELD_COMPLEX:
		  			scope.templating.inputSize = '';
		  			scope.templating.fieldSize = 'col-md-12 no-padding';
					scope.templating.labelWeight = 'font-bold';
					scope.templating.adjusted = true;
		  			break;
		  		case util.constants.FIELD_PICK_LIST:
		  		case util.constants.FIELD_IMAGE:
		  		case util.constants.FIELD_TABLE:
		  			scope.templating.inputSize = 'col-md-12';
		  			scope.templating.fieldSize = 'col-md-12 no-padding';
					scope.templating.labelWeight = 'font-bold';
					scope.templating.labelDecoration = 'font-underline';
					scope.templating.adjusted = true;
		  			break;
		  		case util.constants.FIELD_FILE:
		  			scope.templating.inputSize = 'col-md-12';
		  			scope.templating.fieldSize = 'col-md-8 no-padding';
					scope.templating.labelWeight = 'font-bold';
					scope.templating.labelDecoration = 'font-underline';
					scope.templating.adjusted = true;
		  			break;
		  		}

		  		if(!scope.templating.adjusted && scope.property.validation.maxLength) {
	  				if(scope.property.validation.maxLength < 14) {
	  					scope.templating.inputSize = 'col-md-6';
		  				scope.templating.fieldSize = 'col-md-4';
		  			}
		  			else if(scope.property.validation.maxLength > 100) {
		  				scope.templating.inputSize = 'col-md-12';
		  				scope.templating.fieldSize = 'col-md-8';
		  			}
		  		}
	  		}

	  		// TODO Improve search configuration
	  		else if(scope.mode === util.constants.SCOPE_SEARCH) {
	  			scope.templating.inputSize = 'col-md-12';
	  			scope.templating.fieldSize = 'col-md-12';
	  			if(scope.property.fieldType.search === util.constants.FIELD_COMPLEX) {
					scope.templating.fieldSize = 'col-md-12 no-padding';
					scope.templating.labelWeight = 'font-bold';
				}
				else if(scope.property.fieldType.search === util.constants.FIELD_DATE ||
					(scope.property.fieldType.search === util.constants.FIELD_NUMBER && scope.property.searchConf.policy === util.constants.VALIDATOR_RANGE)) {
					scope.templating.labelWeight = 'font-bold';
				}
	  		}

	  		if(scope.property.fieldType[scope.mode] !== util.constants.FIELD_COMPLEX) {
	  			// Setup the label style
		      	// By default we append no class, as it's a 'standard' form
		      	switch(scope.rootMetadata[scope.mode + 'Style']) {
		      	case util.constants.FORM_STYLE_HORIZONTAL:
		      		scope.templating.inputSize = 'col-md-12';
		      		scope.templating.labelStyle = 'col-md-4 control-label';
		      		scope.templating.validationStyle = 'col-md-offset-4 col-md-8';
		      		break;
		      	}
	  		}

	  		// Is there any custom style?
	  		if(scope.style) {
	  			// Overwrite styling
	  			for(var item in scope.style) {
	  				scope.templating[item] = scope.style[item];
	  			}
	  		}

			valueWatcher = function() {
				fieldConfig.init = false;

				initactive = scope.value.active;
				initinactive = scope.value.inactive;

				// Control nulls
				if(scope.value.text === 'null') {
					scope.value.text = null;
				}

				// Set the real value in the entity
				// See if we need NOT to copy the value
				// If the field is a file, NEVER copy
				var forceNotCopy = false;
				if([util.constants.FIELD_FILE, util.constants.FIELD_TABLE].indexOf(scope.property.type.type) !== -1) {
					forceNotCopy = true;
				}
				var configuration = $filter('filter')(scope.metadata.configuration, { key: 'DONT_CREATE_COPY', value: scope.property.name }, true);
				var sendValue = null;
				if(forceNotCopy || configuration.length) {
					sendValue = scope.value;
				}
				else {
					sendValue = angular.copy(scope.value);
				}

				var result = scope.updateEntity(scope.property, sendValue, scope.entity, scope.parentField, scope.rootEntity);

				// Lookup for cascade filters
				if(scope.property.derived) {
					var configuration = [];
					var path = scope.property.derivedPath;
					var source = scope.parentField;

					switch(scope.mode) {
					case util.constants.SCOPE_SEARCH:
						configuration = source.searchable.configuration;
						break;
					case util.constants.SCOPE_UPDATE:
						configuration = source.showInUpdate.configuration;
						break;
					}

					var listenerName = scope.parentField.owner + '_' + scope.parentField.name;

					var cascadeConfiguration = $filter('filter')(configuration, { key: util.constants.CASCADE_UPDATE });
					if(cascadeConfiguration.length) {
						// Reset all fields from upper levels
						scope.$emit('reset_cascade_' + listenerName, { source: scope.property, configuration: cascadeConfiguration, query: scope.value.text });
					}

					var propagateConfiguration = $filter('filter')(configuration, { key: util.constants.PROPAGATE_UPDATE });
					if(propagateConfiguration.length) {
						// Notify changes to the parent field
						scope.$emit('complex_update_' + listenerName, { source: scope.property, configuration: propagateConfiguration });
					}
				}

				if(sendValue.isExtended == true) {
					scope.value.extended = sendValue.extended;
				}
				scope.value.isExtended = (sendValue.isExtended == true);
				
				// Notify the changes (verify if there's someone listening too)
				if(result && scope.changeEntity) {
					// Submit the changes to the parent controller
					var sendResult = angular.copy(result);
					scope.changeEntity(scope.property, sendResult, scope.entity);
				}

				// Search for linked fields
				$rootScope.$broadcast('field-updated', { field: scope.property, value: scope.value });
			};

			// Listen for property changes
			// On update mode we listen with the path. On search mode with the field name 
			var listenerName = scope.property.owner + '_' + scope.property.name;

			// Manual changes on the value
			scope.$on('manually_change_' + listenerName, function(events, args) {
				// TODO Any verification?

				valueWatcher();
			});
			
			scope.$on('update_' + listenerName, function(events, args) {
				if(args && args.self && !scope.property.isSelf) {
					return;
				}

				if(scope.property.fieldType[scope.mode] === util.constants.FIELD_COMPLEX) {
					var innerFields = scope.value.fields;

					var innerEntity = scope.entity[scope.property.name];

					// Disable cascade filters
					scope.$broadcast('setup-cascade', { enabled: false });
					scope.$broadcast('setup-propagation', { enabled: false });
					scope.$broadcast('setup-watchers', { enabled: false });

					for(var i = 0; i < innerFields.length; i++) {
						var innerField = innerFields[i];

						var innerListenerName = 'update_' + innerField.owner + '_' + innerField.name;
						scope.$broadcast(innerListenerName, { newEntity: innerEntity });
					}

					// Re-enable cascade filters
					scope.$broadcast('setup-cascade', { enabled: true, delay: 500 });
					scope.$broadcast('setup-propagation', { enabled: true, delay: 500 });
					scope.$broadcast('setup-watchers', { enabled: true, delay: 500 });
				}
				else {
					if(scope.parentField && args.newEntity) {
						scope.entity = args.newEntity;
					}

					scope.update();
				}
			});

			if(scope.property.fieldType[scope.mode] === util.constants.FIELD_COMPLEX && !scope.property.isSelf) {
				scope.$on('complex_update_' + listenerName, function(events, args) {
					if(!scope.propagateEnabled) {
						return;
					}

					// Get the source
					var source = args.source;

					// Get the configuration
					var configuration = args.configuration;

					// Get the query for the cascade fields
					var query = args.query;

					// Read all configurations	
					for(var i = 0; i < configuration.length; i++) {
						var currentConf = configuration[i].value;
						// Is any cascade applicable?
						var apiPath = source.isSelf ? util.constants.SELF_FIELD : source.apiPath;

						var index = currentConf.indexOf(apiPath + '->');
						if(index !== -1) {
							var parsedConf = currentConf.split('->');
							var engaged = false;
							for(var f = 0; f < parsedConf.length; f++) {
								if(parsedConf[f] === apiPath) {
									engaged = true;
									// Disable cascade filters
									scope.$broadcast('setup-cascade', { enabled: false });
									scope.$broadcast('setup-watchers', { enabled: false });
									continue;
								}

								if(engaged) {
									var conf = parsedConf[f];
									var self = false;
									// Get the field to cascade
									if(conf === util.constants.SELF_FIELD) {
										conf = scope.property.name;
										self = true;
									}
									var cascadeField = $filter('filter')(scope.value.fields, { apiPath: conf }, true)[0];
									
									// Setup the value
									var eventName = 'update_' + cascadeField.owner + '_' + cascadeField.name;
									scope.$broadcast(eventName, { source: source, self: self, newEntity: scope.entity[scope.property.name] });
								}
							}

							if(engaged) {
								// Re-enable cascade filters
								scope.$broadcast('setup-cascade', { enabled: true, delay: 500 });
								scope.$broadcast('setup-watchers', { enabled: true, delay: 500 });
							}
						}
					}
				});
			}

			scope.$on('cascade_update_' + listenerName, function(events, args) {

				if(args.self && !scope.property.isSelf) {
					return;
				}

				// Get the source
				var source = args.source;

				// Get the query
				var query = args.query;

				scope.reset();

				// Configure the query
				if(!scope.property.type.query) {
					scope.property.type.query = {};
				}
				else if(scope.property.type.query instanceof Array) {
					var newQuery = {};
					for(var param in scope.property.type.query) {
						newQuery[param] = scope.property.type.query[param];
					}

					scope.property.type.query = newQuery;
				}


				scope.property.type.query[source.apiName] = query;
			});

			scope.$on('setup-cascade', function(event, args) {
				if(!args.delay) {
					setupCascade(args.enabled);
				} 
				else {
					$timeout(function() {
						setupCascade(args.enabled);
					}, args.delay);
				}
			});

			scope.$on('setup-propagation', function(event, args) {
				if(!args.delay) {
					setupPropagation(args.enabled);
				} 
				else {
					$timeout(function() {
						setupPropagation(args.enabled);
					}, args.delay);
				}
			});

			scope.$on('setup-watchers', function(event, args) {
				if(!args.delay) {
					setupWatchers(args.enabled);
				} 
				else {
					$timeout(function() {
						setupWatchers(args.enabled);
					}, args.delay);
				}
			});

			function setupCascade(enabled) {
				scope.cascadeEnabled = enabled;
			}

			function setupPropagation(enabled) {
				scope.propagateEnabled = enabled;
			}

			function setupWatchers(enabled) {
				scope.watchersEnabled = enabled;
			}

			scope.$on('reset_cascade_' + listenerName, function(events, args) {
				if(!scope.cascadeEnabled) {
					return;
				}

				// Get the source
				var source = args.source;

				// Get the configuration
				var configuration = args.configuration;

				// Get the query for the cascade fields
				var query = args.query;

				// Read all configurations	
				for(var i = 0; i < configuration.length; i++) {
					var currentConf = configuration[i].value;
					// Is any cascade applicable?
					var index = currentConf.indexOf(source.apiPath + '->');
					if(index !== -1) {
						var parsedConf = currentConf.split('->');
						var engaged = false;
						for(var f = 0; f < parsedConf.length; f++) {
							if(parsedConf[f] === source.apiPath) {
								engaged = true;
								scope.$broadcast('setup-propagation', { enabled: false });
								scope.$broadcast('setup-watchers', { enabled: false });
								continue;
							}

							if(engaged) {
								var conf = parsedConf[f];
								var self = false;
								// Get the field to cascade
								if(conf === util.constants.SELF_FIELD) {
									conf = scope.property.name;
									self = true;
								}
								var cascadeField = $filter('filter')(scope.value.fields, { apiPath: conf }, true)[0];
								
								// Delete current value
								var eventName = 'cascade_update_' + cascadeField.owner + '_' + cascadeField.name;
								scope.$broadcast(eventName, { source: source, query: query, self: self, reset: args.reset });
							}
						}

						if(engaged) {
							// Re-enable cascade filters
							scope.$broadcast('setup-propagation', { enabled: true, delay: 500 });
							scope.$broadcast('setup-watchers', { enabled: true, delay: 500 });
						}
					}
				}
			});

			// Listen for local reset requests
			scope.$on('reset_' + listenerName, function(event, args) {
				scope.reset();
			});
	  		
			// Listen for reset requests
			scope.$on('reset-form', function(event, args) {
				scope.reset();
			});

			// Listen to locale changes
			scope.$on('locale-change', function(data) {

		  		// Change the locale in the tabs
		  		scope.extra.label = $filter('translate')(scope.extra.labelPlaceholder);
		  	});

		  	scope.$on('field-updated', function(evt, data) {
		  		// Am I linked?
		  		// IF yes, verify if i'm linked with the field being updated
		  		if(!scope.property.linked || scope.property.linked.to.indexOf(data.field.name) === -1) {
		  			return;
		  		}

		  		var action = scope.property.linked.via;
		  		scope.dispatchFieldAction(action, { source: data.field, value: data.value, init: !!data.init });
		  	});

			/*
			 * If the input is in 'search' mode, all list inputs will be multi-selectable.
			 * On 'update' mode, the list inputs only receive one value.
			 */
			var multiField = null;
			var fieldToMatch = null;
			if(scope.parentField) {
				fieldToMatch = scope.parentField;
			}
			else {
				fieldToMatch = scope.property;
			}

			if(scope.mode === util.constants.SCOPE_SEARCH) {
				multiField = fieldToMatch.searchConf.multiplicity;
			}
			else {
				multiField = fieldToMatch.multiplicity;
			}

			var multi = multiField === util.constants.MULTIPLICITY_MANY;
			scope.multiple = multi;
			
			var selectTemplate 		= multi ? '/konga/views/multi-select.html' : '/konga/views/single-select.html';
			var selectController 	= multi ? 'MultiSelectController' : 'SingleSelectController';
			
			if (typeof(scope.property.singleSelectCustom) === 'object' && scope.property.singleSelectCustom.selectTemplate !== '' && scope.property.singleSelectCustom.selectController !== '') {
				selectTemplate = scope.property.singleSelectCustom.selectTemplate;
				selectController = scope.property.singleSelectCustom.selectController;
			}

			scope.modal = {
				temp: {}
			};

			scope.openMultiSelect = function () {
				var myScope = scope;
			    var modalInstance = $modal.open({
			      templateUrl: selectTemplate,
			      controller: selectController,
			      size: 'lg',
			      resolve: {
			        items: function() {
			        	return common.read('raw-input>' + myScope.property.name + ' ' +myScope.property.owner);
			        },
			        model: function() {
			        	return angular.copy(myScope.value);
			        },
			        field: function() {
			        	return angular.copy(myScope.property);
			        },
			        parentField: function() {
			        	return angular.copy(myScope.parentField);
			        },
			        entity: function() {
			        	return angular.copy(myScope.entity);
			        },
			        metadata: function() {
			        	return angular.copy(myScope.metadata);
			        }
			      }
			    });
	
			    modalInstance.result.then(function (newValue) {
			    	myScope.value.text = newValue.text ? newValue.text.join(',') : '';
			    		myScope.value.ids = newValue.ids;
			    		myScope.value.entity = newValue.entity;
			    		
			    		// Get the label
			    		myScope.setLabel(newValue.metadata, myScope.value.entity);
			    		
			    		//Set update field
			    		if (typeof(myScope.property.singleSelectCustom) === 'object') {
			    			if (newValue.ids.length == 0){
			    	  			scope.value = {
			    	  		      		text: null,
			    	  		      		list: [],
			    	  		      		entity: null,
			    	  		      		date: {
			    	  		      			startDate: '',
			    	  		      			endDate: '',
			    	  		      			comparator: util.constants.DATE_COMPARATOR_EQUALS
			    	  		      		}
			    	  			};
			    	  			scope.label = '';
			    	  			myScope.property.singleSelectCustom.deleteField = false;
			    	  		}
			    			myScope.property.singleSelectCustom.updateOtherFields = true;
			    			
			    		}
			    	 			    	
			    }, function () {
			      console.log('Operation canceled');
			    });
			  };

			  scope.dispatchFieldAction = function(name, params) {
			  	// Get the defaults override
		  		var overrideDefaults = scope.property.overrideDefaults;
		  		var matchingActions = null;
		  		if(overrideDefaults.length) {
		  			matchingActions = $filter('filter')(overrideDefaults, { overrides: name });
		  		}
		  		var actions = scope.property.actions;
		  		if ((!matchingActions || (matchingActions && !matchingActions.length)) && actions.length) {
		  			matchingActions = $filter('filter')(actions, { name: name });
		  		}

		  		// Custom actions
	  			var actionParams =  {
	  					id: util.getEntityId(scope.metadata, scope.entity), 
	  					entityType: scope.metadata.name, 
	  					self: scope, 
	  					item: scope.entity, 
	  					field: scope.property, 
	  					data: params
	  			};
		  		if(matchingActions && matchingActions.length) {
		  			$rootScope.operations.dispatchActionBatch(matchingActions, actionParams);
		  		}
		  		else {
			  		// Default actions
				  	switch(name){
				  	case 'add':
				  	case 'open-select':
				  			scope.openMultiSelect();
				  		break;
				  	// case 'open-link':
				  	// 	// TODO
				  		// break;
				  	default:
				  		$rootScope.operations.dispatchAction({ name: name }, actionParams);
				  	}
				}
			  };


			  scope.setLabel = function(metadata, entity) {
			  	if(false) {

			  	}
			  	else {
			  		var name = metadata.name.charAt(0).toLowerCase() + metadata.name.substr(1);
			  		scope.isExtended = $filter('extended')(scope.metadata.fields,name);
			  		scope.label = util.getEntityLabel(metadata, entity);
			  	}
			  };

			  scope.getOptionsList = function() {
				switch (scope.property.name) {
					case util.constants.COMBO_NATURE_TIERS :
						return [{code:'Fournisseur',label:'Fournisseur'}, {code:'Client',label:'Client'}];
				}
			  };

			var watchers = null;
			scope.$on('suspend', function() {
			  watchers = scope.$$watchers;
			  scope.$$watchers = [];
			});
			
			

			scope.$on('resume', function() {
			  scope.$$watchers = watchers;
			});
			
			scope.$on('force-validation', function() {
				scope.fieldValidation();
			});

			scope.hideGlobalValidation = function() {
				scope.globalValidation = false;
			};

	      	/*
	      	 * End old controller
	      	 */


			var fieldType = scope.property.fieldType[scope.mode];

			/*
			 *  Map some variables
			 */

			// Booleans on search mode are shown as checkboxes
			if(scope.mode === util.constants.SCOPE_SEARCH && fieldType == util.constants.FIELD_BOOLEAN) {
				fieldType = util.constants.FIELD_CHECKBOX; // Change radio to checkbox on search

				var queryValue = scope.entity[scope.property.name];

				scope.value.text = queryValue;
				// scope.value.active = queryValue !== undefined ? queryValue : true;
				// scope.value.inactive = queryValue !== undefined ? !queryValue : false;
			}

			// Dates on search mode are displayed as two dates and a comparator (i.e. date-search)
			if(scope.mode === util.constants.SCOPE_SEARCH && fieldType === util.constants.FIELD_DATE) {
				fieldType = util.constants.FIELD_DATESEARCH;
			}

			// Text fields with 'maxLength' above 255 are rendered as text areas
			if(fieldType == util.constants.FIELD_PLAIN && scope.property.validation.maxLength > 255) {
				fieldType = util.constants.FIELD_TEXTAREA;
			}

			// Non complex fields with inner fields selected are rendered as complex
			if(scope.value.fields.length) {
				fieldType = util.constants.FIELD_COMPLEX;
			}

			// Depending on the type of the field display one or other
			var inputSuffix = '';
			if(scope.mode === util.constants.SCOPE_SEARCH) {
				// Is it exact match?
				var validatorType = scope.property.searchConf.policy
				if(validatorType === util.constants.VALIDATOR_RANGE) {
					inputSuffix = '-' + validatorType.toLowerCase();
				}
			}

			var fieldTemplate = null;
			if(fieldType === util.constants.FIELD_TYPE_CUSTOM) {
				var configuration = null;
				switch(scope.mode) {
				case util.constants.SCOPE_SEARCH:
					configuration = source.searchable.configuration;
					break;
				case util.constants.SCOPE_UPDATE:
					configuration = source.showInUpdate.configuration;
					break;
				}

				var confParams = $filter('filter')(configuration, { key: util.constants.CUSTOM_FIELD_TYPE });
				if(!confParams || !confParams.length) {
					// TODO Throw exception
				}

				var conf = confParams[0].value;

				// Try to map
				fieldTemplate = mapper[conf];
				// If no mapping try direct
				if(!fieldType) {
					fieldTemplate = conf;
					if(!fieldTemplate) {
						// TODO Throw exception
					}
				}
			}
			else 
				fieldTemplate = '/konga/views/raw-' + fieldType.toLowerCase() + inputSuffix + '-input.html'

			scope.contentUrl = fieldTemplate;

			scope.datePicker = { opened: false };
			scope.toggleDatePicker = function(){
				scope.datePicker.opened = (scope.datePicker.opened)? false:true;
			};

			scope.fieldValidation = function() {
				//Date verification
				
				if(scope.mode === util.constants.SCOPE_UPDATE && (scope.property.type.type === util.constants.FIELD_DATE || scope.property.type.type === util.constants.FIELD_DATETIME)) {
					if(scope.property.validation.validators && scope.property.validation.validators.length > 0){
												
						var hasError = false;
						var classErrorName;
						for(var i = 0; i < scope.property.validation.validators.length; i++) {
							var typeValidator = scope.property.validation.validators[i].type; 
							
							switch (typeValidator) {
							case 'DATE_GE':
							case 'DATE_GT':
							case 'DATE_LE':
							case 'DATE_LT':
								var dateToCompare = scope.entity[scope.property.validation.validators[i].value];
								if (typeof(dateToCompare) == "string") {
									dateToCompare = new Date(dateToCompare).getTime();
								}
								var value = scope.value.text;
								classErrorName = "invalid-date";

								if (dateToCompare == undefined || dateToCompare == 0) {
									break;
								}
								if (value != undefined) {
									var dateRef = value;									
									if (scope.property.type.type === util.constants.FIELD_DATE && value.length > 0) {
										var dateRef = new Date(value).getTime();
									} 
									
									if (typeValidator == "DATE_GE" && dateRef - dateToCompare < 0) {
										
										hasError = true;
									}
									if (typeValidator == "DATE_GT" && dateRef - dateToCompare <= 0) {
										hasError = true;
									}
									if (typeValidator == "DATE_LE" && dateRef - dateToCompare > 0) {
										hasError = true;
									}
									if (typeValidator == "DATE_LT" && dateRef - dateToCompare >= 0) {
										hasError = true;
									}
								}							
								break;
							}
						}
						var realInput = element.find('input');
						
						if (hasError) {
							realInput.addClass(classErrorName);
							scope.$emit('form-invalid', {
								field: scope.property.name,
								owner: scope.property.owner,
								validation: typeValidator,
								valid: false
							});
						}
						else {
							// remove error on the invalid dates if any
							realInput.removeClass(classErrorName);
							scope.$emit('form-invalid', {
								field: scope.property.name,
								owner: scope.property.owner,
								validation: typeValidator,
								valid: true
							});
							//scope.$emit('form-reset-invalid-date');
							
						}
					}
				}
				
				// TODO Improve this validation mode
				if(scope.mode === util.constants.SCOPE_UPDATE && scope.property.type.type === util.constants.FIELD_STRING) {
					var validation = scope.property.validation;

					var value = scope.value.text;

					// Length verification
					var length = value ? value.length : 0;

					var realInput = element.find('input');

					if(validation.maxLength && length > validation.maxLength) {
						realInput.addClass('invalid-max-length');
						scope.$emit('form-invalid', {
							field: scope.property.name,
							owner: scope.property.owner,
							validation: 'max-length',
							valid: false
						});
					}
					else {
						realInput.removeClass('invalid-max-length');
						scope.$emit('form-invalid', {
							field: scope.property.name,
							owner: scope.property.owner,
							validation: 'max-length',
							valid: true
						});
					}
					
					if(validation.minLength && length < validation.minLength) {
						realInput.addClass('invalid-min-length');
						scope.$emit('form-invalid', {
							field: scope.property.name,
							owner: scope.property.owner,
							validation: 'min-length',
							valid: false
						});
					}
					else {
						realInput.removeClass('invalid-min-length');
						scope.$emit('form-invalid', {
							field: scope.property.name,
							owner: scope.property.owner,
							validation: 'min-length',
							valid: true
						});
					}
				}
				if(scope.property.fieldType.update == util.constants.FIELD_PICK_LIST) {
					var validation = scope.property.validation;

					var length = scope.entity.situations ? scope.entity.situations.length : 0;
					
					var realInput = element.find('input');
					
					if(validation.minLength && length < validation.minLength) {
//						realInput.addClass('invalid-min-length');
						scope.$emit('form-invalid', {
							field: scope.property.name,
							owner: scope.property.owner,
							validation: 'min-length',
							valid: false
						});
					}
					else {
//						realInput.removeClass('invalid-min-length');
						scope.$emit('form-invalid', {
							field: scope.property.name,
							owner: scope.property.owner,
							validation: 'min-length',
							valid: true
						});
					}
				}
			};
	          
			scope.aucun = null;

			scope.update(true);

			// Setup a unique id for the form element
			scope.fieldId = 'raw-input-' + scope.property.name + '-' + scope.property.owner;
		},
	    templateUrl: '/konga/views/raw-input.html'
	};
}]);

'use strict';

/**
 * @ngdoc directive
 * @name konga.directive:recursiveListItem
 * @description
 * # recursiveListItem
 */
angular.module('konga')
  .directive('recursiveListItem', function () {
    return {
      templateUrl: '/konga/views/recursive-list-item.html',
      restrict: 'E',
      replace: true,
      scope: {
      	item: '=',
      	click: '=onClick',
      	ngClass: '@'
      },
      link: function postLink(scope, element, attrs) {
      }
    };
  });

'use strict';

/**
 * @ngdoc directive
 * @name konga.directive:recursiveList
 * @description
 * # recursiveList
 */
angular.module('konga')
  .directive('recursiveList', function () {
    return {
      template: '<div ng-include="contentUrl"></div>',
      restrict: 'E',
      replace: true,
      scope: {
      	list: '=',
      	clickItem: '=onClickItem',
      	itemClass: '@'
      },
      link: function postLink(scope) {
      	scope.contentUrl = '/konga/views/recursive-list.html';
      }
    };
  });

'use strict';

/**
 * @ngdoc directive
 * @name konga.directive:resultTable
 * @scope
 * @restrict E
 * @description

 The `resulTable` is in change of result rendering, into an interactive data table. It generates a column layout using the configuration set up in the {@link Metadata.Field `fields' metadata`}. 

 <img src="/static/result-table-init.png" width="50%" class="center">

Fields and categories' metadata are fetched, to determine the column layout to generate. If you configured any field to be rendered as {@link Metadata.FieldTypes#properties_COMPLEX `complex`}, another process is needed, who splits up your root field into all the inner fields you need for your layout. 

# Form Type 

You can customize the appeareance of your table, by setting up the property `formType` of the {@link Metadata.Field field's metadata}, for {@link Metadata.FormScopes#properties_RESULTS `results`} form scope. There are built-in views to render category headers on top of the fields.

# Sorting

If {@link Metadata.Field field's metadata} configures the field as `sortable`, a dropdown/caret will show on table header to allow user to launch sorting. The `resultTable` calls the `submitSorting` method of the {@link konga.controller:EntitySearchController `EntitySearchController`} with the sorting field and mode, and the controller handles it from there. 


@param {Object} metadata
Defines the metadata of the entity whose results are being rendered.

@param {Array} entities
The results themselves

@param {function()} updateEntity
Function to call when a row is clicked, if no {@link Customisation.Action-driven#properties_result-click custom action} has been defined for that purpose and the entity's metadata is defined as `editable`.

@param {function()} submitSorting
Function to call when sorting field or mode changes
 */
angular.module('konga')
.directive('resultTable', ['util', 'mapper', '$filter', '$rootScope', 'permissionManager', 
  function (util, mapper, $filter, $rootScope, permissionManager) {
    return {
      templateUrl: '/konga/views/result-table.html',
      replace: true, 
      restrict: 'E',
      scope: {
      	entityMetadata: '=',
      	entities: '=',
        updateEntity: '=onUpdate',
        submitSorting: '=onSorting'
      },
      controller : function ($scope, $filter, $rootScope, permissionManager) {
        $scope.fields = [];
        $scope.categories = [];

        function divideComplexField(field) {
          var relatedMetadata = util.getMetadata(field.type.complexType);
          var relatedFields = util.getEntityFields(relatedMetadata);
          var nestFields = field.showInResults.fields;
          var selectedFields = $filter('selectedFields')(relatedFields, nestFields, field);
          for(var fi = 0; fi < selectedFields.length; fi++) {
            if(selectedFields[fi].fieldType.results === util.constants.FIELD_COMPLEX) {
              divideComplexField(selectedFields[fi]);
            }
            else {
              // Append the source
              selectedFields[fi].derivedPath.splice(0, 0, field);
              selectedFields[fi].derivedSource = field;

              // Push the field
              $scope.fields.push(selectedFields[fi]);
            }
          }
        }

        $scope.init = function() {
          $scope.categories = util.getEntityCategories($scope.entityMetadata, 1);
          
          var formType = $scope.entityMetadata.resultsType;

          if(formType === util.constants.CUSTOM_FORM) {
            var configuration = $filter('filter')($scope.entityMetadata.configuration, { key: util.constants.RESULTS_CUSTOM_VIEW });
            if(!configuration.length) {
              // TODO Show exception
            }
            var contentUrl = mapper[configuration[0].value];
            if(!contentUrl) {
              contentUrl = configuration[0].value;
              if(!contentUrl) {
                // TODO Throw exception
              }
            }
            $scope.contentUrl = contentUrl;
          }
          else {
            $scope.contentUrl = '/konga/views/' + formType.toLowerCase() + '-result-table.html';

            // Custom behavior for each form type
            switch(formType) {
            case util.constants.CATEGORIZED_CASCADE_FORM:
              // Get the categories used for search
              var configuration = $filter('filter')($scope.entityMetadata.configuration, { key: util.constants.RESULTS_USE_CATEGORY }, true);
              $scope.categories = [];
              for(var i = 0; i < configuration.length; i++) {
                var cat = configuration[i].value;

                // Shall we hide the header?
                var hideHeaderConf = $filter('filter')($scope.entityMetadata.configuration, { key: util.constants.HIDE_CATEGORY_HEADER, value: cat }, true);
                var showHeader = true;
                if(hideHeaderConf.length) {
                  showHeader = false;
                }


                var category = {
                  name: cat,
                  showHeader: showHeader
                };

                $scope.categories.push(category);
              }
              break;
            default:
              // Nothing to do
            }
          }

          // Generate fields
          var allFields = $filter('orderBy')(util.getEntityFields($scope.entityMetadata), '+priority.results');
          var filteredFields = $filter('resultParams')(allFields, $scope.entityMetadata);

          // Control complex fields
          for(var f = 0; f < filteredFields.length; f++) {
            var field = filteredFields[f];
            if(field.type.type === util.constants.FIELD_COMPLEX && field.fieldType.results === util.constants.FIELD_COMPLEX && field.showInResults.fields.length) {
              divideComplexField(field);
            }
            else {
              $scope.fields.push(field);
            }
          }

          // Organize the categorized fields
          $scope.categoryFields = {};
          $scope.sortedFieldsByCategory = [];
          for(var i = 0; i < $scope.categories.length; i++) {
            var category = $scope.categories[i].name;

            var matchingFields = $filter('filter')($scope.fields, { categories: category }, true);

            $scope.sortedFieldsByCategory = $scope.sortedFieldsByCategory.concat(matchingFields);

            $scope.categoryFields[category] = matchingFields;
          }

          // Setup editable
          var isEditable = $scope.entityMetadata.editable !== null;
          var isAllowed = null;
          if(isEditable) {
            isAllowed = permissionManager.isAllowed($scope.entityMetadata.editable);
          }
          var bEditable = !isEditable || !isAllowed;
          $scope.isEditable = !bEditable;
        };

        var	entityLabel = $filter('translate')($scope.entityMetadata.entityLabel);

      	$scope.extra = {
      		label: entityLabel,
      		labelPlaceholder: $scope.entityMetadata.entityLabel
   
      	};

        $scope.resultClick = function(metadata, entity, index) {
        	
          // Look for custom actions
  	  	  var actions = metadata.overrideDefaults;
  	  	  var matchingActions = null;
  	  	  if(actions.length) {
  	  		  matchingActions = $filter('filter')(actions, { overrides: 'result-click' });
  	  	  }
        	
	  	    // Dispatch 'em all (in batch)
      	  if (matchingActions && matchingActions.length) {
      		  $rootScope.operations.dispatchActionBatch(matchingActions, { id: util.getEntityId(metadata, entity), entityType: metadata.name, self: $scope, item: entity, index: index });
      	  }
          // Is it editable?
          else if($scope.isEditable) {
        	  $scope.updateEntity(metadata, entity);
          }
        };
        
        $scope.showSorting = function(sorting, isDESC) {
          if (sorting !== '') {
            if (isDESC) {
              if (sorting === 'asc') {
                return 'dropup';
              } else {
                return '';
              }
            } else {
              return 'caret';
            }
          } else {
            return '';
          }
        };
        
        $scope.sorting = function(field, type) {
          // Verify search action
          var matchingActions = $filter('filter')(scope.entityMetadata.overrideDefaults, { overrides: 'sort' }, true);
          if (matchingActions && matchingActions.length) {
            for(var i = 0; i < matchingActions.length; i++) {
              scope.dispatch(matchingActions[i], { data: { field: field, type: type } });
            }
          }
          else {
            scope.dispatch({ name: 'sort'}, { data: { field: field, type: type } });
          }
        };

        // var resultFields = $scope.fields = [];
        // for(var i = 0; i < filteredFields.length; i++) {
        //   var field = filteredFields[i];

        //   // Is it complex?
        //   if(field.fieldType.results === util.constants.FIELD_COMPLEX) {
        //     var complexType = field.type.complexType;
        //     var complexMetadata = util.getMetadata(complexType);

        //     var fieldFields = field.showInResults.fields;

        //     var complexFields = util.getEntityFields(complexMetadata);

        //     var selectedFields = $filter('selectedFields')(complexFields, fieldFields);

        //     for(var f = 0; f < selectedFields.length; f++) {
        //       var fieldObj = {
        //         field: field,
        //         subfield: selectedFields[f],
        //         complex: true
        //       };

        //       resultFields.push(fieldObj);
        //     }
        //   }
        //   else {
        //     resultFields.push(field);
        //   }
        // }

        var watchers = null;
        $scope.$on('suspend', function() {
          watchers = $scope.$$watchers;
          $scope.$$watchers = [];
        });

        $scope.$on('resume', function() {
          $scope.$$watchers = watchers;
        });        
      },
      link: function postLink(scope, element, attrs) {

        // scope.$watchCollection('filterCode', scope.filerData)
        
      }
      
    };
  }]);

'use strict';

/**
 * @ngdoc directive
 * @name konga.directive:scrollWatcher
 * @description
 * # scrollWatcher
 */
angular.module('konga')
  .directive('scrollWatcher', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element) {
      	angular.element(element).bind('scroll', function() {

      		var height = element[0].scrollHeight - element.height();
      		var scroll = element.scrollTop();

      		var msg = {
      			absolute: scroll,
      			height: height,
      			relative: (scroll / height)
      		};

      		scope.$emit(scope.id + '-scroll-watcher', msg);
      	});

      	scope.$on('set-scroll', function(event, data) {
      		if(data.relative) {
      			var height = element[0].scrollHeight - element.height();

      			var newScroll = height * data.relative;

      			element.scrollTop(newScroll);
      		}
      	});
      }
    };
  });

'use strict';

/**
 * @ngdoc directive
 * @name konga.directive:searchPane
 * @scope
 * @restrict E
 * @description
 * 
 * The `searchPane` is in charge of all rendering operations of the search forms, along with the communication with the controller for upper-level tasks, using the info received by lower-level elements - the {@link konga.directive:rawInput `rawInputs`}.
 *
 * <img src="/static/search-pane-basic-flow.png" width="80%" class="center">

 # Process
 * 
 * The `searchPane` receives the {@link Metadata.Entity metadata}, the query to map values on, at the function to call once it's finished, and launches the form.
 *
 ## Get fields and categories
 *
 * Leveraging {@link Standards.Tools#methods_getEntityFields `getEntityFields`} and {@link Standards.Tools#methods_getEntityCategories `getEntityCategories`} methods, the `searchPane` gets all fields and categories that will be used in the form.
 *
 * All field-dependent responsibilities are handled independently by each field, using {@link konga.directive:rawInput `rawInput`} directives. Hence, the main duty of the `searchPane` is to split form into independent pieces - the fields - and let them work. 
 *
 ## Setup view with `formType`
 * 
 * Once the fields and categories are fetched, the `formType` assigned for {@link Metadata.FormScopes#properties_SEARCH `search` scope} on the {@link Metadata.Field field's definition} is used to determine which view to render. 
 *
 * The selected view will be provided with the fields and categories fetched on earlier stages, so they could fully build the layout the form will have.

 <img src="/static/search-pane-formtype.png" width="50%" class="center">
 *
 * There's more detailed documentation about form types, along with examples, on the {@link Metadata.FormTypes `FormType`} documentation.
 
 # Submitting
 * 
 * All submit responsibility relies on the {@link konga.controller:EntitySearchController `EntitySearchController`}. All the `searchPane` does on submit is send the query up to the defined `submit` method.
 *
 * # Resetting
 * For resetting, a {@link konga.directive:searchPane#events_reset-form `reset-form`} event will be `$broadcasted`, and every {@link konga.directive:rawInput field} will restore to defaults.
 *
 *
 @param {Object} entityMetadata
 <span class="label type-hint type-hint-object">{@link Metadata.Entity Entity}</span>
 The metadata of the entity to create a form to. 

 @param {Object} query
 The query object to deal with (the search entity).

 @param {function()} submit
 The submit method. The `searchPane` will call it once the user launches the search.

 */
angular.module('konga')
  .directive('searchPane', ['util', '$filter', '$modal', '$timeout', 'scaffold', 
    function (util, $filter, $modal, $timeout, scaffold) {
      return {
        templateUrl: '/konga/views/search-pane.html',
        replace: true, 
        restrict: 'E',
        scope: {
        	entityMetadata: '=',
          query: '=',
          submit: '=onSubmit',
          dispatch: '=onDispatch'
        },
        controller: function($scope) {
          $scope.fields = [];
          $scope.categories = [];

          $scope.init = function() {
            $scope.fields = util.getEntityFields($scope.entityMetadata);
            $scope.categories = util.getEntityCategories($scope.entityMetadata, 1);

            var formType = $scope.entityMetadata.searchType;

            if(formType === util.constants.CUSTOM_FORM) {
              var configuration = $filter('filter')($scope.entityMetadata.configuration, { key: util.constants.SEARCH_CUSTOM_VIEW });
              if(!configuration.length) {
                // TODO Show exception
              }
              $scope.contentUrl = mapper[configuration[0].value];
            }
            else {
              $scope.contentUrl = '/konga/views/' + formType.toLowerCase() + '-search-pane.html';

              // Custom behavior for each form type
              switch(formType) {
              case util.constants.CATEGORIZED_CASCADE_FORM:
                // Get the categories used for search
                var configuration = $filter('filter')($scope.entityMetadata.configuration, { key: util.constants.SEARCH_USE_CATEGORY }, true);
                $scope.categories = [];
                for(var i = 0; i < configuration.length; i++) {
                  var cat = configuration[i].value;
                  $scope.categories.push(cat);
                }
                break;
              default:
                // Nothing to do
              }
            }
          };

          function setupQuery(obj, query) {
            for(var i in obj) {
              if(typeof obj[i] === 'object') {
                setupQuery(obj[i], query[i]);
              }
              else {
                query[i] = obj[i];
              }
            }
          }

          $scope.resetQuery = function() {
            var newQuery = scaffold.newQuery($scope.entityMetadata);
            for(var param in $scope.query) {
              $scope.query[param] = newQuery[param];
            }
          };

          $scope.delayedSubmit = function() {
            $timeout(function() {
              $scope.operations.submit();
            }, 100);
          };

          var watchers = null;
          $scope.$on('suspend', function() {
            watchers = $scope.$$watchers;
            $scope.$$watchers = [];
          });

          $scope.$on('resume', function() {
            $scope.$$watchers = watchers;
          });
    	  },
        link: function postLink(scope) {
          scope.operations = {
            updateField: function(property, value, query, parent) {
              var fieldName = property.name;

              // Is there an api name present?
              if(parent) {
                fieldName = property.apiName;
              }

              // Special for checkboxes :)
              if(property.fieldType.search === util.constants.FIELD_BOOLEAN) {
                if(value.active == value.inactive) {
                  // None or all, same thing
                  value.text = '';
                }
                else {
                  // If active, then its true. If not, means inactive is true, ergo, its false=active
                  value.text = value.active;
                }
              }

              if(property.fieldType.search === util.constants.FIELD_DATE) {
                value.date.startDate = (value.date.startDate == "") ? 0 : value.date.startDate;
                value.date.endDate = (value.date.endDate == "") ? 0 : value.date.endDate;
                value.text = value.date;
              }
              else if(property.searchConf.policy === util.constants.VALIDATOR_RANGE && value.range.from !== '') {
                value.text = value.range;
              }

              var ret = value.text;
              // if(ret && typeof ret === 'object') ret = ret.join(',');
              // Update the query
              query[fieldName] = ret;
              return ret;
            },

            clear: function() {
              // Verify search action
              var matchingActions = $filter('filter')(scope.entityMetadata.overrideDefaults, { overrides: 'clear' }, true);
              if (matchingActions && matchingActions.length) {
                for(var i = 0; i < matchingActions.length; i++) {
                  scope.dispatch(matchingActions[i]);
                }
              }
              else {
                scope.dispatch({ name: 'clear'});
              }
            },



            submit: function() {
              // Verify search action
              var matchingActions = $filter('filter')(scope.entityMetadata.overrideDefaults, { overrides: 'search' }, true);
              if (matchingActions && matchingActions.length) {
                for(var i = 0; i < matchingActions.length; i++) {
                  scope.dispatch(matchingActions[i]);
                }
              }
              else {
                scope.dispatch({ name: 'search'});
              }
            }
          };
        }
      };
    }]);

'use strict';

/**
 * @ngdoc directive
 * @name konga.directive:selectInputs
 * @description
 * # selectInput
 */
angular.module('konga')
  .directive('selectInput', ['api', '$filter', 'util', function (api, $filter, util) {
    return {
      templateUrl: '/konga/views/select-input.html',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        scope.textinput = scope.value.text;

        // // Only enabled for update mode
        // if(scope.mode !== util.constants.SCOPE_UPDATE) {
        //   return;
        // }

      	var entityType = scope.property.type.complexType;
      	var localEndpoint = api.getLocalEndpoint(entityType);
      	var metadata = util.getMetadata(entityType);
      	var apiPath = metadata.apiPath;
      	var quickSearch = $filter('quickSearch')(metadata)[0];
      	var paramName = !quickSearch.metadata ? null : $filter('fieldApiName')(quickSearch.metadata.name, quickSearch.metadata);

        var fields = util.getEntityFields(metadata);
        var codeField = $filter('filter')(fields, { isKey: true}, true)[0];
        var labelField = scope.labelField = $filter('filter')(fields, { isLabel: true}, true)[0];

        var active = false;
      	
      	scope.getElements = function(value) {
          var query = $filter('queryParser')(this.property, this.entity);
      		
          query.path = apiPath;
      		query[paramName] = value;

          active = true;

      		return localEndpoint.search(query)
            .$promise.then(function(data) {
              return data.map(function(item){
                var code = $filter('mapField')(item, codeField);
                var label = $filter('mapField')(item, labelField);
                var ret = {
                  label: code + ' - ' + label,
                  real: item
                };
                return ret;
              });
            });
      	};

        scope.formatInput = function(value, model, label) {
          var item = value.real;
          var text = '';
          
          // Is it a many to many field?
          if($filter('fieldMultiplicity')(this.property, this.mode) === util.constants.MULTIPLICITY_MANY) {
            if(!this.value.entity || !(this.value.entity instanceof Array)) {
              this.value.entity = [];
            }

            // Look for existing items like this one
            var existing = $filter('filter')(this.value.entity, { id: item.id }, true);

            if(!existing.length) {
              // Push the entity into the array
              this.value.entity.push(item);
            }

            text = this.value.entity.map(function(item) {
              return(item.id);
            }).join(',');

            // Delete text
            this.textinput = '';
          }

          // Or it's just one?
          else {

            // Set the entity
            this.value.entity = item;

            text = item.id;

            // Delete text
            this.textinput = $filter('mapField')(item, labelField);
          }

          // Setup value's text
          this.value.text = text;
        };

        scope.writeValue = function() {
          // this.removeField(this.property, true);
        };

        var multiplicity = scope.mode === 'search' ? scope.property.searchConf.multiplicity : scope.property.multiplicity;
        if(multiplicity === util.constants.MULTIPLICITY_ONE) {
          scope.$watch('value.text', function() {
            scope.textinput = scope.value.text;
          });
        }
      }
    };
  }]);

'use strict';

angular.module('konga')
  .directive('tabContent', function () {
    return {
		require: '^verticalTabs',
		restrict: 'E',
		transclude: true,
		replace: true,
		scope: {
			title: '@',
			id: '=tabId'
		},
		link: function(scope, element, attrs, tabsCtrl) {
			tabsCtrl.addTabContent(scope);
		},
		templateUrl: '/konga/views/vertical-tabs-element.tp.html'
	};
  });

'use strict';

/**
 * @ngdoc directive
 * @name konga.directive:tableCell
 * @description
 * # tableCell
 */
angular.module('konga')
  .directive('tableCell', ['util', '$filter', function (util, $filter) {
    return {
      templateUrl: '/konga/views/table-cell.html',
      restrict: 'E',
      replace: true,
      scope: {
      	entity: '=',
      	field: '='
      },
      link: function postLink(scope, element) {
        scope.content = '';
        scope.type = 'text';
        scope.styles = [];
        scope.preffix = '';
        scope.suffix = '';

        var useList = true;

        //var fieldWatcher;
        var entityWatcher;

        function setupValue() {
          var fieldEntity = scope.entity;

          // Lookup for complex fields
          var mapped = null;
          if(scope.field.derived) {
            if(scope.field.derivedSource) {
              fieldEntity = $filter('mapField')(scope.entity, scope.field.derivedSource);
              if(scope.field.isSelf) {
                mapped = fieldEntity;
              }
            }
          }

          if(!mapped) {
            mapped = $filter('mapField')(fieldEntity, scope.field);
          }
          if(scope.field.type.type === util.constants.FIELD_COMPLEX) {
            scope.content = $filter('tableRendererComplex')(mapped, scope.field);
          }
          else {
            // Render depending on the data type
            switch(scope.field.fieldType.results) {
            case util.constants.FIELD_DATE:
              scope.content = mapped !== 0 ? $filter('date')(mapped, 'dd/MM/yyyy') : '';
              break;
            case util.constants.FIELD_DATETIME:
                scope.content = mapped !== 0 ? $filter('date')(mapped, 'dd/MM/yyyy HH:mm:ss') : '';
              break;
            case util.constants.FIELD_BOOLEAN:
              var content = $filter('activeInactive')(mapped, scope.field);
              scope.content = $filter('translate')(content);
              // scope.contentUrl = views.translated;
              break;
            case util.constants.FIELD_PLAIN:
              scope.content = $filter('translate')(mapped);
              // scope.contentUrl = views.translated;
              break;
            case util.constants.FIELD_IMAGE:
              scope.type = 'image';
              scope.content = mapped;
              scope.image = {
                width: 30,
                height: 30,
              };

              // Read configuration
              var conf = scope.field.fieldType.configuration[0];
              var width = $filter('filter')(conf, { key: 'IMAGE_WIDTH' }, true)[0];
              var height = $filter('filter')(conf, { key: 'IMAGE_HEIGHT' }, true)[0];

              if(width) {
                scope.image.width = width.value;
              }

              if(height) {
                scope.image.height = height.value;
              }


              break;
            case util.constants.FIELD_PRICE:
              var configuration = scope.field.fieldType.configuration[0];
              var currency = $filter('filter')(configuration, { key: 'CURRENCY' }, true)[0];
              scope.suffix = currency.value;
              scope.styles.push('text-right');
              scope.content = $filter('number')(mapped, 2);
              break;
            case util.constants.FIELD_NUMBER:
              // Read decimals from config
              scope.styles.push('text-right');
              scope.content = mapped;
              break;  
            case util.constants.FIELD_CSS:
              scope.type = 'styling';
              scope.styles.push('text-center');
              scope.content = mapped;
              useList = false;
              break;
            case util.constants.FIELD_PLAIN_FILTERED:
              scope.type = 'plain-filtered';
              scope.content = mapped;

              // Get the filter 
              // TODO Or die :)
              var configuration = scope.field.fieldType.configuration[0];
              var filter = $filter('filter')(configuration, { key: util.constants.TABLE_CELL_FILTER }, true)[0];
              scope.filter = filter.value;

              break;
            default:
              // Plain text
              scope.content = mapped;
            }
          }

          if(scope.field.type.list && useList) {
            var list = scope.field.type.list;
            
            var listMatch = $filter('filter')(list, { key: (scope.content+"") }, true);
            if(listMatch.length) {
              var item = listMatch[0];
              var content = item.value;
              scope.content = $filter('translate')(content);
            }
          }

          if(scope.content === null || scope.content === undefined) {
            scope.content = '';
          }
        }

        entityWatcher = scope.$watch('entity', function() {
          setupValue();
          scope.updateContent();
          entityWatcher();
          // fieldWatcher();
        }, true);

        var watchers = null;
        scope.$on('suspend', function() {
          watchers = scope.$$watchers;
          scope.$$watchers = [];
        });

        scope.$on('resume', function() {
          scope.$$watchers = watchers;
        });


        var elt = angular.element(element);

        scope.updateContent = function() {
          element.children('.table-cell-content').text(scope.preffix + ' ' + scope.content + ' ' + scope.suffix);
        };
      }
    };
  }]);

'use strict';

/**
 * @ngdoc directive
 * @name konga.directive:tableHeader
 * @description
 * # tableHeader
 */
angular.module('konga')
  .directive('tableHeader', ['util', '$filter', '$rootScope', function (util, $filter, $rootScope) {
    return {
      templateUrl: '/konga/views/table-header.html',
      restrict: 'E',
      replace: true,
      scope: {
      	field: '=',
        selectSortingField: '=sorting',
      	showSorting: '=',
        mode: '@'
      },
      link: function postLink(scope, element, attrs) {
        scope.label = scope.field.label;
        scope.owner = '';
        var sourceField = scope.field;
        scope.sort = null;
        scope.styles = [];

        if(['CSS', 'NUMBER', 'PRICE'].indexOf(scope.field.fieldType.results) !== -1) {
          scope.styles.push('text-center');
        }
        
        if(scope.field.owner){
          for(var i = 0; i < $rootScope.metadata.entities.length; i++){
            if(scope.field.owner == $rootScope.metadata.entities[i].name){
              if($rootScope.metadata.entities[i].label != null){
                scope.owner = $filter('translate')($rootScope.metadata.entities[i].label);
              }else{
                scope.owner = scope.field.owner;
              }
              break;
            }
          }
        }

        if(scope.field.derived) {
          // Get the original field to know it's configuration
          sourceField = scope.field.derivedPath[0];
        }

        if(!scope.field.derived && scope.field.isKey) {
          scope.sort = 'asc';
        }

        var configurationSource = [];

        switch(scope.mode) {
        case util.constants.SCOPE_RESULTS:
          configurationSource = sourceField.showInResults.configuration;
          break;
        case util.constants.SCOPE_UPDATE:
          configurationSource = scope.field.showInUpdate.configuration;
          break;
        }

        var configuration = $filter('filter')(configurationSource, { key: util.constants.USE_SHORT_LABEL });

        if(configuration && configuration.length && configuration[0].value === 'true') {
          scope.label = scope.field.shortLabel;
        }

        scope.sorting = function(type) {
          // if(scope.field.derived) {
          //   var action = {
          //     name: 'action-under-development'
          //   };

          //   $rootScope.operations.dispatchAction(action, {});
          // }
          // else {
            scope.selectSortingField(scope.field, type);
          // }
        };

        var watchers = null;
        scope.$on('suspend', function() {
          watchers = scope.$$watchers;
          scope.$$watchers = [];
        });

        scope.$on('resume', function() {
          scope.$$watchers = watchers;
        });

        scope.$on('sorting', function(evt, args) {
          var field = args.field;
          var type = args.type;

          if(field === scope.field) {
            scope.sort = type;
          }
          else {
            scope.sort = null;
          }
        });
      }
    };
  }]);

'use strict';

/**
 * @ngdoc directive
 * @name konga.directive:tableInput
 * @description
 * # tableInput
 */
angular.module('konga')
  .directive('tableInput', ['$filter', '$timeout', 'scaffold', 'util', 
      function ($filter, $timeout, scaffold, util) {
    return {
      templateUrl: '/konga/views/table-input.html',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {

      	var entityFields = util.getEntityFields(scope.metadata);

      	var innerEntityTypeName = scope.property.type.complexType;
      	var innerEntityType = util.getMetadata(innerEntityTypeName);
      	var innerEntityTypeFields = util.getEntityFields(innerEntityType);

      	// Rows
      	scope.rows = null;

      	// Columns
      	scope.columns = null;

      	// Limit X values
      	scope.minX = null;
      	scope.maxX = null;

      	// Limit Y values
      	scope.minY = null;
      	scope.maxY = null;

      	// Step values
      	scope.stepX = null;
      	scope.stepY = null;

      	// Value field (TODO Configure)
      	scope.valueField = 'value';

      	// Init timeout
      	var initTimeout = null;

      	// Read configuration
      	var configuration = scope.configuration = {};
      	var configurationSource = scope.property.fieldType.configuration[0];
      	
      	// X Axis Property
      	var xAxisPropertyConfiguration = $filter('filter')(configurationSource, { key: util.constants.TABLE_CONF_X_AXIS_PROPERTY }, true)[0];
      	var xAxisPropName = xAxisPropertyConfiguration.value;
      	configuration.xAxisProperty = $filter('filter')(innerEntityTypeFields, { name: xAxisPropName }, true)[0];

      	// Y Axis Property
      	var yAxisPropertyConfiguration = $filter('filter')(configurationSource, { key: util.constants.TABLE_CONF_Y_AXIS_PROPERTY }, true)[0];
      	var yAxisPropName = yAxisPropertyConfiguration.value;
      	configuration.yAxisProperty = $filter('filter')(innerEntityTypeFields, { name: yAxisPropName }, true)[0];

      	// Limits
      	function initLimits(first) {
      		// Get conf
      		var xAxisMinConfiguration = $filter('filter')(configurationSource, { key: util.constants.TABLE_CONF_X_AXIS_MIN })[0];
      		var yAxisMinConfiguration = $filter('filter')(configurationSource, { key: util.constants.TABLE_CONF_Y_AXIS_MIN })[0];
      		var xAxisMaxConfiguration = $filter('filter')(configurationSource, { key: util.constants.TABLE_CONF_X_AXIS_MAX })[0];
      		var yAxisMaxConfiguration = $filter('filter')(configurationSource, { key: util.constants.TABLE_CONF_Y_AXIS_MAX })[0];

      		// Get prop names
      		var xAxisMinPropName = xAxisMinConfiguration.value.replace(/[\{\}]/g, '');
			var yAxisMinPropName = yAxisMinConfiguration.value.replace(/[\{\}]/g, '');
			var xAxisMaxPropName = xAxisMaxConfiguration.value.replace(/[\{\}]/g, '');
			var yAxisMaxPropName = yAxisMaxConfiguration.value.replace(/[\{\}]/g, '');

			// Get properties
			var xAxisMinProperty = $filter('filter')(entityFields, { name: xAxisMinPropName })[0];
			var yAxisMinProperty = $filter('filter')(entityFields, { name: yAxisMinPropName })[0];
			var xAxisMaxProperty = $filter('filter')(entityFields, { name: xAxisMaxPropName })[0];
			var yAxisMaxProperty = $filter('filter')(entityFields, { name: yAxisMaxPropName })[0];

			// Assign initial values
			scope.minX = $filter('mapField')(scope.entity, xAxisMinProperty);
			scope.minY = $filter('mapField')(scope.entity, yAxisMinProperty);
			scope.maxX = $filter('mapField')(scope.entity, xAxisMaxProperty);
			scope.maxY = $filter('mapField')(scope.entity, yAxisMaxProperty);

			// Add watchers (only first time)
			if(first === true) {
				scope.$watch('entity.' + xAxisMinPropName, initLimits);
				scope.$watch('entity.' + xAxisMaxPropName, initLimits);
				scope.$watch('entity.' + yAxisMinPropName, initLimits);
				scope.$watch('entity.' + yAxisMaxPropName, initLimits);
			}
			else {
				if(initTimeout) {
					$timeout.cancel(initTimeout);
					initTimeout = null;
				}
				initTimeout = $timeout(function() {
					init();
				}, 500);
			}
      	}

      	// Steps
      	function initSteps(first) {
      		// Get conf
      		var xAxisStepConfiguration = $filter('filter')(configurationSource, { key: util.constants.TABLE_CONF_X_AXIS_STEP })[0];
      		var yAxisStepConfiguration = $filter('filter')(configurationSource, { key: util.constants.TABLE_CONF_Y_AXIS_STEP })[0];

      		// Get prop names
      		var xAxisStepPropName = xAxisStepConfiguration.value.replace(/[\{\}]/g, '');
			var yAxisStepPropName = yAxisStepConfiguration.value.replace(/[\{\}]/g, '');

			// Get properties
			var xAxisStepProperty = $filter('filter')(entityFields, { name: xAxisStepPropName })[0];
			var yAxisStepProperty = $filter('filter')(entityFields, { name: yAxisStepPropName })[0];

			// Assign initial values
			scope.stepX = $filter('mapField')(scope.entity, xAxisStepProperty);
			scope.stepY = $filter('mapField')(scope.entity, yAxisStepProperty);

			// Add watchers(only first time)
			if(first === true) {
				scope.$watch('entity.' + xAxisStepPropName, initSteps);
				scope.$watch('entity.' + yAxisStepPropName, initSteps);
			}
			else {
				if(initTimeout) {
					$timeout.cancel(initTimeout);
					initTimeout = null;
				}
				initTimeout = $timeout(function() {
					init();
				}, 500);
			}
      	}

      	function init() {
      		if(!(scope.minX > 0 && scope.minY > 0 && scope.stepX > 0 && scope.stepY > 0 && scope.maxX > scope.minX && scope.maxY > scope.minY)) {
      			return;
      		}

      		// Calculate difference between max and min
      		var difX = scope.maxX - scope.minX;
      		var difY = scope.maxY - scope.minY;

      		// TODO Warn if division is decimal

      		// Calculate rowNum and colNum
      		var rowNum = (difY / scope.stepY) | 0;
      		var colNum = (difX / scope.stepX) | 0;

      		// Generate rows
      		var rows = scope.rows = [];
      		if(rowNum > 0) {
	      		for(var i = 0; i <= rowNum; i++) {
	      			rows.push({
	      				value: scope.minY + i * scope.stepY
	      				// TODO Other values?
	      			});
	      		}
      		}

      		// Generate columns
      		var columns = scope.columns = [];
      		if(colNum > 0) {
	      		for(var i = 0; i <= colNum; i++) {
	      			columns.push({
	      				value: scope.minX + i * scope.stepX
	      			});
	      		}
      		}

      		// Generate steps
      		var steps = scope.steps = [];
      		// TODO Verify existence
      		var existingSteps = $filter('mapField')(scope.entity, scope.property);
      		for(var r = 0; r < rows.length; r++) {
      			for(var c = 0; c < columns.length; c++) {
      				// Does it exist within the entity?
      				var queryObj = {};
      				queryObj[xAxisPropName] = columns[c].value;
      				queryObj[yAxisPropName] = rows[r].value;
      				var existingStep = $filter('filter')(existingSteps, queryObj, true)[0];

      				// It does exist
      				if(existingStep) {
      					steps.push(existingStep);

      					// TODO Setup rendered flag
      				}

      				// It does not, create new one
      				else {
      					var newStep = scaffold.newEntity(innerEntityType);
      					newStep[xAxisPropName] = columns[c].value;
      					newStep[yAxisPropName] = rows[r].value;

      					// Setup provisory flag
      					newStep.$provisory = true;

      					steps.push(newStep);
      				}
      			}
      		}

      		// TODO Configure warnings
      	}

      	if(scope.entity.$resolved !== false) {
      		initLimits(true);
      		initSteps(true);
      		init();
      	}
      	else {
      		var resolveWatcher = scope.$watch('entity.$resolved', function() {
      			if(scope.entity.$resolved !== false) {
      				resolveWatcher();
      				initLimits(true);
      				initSteps(true);
      				init();
      			}
      		})
      	}

      	scope.getQueryObj = function(row, column) {
      		var queryObj = {};
      		queryObj[xAxisPropName] = column.value;
      		queryObj[yAxisPropName] = row.value;

      		return queryObj;
      	};

      	scope.updateValue = function(step) {
      		// TODO Setup min value
      		if(step.value > 0) {
      			if(step.$invalid) delete step.$invalid;
  			} 
  			else {
  				step.$invalid = true;
  			}
      		// We only update if the step is provisory, as definitive steps get updated automatically
      		if(step.$provisory) {
      			// Update entity
      			delete step.$provisory;
      			scope.value.entity.push(step);
      		}
      		else {
      			var listenerName = scope.property.owner + '_' + scope.property.name;
      			scope.$emit('manually_change_' + listenerName);
      		}

      		var invalidSteps = $filter('filter')(scope.steps, { $invalid: true });
      		
      		scope.$emit('form-invalid', {
				field: scope.property.name,
				owner: scope.property.owner,
				validation: 'table-valid',
				valid: !invalidSteps.length
			});
      	};
      }
    };
  }]);

'use strict';

/**
 * @ngdoc directive
 * @name konga.directive:updateForm
 * @description
 *
 * Handles rendering and operations of updation/creation forms. It connects to the {@link konga.controller:EntityUpdateController `EntityUpdateController`} through several operations for field mapping, change notifictions, etcetera.

<img src="/static/update-form-basic-flow.png" width="80%" class="center">

The first operation is to receive fields, categories and fieldSets, that are used to render the update layout. These elements are provided to the view determined on the {@link Metadata.Field field's `formType`}.

Views are based on {@link konga.directive:rawInput `rawInput`} directives, who controls validation and mapping, along with all other field operations.

@param {Object} metadata
<span class="label type-hint type-hint-object">{@link Metadata.Entity Entity}</span>
The metadata of the entity being managed

@param {Object} entity
The entity object to map values to

@param {Boolean} creating
Whether the mode is `creation`.

@param {Array=} fields
Optionally, include a set of fields instead of retrieving all from the entity (default when this value is not set).

@param {function()} onUpdate
Define the behavior for field-update procedures - when an input's value changes.

@param {function()=} onChange
Optional change tracker to know whether the field has changed

 */
angular.module('konga')
  .directive('updateForm', ['$routeParams', 'api', 'common', 'fieldMapper', '$filter', 'util', 'mapper', 
  	function ($routeParams, api, common, fieldMapper, $filter, util, mapper) {
	    return {
			template: '<div ng-include="templateUrl"></div>',
			restrict: 'E',
			replace: true,
			scope: {
		      	entity: '=',
		      	changes: '=',
		      	metadata: '=',
		      	params: '=',
		      	onUpdate: '=',
		      	creating: '=',
		      	onChange: '=',
		      	fields: '=?'
	      	},
	    	link: function postLink(scope, element, attrs) {
	        	// Depending on the form type, the form will be rendered differently
		      	scope.templateUrl = '/konga/views/cascade-update.html';

		      	if(!scope.fields) {
		      		scope.fields = util.getEntityFields(scope.metadata);
		      	}

		      	switch(scope.metadata.updateType) {
			      	case util.constants.TABBED_FORM:
			      		scope.templateUrl = '/konga/views/tabbed-update.html';
			      		//Get the Categories
			    		scope.fieldsets = util.getEntityFieldSets(scope.metadata);
		
			      		break;
			      	case util.constants.CUSTOM_TABBED_FORM:
			      		scope.templateUrl = '/konga/views/custom_tabbed-update.html';

			      		//Get the Categories
			    		scope.fieldsets = util.getEntityFieldSets(scope.metadata);

			    		scope.getView = function(name) {
			    			var view = mapper[name];

			    			if(!view) {
			    				// TODO Throw exception
			    			}

			    			return view;
			    		};

			      		break;	
			      	case util.constants.CUSTOM_FORM:
			      		var configuration = $filter('filter')(scope.metadata.configuration, { key: util.constants.UPDATE_CUSTOM_VIEW });
			      		if(!configuration.length) {
			      			// TODO Show exception
			      		}
			      		// Try mapped
			      		var templateUrl = mapper[configuration[0].value];
			      		if(!templateUrl) templateUrl = configuration[0].value;
			      		if(!templateUrl) {
			      			// TODO Throw exception
			      		}
			      		scope.templateUrl = templateUrl;
			      		
			      		break;
		      	}
		      	scope.$on('changeTab', function(events, args){

		    		scope.$broadcast('tabChangeCustomTabbed', {tab: args.tab} );

		    	});
	   		}
	    };
	  }]);

'use strict';

angular.module('konga')
  .directive('verticalTabs', ['$rootScope', function ($rootScope) {
  	return {
		restrict: 'E',
		transclude: true,
		replace: true,
		scope: true,
		controller: function($scope) {
			var tabContentList = $scope.tabContentList = [];
			
			$scope.select = function(tabContent){
				angular.forEach(tabContentList, function(tabContent){
					tabContent.selected = false;
					tabContent.active = '';
				});
				tabContent.selected = true;
				tabContent.active = 'active';
				$rootScope.pageData.currentTab = tabContent.title;
				$scope.$emit('changeTab', {tab: tabContent} );
			};
			
			this.addTabContent = function(tabContent){
				if(tabContentList.length === 0 && !$rootScope.pageData.currentTab){
					$scope.select(tabContent);
				}
				if($rootScope.pageData.currentTab){
					if(tabContent.title === $rootScope.pageData.currentTab){
						$scope.select(tabContent);
					}
				}
				tabContentList.push(tabContent);
			};
		},
		link: function postLink(scope, element, attrs) {
		},
		templateUrl: '/konga/views/verticaltab.tp.html'
	}
  }]);
'use strict';

/**
 * @ngdoc filter
 * @name konga.filter:statut
 * @function
 * @description
 * # statut
 * It turns the true/false statut, in Active/Inactive
 * @param {Array} value Defines the array of fields to filter
 * @param {Object} field Defines the field to manage
 */
angular.module('konga')
  .filter('activeInactive', ['configurationManager', function () {
    return function (value,field) {
		if (value) {
			return 'message.boolean.yes';
		} else {
			return 'message.boolean.no';
		}
    };
  }]);

'use strict';

/**
 * @ngdoc filter
 * @name konga.filter:allowed
 * @function
 * @description
 * # allowed
 * Filter in the konga.
 */
angular.module('konga')
  .filter('allowed', ['userData', 'util', function (userData, util) {
    return function (input, mode) {
    	var ret = [];
    	for(var i = 0; i < input.length; i++) {
    		var field = input[i];

    		switch(mode) {
		  	case util.constants.SCOPE_SEARCH:

		  		// Is it public?
		  		if(!field.searchable.value.length) {
		  			ret.push(field);
		  		}

		  		// Verify permissions
		  		else if(userData.roles.indexOf(field.searchable.value) !== -1) {
		  			ret.push(field);
		  		}
		  		break;
		  	case util.constants.SCOPE_RESULTS:

		  		// Is it public?
		  		if(!field.showInResults.value.length) {
		  			ret.push(field);
		  		}

		  		// Verify permissions
		  		else if(userData.roles.indexOf(field.showInResults.value) !== -1) {
		  			ret.push(field);
		  		}
		  		break;
		  	case util.constants.SCOPE_UPDATE:

		  		// Is it public?
		  		if(!field.showInUpdate.value.length) {
		  			ret.push(field);
		  		}

		  		// Verify permissions
		  		else if(userData.roles.indexOf(field.showInUpdate.value) !== -1) {
		  			ret.push(field);
		  		}
		  		break;
			}
    	}

    	return ret;
    };
  }]);

'use strict';

/**
 * @ngdoc filter
 * @name konga.filter:customFilter
 * @function
 * @description
 * # customFilter
 * Filter in the konga.
 */
angular.module('konga')
  .filter('customFilter', ['$filter', function ($filter) {
    return function (value, filter) {
      return $filter(filter)(value);
    };
  }]);

'use strict';

/**
 * @ngdoc filter
 * @name konga.filter:extended
 * @function
 * @description
 * # extended
 * It receives an array of fields in metadata and a name of field which are checked, and it returns true/false (i.e. isExtended or not).
 * @param {Array} metadata Defines the array of fields of metadata
 * @param {string} name Defines the name of checked field
 */
angular.module('konga')
  .filter('extended', function () {
    return function (metadata,name) {
      
    	for(var i = 0; i < metadata.length; i++) {
            if(metadata[i].name == name) {
              return metadata[i].isExtended;
            }
          }
      	return false;
    };
  });

'use strict';

/**
 * @ngdoc filter
 * @name konga.filter:fieldApiName
 * @function
 * @description
 * # fieldApiName
 * Filter in the konga.
 */
angular.module('konga')
  .filter('fieldApiName', ['util', function (util) {
    return function (fieldName, source) {
		var attrs = fieldName.split(' ');
		if(attrs.length === 1) {
			return fieldName;
		}

		else if(attrs[1] === util.constants.COMPLEX_FIELD_AS) {

			if(source && attrs[1] === util.constants.SELF_FIELD) {
				return source.name;
			}
			return attrs[2];
		}
    };
  }]);

'use strict';

/**
 * @ngdoc filter
 * @name konga.filter:fieldMultiplicity
 * @function
 * @description
 * # fieldMultiplicity
 * Filter in the konga.
 */
angular.module('konga')
  .filter('fieldMultiplicity', ['util', function (util) {
    return function (field, mode) {
      if(mode === util.constants.SCOPE_SEARCH) {
      	return field.searchConf.multiplicity;
      }

      return field.multiplicity;
    };
  }]);

'use strict';

/**
 * @ngdoc filter
 * @name konga.filter:htmlify
 * @function
 * @description
 * # htmlify
 * Filter in the konga.
 */
angular.module('konga')
  .filter('htmlify', ['$filter', function ($filter) {
    return function (text) {
      var parsedText = text;

      // Line breaks
      var lineBreakRegex = /\n/g;
      var lineBreakReplace = '<br />';
      parsedText = parsedText.replace(lineBreakRegex, lineBreakReplace);

      // Urls
      parsedText = $filter('urlify')(parsedText);

      return parsedText;
    };
  }]);

'use strict';

/**
 * @ngdoc filter
 * @name konga.filter:locale
 * @function
 * @description
 * # locale
 * It receives an input , and it returns a message which locate in index equal input.
 * @param {Number} input Defines the index of message
 */
angular.module('konga')
  .filter('locale', ['common', 
  	function (common) {
	    return function (input) {
	    	var messages = common.read('messages');

	    	if(!input || !messages || !messages.messages) {
	    		return null;
	    	}

	     	return messages.messages[input];
	    };
	  }]);

'use strict';

/**
 * @ngdoc filter
 * @name konga.filter:mapField
 * @function
 * 
 * @description
 * It receives an entity and the defined path for the field to map, and it returns the value located in that path for such entity.
 * 
 * @param {Object} entity Defines the entity to manage
 * @param {Object} field Defines the field to manage
 */
angular.module('konga')
  .filter('mapField', ['util', function (util) {
    return function (entity, field) {
    	if(!entity) {
			return null;
		}

		if(field.derived) {
			var path = field.apiPath;
			var pathSteps = path.split('.');

			var current = entity;

			for(var i = 0; i < pathSteps.length; i++) {
				if(current) {
					current = current[pathSteps[i]];
				}
				else {
					// TODO Log something?
					current = null;
					break;
				}
			}

			return current;
		}

		// Verify if field is complex
		if(field.type.type === util.constants.FIELD_COMPLEX) {
			// TODO
			return entity[field.name];
		}
		else {

			return entity[field.name];
		}
    };
  }]);

'use strict';

/**
 * @ngdoc filter
 * @name konga.filter:priceTableRenderer
 * @function
 * @description
 * # priceTableRenderer
 * Filter in the konga.
 */
angular.module('konga')
  .filter('priceRenderer', ['$filter', function ($filter) {
    return function (input, field, symbol) {
      var configuration = field.fieldType.configuration[0];

      var configurationThousand = $filter('filter')(configuration, { key: 'CURRENCY_THOUSAND_SEPARATOR' }, true)[0];

      var configurationDecimal = $filter('filter')(configuration, { key: 'CURRENCY_DECIMAL_SEPARATOR' }, true)[0];
      
      var value = $filter('number')(input, 2);

      var strValue = value + '';

      return strValue;
    };
  }]);

'use strict';

/**
 * @ngdoc filter
 * @name konga.filter:queryParser
 * @function
 * @description
 * # queryParser
 * Filter in the konga.
 */
angular.module('konga')
  .filter('queryParser', ['util', function (util) {
    return function (field, entity, oldQuery) {

    	// Generate blank query
    	var query = oldQuery ? oldQuery : {};

    	// Get field's query
		var fieldQuery = field.type.query;

		// TODO Remove when evolution in Konga present for empty queries
		if(fieldQuery instanceof Array) {
			fieldQuery = {};
		}

		// Parse values from field's query
		for(var param in fieldQuery) {
			var value = fieldQuery[param];

			// Simple parsing
			if(value.match(util.constants.QUERY_PARAM_REGEXP)) {

				// Remove the brackets
				var realValue = value.replace(/[{-}]/g, '');

				// Get entity's value
				var entityValue = entity[realValue];

				if(entityValue !== null && entityValue !== undefined && !(entityValue.length === 0)) {
					query[param] = entityValue;
				}
			}

			// Complex parsing
			else if(value.match(util.constants.QUERY_COMPLEX_PARAM_REGEXP)) {

				// Remove the brackets
				var valuePath = value.replace(/[{-}]/g, '').split(/\./);
				var entityValue = entity;

				// Move along path
				for(var i = 0; i < valuePath.length; i++) {
					var step = valuePath[i];
					if(!entityValue) {
						break;
					}

					entityValue = entityValue[step];
				}

				if(entityValue !== null && entityValue !== undefined && !(entityValue.length === 0)) {
					query[param] = entityValue;
				}
			}

			// If not, put plain value
			else {
				query[param] = value;
			}
		}

		return query;
    };
  }]);

'use strict';

/**
 * @ngdoc filter
 * @name konga.filter:quickSearch
 * @function
 * @description
 * # quickSearch
 * It receives an metadata , and it returns an array of Objects(i.e quickSearchField)
 * @param {Object} metadata Defines the metadata of entity
 */
angular.module('konga')
  .filter('quickSearch', ['$filter', 'util', function ($filter, util) {
    return function (metadata) {
    	var ret = [];

    	var fields = util.getEntityFields(metadata);

    	for(var i = 0; i < fields.length; i++) {
    		var field = fields[i];
    		if(field.quickSearch.value !== null) {
    			var quickSearchField = {
    				metadata: field,
    				value: ''
    			};
    			ret.push(quickSearchField);
    		}
    	}

    	if(!ret.length) {
    		// TODO Verify configuration
    		var codeField = $filter('filter')(fields, { isKey: true });

    		var relatedMetadata = util.getMetadata(field.owner);

    		var extra = {
    			label: $filter('translate')(relatedMetadata.label),
	      		labelPlaceholder: relatedMetadata.label
    		};

    		var quickSearchField = {
				metadata: codeField[0],
				value: '',
				extra: extra
			};
			ret.push(quickSearchField);
    	}

    	return ret;
    };
  }]);

'use strict';

/**
 * @ngdoc filter
 * @name konga.filter:resultParams
 * @function
 * @description
 * # resultParams
 * It receives an array of fields and metadata , and it returns another array of fields containing the value of sorting field equal 'asc'.
 * @param {Array} fields Defines an array of fields of the entity
 * @param {Object} metadata Defines the metadata of the entity
 */
angular.module('konga')
  .filter('resultParams', function () {
    return function (fields, metadata) {
      var result = [];
      var hasDefaultSorting = false;

      for(var i = 0; i < fields.length; i++) {
      	var field = fields[i];

        // TODO Verify permissions
        if(field.showInResults.value !== null) {
        	field.sorting = '';
        	if(field.priority.results === 1) {
        		field.sorting = 'asc';
        		hasDefaultSorting = true;
        	}
        	result.push(field);
        }
      }
      
      if (!hasDefaultSorting && result.length > 0) {
    	  result[0].sorting = 'asc';
      }

      return result;
    };
  });

'use strict';

/**
 * @ngdoc filter
 * @name konga.filter:scroll
 * @function
 * @description
 * # scroll
 * It receives an array of objects (i.e. input), and it returns another array containing elements of the old one arranging the index from 0 to limit.
 * @param {Object} input Defines an array of objects
 * @param {Number} limit Defines the number of object getting from input.
 */
angular.module('konga')
  .filter('scroll', function () {
    return function (input, limit) {
      return input.slice(0, limit);
    };
  });

'use strict';

/**
 * @ngdoc filter
 * @name konga.filter:searchParams
 * @function
 * @description
 * # searchParams
 * It receives an entity metadata information, and returns all its fields that could be used for searching purposes.
 * @param {Array} fields Defines an array of fields of the entity
 * @param {Object=} metadata Defines the metadata of the entity 
 */
angular.module('konga')
  .filter('searchParams', function () {
    return function (fields, metadata) {
      var result = [];

      for(var i = 0; i < fields.length; i++) {
        var field = fields[i];

        // TODO Verify permissions
        if(field.searchable.value !== null) {
            result.push(field);
        }
      }

      return result;
    };
  });

'use strict';

/**
 * @ngdoc filter
 * @name konga.filter:selectData
 * @function
 * @description
 * #selectData
 * It receives metadata, an array of entities and configuration (i.e. boolean), and it returns an array of objects containing data  from these parameters (i.e. entities) for selecting purpose.
 * @param {Object} metadata Defines the metadata of the entity
 * @param {Object} entities Defines the an array of entities to manage
 * @param {Object} configuration Defines an object containing added and selected field. 
 */
angular.module('konga')
  .filter('selectData', ['util', function (util) {
    return function (metadata, entities, configuration) {
		var result = [];

		for(var i = 0; i < entities.length; i++) {
			var added = configuration && configuration.added !== undefined ? configuration.added : false;
			var selected = configuration && configuration.selected !== undefined ? configuration.selected : false;

			var obj = {
				id : util.getEntityId(metadata, entities[i]),
				key : util.getEntityCode(metadata, entities[i]),
				value : util.getEntityLabel(metadata, entities[i]),
				added: added,
				selected: selected
			};
			result.push(obj);
		}

      return result;
    };
  }]);

'use strict';

/**
 * @ngdoc filter
 * @name konga.filter:selectedFields
 * @function
 * @description
 * # selectedFields
 * It receives parameters such as real, name, apiNames(if any), source, and it returns an array of  fields in nested fields for rendering purpose.
 * @param {Array} real Defines the array fields of entity to manage
 * @param {Array} names Defines the array of field name
 * @param {Array=} apiNames Defines the array of apiName of entities
 * @param {Array=} source Defines the field to manage
 */
angular.module('konga')
  .filter('selectedFields', ['$filter', 'util', function ($filter, util) {
    return function (real, names, source) {
    	
      // If no name is given, return all
    	var result = [];

      var sortedResult = [];

      // Prepare sorted results
      for(var i = 0; i < names.length; i++) {
        sortedResult.push(name);
      }

    	for(var i = 0; i < real.length; i++) {
        
        // Direct values go this way
        var nameIndex = names.indexOf(real[i].name);
    		if(nameIndex !== -1) {
    			var fieldToPush = angular.copy(real[i]);
          
          // Setup extra params for rendering
          fieldToPush.derived = true;
          fieldToPush.apiName = $filter('fieldApiName')(names[nameIndex]);
          fieldToPush.apiPath = real[i].name;
          fieldToPush.derivedPath = [];
          fieldToPush.categories = source.categories;

          // Override field configuration (avoid COMPLEX recursivity)
          // TODO Export this to configuration param
          for(var showConf in fieldToPush.fieldType) {
            if(fieldToPush.fieldType[showConf] === util.constants.FIELD_COMPLEX) {
              fieldToPush.fieldType[showConf] = util.constants.FIELD_SELECT;
            }
          }

          result.push(fieldToPush);
    		}
    	}

      // Now let's look for indirect fields
      for(var i = 0; i < names.length; i++) {
        var name = names[i];
        var nameAttrs = name.split(' ');

        // Look if SELF field is included
        if(nameAttrs[0] === util.constants.SELF_FIELD) {
          var fieldCopy = angular.copy(source);

          // Override field configuration (avoid COMPLEX recursivity)
          // TODO Export this to configuration param
          for(var showConf in fieldCopy.fieldType) {
            fieldCopy.fieldType[showConf] = util.constants.FIELD_SELECT;
          }

          // Setup extra params for rendering
          fieldCopy.derived = true;
          fieldCopy.apiName = $filter('fieldApiName')(name, fieldCopy);
          fieldCopy.apiPath = fieldCopy.name;
          fieldCopy.derivedPath = [];
          fieldCopy.isSelf = true;

          result.push(fieldCopy);
          continue;
        }

        if(nameAttrs[0].indexOf('.') !== -1) {
          var fieldPath = nameAttrs[0].split('.');
          var path = [];

          var current = null;
          var currentFields = real;

          for(var f = 0; f < fieldPath.length; f++) {
            current = fieldPath[f];

            // Move along all fields looking for the one
            for(var g = 0; g < currentFields.length; g++) {
              var currentField = currentFields[g];
              if(currentField.name === current) {
                var fieldType = currentField.type;

                if(f === fieldPath.length -1) {
                  var fieldToPush = angular.copy(currentField);

                  // Setup extra params for rendering
                  fieldToPush.derived = true;
                  fieldToPush.apiName = $filter('fieldApiName')(name);
                  fieldToPush.apiPath = nameAttrs[0];
                  fieldToPush.derivedPath = path;
                  fieldToPush.categories = source.categories;

                  // Override field configuration (avoid COMPLEX recursivity)
                  // TODO Export this to configuration param
                  for(var showConf in fieldToPush.fieldType) {
                    if(fieldToPush.fieldType[showConf] === util.constants.FIELD_COMPLEX) {
                      fieldToPush.fieldType[showConf] = util.constants.FIELD_SELECT;
                    }
                  }

                  result.push(fieldToPush);
                }
                // Field must be complex, unless it's the last iteration on the path
                else if(fieldType.type === util.constants.FIELD_COMPLEX) {
                  var complexType = fieldType.complexType;
                  var complexMetadata = util.getMetadata(complexType);

                  var complexFields = util.getEntityFields(complexMetadata);
                  currentFields = complexFields;

                  // Append the field to the current path
                  path.push(currentField);
                }

                break;
              }
            }
          }
        }
      }

      // Prepare sorted results
      for(var i = 0; i < result.length; i++) {
        var apiPath = result[i].apiPath;
        var index = names.indexOf(apiPath);

        sortedResult.splice(index, 1, result[i]);
      }

      return sortedResult;
    };
  }]);

'use strict';

/**
 * @ngdoc filter
 * @name konga.filter:selectedLocale
 * @function
 * @description
 * # selectedLocale
 * It receives an array of locales , and it returns an locale object which have the value of selected field equal true or returns empty.
 * @param {Array} locales Defines the array of locale
 */
angular.module('konga')
  .filter('selectedLocale', function () {
    return function (locales) {
    	if(!locales) {
    		return {};
    	}
      for(var i = 0; i < locales.length; i++) {
      	if(locales[i].selected) {
      		return locales[i];
      	}
      }

      return {};
    };
  });

'use strict';

/**
 * @ngdoc filter
 * @name konga.filter:shortify
 * @function
 * @description
 * # shortify
 * It receive a String (i.e. input) and length, and it returns another one containing extract characters from the old one arranging the index from 0 to length.
 * @param {string} input Defines  the name of field
 * @param {Number} length Defines the number of extract characters 
 */
angular.module('konga')
  .filter('shortify', function () {
    return function (input, length) {
      var ret;
      try {
      	ret = input.substring(0, length);
      } catch(e) {
      	ret = input;
      	// TODO Throw exception
      }
      return ret;
    };
  });

'use strict';

/**
 * @ngdoc filter
 * @name konga.filter:tableRendererComplex
 * @function
 * @description
 * # tableRendererComplex
 * It receives value and metadata , and it returns the value of column which shows the result of complex fields base on these parameters.
 * @param {Object} metadata Defines the metadata of the entity to manage
 * @param {Object} value Defines the entity of each row
 */
angular.module('konga')
  .filter('tableRendererComplex', ['util', function (util) {
    return function (value, metadata) {
      if(metadata.type.type === util.constants.FIELD_COMPLEX) {
   	      var complexType = metadata.type.complexType;

	      var metadata = util.getMetadata(complexType);

	      var key = util.getEntityCode(metadata, value);

	      var label = util.getEntityLabel(metadata, value);
	      
	      //if there are no values
	      if (!label && !key)
	    	  return "";
	      
	      return label + ' (#' + key + ')';
      }
      return '';
    };
  }]);

'use strict';

/**
 * @ngdoc filter
 * @name konga.filter:translateComplex
 * @function
 * @description
 * # translateComplex
 * It receives a String (input) and extra (if any), and it returns a complex field to be translated using standard `translate` filter.
 *  @param {string} input Defines the name of label of the field
 *  @param {Object=} extra Defines the extra expression object for filter 
 */
angular.module('konga')
  .filter('translateComplex', ['$filter', 
  	function ($filter) {
	    return function (input, extra) {
	      if(typeof input !== 'string') {
	      	// TODO Verify
	      	return input;
	      }
	      else {
	      	return $filter('translate')(input, extra);
	      }
	    };
	  }]);

'use strict';

/**
 * @ngdoc filter
 * @name konga.filter:updateParams
 * @function
 * @description
 * # updateParams
 * It receives an array of fields , metadata and category, and it returns all entity's fields that could be used for updating purposes.
 * @param {Array} fields Defines an array of fields of the entity.
 * @param {Object} metadata Defines the metadata of the entity
 * @param {Object} the category of the entity
 * 
 */
angular.module('konga')
  .filter('updateParams', function () {
    return function (fields, metadata, category) {
      var result = [];

      for(var i = 0; i < fields.length; i++) {
        var field = fields[i];

        // TODO Verify permissions
        if(field.showInUpdate.value !== null) {
            if(category !== undefined) {
              if(field.categories.indexOf(category) !== -1) {
                result.push(field);
              }
            }
            else 
              result.push(field);
        }
      }

      return result;
    };
  });

'use strict';

/**
 * @ngdoc filter
 * @name konga.filter:urlify
 * @function
 * @description
 * # urlify
 * Filter in the konga.
 */
angular.module('konga')
  .filter('urlify', function () {
    return function (text) {
	    var urlRegex = /(https?:\/\/[^\s]+)/g;
	    return text.replace(urlRegex, function(url) {
	        return '<a href="' + url + '" target="_blank">' + url + '</a>';
	    });
	    // or alternatively
	    // return text.replace(urlRegex, '<a href="$1">$1</a>')
	};
  });

'use strict';

/**
 * @ngdoc service
 * @name konga.actionManager
 * @description
 * # actionManager
 * Provider in the konga.
 */
angular.module('konga')
  .provider('actionManager', ['util', function (util) {

    var actions = {
      /*
       * Native actions
       */
      'search': {
        type: util.constants.ACTION_TYPE_FUNCTION,
        params: {
          fn: function(params) {
            this.query.resetPaging = true;
            this.query.resetSorting = true;
            this.submit(this.query);
          }
        }
      },
      'clear': {
        type: util.constants.ACTION_TYPE_FUNCTION,
        params: {
          fn: function(params) {
            this.$broadcast('reset-form');
            this.delayedSubmit();
          }
        }
      },
      'quick-search': {
        type: util.constants.ACTION_TYPE_FUNCTION,
        params: {
          fn: function(params) {
            this.submit(quickSearchQuery);
          }
        }
      },
      'sort': {
        type: util.constants.ACTION_TYPE_FUNCTION,
        params: {
          fn: function(params) {
            var field = params.data.field;
            var type = params.data.type;

            this.submitSorting(field, type);
            this.$broadcast('sorting', { field: field, type: type });
          }
        }
      },
      'save-ok': {
        type: util.constants.ACTION_TYPE_FUNCTION,
        params: {
          fn: ['$rootScope', 'params', function($rootScope, params) {
              var entityId = params.id;
              var $scope = this;
              var data = params.data;
            
              // Verify if the entity is new
              if(entityId === util.constants.NEW_ENTITY_ID) {
                  $rootScope.operations.addAlert(util.constants.ALERT_TYPE_SUCCESS, 'message.action-confirmation.create.success');
              } else {
                  $rootScope.operations.addAlert(util.constants.ALERT_TYPE_SUCCESS, 'message.action-confirmation.update.success');
              }
              
              $rootScope.pageData.original = angular.copy(data);
              $scope.entity = $rootScope.pageData.entity = data;
              $scope.changes = [];
              $scope.operations.updateChanges();
  
              // Request a tab closing and a tab opening in update mode
              $rootScope.operations.closeTabById($rootScope.pageData.pageId);
          }]
        }
      },

      'save-ko': {
        type: util.constants.ACTION_TYPE_FUNCTION,
        params: {
          fn: ['exceptionManager', 'params', function(exceptionManager, params) {
            exceptionManager.analyzeException(params);
          }]
        } 
      },
      
      'delete-ko': {
        type: util.constants.ACTION_TYPE_FUNCTION,
        params: {
          fn: ['exceptionManager', 'params', function(exceptionManager, params) {
            exceptionManager.analyzeException(params);
          }]
        } 
      },
      'search-entity': {
        type: util.constants.ACTION_TYPE_TAB,
        params: {
          id : util.constants.ENTITY_ID_PREFFIX + '{entityType}' + util.constants.SEARCH_SUFFIX,
          title : 'message.tabs.entity.search',
          href : '/entity/{entityType}/search/',
          closable : true,
          hasChanges : false,
          entityType: '{entityType}',
          type: util.constants.TAB_TYPE_SEARCH
        }
      },
      'update-entity': {
        type: util.constants.ACTION_TYPE_TAB,
        params: {
          id : util.constants.ENTITY_ID_PREFFIX + '{entityType}' + util.constants.STRING_SEPARATOR + '{id}',
          title : 'message.tabs.entity.search',
          href : '/entity/{entityType}/{id}/',
          closable : true,
          hasChanges : false,
          entityType: '{entityType}',
          type: util.constants.TAB_TYPE_UPDATE
        }
      },
      'action-form-invalid': {
        type: util.constants.ACTION_TYPE_NOTIFY,
        params: {
          type: 'error',
          title: 'message.action.form-invalid.title',
          message: 'message.action.form-invalid.message'
        }
      },
      'action-forbidden': {
        type: util.constants.ACTION_TYPE_NOTIFY,
        params: {
          type: 'error',
          title: 'message.action.forbidden.title',
          message: 'message.action.forbidden.message'
        }
      },
      'action-under-development': {
        type: util.constants.ACTION_TYPE_NOTIFY,
        params: {
          type: 'notify',
          title: 'message.action.under-development.title',
          message: 'message.action.under-development.message'
        }
      }

    };

    // Private constructor
    function ActionManager($rootScope, Session, configurationManager, customActions, $injector) {

      this.dispatch = function(action, parameters) {
        if(typeof action === 'string') {
          action = { name: action };
        }
        var actionDefinitionOriginal = customActions[action.name];
        if(!actionDefinitionOriginal) {
          actionDefinitionOriginal = actions[action.name];
        }
        if(!actionDefinitionOriginal) {
          // TODO Throw exception
        }
        var actionDefinition = angular.copy(actionDefinitionOriginal);
        
        //we add the parameters of the call
        actionDefinition.params.parameters = parameters;

        // Include the reference to the action manager
        actionDefinition.params.parameters.actionManager = this;

        // Include the dependency injector
        actionDefinition.params.parameters.dependencyInjector = $injector;
        
        var authorized = true;

        // Verify authorization
        if(actionDefinition.restrict) {
          // Get the user roles
          var rolesNative = userData.roles;

          // We need to stringify each role, as all come in array-form (as a buffer)
          var userRoles = [];
          for(var i = 0; i < rolesNative.length; i++) {
            var role = "";
            var f = -1;
            while(rolesNative[i][++f] !== undefined) {
              role += rolesNative[i][f];
            }
            userRoles.push(role);
          }

          authorized = false;

          for(var i = 0; i < actionDefinition.restrict.length; i++) {
            var role = actionDefinition.restrict[i];

            if(userRoles.indexOf(role) !== -1) {
              // We have this role
              // So dispatch!
              authorized = true;

              // TODO Verify restriction policy
              break;
            }
          }
        }

        
        if(!authorized) {
          actionDefinition = actions['action-forbidden'];
        }

        switch(actionDefinition.type) {
        case util.constants.ACTION_TYPE_MODAL:
          $rootScope.operations.openModal(actionDefinition.params);
          break;
        case util.constants.ACTION_TYPE_NOTIFY:
          $rootScope.operations.notify(actionDefinition.params.title, actionDefinition.params.message, actionDefinition.params.type, actionDefinition.params);
          break;
        case util.constants.ACTION_TYPE_CONFIRM:
          $rootScope.operations.confirm(actionDefinition.params.title, actionDefinition.params.message, actionDefinition.params.okHandler, actionDefinition.params.koHandler, actionDefinition.params);
          break;
        case util.constants.ACTION_TYPE_TAB:
          // Setup params
          for(var encodedParam in parameters) {
            for(var actionParam in actionDefinition.params) {
              if(typeof actionDefinition.params[actionParam] === 'string') {
                actionDefinition.params[actionParam] = actionDefinition.params[actionParam].split('{' + encodedParam + '}').join(parameters[encodedParam]);
              }
              // TODO Verify object params too
            }
          }
          $rootScope.operations.addTab(actionDefinition.params);
          break;
        case util.constants.ACTION_TYPE_FUNCTION:
          var params = actionDefinition.params.parameters;
          var functionToCall = actionDefinition.params['fn'];
          if(typeof functionToCall === 'function') {
            functionToCall.call(params.self, params);
          }
          else if(functionToCall instanceof Array) {
            var fnParams = functionToCall;
            var fn = fnParams.splice(fnParams.length-1, 1)[0];
            if(typeof fn !== 'function') {
              // TODO Throw exception
            }

            // Get dependencies
            var deps = [];
            for(var i = 0; i < fnParams.length; i++) {
              var depName = fnParams[i];
              if(depName === 'params') {
                deps.push(params);
                continue;
              }

              try {
                var dep = params.dependencyInjector.get(depName);
                deps.push(dep);
              } catch(e) {
                // TODO Launch exception (dep injection exception)
              }
            }

            fn.apply(params.self, deps);
          }
          else {
            // TODO Throw exception
          }
          break;
        }
      };

    }

    // Public API for configuration
    this.setSalutation = function (s) {
      salutation = s;
    };

    // Method for instantiating
    this.$get = function ($injector) {
      var rScope = $injector.get('$rootScope');
      var userData = $injector.get('userData');
      var configurationManager = $injector.get('configurationManager');
      var customActions = $injector.get('customActions');
      return new ActionManager(rScope, userData, configurationManager, customActions, $injector);
    };
  }]);

'use strict';

/* TODO @deprecate */

/**
 * @ngdoc service
 * @name konga.api
 * @description
 * This factory connects the source to a factory, depending on the type of entity that's being looked for. 
 */
angular.module('konga')
  .factory('api', ['konga', 'standardApi', function (konga, standardApi) {

    // Public API here
    return {
      getLocalEndpoint : function (source) {
        var endpoint = konga.api(source);
        
        if(!endpoint) {
          endpoint = standardApi;
        }
        
        return endpoint;
      }
    };
  }]);

// Document the operations
/**
 * @ngdoc method
 * @name get
 * @methodOf konga.api
 * @description
 * Returns an entity identified with the unique id provided
 * @param {*} id The unique id for the entity
 * @param {Function} [success=undefined] Function to call if the operation successes.
 * @param {Function} [error=undefined] Function to call if the operation fails.
 * @returns {Object} The `$resource` with that entity
 */

 /**
 * @ngdoc method
 * @name search
 * @methodOf konga.api
 * @description
 * Search for entities filtering with the input query
 * @param {Object} query Query to filter with (sent via `GET` parameters, so they must be serializable, and serialized).
 * @param {Number} offset Defines where to place the starting cursor.
 * @param {Number} limit Defines how many results to get.
 * @param {Function} [success=undefined] Function to call if the operation successes.
 * @param {Function} [error=undefined] Function to call if the operation fails.
 * @returns {Array} Array containing all results. Each result is a `$resource` that contains an entity which matched the search criteria.
 */
'use strict';

/**
 * @ngdoc service
 * @name konga.common
 * @description
 * It contains common tools and methods for storing data, managing tab information, saving page parameters, etcetera.
 */
angular.module('konga')
  .provider('common', function () {

    // Private variables
    var storage = {};
    var pageData = {};

    /*
     * @ngdoc method
     * @name store
     * @methodOf konga.Common
     * @description
     * Stores an object with a given key as identifier
     * @param {string} key the key for the storage
     * @param {Object} value The value to store
     */
    
    /*
     * @ngdoc method
     * @name read
     * @methodOf konga.Common
     * @description
     * Reads the object identified with the given key
     * @param {string} key the key for the storage
     * @returns {Object} The value from the storage.
     */
    
    /*
     * @ngdoc method
     * @name delete
     * @methodOf konga.Common
     * @description
     * Deletes the object identified with the given key
     * @param {string} key the key for the storage
     */

    function Storer() {
      this.store = function (key, value) {
        storage[key] = value;
      };

      this.read = function(key) {
        return storage[key];
      };

      this.deleteKey = function(key) {
        delete storage[key];
      };

      /*
       * @ngdoc method
       * @name getMetadata
       * @methodOf konga.Common
       * @description
       * Returns the metadata of the given type, from an also given array of metadata information.
       * @param {Array} metadata The array of metadata information
       * @param {string} type The type of entity that's needed
       * @returns {Object} The metadata for that entity type
       */
      this.getMetadata = function(type) {
        var metadata = this.read('metadata');

        for(var i = 0; i < metadata.entities.length; i++) {
          var c_metadata = metadata.entities[i];
          if(c_metadata.name === type) {
            return c_metadata;
          }
        }
        return null;
      };

      /*
       * @ngdoc method
       * @name getPageData
       * @methodOf konga.Common
       * @description
       * Returns the page data of the tab with an id given. This page data is used to preserve data upon navigation.
       * @param {string} id The identifier of the tab.
       * @returns {Object} The page data information for that tab.
       */
      this.getPageData = function(id) {
        var ret = pageData[id];

        // If we don't have a page data yet, we initialize
        if(!ret) ret = pageData[id] = { pageId: id, init: false };
        
        return ret;
      };

      /*
       * @ngdoc method
       * @name deletePageData
       * @methodOf konga.Common
       * @description Removes the page data of a tab, identified with an id given. Used when the tab closes mostly.
       * @param {string} id The identifier of the tab.
       */
      this.deletePageData = function(id) {
        var ret = pageData[id];
        if(ret) {
          delete pageData[id];
        }
      };
    }

    // Method for instantiating
    this.$get = function () {
      return new Storer();
    };
  });

'use strict';

/**
 * @ngdoc service
 * @name konga.configurationManager
 * @description
 * # configurationManager
 * Provider in the konga.
 */
angular.module('konga')
  .provider('configurationManager', ['util', function (util) {

    // Private constructor
    function ConfigurationManager($rootScope, $filter) {

      /*
       * Returns a configuration param following the configuraion priority hierarchy
       * @param param {string} The name of the parameter to read
       * @param [Object] {Object} The object to read the configuration from
       * @param [mode] {string} The form mode
       * @param [order] {string} The order of the priority (SPLIT BY '_')
       */
      this.get = function (param, source, mode, order) {
        // TODO Finish this
        var configuration = null;

        if(source) {
          configuration = source.configuration;
          if(mode) {
            configuration = $filter('filter')(source.configuration, { key: param });
            if(configuration.length) {
              return configuration[0].value;
            }

            // Go up a level (if we are on fields)
            if(source.owner) {
              var entityMetadata = util.getMetadata(source.owner);
              var entityConfiguration = entityMetadata.configuration;
              configuration = configuration = $filter('filter')(entityConfiguration, { key: param });
              if(configuration.length) {
                return configuration[0].value;
              }
            }
          }
        }

        // General metadata configuration
        var rootConfiguration = $rootScope.metadata.configuration;
        configuration = $filter('filter')(rootConfiguration, { key: param });

        return configuration && configuration.length ? configuration[0].value : undefined;
      };
    }

    // Method for instantiating
    this.$get = function ($injector) {
      var rScope = $injector.get('$rootScope');
      var filter = $injector.get('$filter');
      return new ConfigurationManager(rScope, filter);
    };
  }]);
'use strict';

/**
 * @ngdoc service
 * @name konga.customActions
 * @description
 * # customActions
 * Constant in the konga.
 */
angular.module('konga')
  .constant('customActions', {});

'use strict';

/**
 * @ngdoc service
 * @name konga.exceptionManager
 * @description
 * # exceptionManager
 * Service in the konga.
 */
angular.module('konga')
  .service('exceptionManager', ['util', function exceptionManager(util) {
	  this.analyzeException = function(params){
		  //var entityId = params.id;
	  	  var $rootScope = params.dependencyInjector.get('$rootScope');
	  	  var $filter = params.dependencyInjector.get('$filter');
	  		  var $scope = params.self;
	      var error = params.error;
	      var exceptionCode;
	      
	      if (error.data.length)
	    	  exceptionCode = error.data && error.data.length ? error.data[0].exceptionCode : 'GENERIC_TECHNICAL_ERROR';
	      else 
	    	  exceptionCode = error.data? error.data.exceptionCode : 'GENERIC_TECHNICAL_ERROR';
	      
	      var involvedFields = "";
	      
	      // Verify if the entity is new
	      //if(entityId !== util.constants.NEW_ENTITY_ID) { 

    		  //if(error.data.exceptionCode == 'DATA_INTEGRITY_VIOLATION_SAVE_OR_UPDATE') {
			  //	 exceptionCode = 'DATA_INTEGRITY_VIOLATION_SAVE_OR_UPDATE';
	    	  //}
    		  if(error.data.exceptionCode == 'UNIQUE_CONSTRAINT_VIOLATION') {
    			  
    			  var fieldArray = $scope.entityMetadata.fields;
    			  
    			  if($scope.entityMetadata.superClass){
    				  for(var i = 0; i<$scope.metadata.entities.length; i++){
    					  if($scope.metadata.entities[i].name == $scope.entityMetadata.superClass){
    						  
    						  fieldArray = fieldArray.concat($scope.metadata.entities[i].fields);
    						  break;
    					  }
    				  }
    			  }
    			  
    			  var usedFields = [];
    			  exceptionCode = "UNIQUE_CONSTRAINT_VIOLATION";
    			  for(var ind = 0; ind <error.data.fieldNames.length; ind++){
	    			  for(var i = 0; i<fieldArray.length; i++){
	    				  if(error.data.fieldNames[ind] == fieldArray[i]["name"] && usedFields.indexOf(fieldArray[i]["name"]) < 0){
	    					  usedFields.push(fieldArray[i]["name"]);
	    					  if(ind > 0){
	    						  involvedFields += ", ";
	    					  }
	    					  if($scope.entityMetadata.superClass){
	    						  
	    						  var owner = $filter('translate')(fieldArray[i].owner ? $scope.entityMetadata.label : "");
	    						  
	    						  involvedFields += $filter('translate')(fieldArray[i].label, {label:owner});
	    					  }
	    					  else{
	    						  involvedFields += $filter('translate')(fieldArray[i].label);
	    					  }
	    					  
	    				  }
	    			  }
    			  }
    			  
    			  involvedFields = "("+involvedFields+")";
    			  
    		  }

	      //}
	      $rootScope.operations.addAlert(util.constants.ALERT_TYPE_ERROR, exceptionCode, {fields:involvedFields});
	  };
  }]);

'use strict';

/**
 * @ngdoc service
 * @name konga.fieldMapper
 * @description
 * This service helps managing the connection between the entities and their forms within the UI. 
 * When a field is changed in the form, its value is stored into the entity. 
 */
angular.module('konga')
  .service('fieldMapper', ['api','common','scaffold', '$filter', 'util', function fieldMapper(api, common, scaffold, $filter, util) {
    this.mapField = function(fieldName, edsType, entity) {
    	// TODO Implement
    };

    this.unmapField = function(fieldMetadata, edsType, entity, value, parentField, parentEntity) {
		try {
			// Get the name of the field
			var fieldName = fieldMetadata.name;

			// Get the type of the field
			var fieldType = fieldMetadata.type.type;

			// If the entity is not related, and it's the key, the type is text
			if(fieldType === util.constants.FIELD_COMPLEX && fieldMetadata.isKey) {
				fieldType = util.constants.FIELD_TEXT;
			}

			// Escape the value (if needed)
			var escapedValue = null;

			// Create the extra params
			//var extra = {};

			switch(fieldType) {
			case util.constants.FIELD_TEXT:
				escapedValue = value.text;
				break;
			case util.constants.FIELD_BOOLEAN:
				escapedValue = value.text; // It comes casted out-of-the-box :)
				break;
			case util.constants.FIELD_NUMBER:
				// TODO Encapsulate in a try
				escapedValue = parseFloat((value.text+"").split(',').join('.'));
				break;
			case util.constants.FIELD_COMPLEX:
				//var ids = value.ids;
				escapedValue = value.entity;
				// for(var i = 0; i < ids.length; i++) {
				// 	var entityId = value.ids[i];
				// 	var entityType = fieldMetadata.type.complexType;

				// 	var localEndpoint = api.getLocalEndpoint(entityType);
				// 	escapedValue.push(localEndpoint.get({id: entityId}));
				// }

				// if(fieldMetadata.multiplicity === util.constants.MULTIPLICITY_ONE) {
				// 	escapedValue = escapedValue[0];
				// }

				break;
			case util.constants.FIELD_FILE:
				escapedValue = value.files;
				break;
// 			TODO Other cases
			default:
				escapedValue = value.text;
				break;

			}

			//if it has parentField and its parent is type COMPLEX
			if (parentField && (parentField.type.type === util.constants.FIELD_COMPLEX)){
				
				//Get the metadata of its parent
				var entityMetadata = common.getMetadata(parentField.type.complexType);
				var entityParent = null;

				// Get the parent's multiplicity
				var parentMultiplicity = parentField.multiplicity;

				if(parentMultiplicity === util.constants.MULTIPLICITY_ONE) {
					// Avoid input unrecognized fields
					// FIXME Find a better way (SM)
					if(parentEntity[fieldName] !== undefined) {
						parentEntity[fieldName] = escapedValue;
					}
				}
				else {
					var parentFieldName = parentField.name;
					parentEntity[parentFieldName].splice(0, entity.length);
				
					for (var i = 0; i < escapedValue.length; i++) {
						//Create a new entity of its parent with the metadata
						entityParent = scaffold.newEntity(entityMetadata);
					
						//First time, inicialize the object
						if (!entityParent[fieldName])
							entityParent[fieldName] = {};
						
						//Complete the entity of parent with the datas of escapedValue
						entityParent[fieldName] = escapedValue[i];
						
						//Push the entity of parent in the entity
						if (entityParent != null)
							parentEntity[parentFieldName].push(entityParent);
					}	
				}
				
				
			} else {
				entity[fieldName] = escapedValue;
			}
			// var current = entity;

			// var i = 0;
			// for(i = 0; i < pathSteps.length-1; i++) {
			// 	// TODO Verify nulls
			// 	current = current[pathSteps[i]];
			// }

			// // Assign the value
			// current[pathSteps[i]] = escapedValue;

			// TODO filter value type
			
		} catch(e) {
			value = null;
			escapedValue = null;
			// TODO Log or do something here
		}

		if(value) {
			value.escaped = escapedValue;
			value.extra = {};
		}

		return value;
    };
  }]);

'use strict';

/**
 * @ngdoc service
 * @name konga.kongaConfig
 * @description
 * # kongaConfig
 * Constant in the konga.
 */
angular.module('konga')
  .constant('kongaConfig', {});

'use strict';

/**
 * @ngdoc service
 * @name konga.konga
 * @description
 * # konga
 * Service in the konga.
 */
angular.module('konga')
  .provider('konga', ['kongaConfig', 'mapper', 'util', 'customActions', 
    function KongaProvider(kongaConfig, mapper, util, customActions) {
    
      var apiResolutions = {};

      function Konga(common, $rootScope, userData) {
        this.api = function(entity, API) {
          if(API !== undefined) {
            apiResolutions[entity] = API;
          }

          return apiResolutions[entity];
        };

        this.action = function(name, action) {
          if(action !== undefined) {
            customActions[name] = action;
          }

          return customActions[name];
        };

        this.config = function(key, value) {
          if(value !== undefined) {
            kongaConfig[key] = value;
          }

          return kongaConfig[key];
        };

        this.viewMapper = function(map, view) {
          if(view !== undefined) {
            mapper[map] = view;
          }

          return mapper[map];
        };

        this.util = util;

        this.storage = common;

        this.init = function(metadata) {
          $rootScope.metadata = metadata;
          util.init(metadata);
          common.store('metadata', metadata);
        };
      }

      this.api = function(entity, API) {
        if(!entity || !API) {
          // TODO Throw exception
        }

        apiResolutions[entity] = API;
      };

      this.action = function(name, action) {
        if(action !== undefined) {
          customActions[name] = action;
        }

        return customActions[name];
      };

      this.config = function(key, value) {
        if(!key || !value) {
          // TODO Throw exception
        }

        kongaConfig[key] = value;
      };

      this.viewMapper = function(map, view) {
        if(!map || !view) {
          // TODO THrow exception
        }
        mapper[map] = view;
      };

      this.$get = ['common', '$rootScope', 'userData', 
        function(common, $rootScope, userData) {
          return new Konga(common, $rootScope, userData);
        }];
  }]);

'use strict';

/**
 * @ngdoc service
 * @name konga.mapper
 * @description
 * # mapper
 * Value in the konga.
 */
angular.module('konga')
  .constant('mapper', {});

'use strict';

/**
 * @ngdoc service
 * @name konga.permissionManager
 * @description
 * # permissionManager
 * Provider in the konga.
 */
angular.module('konga')
  .provider('permissionManager', function () {

    // Private constructor
    function Greeter(userData) {
      this.isAllowed = function (permission) {
      	// Get the user roles
		var rolesNative = userData.roles;

		// We need to stringify each role, as all come in array-form (as a buffer)
		var userRoles = [];
		for(var i = 0; i < rolesNative.length; i++) {
			var role = "";
			var f = -1;
			while(rolesNative[i][++f] !== undefined) {
			  role += rolesNative[i][f];
			}
			userRoles.push(role);
		}
      	
      	if(!permission.length) {
      		return true;
      	}
        return userRoles.indexOf(permission) !== -1;
      };
    }

    // Method for instantiating
    this.$get = function ($injector) {
      var userData = $injector.get('userData');
      return new Greeter(userData);
    };
  });

'use strict';

/**
 * @ngdoc service
 * @name konga.scaffold
 * @description
 * # scaffold
 * Service in the konga.
 */
angular.module('konga')
  .service('scaffold', ['$filter', 'common', 'util', 
    function scaffold($filter, common, util) {

        function generate(fields, entity, search) {
            // Setup the entity
            for(var i = 0; i < fields.length; i++) {
                // Current field
                var field = fields[i];

                // Not related fields are appended with the default value (FIXME)
                //if(search) {

                    // Get the multiplicity
                    var multiplicity = !search ? field.multiplicity : field.searchConf.multiplicity;

                    // Get the type
                    var type = field.type.type;

                    // Get the default value
                    var defaultValue = field.defaults;

                    var castValue = null;

                    // If defaultValue = 'null' => null
                    // If multiplicity = MANY => value = new Array;
                    // If type != text => cast defaultValue

                    // If the field is an id, we initialize as null
                    if(defaultValue == 'null' || field.isId) {
                        castValue = null;
                    }
                    else if(multiplicity == util.constants.MULTIPLICITY_MANY && !(search && field.fieldType.search === util.constants.FIELD_COMPLEX)) {
                        castValue = [];
                    }
                    else if(type !== util.constants.FIELD_TEXT) {
                        switch(type) {
                        case util.constants.FIELD_BOOLEAN:
                            castValue = defaultValue === 'true';
                            break;
                        case util.constants.FIELD_COMPLEX:
                            // Initialized as null, valorized afterwards
                            castValue = null;

                            // Control if field rendering is also complex
                            // TODO Make this recursive (and for updation too)
                            if(search && field.fieldType.search === util.constants.FIELD_COMPLEX) {
                                var innerFields = field.searchable.fields;
                                var apiNames = field.apiName;
                                if(innerFields.length) {
                                    castValue = {};
                                    if(apiNames && apiNames.length == innerFields.length) {
                                        innerFields = apiNames;
                                    }
                                    for(var f = 0; f < innerFields.length; f++) {
                                        var innerFieldName = innerFields[f];

                                        castValue[$filter('fieldApiName')(innerFieldName)] = null;


                                        
                                    }
                                }
                            }
                            break;
                        case util.constants.FIELD_DATE:
                            if(search) {
                                castValue = {
                                    startDate: 0,
                                    endDate: 0,
                                    comparator: util.constants.DATE_COMPARATOR_EQUALS
                                };
                            }
                            else {
                                //var strDate = defaultValue;
                                if(defaultValue == util.constants.DATE_DEFAULT_NOW) {
                                    castValue = new Date().getTime();
                                }
                                else {
                                    // TODO Cast date :)
                                    castValue = null;
                                }
                            }
                            break;
                        case util.constants.FIELD_NUMBER:
                            castValue = defaultValue ? parseInt(defaultValue) : defaultValue;
                            break;
                        case util.constants.FIELD_STRING:
                        	if(typeof defaultValue !== 'undefined') {
                        		castValue = defaultValue;
                        	}
                        	break;
                        }
                    }
                    else {
                        castValue = defaultValue;
                    }

                    entity[field.name] = castValue;
               // }

                
                  // For the related fields we just want the one that is key, named with the real field name, and initialized as null
                  // Thus the user could fulfill the values like if it were an update
                 
                // else if(field.isKey) {
                //     // Configure ApiPath
                //     entity[field.name] = null;
                // }
            }
        }

        this.newEntity = function(metadata, resource) {

        	// Create the new entity
        	var entity = null;
        	
        	if (resource === undefined) 
        		entity = {};
        	else
        		entity = new resource(); 
        	
        	// Get all fields
        	var fields = util.getEntityFields(metadata);

        	generate(fields, entity);

        	return entity;
        };

        this.newQuery = function(metadata) {

            // Create the query object
            var query = {};

            // Get fields from the metadata (only the one for searching)
            var entityFields = util.getEntityFields(metadata);
            var fields = $filter('searchParams')(entityFields, metadata);

            generate(fields, query, true);

            // Set up the centre operat
            // FIXME Move this elsewhere :D
            // And FIX THIS !!!!!!!!!!!!!!!!!
            if(query.idCtrOperat !== undefined) {
                var ctrOperat = common.read('ctr-operat');
                var idCtrOperat = ctrOperat.id;
                query.idCtrOperat = idCtrOperat;
            }

            return query;
        };
      }]);

'use strict';

/**
 * @ngdoc service
 * @name konga.standardApi
 * @description
 * # standardApi
 * Factory in the konga.
 */
angular.module('konga')
  .factory('standardApi', ['$resource', '$routeParams', 'configurationManager', 'kongaConfig', 'util', function ($resource, $routeParams, configurationManager, kongaConfig, util) {
  
    var service = $resource(kongaConfig.apiEndpoint + '/:path/:id/:operation/:opId', {}, {
      get: {
        method: 'GET',
        params: {
          id: '@id'
        },
        transformResponse: function(resp) {
          var data = angular.fromJson(resp);

          return data;
        }
      },

      search: {
        method: 'GET',
        params: {
          id: null,
          path: '@path',
          opId: null
        },
        isArray: true,
        transformResponse: function (data) {
          var jsonData = angular.fromJson(data);
          if(jsonData.data) {
            $routeParams.count = jsonData.count;
            return jsonData.data; 
          }

          return jsonData;
        }
      },
      
      update: {
        method: 'PUT',
        params: {
          path: '@path',
          id: '@id'
        }
      },
      save: {
        method: 'PUT',
        params: {
          path: '@path',
          id: '@id'
        }
      },
      create: {
        method: 'POST',
        params: {
          path: '@path',
          id: null
        }
      },
      deleteObj: {
        method: 'DELETE',
        params: {
          path: '@path',
          id: '@id'
        }
      }
    });

  return service;
    
  }]);
'use strict';

/**
 * @ngdoc service
 * @name konga.tokenHandler
 * @description
 * # tokenHandler
 * Factory in the konga.
 */
angular.module('konga')
  .factory('TokenHandler', function() {
  var tokenHandler = {};
  var token = "none";

  tokenHandler.set = function( newToken ) {
    token = newToken;
  };

  tokenHandler.get = function() {
    return token;
  };

  // wrap given actions of a resource to send auth token with every
  // request
  tokenHandler.wrapActions = function( resource, actions ) {
    // copy original resource
    var wrappedResource = resource;
    for (var i=0; i < actions.length; i++) {
      tokenWrapper( wrappedResource, actions[i] );
    }
    // return modified copy of resource
    return wrappedResource;
  };

  // wraps resource action to send request with auth token
  var tokenWrapper = function( resource, action ) {
    // copy original action
    resource['_' + action]  = resource[action];
    // create new action wrapping the original and sending token
    resource[action] = function( data, success, error){
      return resource['_' + action](
        angular.extend({}, data || {}, {access_token: tokenHandler.get()}),
        success,
        error
      );
    };
  };

  return tokenHandler;
});
'use strict';

/**
 * @ngdoc service
 * @name konga.userData
 * @description
 * # userData
 * Value in the konga.
 */
angular.module('konga')
  .value('userData', {
  	roles: []
  });

'use strict';

/**
 * @ngdoc object
 * @name Standards.Tools
 * @description 

Konga comes with a set of built-in tools to access quick metadata-parsing features, along with other handy things needed to manage metadata and other common features. This tools are allocated in a service called {@link konga.util `util`}. However, you can find here all the tools included, how to use them...

 */
 angular.module('konga').constant('util', {

 	metadataObject : null,

 	getConfiguration: function() {
 		return this.metadataObject.configuration;
 	},

 	/**
	 * @ngdoc function
	 * @methodOf Standards.Tools
	 * @name getMetadata
	 * @description 
	 * This method will give you the metadata definition of the entity named with the param `name` provided.

<pre>
angular.module('myAwesomeApp')
  .something(['util', function(util) {
    // Here you got your metadata
    var metadata = util.getMetadata('demo-entity');
  }]);
</pre>

	 * @param {string} name
	 The name of the entity to get it's metadata.
	 */
 	getMetadata: function(name) {
 		for(var i = 0; i < this.metadataObject.entities.length; i++) {
 			var current = this.metadataObject.entities[i];
 			if(current.name === name) {
 				return current;
 			}
 		}
 		return null;
 	},

	/**
	 * @ngdoc function
	 * @methodOf Standards.Tools
	 * @name getEntityFields
	 * @description 
	 * Returns all the fields of the {@link Metadata.Entity `entity metadata`} you give as input. This moves bottom-up through all hierarchy of entities, fetching all the fields from upper-level entities too. 

	 * @param {Object} entity
	 <span class="label type-hint type-hint-object">{@link Metadata.Entity Entity}</span>
	 The name of the entity to get it's metadata.
	 */
	 getEntityFields: function(entity) {

		// Get direct fields
		var fields = angular.copy(entity.fields);

		// Does it have a superClass?
		// TODO Follow hierarchy
		if(entity.superClass) {
			var superClass = this.getMetadata(entity.superClass);

			// Get the entity configuration
			var entityConfiguration = entity.configuration;

			var superFields = superClass.fields;
			var superFieldsCopy = [];
			for(var i = 0; i < superFields.length; i++) {
				// Is there any IGNORE_PARENT_FIELD configuration?
				var ignore = false;
				for(var f = 0; f < entityConfiguration.length; f++) {
					var param = entityConfiguration[f];

					if(param.key === this.constants.CONFIGURATION_IGNORE_PARENT_FIELD) {
						var fieldName = param.value;
						if(superFields[i].name === fieldName) {
							ignore = true;
							break;
						}
					}
				}

				if(!ignore) {
					var newField = angular.copy(superFields[i]);
					newField.owner = entity.name;
					superFieldsCopy.push(newField);
				}
			}

			// Get its fields
			fields = fields.concat(superFieldsCopy);
		}

		return fields;
	},

	/**
	 * @ngdoc method
	 * @methodOf Standards.Tools
	 * @name getEntityId
	 * @description
	 * Returns the ID of an entity, or 'new' if the entity is not provided or the id does not exist
	 * @param {Object} metadata Entity metadata information
	 * @param {Object} entity The entity to retrieve the id from
	 * @param {Boolean} fieldName If true, returns only the name of the field
	 * @returns {Number} The id of the entity
	 */
	 getEntityId: function(metadata, entity, fieldName) {
	 	var id = this.constants.NEW_ENTITY_ID;

	 	var fields = this.getEntityFields(metadata);
	 	for(var i = 0; i < fields.length; i++) {
	 		var field = fields[i];

			// Is it the id?
			if(field.isId) {
				// TODO This will fail for indirect paths. However an id should NEVER be indirect.
				if (entity) { 
					id = entity[field.name];
				}
				if(fieldName) {
					id = field.name;
				}
				break;
			}
		}

		return id;
	},

	/**
	 * @ngdoc method
	 * @methodOf Standards.Tools
	 * @name getEntityCode
	 * @description
	 * Returns the code of an entity, or 'new' if the entity is not provided or the code does not exist
	 * @param {Object} metadata Entity metadata information
	 * @param {Object} entity The entity to retrieve the code from
	 * @param {Boolean} fieldName If true, returns only the name of the field
	 * @returns {string} The code of the entity
	 */
	 getEntityCode: function(metadata, entity, fieldName) {
	 	var code = null;

	 	var fields = this.getEntityFields(metadata);
	 	for(var i = 0; i < fields.length; i++) {
	 		var field = fields[i];

			// Is it the key?
			if (field.isKey && !field.related) {
				// TODO This will fail for indirect paths. However an id should NEVER be indirect.
				if (entity) {
					code = entity[field.name];
				}
				if (fieldName) {
					code = field.name;
				}
				break;
			}
		}

		return code;
	},

	/**
	 * @ngdoc method
	 * @methodOf Standards.Tools
	 * @name getEntityLabel
	 * @description
	 * Returns the label of an entity, or 'new' if the entity is not provided or the label does not exist
	 * @param {Object} metadata Entity metadata information
	 * @param {Object} entity The entity to retrieve the label from
	 * @param {Boolean} fieldName If true, returns only the name of the field
	 * @returns {string} The label of the entity
	 */
	 getEntityLabel: function(metadata, entity, fieldName) {
	 	var label = null;

	 	var fields = this.getEntityFields(metadata);
	 	for(var i = 0; i < fields.length; i++) {
	 		var field = fields[i];
			// Is it the label?
			// TODO Finish annotation
			if(field.isLabel && !field.related) {
				// TODO This will fail for indirect paths. However an id should NEVER be indirect.
				if(entity) {
					label = entity[field.name];
				}
				if(fieldName) {
					label = field.name;
				}
				break;
			}
		}

		return label;
	},

	/**
	 * @ngdoc method
	 * @methodOf Standards.Tools
	 * @name getEntityCategories
	 * @description
	 * Returns all Categories for an entity 
	 * @param {Object} entity Entity metadata information
	 * @returns {Array} All Categories for that entity type
	 */
	 getEntityCategories: function(entity, level) {

	 	var categories = [];

	 	var fields = this.getEntityFields(entity);

	 	for(var i = 0; i < fields.length; i++){

			// Get only the first category
			if(level == 1) {
				if(fields[i].categories.length) {
					if(categories.indexOf(fields[i].categories[0]) == -1){
						//It means we've found a new category
						categories.push(fields[i].categories[0]);
					}	
				}
				
			}
			
		}

		return categories;
	},

	/**
	 * @ngdoc method
	 * @methodOf Standards.Tools
	 * @name getEntityFieldSets
	 * @description
	 * Returns all Field sets for an entity 
	 * @param {Object} entity Entity metadata information
	 * @returns {Array} All Field sets for that entity type
	 */
	 getEntityFieldSets: function(entity) {

	 	var fieldsets = [];

		// Get field sets of the current entity
		fieldsets = fieldsets.concat(entity.fieldSets);

		// Does it have a superclass?
		// TODO Follow hierarchy
		if(entity.superClass) {

			// Get the superclass
			var superClass = this.getMetadata(entity.superClass);

			// Concat the fieldsets of the superclass
			fieldsets = fieldsets.concat(superClass.fieldSets);
		}

		return fieldsets;
	},

	/**
	 * @ngdoc method
	 * @methodOf Standards.Tools
	 * @name init
	 * @description
	 * Initialises the tools. It needs to receive the metadata (see how we used this method on the {@link Standards.Apps}).
	 *
	 * @param {Object} metadata
	 The metadata object to store within the tools
	 */
	init: function(metadata) {
		/**
		 * @ngdoc object
		 * @propertyOf Standards.Tools
		 * @name metadataObject
		 * @description
		 * Stores the metadata object. This metadata object is stored in the {@link Standards.Tools#methods_init `init`} method call, once you have your metadata to initialise Konga
		 *
		 */
		this.metadataObject = metadata;
	},

	constants: {

		ALERT_TYPE_ERROR 					: 'danger',
		ALERT_TYPE_SUCCESS 					: 'success',
		ALERT_TYPE_DEFAULT 					: 'default',
		ALERT_TYPE_WARNING 					: 'warning',

		ENTITY_ID_PREFFIX 					: 'entity_',

		SEARCH_SUFFIX 						: '_search',

		STRING_SEPARATOR					: '_',

		NEW_ENTITY_ID 						: 'new',

		REFRESH_SEARCH_KEY 					: 'refreshSearchKey_',

		SCOPE_SEARCH 						: 'search',
		SCOPE_RESULTS 						: 'results',
		SCOPE_UPDATE 						: 'update',

		FIELD_STRING 						: 'STRING',
		FIELD_NUMBER 						: 'NUMBER',
		FIELD_PLAIN 						: 'PLAIN',
		FIELD_PASSWORD 						: 'PASSWORD',
		FIELD_BOOLEAN 						: 'BOOLEAN',
		FIELD_CHECKBOX 						: 'CHECKBOX',
		FIELD_COMBOBOX 						: 'COMBOBOX',
		FIELD_DATE 							: 'DATE',
		FIELD_DATETIME 						: 'DATETIME',
		FIELD_DATESEARCH 					: 'DATE-SEARCH',
		FIELD_TEXT 							: 'TEXT',
		FIELD_TEXTAREA 						: 'TEXTAREA',
		FIELD_COMPLEX 						: 'COMPLEX',
		FIELD_LIST 							: 'LIST',
		FIELD_PICK_LIST 					: 'PICK_LIST',
		FIELD_SELECT 						: 'SELECT',
		FIELD_FILTERED_SELECT 				: 'FILTERED_SELECT',
		FIELD_TICS 							: 'TICS',
		FIELD_COLOR 						: 'COLOR',
		FIELD_CSS 							: 'CSS',
		FIELD_FILE 							: 'FILE',
		FIELD_IMAGE 						: 'IMAGE',
		FIELD_PRICE 						: 'PRICE',
		FIELD_CUSTOM 						: 'CUSTOM',
		FIELD_PLAIN_FILTERED 				: 'PLAIN_FILTERED',
		FIELD_TABLE 						: 'TABLE',

		DATE_DEFAULT_NOW 					: 'now',

		MULTIPLICITY_ONE 					: 'ONE',
		MULTIPLICITY_MANY 					: 'MANY',

		TRIGGER_MOMENT_IMMEDIATE 			: 'IMMEDIATE',
		TRIGGER_MOMENT_COMMIT 				: 'COMMIT',
		TRIGGER_TYPE_CONFIRM 				: 'CONFIRM',
		TRIGGER_TYPE_ALERT 					: 'ALERT',
		TRIGGER_PARAM_LABEL 				: 'label',

		TRIGGER_MATCH_VALUE 				: 'VALUE',
		TRIGGER_MATCH_LENGTH 				: 'LENGTH',

		TRIGGER_MATCH_TYPE_EXACT			: 'EXACT_MATCH',
		TRIGGER_MATCH_TYPE_RANGE	  		: 'RANGE',

		CASCADE_FORM 						: 'CASCADE',
		TABBED_FORM 						: 'TABBED',
		CUSTOM_TABBED_FORM 					: 'CUSTOM_TABBED',
		CUSTOM_FORM 						: 'CUSTOM',

		CATEGORIZED_CASCADE_FORM 			: 'CATEGORIZED_CASCADE',

		LANGUAGE_MESSAGE_PREFFIX 			: 'message.languages.',

		DATE_COMPARATOR_LOWER_THAN 			: 'LOWER_THAN',
		DATE_COMPARATOR_LOWER_EQUALS 		: 'LOWER_EQUALS',
		DATE_COMPARATOR_EQUALS 				: 'EQUALS',
		DATE_COMPARATOR_GREATER_EQUALS 		: 'GREATER_EQUALS',
		DATE_COMPARATOR_GREATER_THAN 		: 'GREATER_THAN',
		DATE_COMPARATOR_BETWEEN 			: 'BETWEEN',

		NUMBER_COMPARATOR_LOWER_THAN 		: 'LOWER_THAN',
		NUMBER_COMPARATOR_LOWER_EQUALS 		: 'LOWER_EQUALS',
		NUMBER_COMPARATOR_EQUALS 			: 'EQUALS',
		NUMBER_COMPARATOR_GREATER_EQUALS 	: 'GREATER_EQUALS',
		NUMBER_COMPARATOR_GREATER_THAN 		: 'GREATER_THAN',
		NUMBER_COMPARATOR_BETWEEN 			: 'BETWEEN',

		VALIDATOR_EXACT_MATCH 				: 'EXACT_MATCH',
		VALIDATOR_RANGE 					: 'RANGE',


		MAXLEN_FILTER_NAME              	: 30,

		ACTION_TYPE_MODAL 					: 'modal',
		ACTION_TYPE_NOTIFY 					: 'notify',
		ACTION_TYPE_CONFIRM 				: 'confirm',
		ACTION_TYPE_TAB 					: 'tab',
		ACTION_TYPE_FUNCTION 				: 'function',

		ACTION_RESTRICTION_POLICY_ALL 		: 'all'	,

		USER_ID								: 'userId',

		COMBO_NATURE_TIERS					: 'natTiers',	

		CONFIGURATION_IGNORE_PARENT_FIELD 	: 'IGNORE_PARENT_FIELD',
		CONFIGURATION_USE_VIEW 				: 'USE_VIEW',

		TAB_TYPE_SEARCH 					: 'glyphicon glyphicon-search',
		TAB_TYPE_UPDATE 					: 'glyphicon glyphicon-pencil',
		TAB_TYPE_HOME 						: 'glyphicon glyphicon-home',
		TAB_TYPE_TASKS 						: 'glyphicon glyphicon-tasks',
		TAB_TYPE_GRID 						: 'glyphicon glyphicon-th',
		TAB_TYPE_GRID_LARGE 				: 'glyphicon glyphicon-th-large',
		TAB_TYPE_STORE 						: 'glyphicon glyphicon-shopping-cart',
		TAB_TYPE_CONFIG 					: 'glyphicon glyphicon-cog',

		FORM_STYLE_HORIZONTAL 				: 'HORIZONTAL',
		USE_SHORT_LABEL 					: 'USE_SHORT_LABEL',

		FILE_TYPE_PDF						: 'application/pdf',
		FILE_TYPE_PNG						: 'image/png',
		FILE_TYPE_JPG						: 'image/jpeg',
		FILE_TYPE_GIF						: 'image/gif',
		FILE_EXT_PNG						: '.png',
		FILE_EXT_JPG						: '.jpg',
		FILE_EXT_GIF						: '.gif',

		CASCADE_UPDATE 						: 'CASCADE_UPDATE',
		PROPAGATE_UPDATE 					: 'PROPAGATE_UPDATE',
		DISABLE_COMPLEX_FIELD 				: 'DISABLE_FIELD',

		SELF_FIELD 							: '$self',
		COMPLEX_FIELD_AS					: 'as',

		UPDATE_CUSTOM_VIEW 					: 'UPDATE_CUSTOM_VIEW',
		SEARCH_CUSTOM_VIEW 					: 'SEARCH_CUSTOM_VIEW',
		RESULTS_CUSTOM_VIEW 				: 'RESULTS_CUSTOM_VIEW',

		UPDATE_HIDE_BUTTONS 				: 'UPDATE_HIDE_BUTTONS',

		WEEKDAYS 							: ['day.sunday', 'day.monday', 'day.tuesday', 'day.wednesday', 'day.thursday', 'day.friday', 'day.saturday'],
		WEEKEND_DAYS 						: ['day.saturday', 'day.sunday'],

		MONTHS 								: ['month.january', 'month.february', 'month.march', 'month.april', 'month.may', 'month.june', 'month.july', 'month.august', 'month.september', 'month.october', 'month.november', 'month.december'],

		SEARCH_USE_CATEGORY 				: 'USE_SEARCH_CATEGORY',
		RESULTS_USE_CATEGORY 				: 'USE_RESULTS_CATEGORY',
		HIDE_CATEGORY_HEADER 				: 'HIDE_CATEGORY_HEADER',

		QUERY_PARAM_REGEXP 					: /^{\w+}$/,
		QUERY_COMPLEX_PARAM_REGEXP 			: /^{(\w+\.\w+)*}$/,

		SHOW_PAGINATION 					: 'SHOW_PAGINATION',
		TABLE_CELL_RENDERER 				: 'TABLE_CELL_RENDERER',
		TABLE_CELL_FILTER 					: 'TABLE_CELL_FILTER',
		READ_ONLY 							: 'READ_ONLY',

		TABLE_CONF_X_AXIS_PROPERTY 			: 'X_AXIS_PROPERTY',
		TABLE_CONF_Y_AXIS_PROPERTY 			: 'Y_AXIS_PROPERTY',
		TABLE_CONF_X_AXIS_MIN 				: 'X_AXIS_MIN',
		TABLE_CONF_Y_AXIS_MIN 				: 'Y_AXIS_MIN',
		TABLE_CONF_X_AXIS_MAX 				: 'X_AXIS_MAX',
		TABLE_CONF_Y_AXIS_MAX 				: 'Y_AXIS_MAX',
		TABLE_CONF_X_AXIS_STEP 				: 'X_AXIS_STEP',
		TABLE_CONF_Y_AXIS_STEP 				: 'Y_AXIS_STEP',

		LOOK_AND_FEEL_PLAIN 				: 'plain',
		LOOK_AND_FEEL_TABS 					: 'tabs',
		CONFIG_LOOK_AND_FEEL 				: 'look-and-feel',

		HIDE_WHEN_CREATING 					: 'hide-when-creation',
		HIDE_WHEN_UPDATING 					: 'hide-when-updating',

		'FIELD_TYPE_CUSTOM' 				: 'CUSTOM',
		'CUSTOM_FIELD_TYPE' 				: 'CUSTOM_FIELD_TYPE',

		'SHOW_HINT_SEARCH' 					: 'SHOW_HINT_SEARCH',
		'SHOW_HINT_UPDATE' 					: 'SHOW_HINT_UPDATE'
	}
});


"use strict";

 angular.module('config', [])

.constant('i18n', {es:{'message.login.title':'Acceso a la aplicación','message.login.description':'Introduzca sus datos de acceso para utilizar la aplicación','message.login.username':'Correo electrónico','message.login.password':'Contraseña','message.login.rememberme':'Recordarme en este equipo','message.login.proceed':'Acceder','message.login.incorrect-data':'Usuario o contraseña inválidos','message.action.validate':'Validar','message.action.save':'Guardar','message.action.cancel':'Cancelar','message.action.add':'Añadir','message.action.delete':'Eliminar','message.action.clean':'Limpiar','message.action.search':'Buscar','message.action.close':'Cerrar','message.action.proceed-order':'Pedido','message.discard-changes.title':'Confirma tu acción','message.discard-changes.message':'¿Deseas cancelar tus cambios?','message.delete-entity.title':'Confirma tu acción','message.delete-entity.message':'¿Deseas eliminar este elemento?','message.action-confirmation.create.success':'Elemento creato con éxito','message.action-confirmation.update.success':'Elemento actualizado con éxito','message.action-confirmation.delete.success':'Elemento borrado con éxito','message.search-filters.title':'Filtros de búsqueda','message.field-validation.required':'Este campo es obligatorio','message.boolean.yes':'Sí','message.boolean.no':'No',DIALOGS_YES:'Sí',DIALOGS_NO:'No',DIALOGS_CLOSE:'Cerrar','message.tabs.home':'Home','message.tabs.admin':'Admin','message.tabs.entity.search':'Buscar {{ label }}','message.tabs.entity.update':'Actualizar {{ label }} {{ id }}','message.tabs.entity.create':'Crear {{ label }}','message.menu.entity-management':'Gestionar elementos','message.menu-internal-news':'Mensajes internos','field.searchResults.noresults':'Sin resultados','panel.admin-options.title':'Opciones de administración','panel.admin-options.control-panel':'Administración','panel.admin-options.sales-panel':'Comercial','panel.select-store.title':'Selecciona tu tienda','field.date-search.comparator':'Comparador','field.date-search.date':'Fecha','field.date-search.otherdate':'Otra fecha','field.date-search.LOWER_THAN':'Anterior','field.date-search.LOWER_EQUALS':'Anterior o igual','field.date-search.EQUALS':'Igual','field.date-search.GREATER_EQUALS':'Posterior o igual','field.date-search.GREATER_THAN':'Posterior','field.date-search.BETWEEN':'Entre','field.number-range.comparator':'Comparador','field.number-range.number':'Valor','field.number-range.othernumber':'Otro valor','field.number-range.LOWER_THAN':'Menor','field.number-range.LOWER_EQUALS':'Menor o igual','field.number-range.EQUALS':'Igual','field.number-range.GREATER_EQUALS':'Mayor o igual','field.number-range.GREATER_THAN':'Mayor','field.number-range.BETWEEN':'Entre','message.table-input.not-yet-configured':'La tabla aún no ha sido configurada','field.list-input.actions':'Acciones','field.file-input.upload':'Seleccionar archivo','message.pagination.results-per-page':'Resultados por página','message.pagination.results':'Mostrando  resultados {{ (offset-1) * limit + 1 }} a {{ count < ((offset-1)*limit)+limit ? count : ((offset-1)*limit+limit) }} de {{ count }} ','message.single-select.title':'Elija un elemento','message.multi-select.title':'Elija sus elementos','combobox.placeholder':'Seleccionar un valor',DUPLICATED_ELEMENT:'Error de integridad: Ese elemento ya existe','entity.catalog-product-details.cart.add.success':'{{ product.description }} añadido al carrito','entity.catalog-product-details.cart.edit.success':'{{ product.description }} editado con éxito','entity.catalog-product-details.cart.add.no-stock':'No hay stock de este producto','entity.catalog-product-details.cart.add.not-enough-stock':'No hay stock de este producto','entity.catalog-product-details.cart.add.from-total-stock':'Este producto pertenece a un almacén externo a Storpanel, y puede estar fuera de su embalaje original.'},en:{'message.action.validate':'Validate','message.action.save':'Save','message.action.cancel':'Cancel','message.action.add':'Add','message.action.delete':'Delete','message.action.clean':'Clean','message.action.search':'Search','message.action.close':'Close','message.discard-changes.title':'Confirm your action','message.discard-changes.message':'Do you want to discard your changes?','message.delete-entity.title':'Confirm your action','message.delete-entity.message':'Do you want to remove this item?','message.action-confirmation.create.success':'Item successfully created','message.action-confirmation.update.success':'Item successfully updated','message.action-confirmation.delete.success':'Item successfully deleted','message.search-filters.title':'Search filters','message.field-validation.required':'Mandatory field','message.boolean.yes':'Yes','message.boolean.no':'No',DIALOGS_YES:'Yes',DIALOGS_NO:'No',DIALOGS_CLOSE:'Close','message.tabs.home':'Home','message.tabs.admin':'Admin','message.tabs.entity.search':'Find {{ label }}','message.tabs.entity.update':'Update {{ label }} {{ id }}','message.tabs.entity.create':'New {{ label }}','field.searchResults.noresults':'No results','field.date-search.comparator':'Comparator','field.date-search.date':'Date','field.date-search.otherdate':'Other date','field.date-search.LOWER_THAN':'Lower than','field.date-search.LOWER_EQUALS':'Lower or equal','field.date-search.EQUALS':'Equal','field.date-search.GREATER_EQUALS':'Greater or equal','field.date-search.GREATER_THAN':'Greater','field.date-search.BETWEEN':'Between','field.number-range.comparator':'Comparator','field.number-range.number':'Value','field.number-range.othernumber':'Other value','field.number-range.LOWER_THAN':'Lower than','field.number-range.LOWER_EQUALS':'Lower or equal','field.number-range.EQUALS':'Equal','field.number-range.GREATER_EQUALS':'Greater or equal','field.number-range.GREATER_THAN':'Greater than','field.number-range.BETWEEN':'Between','field.link.text':'Select value','message.table-input.not-yet-configured':'The table hasn\'t been configured yet','field.list-input.actions':'Actions','field.file-input.upload':'Select file','message.pagination.results-per-page':'Items per page','message.pagination.results':'Showing items {{ (offset-1) * limit + 1 }} to {{ count < ((offset-1)*limit)+limit ? count : ((offset-1)*limit+limit) }} from {{ count }} ','message.single-select.title':'Select an item','combobox.placeholder':'Select a value',DUPLICATED_ELEMENT:'Data integrity exception. Item exists already'},fr:{'message.login.title':'Acceso a la aplicación','message.login.description':'Introduzca sus datos de acceso para utilizar la aplicación','message.login.username':'Correo electrónico','message.login.password':'Contraseña','message.login.rememberme':'Recordarme en este equipo','message.login.proceed':'Acceder','message.login.incorrect-data':'Usuario o contraseña inválidos','message.action.validate':'Validar','message.action.save':'Guardar','message.action.cancel':'Cancelar','message.action.add':'Añadir','message.action.delete':'Eliminar','message.action.clean':'Limpiar','message.action.search':'Buscar','message.action.close':'Cerrar','message.action.proceed-order':'Pedido','message.discard-changes.title':'Confirma tu acción','message.discard-changes.message':'¿Deseas cancelar tus cambios?','message.delete-entity.title':'Confirma tu acción','message.delete-entity.message':'¿Deseas eliminar este elemento?','message.action-confirmation.create.success':'Elemento creato con éxito','message.action-confirmation.update.success':'Elemento actualizado con éxito','message.action-confirmation.delete.success':'Elemento borrado con éxito','message.search-filters.title':'Filtros de búsqueda','message.field-validation.required':'Este campo es obligatorio','message.boolean.yes':'Sí','message.boolean.no':'No',DIALOGS_YES:'Sí',DIALOGS_NO:'No',DIALOGS_CLOSE:'Cerrar','message.tabs.home':'Home','message.tabs.admin':'Admin','message.tabs.entity.search':'Buscar {{ label }}','message.tabs.entity.update':'Actualizar {{ label }} {{ id }}','message.tabs.entity.create':'Crear {{ label }}','message.menu.entity-management':'Gestionar elementos','message.menu-internal-news':'Mensajes internos','field.searchResults.noresults':'Sin resultados','panel.admin-options.title':'Opciones de administración','panel.admin-options.control-panel':'Administración','panel.admin-options.sales-panel':'Comercial','panel.select-store.title':'Selecciona tu tienda','field.date-search.comparator':'Comparador','field.date-search.date':'Fecha','field.date-search.otherdate':'Otra fecha','field.date-search.LOWER_THAN':'Anterior','field.date-search.LOWER_EQUALS':'Anterior o igual','field.date-search.EQUALS':'Igual','field.date-search.GREATER_EQUALS':'Posterior o igual','field.date-search.GREATER_THAN':'Posterior','field.date-search.BETWEEN':'Entre','field.number-range.comparator':'Comparador','field.number-range.number':'Valor','field.number-range.othernumber':'Otro valor','field.number-range.LOWER_THAN':'Menor','field.number-range.LOWER_EQUALS':'Menor o igual','field.number-range.EQUALS':'Igual','field.number-range.GREATER_EQUALS':'Mayor o igual','field.number-range.GREATER_THAN':'Mayor','field.number-range.BETWEEN':'Entre','message.table-input.not-yet-configured':'La tabla aún no ha sido configurada','field.list-input.actions':'Acciones','field.file-input.upload':'Seleccionar archivo','message.pagination.results-per-page':'Resultados por página','message.pagination.results':'Mostrando  resultados {{ (offset-1) * limit + 1 }} a {{ count < ((offset-1)*limit)+limit ? count : ((offset-1)*limit+limit) }} de {{ count }} ','message.single-select.title':'Elija un elemento','combobox.placeholder':'Seleccionar un valor',DUPLICATED_ELEMENT:'Error de integridad: Ese elemento ya existe','entity.catalog-product-details.cart.add.success':'{{ product.description }} añadido al carrito','entity.catalog-product-details.cart.edit.success':'{{ product.description }} editado con éxito','entity.catalog-product-details.cart.add.no-stock':'No hay stock de este producto','entity.catalog-product-details.cart.add.not-enough-stock':'No hay stock de este producto','entity.catalog-product-details.cart.add.from-total-stock':'Este producto pertenece a un almacén externo a Storpanel, y puede estar fuera de su embalaje original.'}})

;
angular.module('konga').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('/konga/views/about.html',
    "<p>This is the about view.</p>\n"
  );


  $templateCache.put('/konga/views/app-loader.html',
    "Loading..."
  );


  $templateCache.put('/konga/views/calendar-input.html',
    "<div ui-calendar=\"uiConfig.calendar\" ng-model=\"value.entity\"></div>"
  );


  $templateCache.put('/konga/views/cascade-result-table.html',
    "<table class=\"table table-result\">\n" +
    "\t<thead>\n" +
    "\t\t<tr class=\"table-header\">\n" +
    "\t\t\t<th ng-repeat=\"field in fields | allowed:'results'\" style=\"cursor: pointer;\">\n" +
    "\t\t\t\t<table-header field=\"field\" sorting=\"sorting\" showSorting=\"showSorting\" mode=\"results\"></table-header>\n" +
    "\t\t\t</th>\n" +
    "\t\t</tr>\n" +
    "\t</thead>\n" +
    "\t<tbody>\n" +
    "\t\t<tr\tng-class=\"{editable: isEditable, resultClick: entityMetadata.resultClick.length}\" \n" +
    "\t\t\tng-repeat=\"entity in entities\"\n" +
    "\t\t\tng-click=\"resultClick(entityMetadata, entity, $index)\" ng-show=\"entities.length > 0\">\n" +
    "\t\t\t<td ng-repeat=\"field in fields | allowed:'results'\">\n" +
    "\t\t\t\t<table-cell entity=\"entity\" field=\"field\"></table-cell>\n" +
    "\t\t\t</td>\n" +
    "\t\t</tr>\n" +
    "\t\t<tr ng-hide=\"entities.length > 0\">\n" +
    "\t\t\t<td colspan=\"{{ fields.length }}\" class=\"align-center\">{{'field.searchResults.noresults' | translate }}</td>\n" +
    "\t\t</tr>\n" +
    "\t</tbody>\n" +
    "</table>"
  );


  $templateCache.put('/konga/views/cascade-search-pane.html',
    "<raw-input \n" +
    "\tproperty=\"field\"\n" +
    "\tvertical=\"true\" \n" +
    "\tsource-list=\"productCodes[field.name]\"\n" +
    "\tng-repeat=\"field in fields | searchParams | orderBy:'priority.search' | allowed:'search'\"\n" +
    "\tentity=\"query\" \n" +
    "\tmetadata=\"entityMetadata\" \n" +
    "\ton-update=\"operations.updateField\"\n" +
    "\tmode=\"search\"\n" +
    "\tindex=\"$index\">\n" +
    "</raw-input>"
  );


  $templateCache.put('/konga/views/cascade-update.html',
    "<div class=\"form-cascade\">\n" +
    "\t<raw-input \n" +
    "\t\tproperty=\"field\"\n" +
    "\t\tvertical=\"true\"\n" +
    "\t\tng-repeat=\"field in fields | updateParams:metadata | orderBy:'+priority.update' | allowed:'update'\" \n" +
    "\t\tentity=\"entity\" \n" +
    "\t\ton-update=\"onUpdate\"\n" +
    "\t\ton-change=\"onChange\"\n" +
    "\t\tmetadata=\"metadata\"\n" +
    "\t\tmode=\"update\"\n" +
    "\t\tcreating=\"creating\"\n" +
    "\t\tindex=\"$index\">\n" +
    "\t</raw-input>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/categorized_cascade-result-table.html',
    "<table class=\"table table-result\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" +
    "\t<thead>\n" +
    "\t\t<tr class=\"table-header categories\">\n" +
    "\t\t\t<th ng-repeat=\"category in categories\" style=\"cursor: pointer;\" colspan=\"{{ categoryFields[category.name].length }}\" ng-class=\"{ noHeader: !category.showHeader }\">\n" +
    "\t\t\t\t<span ng-if=\"category.showHeader\">{{ category.name | translate }}</span>\n" +
    "\t\t\t</th>\n" +
    "\t\t</tr>\n" +
    "\t\t<tr class=\"table-header\">\n" +
    "\t\t\t<th ng-repeat=\"field in sortedFieldsByCategory\" style=\"cursor: pointer;\">\n" +
    "\t\t\t\t<table-header field=\"field\" sorting=\"sorting\" showSorting=\"showSorting\" mode=\"results\"></table-header>\n" +
    "\t\t\t</th>\n" +
    "\t\t</tr>\n" +
    "\t</thead>\n" +
    "\t<tbody>\n" +
    "\t\t<tr\tng-class=\"{editable: entityMetadata.editable !== null, resultClick: entityMetadata.resultClick.length}\" \n" +
    "\t\t\tng-repeat=\"entity in entities\"\n" +
    "\t\t\tng-click=\"resultClick(entityMetadata, entity)\" ng-show=\"entities.length > 0\">\n" +
    "\t\t\t<td ng-repeat=\"field in sortedFieldsByCategory\">\n" +
    "\t\t\t\t<table-cell entity=\"entity\" field=\"field\"></table-cell>\n" +
    "\t\t\t</td>\n" +
    "\t\t</tr>\n" +
    "\t\t<tr ng-hide=\"entities.length > 0\">\n" +
    "\t\t\t<td colspan=\"{{ fields.length }}\" class=\"align-center\">{{'field.searchResults.noresults' | translate }}</td>\n" +
    "\t\t</tr>\n" +
    "\t</tbody>\n" +
    "</table>"
  );


  $templateCache.put('/konga/views/categorized_cascade-search-pane.html',
    "<div ng-repeat=\"category in categories\" ng-if=\"(fields | searchParams | filter:{ categories: category }).length > 0\">\n" +
    "\t<h4>{{ category | translate }}</h1>\n" +
    "\t<raw-input \n" +
    "\t\tproperty=\"field\"\n" +
    "\t\tvertical=\"true\" \n" +
    "\t\tsource-list=\"productCodes[field.name]\"\n" +
    "\t\tng-repeat=\"field in fields | searchParams | filter:{ categories: category } | orderBy:'priority.search'\"\n" +
    "\t\tentity=\"query\" \n" +
    "\t\tmetadata=\"entityMetadata\" \n" +
    "\t\ton-update=\"operations.updateField\"\n" +
    "\t\tmode=\"search\"\n" +
    "\t\tindex=\"$index\">\n" +
    "\t</raw-input>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/custom_tabbed-update.html',
    "<vertical-tabs>\n" +
    "\t<tab-content ng-repeat=\"fs in fieldsets\" title=\"{{fs.name | translate}}\" tab-id=\"fs.name\" is-show=\"true\">\n" +
    "\t\t<div ng-include=\"getView(fs.configuration.view)\"></div>\n" +
    "\t</tab-content>\n" +
    "</vertical-tabs>"
  );


  $templateCache.put('/konga/views/entity-details.html',
    "<p>This is the entity-details view.</p>\n"
  );


  $templateCache.put('/konga/views/entity-search.html',
    "<div class=\"wall\" ng-init=\"init()\">\n" +
    "\t<div class=\"entity-search\">\n" +
    "\t\t<div class=\"col-md-3 search-panel\" ng-class=\"filterClass\">\n" +
    "\t\t\t<search-pane \n" +
    "\t\t\t\t\tentity-metadata=\"entityMetadata\"\n" +
    "\t\t\t\t\tquery=\"query\"  \n" +
    "\t\t\t\t\ton-submit=\"submit\"\n" +
    "\t\t\t\t\ton-dispatch=\"dispatchSearchAction\">\n" +
    "\t\t\t</search-pane>\n" +
    "\t\t</div>\n" +
    "\t\t<div ng-class=\"{ 'col-md-9': !!filterOpened, 'col-md-12': !filterOpened }\">\n" +
    "\t\t\t<!-- ng-show=\"hideSearchSpiner\"> -->\n" +
    "\t\t\t<div class=\"row\">\n" +
    "\t\t\t\t<div class=\"col-md-12\">\n" +
    "\t\t\t\t\t<div class=\"col-md-3 quickSearchBox\" ng-show=\"paginationData[entityType].count > 0 || quickSearchEnabled\">\n" +
    "\t\t\t\t\t\t<div class=\"form-inline\">\n" +
    "\t\t\t\t\t\t\t<div class=\"form-group\" ng-repeat=\"quickSearchField in quickSearch\">\n" +
    "\t\t\t\t\t\t\t\t<div class=\"input-group margin-bottom\">\n" +
    "\t\t\t\t\t\t\t\t\t<div class=\"input-group-addon\" ng-click=\"toggleFilter()\" ng-class=\"{'text-warning': !filterOpened}\">\n" +
    "\t\t\t\t\t\t\t\t\t\t&nbsp;\n" +
    "\t\t\t\t\t\t\t\t\t\t<i class=\"glyphicon glyphicon-filter\"></i>\n" +
    "\t\t\t\t\t\t\t\t\t\t&nbsp;\n" +
    "\t\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" placeholder=\"{{quickSearchField.metadata.label | translate:quickSearchField.extra }}\" ng-model=\"quickSearchField.value\" ng-change=\"executeQuickSearch()\" id=\"quick-search-{{ quickSearchField.metadata.name }}\">\n" +
    "\t\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"col-md-3 form-inline numItemsBox\" ng-show=\"paginationData[entityType].count > 0\">\n" +
    "\t\t\t\t\t\t<div class=\"form-group\">\n" +
    "\t\t\t\t\t\t\t<label class=\"control-label font-normal\">\n" +
    "\t\t\t\t\t\t\t\t{{ 'message.pagination.results-per-page' | translate }}\n" +
    "\t\t\t\t\t\t\t</label>\n" +
    "\t\t\t\t\t\t\t<select class=\"form-control\" ng-model=\"paginationCount\" ng-change=\"paginationSubmit()\">\n" +
    "\t\t\t\t\t\t\t\t<!-- <option>10</option> -->\n" +
    "\t\t\t\t\t\t\t\t<option value=\"20\">20</option>\n" +
    "\t\t\t\t\t\t\t\t<option value=\"50\">50</option>\n" +
    "\t\t\t\t\t\t\t\t<option value=\"100\">100</option>\n" +
    "\t\t\t\t\t\t\t</select>\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"col-md-6 text-right\" ng-show=\"paginationData[entityType].count > 0\">\n" +
    "\t\t\t\t\t\t<div class=\"form-inline\">\n" +
    "\t\t\t\t\t\t\t<div class=\"form-group\">\n" +
    "\t\t\t\t\t\t\t\t{{ 'message.pagination.results' | translate:paginationData[entityType] }}\n" +
    "\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t<div class=\"form-group\">\n" +
    "\t\t\t\t\t\t\t\t<pagination boundary-links=\"true\" total-items=\"paginationData[entityType].count\" items-per-page=\"paginationData[entityType].limit\" max-size=\"4\" rotate=\"false\" ng-model=\"paginationData[entityType].offset\" ng-change=\"paginationSubmit()\" class=\"pagination-sm\" previous-text=\"&lsaquo;\" next-text=\"&rsaquo;\" first-text=\"&laquo;\" last-text=\"&raquo;\">\n" +
    "\t\t\t\t\t\t\t\t</pagination>\t\n" +
    "\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"row\">\n" +
    "\t\t\t\t<result-table entities=\"searchResults\" \n" +
    "\t\t\t\t\t\t\t\tentity-metadata=\"entityMetadata\" \n" +
    "\t\t\t\t\t\t\t\ton-update=\"operations.openEntityUpdate\" \n" +
    "\t\t\t\t\t\t\t\tpagination-data=\"paginationData[entityType]\"\n" +
    "\t\t\t\t\t\t\t\tpagination-update=\"paginationUpdate\"\n" +
    "\t\t\t\t\t\t\t\tfilter-code=\"quickSearchParams.value[codeField]\"\n" +
    "\t\t\t\t\t\t\t\ton-sorting=\"submitSorting\">\n" +
    "\t\t\t\t</result-table>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"row\">\n" +
    "\t\t\t\t<div class=\"col-md-12\">\n" +
    "\t\t\t\t\t<div class=\"col-md-6 text-right col-md-offset-6\" ng-show=\"paginationData[entityType].count > 0\">\n" +
    "\t\t\t\t\t\t<div class=\"form-inline\">\n" +
    "\t\t\t\t\t\t\t<div class=\"form-group\">\n" +
    "\t\t\t\t\t\t\t\t{{ 'message.pagination.results' | translate:paginationData[entityType] }}\n" +
    "\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t\t<div class=\"form-group\">\n" +
    "\t\t\t\t\t\t\t\t<pagination boundary-links=\"true\" total-items=\"paginationData[entityType].count\" items-per-page=\"paginationData[entityType].limit\" max-size=\"4\" rotate=\"false\" ng-model=\"paginationData[entityType].offset\" ng-change=\"paginationSubmit()\" class=\"pagination-sm\" previous-text=\"&lsaquo;\" next-text=\"&rsaquo;\" first-text=\"&laquo;\" last-text=\"&raquo;\">\n" +
    "\t\t\t\t\t\t\t\t</pagination>\t\n" +
    "\t\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"row chantier-btn-list\">\n" +
    "\t\t\t\t<div class=\"actions pull-right\">\n" +
    "\t\t\t\t\t<button class=\"btn btn-primary\" ng-click=\"operations.openEntityCreate(entityMetadata)\" ng-show=\"isCreateable\" id=\"create-entity\">\n" +
    "\t\t\t\t\t\t<i class=\"icon fa fa-plus\"></i>\n" +
    "\t\t\t\t\t\t{{ 'message.action.add' | translate }}\n" +
    "\t\t\t\t\t</button>\n" +
    "\t\t\t\t\t<button class=\"btn btn-default\" ng-repeat=\"action in entityMetadata.actions\" ng-model=\"action\" ng-click=\"dispatchSearchAction(action)\" ng-show=\"action.scope==='SEARCH' || action.scope==='RESULTS'\" id=\"search-action-dispatcher-{{ action.name }}\">\n" +
    "\t\t\t\t\t\t<i ng-class=\"action.icon\" ng-show=\"action.icon.length\"></i>\n" +
    "\t\t\t\t\t\t{{ action.label | translate }}\n" +
    "\t\t\t\t\t</button>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\n" +
    "\t\t<!-- TODO Uncomment -->\n" +
    "\t\t<!-- <div class=\"col-md-9 searchLoader\" ng-hide=\"hideSearchSpiner\">\n" +
    "\t\t\t<div class=\"png-spiner-container\"></div>\n" +
    "\t\t</div> -->\n" +
    "\t</div>\n" +
    "</div>\n" +
    "<div class=\"open-filters\" ng-if=\"entityMetadata.searchable !== null\" ng-show=\"!filterOpened\">\n" +
    "\t\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/entity-update.html',
    "<div class=\"wall\">\n" +
    "\t<div class=\"panel-body\">\n" +
    "\t\t<form ng-class=\"formStyle\" role=\"form\" name=\"entityUpdate\" novalidate>\n" +
    "\t\t\t<update-form entity=\"entity\" changes=\"changes\" metadata=\"entityMetadata\" params=\"params\" on-change=\"operations.changeEntityField\" on-update=\"operations.updateEntityField\" creating=\"creating\"></update-form>\n" +
    "\t\t\t<div class=\"pull-right update-btn-group\" ng-if=\"showActions\">\n" +
    "\t\t\t\t<button class=\"btn btn-default\" ng-repeat=\"action in entityMetadata.actions\" ng-model=\"action\" ng-click=\"operations.dispatchAction(action)\" ng-show=\"action.scope==='UPDATE'\" ng-disabled=\"action.scope!=='UPDATE'\" id=\"update-action-dispatcher-{{ action.name }}\">\n" +
    "\t\t\t\t\t\t\t{{ action.label | translate }}\n" +
    "\t\t\t\t</button>\n" +
    "\t\t\t\t<button type=\"submit\" class=\"btn btn-success\" ng-click=\"operations.dispatchEntityAction('save', params)\" ng-disabled=\"entityUpdate.$invalid || !changes.length || invalid || (entityMetadata.name==='Materiel' && !entity.validCtrOperat && entity.id != null) || customDisableValider || alreadyValidated\" id=\"save-entity\">\t\n" +
    "\t\t\t\t\t<i class=\"glyphicon glyphicon-ok\"></i>\n" +
    "\t\t\t\t\t{{ 'message.action.validate' | translate }}\n" +
    "\t\t\t\t</button>\n" +
    "\t\t\t\t<button class=\"btn btn-default\" ng-click=\"operations.cancelUpdate()\" id=\"cancel-update\">\n" +
    "\t\t\t\t\t<i class=\"glyphicon glyphicon-remove\"></i>\n" +
    "\t\t\t\t\t{{ 'message.action.cancel' | translate }}\n" +
    "\t\t\t\t</button>\n" +
    "\t\t\t\t<button class=\"btn btn-danger\" ng-click=\"operations.deleteEntity()\" ng-hide=\"deletable == false\" id=\"delete-entity\" ng-disabled=\"disabledDelete\">\n" +
    "\t\t\t\t\t<i class=\"glyphicon glyphicon-trash\"></i>\n" +
    "\t\t\t\t\t{{ 'message.action.delete' | translate }}\n" +
    "\t\t\t\t</button>\n" +
    "\t\t\t</div>\n" +
    "\t\t</form>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/file-input.html',
    "<div class=\"col-md-12 file-input\">\n" +
    "\t<button multiple=\"{{ property.multiplicity === 'MANY' }}\" ng-file-select ng-model=\"value.files\">\n" +
    "\t<i class=\"glyphicon glyphicon-open\"></i>\n" +
    "\t{{ 'field.file-input.upload' | translate }}\n" +
    "</button>\n" +
    "\n" +
    "<!-- TODO Include more stuff -->\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/footer.html',
    "<div class=\"container\">\n" +
    "\t<p>{{ 'message.common.footer' | translate }}</p>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/konga-content-plain.html',
    "<div class=\"konga-container plain-app\">\n" +
    "\t<div class=\"pwd text-center\">\n" +
    "        <h1>\n" +
    "            <i class=\"{{ (tabs | filter:{ id: tabId })[0].type }}\"></i>\n" +
    "            {{ (tabs | filter:{ id: tabId })[0].title | translate:tabExtra[tabId] }}\n" +
    "        </h1>\n" +
    "    </div>\n" +
    "\t<div ng-view></div>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/konga-content-tabs.html',
    "<div class=\"container\">\t\t\t\n" +
    "\t<div id=\"konga-nav-tabs\" class=\"container-fluid\">\n" +
    "\t\t<!--<div bs-tabs=\"tabs\" ng-model=\"tabs.activeTab\"></div>-->\n" +
    "\n" +
    "\t<tabset>\t\t\t    \n" +
    "\t    <tab ng-repeat=\"tab in tabs\" active=\"tab.active\" select=\"operations.redirectTo(tab)\">\n" +
    "\t    \t<tab-heading>\n" +
    "\t    \t\t<i ng-class=\"tab.type\"></i></span>\n" +
    "\t\t        <span class=\"tab-heading-title\">{{ tab.title | translate:tabExtra[tab.id] }}{{ tab.hasChanges ? '*' : '' }}\n" +
    "\t\t        <i class=\"glyphicon glyphicon-remove tab-close-btn\" ng-click=\"operations.closeTab(tab, false)\" ng-show=\"tab.closable\"></i></span>\n" +
    "\t\t    </tab-heading>\n" +
    "\t\t    \n" +
    "\t\t</tab>\n" +
    "\t</tabset>\n" +
    "\t<!-- Tab panes Container-->\n" +
    "\t<div class=\"view-container\">\n" +
    "\t\t<div ng-view></div>\n" +
    "\t</div>\n" +
    "\t</div><!-- End of navTab -->\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/konga-content.html',
    "<div ng-include=\"contentView\"></div>"
  );


  $templateCache.put('/konga/views/list-input.html',
    "<div class=\"list-input padding-cero\">\n" +
    "\t<div ng-if=\"paginate && filteredList.length > 10\">\n" +
    "\t\t<!-- ng-show=\"hideSearchSpiner\"> -->\n" +
    "\t\t<div class=\"row\">\n" +
    "\t\t\t<div class=\"col-md-4 form-inline position-pagination\" style=\"margin-top:10px\" ng-show=\"paginationData.count\">\n" +
    "\t\t\t\t<label class=\"control-label font-normal\">\n" +
    "\t\t\t\t\t{{ 'message.pagination.results-per-page' | translate }}\n" +
    "\t\t\t\t</label>\n" +
    "\t\t\t\t<select class=\"form-control\" ng-model=\"paginationData.limit\" ng-change=\"pageChanged()\">\n" +
    "\t\t\t\t\t<option>10</option>\n" +
    "\t\t\t\t\t<option>20</option>\n" +
    "\t\t\t\t\t<option>50</option>\n" +
    "\t\t\t\t</select>\n" +
    "\t\t\t</div>\n" +
    "\t\t\t<div class=\"col-md-6 text-right\" ng-show=\"paginationData.count\">\n" +
    "\t\t\t\t<div class=\"form-inline\">\n" +
    "\t\t\t\t\t<div class=\"form-group\">\n" +
    "\t\t\t\t\t\t<span class=\"total-items\">{{'message.pagination.results' | translate:paginationData }}</span>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t<div class=\"form-group\">\n" +
    "\t\t\t\t\t\t<pagination boundary-links=\"true\" total-items=\"paginationData.count\" items-per-page=\"paginationData.limit\" max-size=\"2\" rotate=\"false\" ng-model=\"paginationData.offset\" ng-change=\"paginationSubmit()\" class=\"pagination-sm\" previous-text=\"&lsaquo;\" next-text=\"&rsaquo;\" first-text=\"&laquo;\" last-text=\"&raquo;\"> </pagination>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "\t<div>\n" +
    "\t\t<table class=\"table table-striped\">\n" +
    "\t\t\t<thead>\n" +
    "\t\t\t\t<tr class=\"table-header\">\n" +
    "\t\t\t\t\t<th ng-repeat=\"field in fields\">\n" +
    "\t\t\t\t\t\t<table-header field=\"field\" showSorting=\"showSorting\" mode=\"update\"></table-header>\n" +
    "\t\t\t\t\t</th>\n" +
    "\t\t\t\t\t<th ng-show=\"actions && actions.length\">\n" +
    "\t\t\t\t\t\t<span>{{ 'field.list-input.actions' | translate }}</span>\n" +
    "\t\t\t\t\t</th>\n" +
    "\t\t\t\t\t\n" +
    "\t\t\t\t</tr>\n" +
    "\t\t\t</thead>\n" +
    "\t\t\t<tbody>\n" +
    "\t\t\t\t<tr ng-hide=\"filteredList.length > 0\">\n" +
    "\t\t\t\t\t<td colspan=\"{{ fields.length + 1 }}\" class=\"text-center no-results\">{{'field.searchResults.noresults' | translate }}</td>\n" +
    "\t\t\t\t</tr>\n" +
    "\t\t\t\t<tr ng-show=\"filteredList.length>0\" ng-repeat=\"entity in filteredList | filter:quickSearchParams.value\">\n" +
    "\t\t\t\t\t<!-- <td>\n" +
    "\t\t\t\t\t\t<div class=\"checkbox\">\n" +
    "\t\t\t\t\t\t  <label>\n" +
    "\t\t\t\t\t\t    <input id=\"checkbox.id-list-input\" type=\"checkbox\" ng-model=\"entity.selected\" ng-change=\"pageChanged()\" ng-disabled=\"disabledIds[entity.id]\">\n" +
    "\t\t\t\t\t\t  </label>\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t</td> -->\n" +
    "\t\t\t\t\t<td ng-repeat=\"field in fields\">\n" +
    "\t\t\t\t\t\t<table-cell entity=\"entity\" field=\"field\"></table-cell>\n" +
    "\t\t\t\t\t</td>\n" +
    "\t<!-- \t\t\t\t\t<table-cell entity=\"entity\" field=\"field\"></table-cell> -->\n" +
    "\t\t\t\t\t<td ng-show=\"actions && actions.length\">\n" +
    "\t\t\t\t\t\t<button class=\"btn btn-link no-button-styles\" ng-repeat=\"action in actions\" ng-click=\"dispatchFieldAction(action.name, {entity: entity})\" id=\"{{ fieldId + '-' + action.name }}\">\n" +
    "\t\t\t\t\t\t\t<i ng-class=\"action.icon\" ng-show=\"action.icon.length\"></i>\n" +
    "\t\t\t\t\t\t\t{{ action.label | translate }}\n" +
    "\t\t\t\t\t\t</button>\n" +
    "\t\t\t\t\t\t&nbsp;\n" +
    "\t\t\t\t\t</td>\n" +
    "\t\t\t\t</tr>\n" +
    "\t\t\t\t<tr ng-if=\"!disableField(mode, property)\">\n" +
    "\t\t\t\t\t<td colspan=\"{{ fields.length + 1 }}\" class=\"text-center\">\n" +
    "\t\t\t\t\t\t<button class=\"btn btn-link\" ng-click=\"dispatchFieldAction('add')\" id=\"{{ fieldId }}-add\">\n" +
    "\t\t\t\t\t\t\t<i class=\"glyphicon glyphicon-plus\"></i>\n" +
    "\t\t\t\t\t\t\t{{ 'message.action.add' | translate }}\n" +
    "\t\t\t\t\t\t</button>\n" +
    "\t\t\t\t\t</td>\n" +
    "\t\t\t\t</tr>\n" +
    "\t\t\t</tbody>\n" +
    "\t\t</table>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/loader.html',
    "<div class=\"loader\" ng-show=\"loading.length > 0\">\n" +
    "\t<div class=\"blocker\"></div>\n" +
    "\t<div class=\"loading\"></div>\n" +
    "\t<div class=\"message\">{{ loadingMessage }}</div>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/main.html',
    "\n" +
    "<!-- Alerts -->\n" +
    "<div class=\"alert-container\">\n" +
    "\t<alert ng-repeat=\"alert in alerts\" type=\"{{alert.type}}\" close=\"operations.removeAlert($index)\" ng-show=\"!alert.expired\" class=\"alert\">\n" +
    "\t\t{{alert.msg | translate:alert.parameters}}\n" +
    "\t</alert>\n" +
    "</div>\n" +
    "\n" +
    "<!-- TODO Include header -->\n" +
    "\n" +
    "<!-- Content -->\n" +
    "<div id=\"wrapper\">\n" +
    "\t<div id=\"content\" >\n" +
    "\t\t<konga-content></konga-content>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/modal.tpl.html',
    "<div class=\"modal\" tabindex=\"-1\" role=\"dialog\">\n" +
    "\n" +
    "  <!-- Dialog for the modal -->\n" +
    "  <div class=\"modal-dialog\">\n" +
    "\n" +
    "    <!-- Content for the modal -->\n" +
    "    <div class=\"modal-content\">\n" +
    "\n" +
    "      <!-- Header of the modal -->\n" +
    "      <div class=\"modal-header\" ng-show=\"modal.title\">\n" +
    "\n" +
    "        <!-- Close button -->\n" +
    "        <button id=\"modal-tpl-closeX\" type=\"button\" class=\"close\" ng-click=\"\">&times;</button>\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h4 class=\"modal-title\" ng-bind=\"modal.title\"></h4>\n" +
    "      </div>\n" +
    "\n" +
    "      <!-- Body -->\n" +
    "      <div class=\"modal-body\">\n" +
    "\n" +
    "        <!-- Include content -->\n" +
    "        <div ng-include=\"modal.contentUrl\"></div>\n" +
    "      </div>\n" +
    "\n" +
    "      <!-- Footer of the modal -->\n" +
    "      <div class=\"modal-footer\">\n" +
    "\n" +
    "        <!-- Close button -->\n" +
    "        <button type=\"button\" class=\"btn btn-default\" id=\"modal-save\" ng-click=\"modal.save();$hide()\">{{ 'message.action.validate' | translate }}</button>\n" +
    "        <button type=\"button\" class=\"btn btn-default\" id=\"modal-cancel\" ng-click=\"$hide()\">{{ 'message.action.cancel' | translate }}</button>\n" +
    "        \n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/multi-select-modal.html',
    "<!-- Multi select for modal views -->\n" +
    "<multi-select source-list=\"sourceList\" model=\"modal.temp\"></multi-select>"
  );


  $templateCache.put('/konga/views/multi-select.html',
    "<div class=\"multi-select\" ng-init=\"operations.init()\">\n" +
    "\t<div class=\"modal-header\" ng-show=\"true\">\n" +
    "\t    <!-- Close button -->\n" +
    "\t    <button id=\"multiselectModal.cancelX.id\" type=\"button\" class=\"close\" ng-click=\"multiselectModal.cancel()\">&times;</button>\n" +
    "\n" +
    "\t\t<div class=\"filter\">\n" +
    "\t\t\t<div class=\"form-inline\" ng-repeat=\"quickSearchItem in quickSearch\">\n" +
    "\t\t\t\t<div class=\"form-group\">\n" +
    "\t\t\t\t\t<!-- <label for=\"filter\" class=\"control-label col-md-4\">5 r�sultats</label> -->\n" +
    "\t\t\t\t\t<div class=\"col-md-12\">\n" +
    "\t\t\t\t\t\t<div class=\"input-group\">\n" +
    "\t\t\t\t\t\t  <span class=\"input-group-addon\">\n" +
    "\t\t\t\t\t\t  \t&nbsp;\n" +
    "\t\t\t\t\t\t  \t<i class=\"glyphicon glyphicon-filter\"></i>\n" +
    "\t\t\t\t\t\t  \t&nbsp;\n" +
    "\t\t\t\t\t\t  </span>\n" +
    "\t\t\t\t\t\t  <input type=\"text\" id=\"multi-select-filter\" class=\"form-control\" name=\"filter\" ng-model=\"quickSearchItem.value\" placeholder=\"{{quickSearchItem.metadata.label | translate:quickSearchItem.extra }}\" ng-change=\"executeQuickSearch()\" />\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\n" +
    "\t    <!-- Title -->\n" +
    "\t\t<h4 class=\"modal-title\">{{ 'message.multi-select.title' | translate }}</h4>\n" +
    "  \t</div>\n" +
    "\t<div class=\"col-md-5 multi-select-modal-body-item\">\n" +
    "\t\t<div class=\"multiselect-list list-group\" scroll-watcher>\n" +
    "\t\t\t<a class=\"list-group-item\"\n" +
    "\t\t\t\tng-repeat=\"item in sourceList | filter:filter.value | filter: {added: false} | orderBy: '+key'\"\n" +
    "\t\t\t\tng-click=\"operations.toggle(item, !item.selected)\"\n" +
    "\t\t\t\tng-dblclick=\"operations.toggle(item, true);operations.add()\"\n" +
    "\t\t\t\tng-class=\"{selected: item.selected}\">\n" +
    "\t\t\t\t<h5>\n" +
    "\t\t\t\t\t{{ item.key }} <small>{{ item.value | translate }}</small>\n" +
    "\t\t\t\t</h5>\n" +
    "\t\t\t</a>\n" +
    "\t\t\t<div class=\"loading-data\" ng-if=\"loading\">&nbsp;</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "\t<div class=\"col-md-2 multi-select-modal-body-item center\">\n" +
    "\t\t<div class=\"add-remove-btn\">\n" +
    "\t\t\t<button id=\"add-multi-select.id\" type=\"button\" class=\"btn btn-default\" ng-click=\"operations.add()\">\n" +
    "\t\t\t\t<i class=\"icon fa fa-chevron-right\"></i>\n" +
    "\t\t\t</button>\n" +
    "\t\t\t<button id=\"remove-multi-select.id\" type=\"button\" class=\"btn btn-default\" ng-click=\"operations.remove()\">\n" +
    "\t\t\t\t<i class=\"icon fa fa-chevron-left\"></i>\n" +
    "\t\t\t</button>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"add-remove-btn\">\n" +
    "\t\t\t<button id=\"addAll-button.id\" type=\"button\" class=\"btn btn-default bulk-option\" ng-click=\"operations.addAll()\">\n" +
    "\t\t\t\t<i class=\"icon icon-add-remove-all fa fa-chevron-right\"></i><i\n" +
    "\t\t\t\t\tclass=\"icon icon-add-remove-all fa fa-chevron-right\"></i>\n" +
    "\t\t\t</button>\n" +
    "\t\t\t<button id=\"removeAll-button.id\" type=\"button\" class=\"btn btn-default bulk-option\" ng-click=\"operations.removeAll()\">\n" +
    "\t\t\t\t<i class=\"icon icon-add-remove-all fa fa-chevron-left\"></i><i\n" +
    "\t\t\t\t\tclass=\"icon icon-add-remove-all fa fa-chevron-left\"></i>\n" +
    "\t\t\t</button>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "\t<div class=\"col-md-5 multi-select-modal-body-item\">\n" +
    "\t\t<div class=\"multiselect-list list-group\">\n" +
    "\t\t\t<a a class=\"list-group-item\"\n" +
    "\t\t\t\tng-repeat=\"item in sourceList | filter: {added: true} | orderBy: '+key'\"\n" +
    "\t\t\t\tng-click=\"operations.toggle(item)\" \n" +
    "\t\t\t\tng-dblclick=\"operations.toggle(item, true);operations.remove()\"\n" +
    "\t\t\t\tng-class=\"{selected: item.selected}\">\n" +
    "\t\t\t\t<h5>   \n" +
    "\t\t\t\t\t{{ item.key }} <small>{{ item.value | translate }}</small>\n" +
    "\t\t\t\t</h5>\n" +
    "\t\t\t</a>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "\t<div class=\"clear\">&nbsp;</div>\n" +
    "\t<div class=\"modal-footer\">\n" +
    "\t\t<!-- Close button -->\n" +
    "\t\t<button  type=\"button\" class=\"btn btn-success\" ng-click=\"multiselectModal.save()\" id=\"multi-select-save\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-ok\"></i>\n" +
    "\t\t\t{{ 'message.action.validate' | translate }}\n" +
    "\t\t</button>\n" +
    "\t\t<button  type=\"button\" class=\"btn btn-default\" ng-click=\"multiselectModal.cancel()\" id=\"multi-select-cancel\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-remove\"></i>\n" +
    "\t\t\t{{ 'message.action.cancel' | translate }}\n" +
    "\t\t</button>\n" +
    "\t\t\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/ng-view.html',
    "<div class=\"view-container\">\n" +
    "\t<div ng-view></div>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/option-input.html',
    "<p>This is the option-input view.</p>\n"
  );


  $templateCache.put('/konga/views/price-input.html',
    "<div class=\"input-group\">\n" +
    "  <input name=\"{{ property.name }}\" type=\"text\" class=\"form-control text-right\"\n" +
    "\tid=\"{{ fieldId }}\" placeholder=\"\" ng-model=\"inner.text\" ng-change=\"formatInput()\"\n" +
    " \tng-disabled=\"disableField(mode, property)\"\n" +
    "\tangular.module('konga') ng-required=\"validation.required()\" aria-describedby=\"{{fieldId}}_addon\">\n" +
    "  <span class=\"input-group-addon\" id=\"{{fieldId}}_addon\">&nbsp;<b>{{ currency }}&nbsp;</b></span>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/quantity-input.html',
    "<div class=\"input-group\">\n" +
    "\t<input type=\"number\" class=\"form-control text-right\" id=\"{{ fieldId }}\" placeholder=\"\" ng-model=\"value.text\" ng-disabled=\"disableField(mode, property)\" ng-pattern=\"validation.pattern()\" ng-required=\"validation.required()\" maxlength=\"{{ validation.maxlength() }}\" aria-describedby=\"{{ fieldId }}_addon\" step=\"{{ step }}\" konga-field-name=\"fieldId\" inputFormat>\n" +
    "\t<span class=\"input-group-addon\" id=\"{{ fieldId }}_addon\">&nbsp; {{ unit }} &nbsp;</span>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/raw-boolean-input.html',
    "<div class=\"radio-inline\">\n" +
    "\t<label for=\"{{ fieldId }}-true\">\n" +
    "\t\t<input name=\"{{ property.name }}\"type=\"radio\" name=\"{{property.name}}\" ng-value=\"true\" ng-model=\"value.text\" id=\"{{ fieldId }}-true\" ng-disabled=\"disableField(mode, property)\">\n" +
    "\t\t{{ true | activeInactive:property:mode | translate }}\n" +
    "\t</label>\n" +
    "</div>\n" +
    "<div class=\"radio-inline\">\n" +
    "\t<label for=\"{{ fieldId }}-false\">\n" +
    "\t\t<input type=\"radio\" name=\"{{property.name}}\" ng-value=\"false\" ng-model=\"value.text\" id=\"{{ fieldId }}-false\" ng-disabled=\"disableField(mode, property)\">\n" +
    "\t\t{{ false | activeInactive:property:mode | translate }}\n" +
    "\t</label>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/raw-calendar-input.html',
    "<calendar-input></calendar-input>"
  );


  $templateCache.put('/konga/views/raw-checkbox-input.html',
    "<div class=\"checkbox-inline\">\n" +
    "\t<label for=\"{{ fieldId }}-true\"> <input name=\"{{ property.name }}\"type=\"checkbox\" ng-value=\"true\" ng-model=\"value.active\" id=\"{{ fieldId }}-true\"> \n" +
    "\t\t{{ true | activeInactive:property | translate}}\n" +
    "\t</label>\n" +
    "</div>\n" +
    "<div class=\"checkbox-inline\">\n" +
    "\t<label for=\"{{ fieldId }}-false\"> <input name=\"{{ property.name }}\"type=\"checkbox\" ng-value=\"false\" ng-model=\"value.inactive\" id=\"{{ fieldId }}-false\">\n" +
    "\t\t{{ false | activeInactive:property | translate}}\n" +
    "\t</label>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/raw-color-input.html',
    "<input name=\"{{ property.name }}\" type=\"color\" class=\"form-control konga-form-search-input\" id=\"{{ fieldId }}\" placeholder=\"\" ng-model=\"value.text\" ng-disabled=\"disableField(mode, property)\" angular.module('konga') ng-required=\"validation.required()\" maxlength=\"{{ validation.maxlength() }}\">\n" +
    "<!-- TODO This is not working (yet) -->\n" +
    "<!-- ng-minlength=\"property.minLength\"\n" +
    "ng-maxlength=\"property.maxLength\" -->\n" +
    "<!-- <div class=\"input-group-addon bg-invalid\">\n" +
    "\t<button type=\"button\" class=\"btn btn-link\">\n" +
    "\t\t<i class=\"glyphicon glyphicon-remove text-bg-invalid\"></i>\n" +
    "\t</button>\n" +
    "</div> -->"
  );


  $templateCache.put('/konga/views/raw-combobox-input.html',
    "<button type=\"button\" class=\"btn btn-default combobox-button\" ng-model=\"value.text\" ng-disabled=\"disableField(mode, property)\" ng-required=\"validation.required()\" data-html=\"0\" bs-options=\"item.key as item.value | translate for item in value.list\" data-animation=\"am-flip-x\" data-placeholder=\"{{ 'combobox.placeholder' | translate }}\" bs-select ng-if=\"!multiple\">\n" +
    "\tAction <span class=\"caret\"></span>\n" +
    "</button>\n" +
    "<button type=\"button\" class=\"btn btn-default combobox-button\" ng-model=\"value.text\" ng-disabled=\"disableField(mode, property)\" ng-required=\"validation.required()\" data-html=\"0\" bs-options=\"item.key as item.value | translate for item in value.list\" data-multiple=\"{{ multiple }}\" data-animation=\"am-flip-x\" data-placeholder=\"{{ 'combobox.placeholder' | translate }}\" bs-select ng-if=\"multiple\">\n" +
    "\tAction <span class=\"caret\"></span>\n" +
    "</button>"
  );


  $templateCache.put('/konga/views/raw-complex-input.html',
    "<div class=\"complex-container\" ng-init=\"hideGlobalValidation()\">\n" +
    "\t<raw-input \n" +
    "\t\tproperty=\"field\"\n" +
    "\t\tvertical=\"true\" \n" +
    "\t\tng-repeat=\"field in value.fields\"\n" +
    "\t\tentity=\"entity[$parent.property.name]\"\n" +
    "\t\troot-entity=\"entity\" \n" +
    "\t\tmetadata=\"value.metadata\"\n" +
    "\t\troot-metadata=\"metadata\"\n" +
    "\t\ton-update=\"updateEntity\"\n" +
    "\t\ton-change=\"changeEntity\"\n" +
    "\t\tmode=\"{{mode}}\"\n" +
    "\t\tparent-field=\"$parent.property\"\n" +
    "\t\tcreating=\"creating\"\n" +
    "\t\tindex=\"index + $index\">\n" +
    "\t</raw-input>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/raw-css-input.html',
    "<div ng-class=\"value.text\"></div>"
  );


  $templateCache.put('/konga/views/raw-date-input.html',
    "<input name=\"{{ property.name }}\" id=\"{{ fieldId }}\" type=\"date\" placeholder=\"yyyy-MM-dd\" ng-model=\"value.text\" name=\"{{property.fieldName}}\"\n" +
    "\t\tclass=\"form-control\" ng-required=\"validation.required()\" ng-disabled=\"disableField(mode, property)\" value=\"{{ value.text }}\">\n" +
    "\n" +
    "<div class=\"validation\">\n" +
    "\t<div class=\"validation-invalid-date btn-danger\">\n" +
    "\t\t{{\t'message.field-validation.invalid-date' | translate }}\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/raw-date-search-input.html',
    "<div class=\"padding-cero\">\n" +
    "\t<label>{{ 'field.date-search.comparator' | translate }}</label>\n" +
    "\t<select name=\"comparator\" ng-model=\"value.date.comparator\"\n" +
    "\t\tclass=\"form-control\" ng-required=\"ngRequired\" id=\"{{ fieldId }}-comparator\">\n" +
    "\t\t<option value=\"LOWER_THAN\">{{ 'field.date-search.LOWER_THAN' | translate }}</option>\n" +
    "\t\t<option value=\"LOWER_EQUALS\">{{ 'field.date-search.LOWER_EQUALS' | translate }}</option>\n" +
    "\t\t<option value=\"EQUALS\">{{ 'field.date-search.EQUALS' | translate }}</option>\n" +
    "\t\t<option value=\"GREATER_EQUALS\">{{ 'field.date-search.GREATER_EQUALS' | translate }}</option>\n" +
    "\t\t<option value=\"GREATER_THAN\">{{ 'field.date-search.GREATER_THAN' | translate }}</option>\n" +
    "\t\t<option value=\"BETWEEN\">{{ 'field.date-search.BETWEEN' | translate }}</option>\n" +
    "\t</select>\n" +
    "</div>\n" +
    "<div class=\"padding-cero\">\n" +
    "\t<label for=\"{{ fieldId }}-dateSince\">{{ 'field.date-search.date' | translate }}</label>\n" +
    "\t<input name=\"{{ property.name }}\"type=\"date\" name=\"date-since\" ng-model=\"value.date.startDate\"\n" +
    "\t\tclass=\"form-control\" ng-required=\"ngRequired\" id=\"{{ fieldId }}-dateSince\"\n" +
    "</div>\n" +
    "<div class=\"padding-cero\" ng-show=\"value.date.comparator == 'BETWEEN'\">\n" +
    "\t<label for=\"{{ fieldId }}-dateTo\">{{ 'field.date-search.otherdate' | translate }}</label>\n" +
    "\t<input name=\"{{ property.name }}\"type=\"date\" name=\"to\" ng-model=\"value.date.endDate\"\n" +
    "\t\tclass=\"form-control\" ng-required=\"ngRequired\" id=\"{{ fieldId }}-dateTo\">\n" +
    "</div>\n" +
    "<!-- <div class=\"col-md-2 padding-cero\">\n" +
    "\t<button id=\"toggleDatePicker.id\" type=\"button\" class=\"btn btn-default\"\n" +
    "\t\tng-click=\"toggleDatePicker()\">\n" +
    "\t\t<i class=\"icon fa fa-ios7-calendar-outline\"></i>\n" +
    "\t</button>\n" +
    "</div> -->\n" +
    "<!-- <datepicker ng-model=\"value.text\" show-weeks=\"true\"\n" +
    "\tclass=\"well well-sm\" ng-show=\"datePicker.opened\"></datepicker> -->"
  );


  $templateCache.put('/konga/views/raw-datetime-input.html',
    "<div class=\"dropdown\">\n" +
    "  <a class=\"dropdown-toggle\" id=\"dropdown2\" role=\"button\" data-toggle=\"dropdown\" ng-disabled=\"disableField(mode, property)\" data-target=\"#\" href=\"#\">\n" +
    "    <div class=\"input-group\">\n" +
    "    \t<div class=\"input-datetimepicker\" ng-model=\"value.text\">\n" +
    "\t    \t<input name=\"{{ property.name }}\"id=\"{{ fieldId }}\" type=\"text\" class=\"form-control\" name=\"{{property.fieldName}}\"\n" +
    "\t\t\t\t\tplaceholder=\"dd/MM/yyyy HH:mm\" value=\"{{ value.text | date:'dd/MM/yyyy HH:mm' }}\" ng-required=\"validation.required()\" ng-disabled=\"disableField(mode, property)\">\n" +
    "\t\t\t<div></div>\n" +
    "    \t</div>\n" +
    "\t\t<div class=\"input-group-addon\">\n" +
    "\t\t\t<button type=\"button\" class=\"btn btn-link\" ng-disabled=\"disableField(mode, property)\"id=\"raw-input-dateHeure-releve-select\">\n" +
    "\t\t\t\t<i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "\t\t</div>\n" +
    "    </div>\n" +
    "  </a>\n" +
    "  <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dLabel\">\n" +
    "    <datetimepicker data-ng-model=\"value.text\" data-datetimepicker-config=\"{ dropdownSelector: '#dropdown2' }\" />\n" +
    "  </ul>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"validation\">\n" +
    "\t<div class=\"validation-invalid-date btn-danger\">\n" +
    "\t\t{{\t'message.field-validation.invalid-date' | translate }}\n" +
    "\t</div>\n" +
    "\t<div class=\"validation-required btn-danger\">{{\n" +
    "\t\t'message.field-validation.required' | translate }}\n" +
    "\t</div>\n" +
    "</div>\n"
  );


  $templateCache.put('/konga/views/raw-file-input.html',
    "<file-input></file-input>"
  );


  $templateCache.put('/konga/views/raw-image-input.html',
    "<!-- <input name=\"{{ property.name }}\"type=\"text\" class=\"form-control konga-form-search-input\" id=\"{{ fieldId }}\" placeholder=\"\" ng-model=\"value.text\" ng-disabled=\"disableField(mode, property)\" angular.module('konga') ng-required=\"validation.required()\" maxlength=\"{{ validation.maxlength() }}\"> -->\n" +
    "\n" +
    "<img ng-src=\"{{ value.text }}\" width=\"200\" />"
  );


  $templateCache.put('/konga/views/raw-input.html',
    "<div class=\"raw-input\" ng-hide=\"config.hidden\" ng-class=\"{ empty: config.init }\">\n" +
    "\t<div class=\"row form-group mode-{{ mode }} {{ parentField ? 'derived' : '' }} {{(isExtended) ? 'extended' : '' }} {{displayMode}}\">\n" +
    "\t\t<label class=\"col-xs-12 col-sm-12 col-md-6 col-lg-4\">\n" +
    "\t\t\t{{property.label | translate:extra }}\n" +
    "\t\t\t<strong class=\"required asterisk\" ng-if=\"validation.required()\">*</strong>\n" +
    "\t\t</label>\n" +
    "\t\t<div ng-class=\"{ 'derived': !!parentField, 'full-width-component': (['COMPLEX', 'TABLE', 'PICK_LIST', 'CALENDAR'].indexOf(property.fieldType[mode]) !== -1) }\" class=\"col-xs-12 col-sm-12 col-md-6 col-lg-8\">\n" +
    "\t\t\t<div ng-include=\"contentUrl\" ng-class=\"classFormInput\"></div>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"col-xs-12 col-sm-12 col-md-8 col-md-offset-6 col-lg-10 col-lg-offset-4\" ng-if=\"property.hint && config.showHint\">\n" +
    "\t\t\t<span class=\"text-muted\">{{ property.hint | translate:extra }}</span>\n" +
    "\t\t</div>\n" +
    "\t\t<div ng-if=\"globalValidation\" ng-hide=\"config.init\" class=\"col-xs-12 col-sm-12 col-md-8 col-md-offset-6 col-lg-10 col-lg-offset-4\">\n" +
    "\t\t\t<div class=\"validation-required text-danger\" ng-show=\"!validation.valid_required()\" >\n" +
    "\t\t\t\t<i class=\"glyphicon glyphicon-remove\"></i>\n" +
    "\t\t\t\t{{ 'message.field-validation.required' | translate:extra }}\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/raw-link-input.html',
    "<button class=\"btn btn-link\" ng-click=\"dispatchFieldAction('open-link')\" ng-init=\"hideGlobalValidation()\">\n" +
    "\t<i class=\"glyphicon glyphicon-plus\" ng-if=\"creating\"></i>\n" +
    "\t<i class=\"glyphicon glyphicon-pencil\" ng-if=\"!creating\"></i>\n" +
    "\t<span>{{ 'field.link.text' | translate }}</span>\n" +
    "</button>"
  );


  $templateCache.put('/konga/views/raw-list-input.html',
    "<div class=\"padding-cero\" ng-class=\"inLineClass.col1\">\n" +
    "\t<label for=\"{{ fieldId }}\">{{property.fieldLabel | translate:extra }}</label>\n" +
    "</div>\n" +
    "<div class=\"input-group\" ng-class=\"inLineClass.col3\">\n" +
    "\t<list-input fields=\"entityFields\" list=\"value.list\" eds-type=\"societe\" disabled-ids=\"[]\"></list-input>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "\t<div class=\"col-md-12\">\n" +
    "\t\t<button class=\"btn btn-default\" ng-click=\"openMultiSelect()\" id=\"{{ fieldId }}-add\">{{'message.action.add' | translate}}</button>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/raw-number-input.html',
    "<input name=\"{{ property.name }}\"type=\"number\"\n" +
    "\tclass=\"form-control konga-form-search-input konga-form-simple-search-input\"\n" +
    "\tid=\"{{ fieldId }}\" placeholder=\"\" ng-model=\"value.text\"\n" +
    " \tng-disabled=\"disableField(mode, property)\"\n" +
    "\tangular.module('konga') ng-required=\"validation.required()\" min=\"{{ validation.minvalue() }}\" max=\"{{ validation.maxvalue() }}\" tabindex=\"{{ (index + 1) * 12 }}\">"
  );


  $templateCache.put('/konga/views/raw-number-range-input.html',
    "<div class=\"padding-cero\">\n" +
    "\t<label>{{ 'field.number-range.comparator' | translate }}</label>\n" +
    "\t<select name=\"comparator\" ng-model=\"value.range.comparator\"\n" +
    "\t\tclass=\"form-control\" ng-required=\"ngRequired\" id=\"{{ fieldId }}-comparator\">\n" +
    "\t\t<option value=\"LOWER_THAN\">{{ 'field.number-range.LOWER_THAN' | translate }}</option>\n" +
    "\t\t<option value=\"LOWER_EQUALS\">{{ 'field.number-range.LOWER_EQUALS' | translate }}</option>\n" +
    "\t\t<option value=\"EQUALS\">{{ 'field.number-range.EQUALS' | translate }}</option>\n" +
    "\t\t<option value=\"GREATER_EQUALS\">{{ 'field.number-range.GREATER_EQUALS' | translate }}</option>\n" +
    "\t\t<option value=\"GREATER_THAN\">{{ 'field.number-range.GREATER_THAN' | translate }}</option>\n" +
    "\t\t<option value=\"BETWEEN\">{{ 'field.number-range.BETWEEN' | translate }}</option>\n" +
    "\t</select>\n" +
    "</div>\n" +
    "<div class=\"padding-cero\">\n" +
    "\t<label for=\"{{ fieldId }}-dateSince\">{{ 'field.number-range.number' | translate }}</label>\n" +
    "\t<input name=\"{{ property.name }}\" type=\"number\" name=\"from\" ng-model=\"value.range.from\"\n" +
    "\t\tclass=\"form-control\" ng-required=\"ngRequired\" id=\"{{ fieldId }}-dateSince\"\n" +
    "</div>\n" +
    "<div class=\"padding-cero\" ng-show=\"value.range.comparator == 'BETWEEN'\">\n" +
    "\t<label for=\"{{ fieldId }}-dateTo\">{{ 'field.number-range.othernumber' | translate }}</label>\n" +
    "\t<input name=\"{{ property.name }}\" type=\"number\" name=\"to\" ng-model=\"value.range.to\"\n" +
    "\t\tclass=\"form-control\" ng-required=\"ngRequired\" id=\"{{ fieldId }}-dateTo\">\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/raw-option-input.html',
    "<option-input></option-input>"
  );


  $templateCache.put('/konga/views/raw-password-input.html',
    "<input name=\"{{ property.name }}\"type=\"password\" class=\"form-control konga-form-search-input\" id=\"{{ fieldId }}\" placeholder=\"\" ng-model=\"value.text\" ng-disabled=\"disableField(mode, property)\" angular.module('konga') ng-required=\"validation.required()\" maxlength=\"{{ validation.maxlength() }}\" autocomplete=\"off\" ng-pattern=\"validation.pattern()\">"
  );


  $templateCache.put('/konga/views/raw-pick_list-input.html',
    "<div ng-init=\"hideGlobalValidation()\">\n" +
    "\t<list-input fields=\"value.fields\" actions=\"property.actions\"\n" +
    "\t\tlist=\"value.entity\" property=\"property\" metadata=\"metadata\"\n" +
    "\t\tdisabled-ids=\"[]\" dispatch-field-action='dispatchFieldAction'></list-input>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/raw-plain-input.html',
    "<input name=\"{{ property.name }}\" type=\"text\" class=\"form-control konga-form-search-input\" id=\"{{ fieldId }}\" placeholder=\"\" ng-model=\"value.text\" ng-disabled=\"disableField(mode, property)\" angular.module('konga') ng-required=\"validation.required()\" maxlength=\"{{ validation.maxlength() }}\" tabindex=\"{{ (index + 1) * 12 }}\" ng-pattern=\"validation.pattern()\">"
  );


  $templateCache.put('/konga/views/raw-price-input.html',
    "<price-input></price-input>\n" +
    "<div class=\"validation\">\n" +
    "\t<div class=\"validation-pattern btn-danger\">\n" +
    "\t\t{{ 'message.field-validation.pattern' | translate }}\n" +
    "\t</div>\n" +
    "\t<div class=\"validation-required btn-danger\">\n" +
    "\t\t{{ 'message.field-validation.required' | translate }}\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/raw-quantity-input.html',
    "<quantity-input></quantity-input>"
  );


  $templateCache.put('/konga/views/raw-select-input.html',
    "<select-input></select-input>\n" +
    "<div class=\"col-md-12\" ng-if=\"mode === 'search'\">\n" +
    "\t<div class=\"row\">\n" +
    "\t\t<button class=\"btn btn-default btn-xs\" ng-repeat=\"item in value.entity\" ng-click=\"removeItem($index)\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-remove\"></i>\n" +
    "\t\t\t{{ item | mapField:labelField | shortify:15 }}\n" +
    "\t\t\t{{ (item | mapField:labelField).length > 15 ? '...' : '' }}\n" +
    "\t\t</button>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/raw-switch-input.html',
    "<span class=\"raw-switch-input\">\n" +
    "\t<i class=\"fa\" ng-class=\"{ 'fa-toggle-on text-success': !!value.text, 'fa-toggle-off text-default': !value.text }\" ng-click=\"value.text = !value.text\"></i>\n" +
    "</span>"
  );


  $templateCache.put('/konga/views/raw-table-input.html',
    "<div class=\"col-md-12 padding-cero\" ng-class=\"inLineClass.col1\" ng-init=\"hideGlobalValidation()\">\n" +
    "\t<label for=\"{{ fieldId }}\">{{property.fieldLabel |\n" +
    "\t\ttranslate:extra }}</label>\n" +
    "</div>\n" +
    "<div class=\"col-md-12 padding-cero\" ng-class=\"inLineClass.col3\">\n" +
    "\t<table-input></table-input>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/raw-textarea-input.html',
    "<textarea \n" +
    "\ttype=\"text\"\n" +
    "\tclass=\"form-control konga-form-search-input konga-form-simple-search-input\"\n" +
    "\tid=\"{{fieldId}}\"\n" +
    "\tplaceholder=\"\"\n" +
    "\tng-model=\"value.text\"\n" +
    "\tng-disabled=\"disableField(mode, property)\"\n" +
    "\tangular.module('konga')\n" +
    "\tng-required=\"validation.required()\"\n" +
    "\trows=\"{{ property.validation.maxLength / 100 }}\">\n" +
    "</textarea>\n" +
    "\t<!-- TODO This is not working (yet) -->\n" +
    "\t<!-- ng-minlength=\"property.minLength\"\n" +
    "\tng-maxlength=\"property.maxLength\" -->\n" +
    "\n" +
    "<div class=\"validation\">\n" +
    "\t<div class=\"validation-pattern btn-danger\">\n" +
    "\t\t{{ 'message.field-validation.pattern' | translate }}\n" +
    "\t</div>\n" +
    "\t<div class=\"validation-required btn-danger\">\n" +
    "\t\t{{ 'message.field-validation.required' | translate }}\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/recursive-list-item.html',
    "<li>\n" +
    "\t<div>\n" +
    "\t\t<a href=\"\" ng-click=\"click(item)\">{{ item.label | translate }}</a>\n" +
    "\t\t<i class=\"text-success\" ng-class=\"{ 'glyphicon glyphicon-ok': item.selected && !item.children.length }\"></i>\n" +
    "\t\t<recursive-list list=\"item.children\" on-click-item=\"click\"></recursive-list>\n" +
    "\t</div>\n" +
    "</li>"
  );


  $templateCache.put('/konga/views/recursive-list.html',
    "<ul>\n" +
    "\t<recursive-list-item ng-repeat=\"item in list\" item=\"item\" on-click=\"clickItem\"></recursive-list-item>\n" +
    "</ul>"
  );


  $templateCache.put('/konga/views/result-table.html',
    "<div ng-include=\"contentUrl\" ng-init=\"init()\"></div>"
  );


  $templateCache.put('/konga/views/search-pane.html',
    "<div class=\"search-pane\" ng-init=\"init()\">\n" +
    "\t<div class=\"search-form\">\n" +
    "\t\t<h3>{{ 'message.search-filters.title' | translate }}</h3>\n" +
    "\t\t<form role=\"form\">\n" +
    "\t\t\t<div ng-include=\"contentUrl\"></div>\n" +
    "\t\t\t<div class=\"col-md-12 form-group mode-search\">\n" +
    "\t\t\t\t<div class=\"text-right\">\n" +
    "\t\t\t\t\t<button id=\"clear-search-pane.id\" type=\"button\" class=\"btn btn-default\" ng-click=\"operations.clear()\">\n" +
    "\t\t\t\t\t\t<i class=\"glyphicon glyphicon-remove\"></i>\n" +
    "\t\t\t\t\t\t{{'message.action.clean' | translate}}\n" +
    "\t\t\t\t\t</button>\n" +
    "\t\t\t\t\t<button id=\"submit-search-pane.id\" type=\"submit\" class=\"btn btn-success\" ng-click=\"operations.submit()\">\n" +
    "\t\t\t\t\t\t<i class=\"glyphicon glyphicon-ok\"></i>\n" +
    "\t\t\t\t\t\t{{'message.action.search' | translate}}\n" +
    "\t\t\t\t\t</button>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</form>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/select-input.html',
    "<div class=\"select-input {{(isExtended) ? 'extend' : 'non-extended'}}\" ng-class=\"{ disabled: disableSelect(property) }\" konga-select>\n" +
    "\t<div class=\"input-group {{ validation.required() ? 'required' : 'optional' }} {{ value.text.length ? 'valid' : 'invalid' }}\">\n" +
    "\t\t<input name=\"{{ property.name }}\" type=\"text\" class=\"konga-form-search-input form-control\" id=\"{{ fieldId }}-input\" ng-model=\"textinput\" ng-disabled=\"disableField(mode, property)\" angular.module('konga') ng-required=\"validation.required()\" ng-change=\"writeValue()\" typeahead=\"item.label for item in getElements($viewValue)\" typeahead-on-select=\"formatInput($item, $model, $label)\" tabindex=\"{{ (index + 1) * 12 }}\">\n" +
    "\t\t<div class=\"input-group-addon\">\n" +
    "\t\t\t<button type=\"button\" class=\"btn btn-link\" ng-disabled=\"disableField(mode, property)\"\n" +
    "\t\t\t\tng-click=\"dispatchFieldAction('open-select')\" id=\"{{ fieldId }}-select\">\n" +
    "\t\t\t\t<i class=\"glyphicon glyphicon-search\"></i>\n" +
    "\t\t\t</button>\n" +
    "\t\t\t<!-- <button type=\"button\" class=\"btn btn-link btn-bordered-left\" ng-show=\"showRemove(property)\" ng-click=\"removeField(property)\" id=\"{{ fieldId }}-remove\">\n" +
    "\t\t\t\t<i class=\"glyphicon glyphicon-remove\"></i>\n" +
    "\t\t\t</button> -->\n" +
    "\t\t</div>\n" +
    "\t</div>\n" +
    "\t<div class=\"col-md-6 complex-label\" ng-show=\"mode === 'update'\">\n" +
    "\t\t<span ng-show=\"label.length\">{{ label }}&nbsp;</span>\n" +
    "\t</div>\n" +
    "\t<div class=\"validation\">\n" +
    "\t\t<div class=\"validation-pattern btn-danger\">{{\n" +
    "\t\t\t'message.field-validation.pattern' | translate }}</div>\n" +
    "\t\t<div class=\"validation-required btn-danger\">{{\n" +
    "\t\t\t'message.field-validation.required' | translate }}</div>\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/single-select-modal.html',
    "<single-select source-list=\"sourceList\" model=\"modal.temp\"></single-select>"
  );


  $templateCache.put('/konga/views/single-select.html',
    "<div class=\"single-select\" ng-init=\"operations.init()\">\n" +
    "\t<div class=\"modal-header\" ng-show=\"true\">\n" +
    "\t\t<!-- Close button -->\n" +
    "\t\t<button id=\"singleselectModal.cancelX.id\" type=\"button\" class=\"close\" ng-click=\"singleselectModal.cancel()\">&times;</button>\n" +
    "\n" +
    "\t\t<!-- Filter -->\n" +
    "\t\t<!-- TODO Externalize -->\n" +
    "\t<div class=\"filter\">\n" +
    "\t\t\t<div class=\"form-inline\" ng-repeat=\"quickSearchItem in quickSearch\">\n" +
    "\t\t\t\t<div class=\"form-group\">\n" +
    "\t\t\t\t\t<!-- <label for=\"filter\" class=\"control-label col-md-4\">5 r�sultats</label> -->\n" +
    "\t\t\t\t\t<div class=\"col-md-12\">\n" +
    "\t\t\t\t\t\t<div class=\"input-group\">\n" +
    "\t\t\t\t\t\t  <span class=\"input-group-addon\">\n" +
    "\t\t\t\t\t\t  \t&nbsp;\n" +
    "\t\t\t\t\t\t  \t<i class=\"glyphicon glyphicon-filter\"></i>\n" +
    "\t\t\t\t\t\t  \t&nbsp;\n" +
    "\t\t\t\t\t\t  </span>\n" +
    "\t\t\t\t\t\t  <input  id=\"single-select-filter.id\" type=\"text\" class=\"form-control\" name=\"filter\" ng-model=\"quickSearchItem.value\" placeholder=\"{{quickSearchItem.metadata.label | translate:quickSearchItem.extra }}\" ng-change=\"executeQuickSearch()\" />\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\n" +
    "\t\t<!-- Title -->\n" +
    "\t\t<h4 class=\"modal-title\">{{ 'message.single-select.title' | translate }}</h4>\n" +
    "\t</div>\n" +
    "\t<div class=\"multiselect-list list-group\" scroll-watcher>\n" +
    "\t\t<a class=\"list-group-item\"\n" +
    "\t\t\tng-repeat=\"item in sourceList | filter:filter.value | orderBy: key\"\n" +
    "\t\t\tng-click=\"operations.toggle(item)\"\n" +
    "\t\t\tng-class=\"{selected: (item === selected)}\">\n" +
    "\t\t\t<h5>\n" +
    "\t\t\t\t{{ item.key }} <small>{{ item.value }}</small>\n" +
    "\t\t\t</h5>\n" +
    "\t\t</a>\n" +
    "\t\t<div class=\"loading-data\" ng-if=\"loading\">&nbsp;</div>\n" +
    "\t\t<div class=\"no-results\" ng-show=\"!loading && !sourceList.length\">{{ 'field.searchResults.noresults' | translate }}</div>\n" +
    "\t</div>\n" +
    "\t<div class=\"modal-footer\">\n" +
    "\t\t<!-- Close button -->\n" +
    "\t\t<button  type=\"button\" class=\"btn btn-success\" ng-click=\"singleselectModal.save()\" id=\"single-select-save\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-ok\"></i>\n" +
    "\t\t\t{{ 'message.action.validate' | translate }}\n" +
    "\t\t</button>\n" +
    "\t\t<button  type=\"button\" class=\"btn btn-default\" ng-click=\"singleselectModal.cancel()\" id=\"single-select-cancel\">\n" +
    "\t\t\t<i class=\"glyphicon glyphicon-remove\"></i>\n" +
    "\t\t\t{{ 'message.action.cancel' | translate }}\n" +
    "\t\t</button>\n" +
    "\t\t\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/tabbed-update-user.html',
    "<vertical-tabs>\n" +
    "\t<tab-content title=\"{{'category.informations.principales'| translate}}\">\n" +
    "\t\t<raw-input \n" +
    "\t\t\tproperty=\"field\"\n" +
    "\t\t\tvertical=\"true\"\n" +
    "\t\t\tsource-list=\"productCodes[field.name]\"\n" +
    "\t\t\tng-repeat=\"field in fields | updateParams:metadata:'category.informations.principales' | orderBy:'+priority.update'\" \n" +
    "\t\t\tentity=\"entity\" \n" +
    "\t\t\ton-update=\"onUpdate\"\n" +
    "\t\t\ton-change=\"onChange\"\n" +
    "\t\t\tmetadata=\"metadata\"\n" +
    "\t\t\tmode=\"update\"\n" +
    "\t\t\tcreating=\"creating\">\n" +
    "\t\t</raw-input>\n" +
    "\t</tab-content>\n" +
    "\t<tab-content title=\"{{'category.habilitations'| translate}}\">\n" +
    "\t\t<div>\n" +
    "\t\t\t<habilitations-user/>\n" +
    "\t\t</div>\n" +
    "\t</tab-content>\n" +
    "</vertical-tabs>"
  );


  $templateCache.put('/konga/views/tabbed-update.html',
    "<vertical-tabs>\n" +
    "\t<tab-content ng-repeat=\"fs in fieldsets\" title=\"{{fs.name | translate}}\" is-show=\"(fields | updateParams:metadata | filter: {category: cat}).length\">\n" +
    "\t\t<raw-input \n" +
    "\t\t\tproperty=\"field\"\n" +
    "\t\t\tvertical=\"true\"\n" +
    "\t\t\tsource-list=\"productCodes[field.name]\"\n" +
    "\t\t\tng-repeat=\"field in fields | updateParams:metadata:fs | orderBy:'+priority.update' | allowed:'update'\" \n" +
    "\t\t\tentity=\"entity\" \n" +
    "\t\t\ton-update=\"onUpdate\"\n" +
    "\t\t\ton-change=\"onChange\"\n" +
    "\t\t\tmetadata=\"metadata\"\n" +
    "\t\t\tmode=\"update\"\n" +
    "\t\t\tcreating=\"creating\"\n" +
    "\t\t\tindex=\"$index\">\n" +
    "\t\t</raw-input>\n" +
    "\t</tab-content>\n" +
    "</vertical-tabs>"
  );


  $templateCache.put('/konga/views/table-cell.html',
    "<div class=\"table-cell\" ng-class=\"styles\">\n" +
    "\t<span class=\"table-cell-content\" ng-show=\"type === 'text'\"></span>\n" +
    "\t<img ng-src=\"{{ content }}\" ng-if=\"type === 'image'\" width=\"{{ image.width }}\" height=\"{{ image.height }}\">\n" +
    "\t<div class=\"{{ content }}\" ng-if=\"type === 'styling'\"></div>\n" +
    "\t<div class=\"{{}}\" ng-if=\"type === 'plain-filtered'\">\n" +
    "\t\t{{ content | customFilter:filter }}\n" +
    "\t</div>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/table-header.html',
    "<div class=\"table-header {{ field.sortable ? 'sortable' : '' }}\" ng-class=\"styles\">\n" +
    "\t<span class=\"header-label\">{{ label | translate:{label: owner} }}</span>\n" +
    "\t<!-- <b ng-class=\"showSorting(field.sorting, true)\"><b ng-class=\"showSorting(field.sorting, false)\"></b></b> -->\n" +
    "\t<span class=\"sorting\" ng-if=\"field.sortable\" ng-hide=\"field.derived\">\n" +
    "\t\t<i class=\"select-sorting sorting-asc glyphicon glyphicon-chevron-up\" ng-click=\"sorting('asc')\" ng-class=\"{ active: sort === 'asc' }\"></i>\n" +
    "\t\t<i class=\"select-sorting sorting-desc glyphicon glyphicon-chevron-down\" ng-click=\"sorting('desc')\" ng-class=\"{ active: sort === 'desc' }\"></i>\n" +
    "\t</span>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/table-input.html',
    "<div class=\"table-input col-md-12 padding-cero\">\n" +
    "\t<div ng-if=\"!rows || !columns || rows.length === 0 || columns.length === 0\" class=\"col-md-12 text-center text-danger\">{{ 'message.table-input.not-yet-configured' | translate }}</div>\n" +
    "\t<table ng-if=\"rows.length > 0 && columns.length > 0\">\n" +
    "\t\t<!-- Horizontal category -->\n" +
    "\t\t<tr>\n" +
    "\t\t\t<!-- Separator -->\n" +
    "\t\t\t<th class=\"table-input-category-separator\">&nbsp;</th>\n" +
    "\n" +
    "\t\t\t<!-- Horizontal category -->\n" +
    "\t\t\t<th class=\"table-input-category horizontal\" colspan=\"{{ columns.length }}\">{{ configuration.xAxisProperty.label | translate }}</th>\n" +
    "\t\t</tr>\n" +
    "\n" +
    "\t\t<!-- Horizontal headers -->\n" +
    "\t\t<tr>\n" +
    "\t\t\t<!-- Vertical category -->\n" +
    "\t\t\t<th class=\"table-input-category vertical\">{{ configuration.yAxisProperty.label | translate }}</th>\n" +
    "\n" +
    "\t\t\t<th ng-repeat=\"column in columns\" class=\"table-input-header horizontal\">{{ column.value }}</th>\n" +
    "\t\t</tr>\n" +
    "\n" +
    "\t\t<!-- Data rows -->\n" +
    "\t\t<tr ng-repeat=\"row in rows\">\t\t\t\n" +
    "\t\t\t<!-- Vertical header -->\n" +
    "\t\t\t<th class=\"table-input-header vertical\">{{ row.value }}</th>\n" +
    "\n" +
    "\t\t\t<!-- Data -->\n" +
    "\t\t\t<td class=\"table-input-content\" ng-repeat=\"column in columns\">\n" +
    "\t\t\t\t<input type=\"number\" size=\"2\" step=\"any\" class=\"text-center hideArrows\" ng-repeat=\"step in steps | filter:getQueryObj(row, column):true\" ng-model=\"step[valueField]\" ng-class=\"{ invalid: step.$invalid }\" ng-change=\"updateValue(step)\" />\n" +
    "\t\t\t</td>\n" +
    "\t\t</tr>\n" +
    "\n" +
    "\t</table>\n" +
    "</div>"
  );


  $templateCache.put('/konga/views/vertical-tabs-element.tp.html',
    "<div class=\"tab-pane\" ng-show=\"selected\" ng-class=\"active\" ng-transclude></div>"
  );


  $templateCache.put('/konga/views/verticaltab.tp.html',
    "<div class=\"row tabbable\">\n" +
    "\t<ul class=\"nav nav-pills nav-stacked konga-nav-vertical col-xs-12 col-sm-12 col-md-4 col-lg-3\">\n" +
    "\t\t<li ng-repeat=\"tabContent in tabContentList\" ng-class=\"{active:tabContent.selected}\">\n" +
    "\t\t\t<a href=\"\" ng-click=\"select(tabContent)\">{{tabContent.title}}</a>\n" +
    "\t\t</li>\n" +
    "\t</ul>\n" +
    "\t<div class=\"tab-content col-xs-12 col-sm-12 col-md-8 col-lg-9\" ng-transclude></div>\n" +
    "</div>\n"
  );

}]);
