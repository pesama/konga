'use strict';

/**
 * @ngdoc overview
 * @name index
 * @description
 * #Overview
 * This is the documentation of the <b>NGE's New Sigma</b> UI project. Along these pages you should find enough information to understand the source code, and continue with interface's development. Below you will find a general description of the project with all the main stuff it uses defined, so if it's your first time here, go ahead and take a look to this page, it'd guide you through all the documentation.
 *
 * 
 * # Scope
 * The scope of this documentation contains all source code from the Angular-based UI Application. Other parts of the application, and the logic, methodology and processes, are documented elsewhere. Yet, you will see some other parts referenced many times. 
 * Some of the projects that exist, that may be referenced from within this documentation, are briefly described below.
 *
 * ## Technical specification
 * There's a document called <i>NGE Developer Guide</i> (accesible <a href="NGE_DEV_GUIDE">here</a>), that contains all technical specifications for both server and client's side, as well as the project methodology. Please refer to that document for understanding how we work.
 *
 * 
 * ## Common model and metadata
 * This project is a form generator, that uses a common model shared by a REST service which this application uses for consuming and managing data. So this project <b>needs</b> such REST service to know what the UI is intended to do with the data it receives. `TODO Link sigma-api`
 *
 * ## Metadata
 * The service menctioned above contains an operation, called `metadata`, whose purpose is to give the UI information about the entities from the common model it needs to manage. Via annotation descriptions, and a reflective generation engine, all entities that belong to the common model are shared to the UI on the application launching process, and the UI handles the data, providing pages for managing such entities. You can see more information on the technical specification. `TODO Link sigma-model`
 *
 * # Structure
 * This documentation is structured in many parts. The first vertical level comprehends modules, and this sytem has two modules.
 * 
 * ## {@link sigmaNgApp `sigmaNgApp`}
 * This module contains all the system, and the logic involved. It consists on several dependencies:
 *
 * ### Controllers
 * {@link sigmaNgApp.MainCtrl `MainCtrl`}: Controls all the application and provides tab management, notifications and loading processes.
 * <br />
 * {@link sigmaNgApp.HomeCtrl `HomeCtrl`}: Binds favorite management, and controls all metadata service calls.
 * <br />
 * {@link sigmaNgApp.controller:EdsSearchCtrl `EdsSearchCtrl`}: Used for searching entities.
 * <br />
 * {@link sigmaNgApp.controller:UpdateEdsCtrl `UpdateEdsCtrl`}: Used for updating entities and creating new ones.
 * <br />
 * {@link sigmaNgApp.controller:MultiSelectCtrl `MultiSelectCtrl`}: Handles all multi select form fields.
 * <br />
 * {@link sigmaNgApp.controller:SingleSelectCtrl `SingleSelectCtrl`}: Handles all single select form fields.
 *
 * ### Directives
 * {@link sigmaNgApp.directive:rawInput `raw-input`}: Generates a form field that changes its aspect depending on the data type.
 * <br />
 * {@link sigmaNgApp.directive:resultTable `result-table`}: Renders a table with information about entity search results.
 * <br />
 * {@link sigmaNgApp.directive:searchPane `search-pane`}: Creates a form with search mode, for modifying entity search criteria.
 *
 * ### Filters
 * {@link sigmaNgApp.filter:mapEdsField `map-eds-field`}: Reads the value of an entity property, given its path.
 * <br />
 * {@link sigmaNgApp.filter:onlyCodeEds `only-code-eds`}: Receives an array of entities and returns its codes. `TODO Change`.
 * <br />
 * {@link sigmaNgApp.filter:onlyIdEds `only-id-eds`}: Receives an array of entities and returns its ids.
 * <br />
 * {@link sigmaNgApp.filter:searchParams `search-params`}: Receives an entity metadata information and returns an array of fields, that can be used to query for entities of that type.
 * <br />
 * {@link sigmaNgApp.filter:updateParams `update-params`}: Receives an entity metadata information and returns an array of fields, for modifying the entity.
 * 
 * ### Services
 * {@link sigmaNgApp.Api `api`}: Used to query for entities.
 * <br />
 * {@link sigmaNgApp.Common `common`}: Used to store common information used all across the application.
 * <br />
 * {@link sigmaNgApp.FieldMapper `field-mapper`}: Used for updating an entity when a field value changes on a form.
 * <br />
 * {@link sigmaNgApp.Metadata `metadata`}: Used to receive metadata information about the entities involved in the application.
 * <br />
 * {@link sigmaNgApp.Scaffold `scaffold`}: Used to create new entities based on the metadata definition of its type.
 *
 * ## {@link sigmaTools `sigmaTools`}
 * 
 * {@link sigmaTools.constants}: Provides constants for using them in the application.
 * <br />
 * {@link sigmaTools.util}: Common methods for using them in the application.
 * 
 */

