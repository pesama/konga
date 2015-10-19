'use strict';

/**
 * @ngdoc overview
 * @name index
 * @description
 *
 * <img src="http://konga.io/wp-content/uploads/2015/03/konga-logo.png">
 *
 * # konga ui
 * Welcome to `ui.konga` documentation! Hope you like how we arranged everything. Otherwise please let us know!
 * Remember that you can go anytime to http://konga.io for more abstract reading.
 *
 * ## What does Konga offer me?
 * konga is an Angular-powered application engine, that relies on metadata definitions for creating a whole application context that defines CRUD forms over your defined entities. It enhances native components and also gives you a full set of rich ui components for data management and other handy stuff.
 *
 * ### Metadata management
 * You can use konga to generate the administration pane of your web project automatically, by just defining its entities and their metadata.
 * 
 * Take a look to the {@link DataTypes.Metadata `metadata`}, {@link DataTypes.Entity `entity`} and {@link DataTypes.Field `field`} definitions to see all information you can assign to your entities.
 * For generating your own metadata, go to the {@link http://docs.konga.io/metadata `metadata.konga`} project's documentation.
 *
 * ### Customization
 * konga-powered apps are, in essence, Angular-powered apps. Therefore, you can use every angular feature within a konga project. 
 every app starts with your custom <b>HomeCtrl</b>. There you can define where do you want to use konga automation features and where not to. Furthermore, konga gives you customization entry points via its {@link ui.konga.actionManager `action-driven-framework`} everywhere. 
 *
 * ### Step-by-step tutorial
 * TODO
 *
 * ## Installation
 *
 * You can install <b>ui.konga</b> in your existing project via _bower_.
 * ```
 * bower install ui.konga --save
 * ```
 * 
 * Then go to the {@link ui.konga.configuration `Configuring your app`} section to prepare your application to be launched. 
 *
 * ### From scratch
 *
 * If you want to start a project from scratch, it's easier to use _Yeoman_ and the *generator-konga*:
 * ```
 * npm install -g yo generator-konga
 * yo konga
 * ```
 * 
 * This option will create a full _Angular_ scaffolding (it's based on _generator-angular_) with all custom Konga folders, some sample content, and a bunch of building tools to launch, deploy and publish your brand new Konga app.
 * 
 * If you follow this method, you should be directly able to launch the application by typing `grunt serve`.
 * 
 * ## Building
 * 
 *
 * 
 */

 /**
 * @ngdoc overview
 * @name ui.konga
 * @module ui.konga
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
 * `ui.konga` contains several components, that build the application and all its parts.
 * 
 * ### Controllers
 * 
 * * {@link ui.konga.controller:EntitySearchCtrl `entity-search`}: This controller builds-up a standard {@link ui.konga.directive:searchPane search pane} with all fields configured in the metadata to be <i>searchable</i>. It also appends a {@link ui.konga.directive:resultTable result table} with the search results (having as columns every one declared to be <i>shown in results</i>).
 * * {@link ui.konga.controller.EntityUpdateCtrl `entity-update`}: This controller builds-up a standard {@link ui.konga.directive:updateForm update form} with all fields configured in the metadata to be <i>shown in update</i>.
 *
 * #### Component controllers
 *
 * * {@link ui.konga.controller.MultiSelectCtrl multi-select}: Controls all processes for the multi-select UI component. <b>TODO</b> Move to a directive, and `deprecate`.
 * * {@link ui.konga.controller.SingleSelectCtrl single-select}: Controls all processes for the single-select UI component. <b>TODO</b> Move to a directive, and `deprecate`.
 *
 *
 * ### Directives
 * 
 * #### Form directives
 * 
 * * {@link ui.konga.directive:searchPane `search-pane`}: Creates a search pane with all the fields configured to be <i>searchable</i>.
 * * {@link ui.konga.directive:resultTable `result-pane`}: Creates a result table with all fields configured to be <i>shown in results</i>.
 * * {@link ui.konga.directive:updateForm `update-form`}: Creates a form with all fields configured to be <i>shown in update</i>.
 *
 * #### Component directives
 *
 * * {@link ui.konga.directive:rawInput `raw-input`}: Creates a form field that changes it's appearance depending on the field type.
 * * {@link ui.konga.directive:listInput `list-input`}: Creates a list to render a complex field.
 * * {@link ui.konga.directive:tableHeader `table-header`}: Creates a header for a table column.
 * * {@link ui.konga.directive:tableCell `table-cell`}: Creates a cell for a table.
 * * {@link ui.konga.directive:kongaSelect `konga-select`}: Provides functionality to the `single-select` and `multi-select` components.
 *
 * #### Util directives
 * 
 * * {@link ui.konga.directive:scrollWatcher `scroll-watcher`}: Provides a method for listening to scroll changes on the target UI component.
 *
 * #### Misc directives
 *
 * * {@link ui.konga.directive:menu `menu`}: Renders a menu for the application (i.e. navbar).
 * * {@link ui.konga.directive:menuItem `menu-item`}: Renders a menu item.
 * * {@link ui.konga.directive:formInfo `form-info`}: Creates a component that displays basic data for the entity being shown in update mode.
 *
 *
 * ### Filters
 *
 * * {@link ui.konga.filter:mapEdsField `map-eds-field`}: Receives an entity and a field metadata definition, and returns the value of such field within the entity. 
 * * {@link ui.konga.filter:quickSearch `quick-search`}: Returns the fields within an entity definition configured to be used as <i>quick search</i> fields.
 * * {@link ui.konga.filter:searchParams `search-params`}: Returns all fields from a entity metadata definition configured to be <i>searchable</i>
 * * {@link ui.konga.filter:resultParams `result-params`}: Returns all fields from a entity metadata definition configured to be <i>shown in results</i>
 * * {@link ui.konga.filter:updateParams `update-params`}: Returns all fields from a entity metadata definition configured to be <i>shown in updates</i>
 * * {@link ui.konga.filter:selectData `select-data`}: Receives a set of entities, and returns the same list but with only the fields required for a single-select or multi-select.
 * * {@link ui.konga.filter:shortify `shortify`}: Receives an String and a length, and returns a substring of that length.
 * * {@link ui.konga.filter:tableRendererComplex `table-renderer-complex`}: Serializes a complex field to be shown in a table cell.
 * * {@link ui.konga.filter:translateComplex `translate-complex`}: Configures a complex field to be translated using standard `translate` filter. 
 *
 *
 * ### Services
 *
 * * {@link ui.konga.actionManager `action-manager`}: Defines and controls all available actions to dispatch from the application. <b>TODO</b> extract the action definitions elsewhere.
 * * {@link ui.konga.Api `api`}: Connects the UI with the REST services that handle the information.
 * * {@link ui.konga.Common `common`}: Stores stuff that's accessible all across the application.
 * * {@link ui.konga.configurationManager `configuration-manager`}: Handles all configuration for the application (defined via metadata).
 * * {@link ui.konga.fieldMapper `field-mapper`}: Helps mapping a field's value into a given entity. 
 * * {@link ui.konga.metadata `metadata`}: Connects to the metadata REST service to receive all application definition.
 * * {@link ui.konga.permissionManager `permission-manager`}: Handles the permissions for the application.
 * * {@link ui.konga.Scaffold `scaffold`}: Builds-up new entities for creating, and queries for searching.
 *
 */

