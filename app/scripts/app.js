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
  'ui.calendar',
  'ngFileUpload'
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
}])
.run(['$location', 'util', '$rootScope', '$timeout', 'customActions', function($location, util, $rootScope, $timeout, customActions) {
  var path = $location.path();
  var init = false;
  var searchPath = /^\/?(entity)\/(.*)\/(search)\/?$/;
  var createPath = /^\/?(entity)\/(.*)\/(new)\/?$/;
  var updatePath = /^\/?(entity)\/(.*)\/(.*)\/?$/;
  if(path !== '/') {
    $location.path('/');
    $rootScope.$on('metadata-ready', function(evt, data) {
      if($rootScope.operations) {
        loadPermalinks();
      }
      else {
        $timeout(function() {
          loadPermalinks();
        }, 50);
      }
    });

    // Listen to path changes (for history)
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
      var opTriggered = $rootScope.operationTriggered;
      $rootScope.operationTriggered = false;
      if(opTriggered) {
        return;
      }

      $rootScope.autoload = true;

      var ok = false;
      for(var i=0; i<$rootScope.tabs.length; i++){
        if ($rootScope.tabs[i].href === $location.path()) {
          ok = true;
          $rootScope.operations.redirectTo($rootScope.tabs[i]);
          break;
        }

        if(!ok && init) {
          path = $location.path();
          loadPermalinks();
        }
      }
    });

    function loadPermalinks() {
      var entity = path.split('/')[2];
      if(path.match(searchPath)) {
        $rootScope.operations.openEntitySearch(entity);
      }
      else if(path.match(createPath)) {
        $rootScope.operations.openEntityCreate(entity);
      }
      else if(path.match(updatePath)) {
        var metadata = util.getMetadata(entity);
        var idField = util.getEntityId(metadata, null, true);
        var obj = {};
        obj[idField] = path.split('/')[3];
        $rootScope.operations.openEntityUpdate(entity, obj);
      }
      else {
        // Is there any custom action with that href?
        var actionDispatched = false;
        for(var actionName in customActions) {
          var action = customActions[actionName];
          if(action.type === util.constants.ACTION_TYPE_TAB) {
            var href = action.params ? action.params.href : null;

            if(href === path) {
              actionDispatched = true;
              $rootScope.operations.dispatchAction({ name: actionName });
              break;
            }
          }
        }

        if(!actionDispatched) {
          $location.path(path);
        }
      }

      init = true;
    }
  }
}]);