/**
 * @ngdoc overview
 * @name sigmaNgApp
 * @module sigmaNgApp
 * @description
 * #New Sigma UI
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
var sigmaNgApp = angular
  .module('sigmaNgApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'pascalprecht.translate',
    'dialogs.main',
  ])
  .run(['$route', function ($route) {
      $route.reload();
    }
  ])
  .config(['$httpProvider',  function($httpProvider) {
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];

      /* Register error provider that shows message on failed requests or redirects to login page on
       * unauthenticated requests 
       */
      $httpProvider.interceptors.push(function ($q, $rootScope, $location) {
        return {
          responseError: function (rejection) {
            var status = rejection.status;
            var config = rejection.config;
            var method = config.method;
            var url = config.url;
      
            if (status == 401) {
              $location.path( '/login/' );
            } else {
              $rootScope.error = method + ' on ' + url + ' failed with status ' + status;
            }
              
            return $q.reject(rejection);
          }
        };
      });

      /* Registers auth token interceptor, auth token is either passed by header or by query parameter
       * as soon as there is an authenticated user */
      $httpProvider.interceptors.push(function ($q, $rootScope, $location, Session, $cookieStore) {
          return {
            request: function(config) {
              var authTokenCookie = $cookieStore.get('authToken');
              var authTokenSession = Session.data.authToken;
              if (authTokenCookie || authTokenSession) {
                var authToken = authTokenCookie || authTokenSession;
//                if (exampleAppConfig.useAuthTokenHeader) {
                  config.headers['X-Auth-Token'] = authToken;
//                } else {
//                  config.url = config.url + "?token=" + authToken;
//                }
              }
              return config;
            }
          };
      });
    }
  ])
  .config(['$routeProvider', function($routeProvider) {
      // Configure routes
      $routeProvider.when('/home/', {
          templateUrl: 'views/home.html',
          controller: 'HomeCtrl',
          restricted: true
        })
        .when('/entity/:entityType/search/', {
          templateUrl: 'views/entity-search.html',
          controller: 'EntitySearchCtrl',
          restricted: true
        })
        .when('/ctrOperat/:entityType/:entityId/', {
          templateUrl: 'views/ctr-operat-update.html',
          controller: 'CtroperatcreateCtrl',
          restricted: true
        })
        .when('/entity/:entityType/:entityId/', {
          templateUrl: 'views/entity-update.html',
          controller: 'EntityUpdateCtrl',
          restricted: true
        })
        .when('/ctrOperatChoix/', {
          templateUrl:'views/ctr-operat-choix.html',
          controller: 'CtrOperatChoixCtrl',
          restricted: true
        })
        .when('/login/', {
          templateUrl:'views/login.html',
          controller: 'LoginCtrl'
        })
        .otherwise({
        	templateUrl: 'views/empty.html',
        	controller: 'GoHomeCtrl',
        	restricted: true
        });

    // Enable HTML5 route mode (if available)
    // $locationProvider.html5Mode(true);
    }
  ])
  .config(['$translateProvider', function($translateProvider) {

      $translateProvider.useStaticFilesLoader({
        prefix: '/locale/messages_',          						//local
       // prefix: '/sigma-ihm/locale/messages_',					//serve
        suffix: '.json'
      });

      // Setting up french as default
      $translateProvider.preferredLanguage('fr');
    }
  ]);

angular.module('sigmaNgApp').provider('sigmaNGELogProvider', function () {
    this.$get = function () {
        return {
            sigmaNGELog: function ($log) {
                $log.enabledContexts = [];

                $log.getInstance = function (controllerName, entityType) {
                    return {
                        log: buildLogging($log.log, controllerName, entityType),
                        info: buildLogging($log.info, controllerName, entityType),
                        warn: buildLogging($log.warn, controllerName, entityType),
                        debug: buildLogging($log.debug, controllerName, entityType),
                        error: buildLogging($log.error, controllerName, entityType),
                        enableLogging: function (enable) {
                            $log.enabledContexts[controllerName + entityType] = enable;
                        }
                    };
                };

                function buildLogging(loggingFunc, controllerName, entityType) {
                    return function () {
                        var logEnabled = $log.enabledContexts[controllerName + entityType];
                        if (logEnabled === undefined || logEnabled) {
                            var modifiedArguments = [].slice.call(arguments);
                            modifiedArguments[0] = (new Date()).toUTCString() + ': [' + controllerName + '] [' + entityType + ']: ' + modifiedArguments[0];
                            loggingFunc.apply(null, modifiedArguments);
                        }
                    };
                }
            }
        };
    };
});

sigmaNgApp.run(['$log', 'sigmaNGELogProvider', function ($log, sigmaNGELogProvider) {
	sigmaNGELogProvider.sigmaNGELog($log);
}]);