/**
 * @ngdoc overview
 * @name ui.konga
 * @module ui.konga
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
angular.module('ui.konga', [
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
  'angularFileUpload',
  'ui.bootstrap-slider'
])

  .run(['$route', function ($route) {
      $route.reload();
    }
  ])
  
  .config(['$httpProvider',  function($httpProvider) {
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
      
      // /* Register error provider that shows message on failed requests or redirects to login page on
      //  * unauthenticated requests 
      //  */
      // $httpProvider.interceptors.push(function ($q, $rootScope, $location) {
      //   return {
      //     responseError: function (rejection) {
      //       var status = rejection.status;
      //       var config = rejection.config;
      //       var method = config.method;
      //       var url = config.url;
      
      //       if (status == 401) {
      //         $location.path( '/login/' );
      //       } else {
      //         $rootScope.error = method + ' on ' + url + ' failed with status ' + status;
      //       }
              
      //       return $q.reject(rejection);
      //     }
      //   };
      // });

  //     /* Registers auth token interceptor, auth token is either passed by header or by query parameter
  //      * as soon as there is an authenticated user */
  //     $httpProvider.interceptors.push(function ($q, $rootScope, $location, Session, $cookieStore) {
  //         return {
  //           request: function(config) {
  //             // Configure encoding
  //             // TODO Improve
  //             if(!config.file) {
  //               config.headers['Content-Type'] = 'application/json';
  //             }

  //             var authTokenCookie = $cookieStore.get('authToken');
  //             var authTokenSession = Session.data.authToken;
  //             if (authTokenCookie || authTokenSession) {
  //               var authToken = authTokenCookie || authTokenSession;
  // //                if (exampleAppConfig.useAuthTokenHeader) {
  //                 config.headers['X-Auth-Token'] = authToken;
  // //                } else {
  // //                  config.url = config.url + "?token=" + authToken;
  // //                }
  //             }
  //             return config;
  //           }
  //         };
  //    });
    }
  ])
  .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
      // Configure routes
      $routeProvider
        .when('/entity/:entityType/search/', {
          templateUrl: '/views/entity-search.html',
          controller: 'EntitySearchCtrl'
        })
        .when('/entity/:entityType/:entityId/', {
          templateUrl: '/views/entity-update.html',
          controller: 'EntityUpdateCtrl'
        })
    }
  ])
  .config(['$translateProvider', 'ENV', function($translateProvider, ENV) {

      $translateProvider.useStaticFilesLoader({
        prefix: '/locale/messages_',
        suffix: '.json'
      });

      // Setting up spanish as default
      $translateProvider.preferredLanguage('es');
      moment.locale('es');
    }
  ]);