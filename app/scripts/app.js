'use strict';

/**
 * @ngdoc overview
 * @name index
 * @description
 * #Overview
 * This is the documentation of the <b>NGE's New Sigma</b> UI project. Along these pages you should find enough information to understand the source code, and continue with interface's development. Below you will find a general description of the project with all the main stuff it uses defined, so if it's your first time here, go ahead and take a look to this page, it'd guide you through all the documentation.
 *
 * ## Dependencies
 * 
 * ### Konga UI {@link kongaUI `API Documentation`}
 *
 * Konga UI is the User Interface Builder for <b>Konga Engine</b>. It provides standard functionality to build fully functional forms using the metadata provided by `Konga Metadata`. In addition, it provides access points to extend standard behavior, or to use completely custom functionality. 
 *
 * ### Konga UI Tools {@link kongaUITools `API Documentation`}
 *
 * This module contains tools and other useful methods for managing the data and contextualize the applications. <b>TODO</b> Move to AngularUI constants and `deprecate`.
 *
 * ### sigmaNgApp {@link sigmaNgApp `API Documentation`}
 * 
 * This is the main source package of the project. It contains all custom behavior implemented to override Konga's standard, and connects all stuff together so the application is functional and compliant with the specification. 
 *
 * 
 */

 /**
 * @ngdoc overview
 * @name kongaUI
 * @module kongaUI
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
 * `kongaUI` contains several components, that build the application and all its parts.
 * 
 * ### Controllers
 * 
 * * {@link kongaUI.controller:EntitySearchCtrl `entity-search`}: This controller builds-up a standard {@link kongaUI.directive:searchPane search pane} with all fields configured in the metadata to be <i>searchable</i>. It also appends a {@link kongaUI.directive:resultTable result table} with the search results (having as columns every one declared to be <i>shown in results</i>).
 * * {@link kongaUI.controller.EntityUpdateCtrl `entity-update`}: This controller builds-up a standard {@link kongaUI.directive:updateForm update form} with all fields configured in the metadata to be <i>shown in update</i>.
 *
 * #### Component controllers
 *
 * * {@link kongaUI.controller.MultiSelectCtrl multi-select}: Controls all processes for the multi-select UI component. <b>TODO</b> Move to a directive, and `deprecate`.
 * * {@link kongaUI.controller.SingleSelectCtrl single-select}: Controls all processes for the single-select UI component. <b>TODO</b> Move to a directive, and `deprecate`.
 *
 *
 * ### Directives
 * 
 * #### Form directives
 * 
 * * {@link kongaUI.directive:searchPane `search-pane`}: Creates a search pane with all the fields configured to be <i>searchable</i>.
 * * {@link kongaUI.directive:resultTable `result-pane`}: Creates a result table with all fields configured to be <i>shown in results</i>.
 * * {@link kongaUI.directive:updateForm `update-form`}: Creates a form with all fields configured to be <i>shown in update</i>.
 *
 * #### Component directives
 *
 * * {@link kongaUI.directive:rawInput `raw-input`}: Creates a form field that changes it's appearance depending on the field type.
 * * {@link kongaUI.directive:listInput `list-input`}: Creates a list to render a complex field.
 * * {@link kongaUI.directive:tableHeader `table-header`}: Creates a header for a table column.
 * * {@link kongaUI.directive:tableCell `table-cell`}: Creates a cell for a table.
 * * {@link kongaUI.directive:kongaSelect `konga-select`}: Provides functionality to the `single-select` and `multi-select` components.
 *
 * #### Util directives
 * 
 * * {@link kongaUI.directive:scrollWatcher `scroll-watcher`}: Provides a method for listening to scroll changes on the target UI component.
 *
 * #### Misc directives
 *
 * * {@link kongaUI.directive:menu `menu`}: Renders a menu for the application (i.e. navbar).
 * * {@link kongaUI.directive:menuItem `menu-item`}: Renders a menu item.
 * * {@link kongaUI.directive:formInfo `form-info`}: Creates a component that displays basic data for the entity being shown in update mode.
 *
 *
 * ### Filters
 *
 * * {@link kongaUI.filter:mapEdsField `map-eds-field`}: Receives an entity and a field metadata definition, and returns the value of such field within the entity. 
 * * {@link kongaUI.filter:quickSearch `quick-search`}: Returns the fields within an entity definition configured to be used as <i>quick search</i> fields.
 * * {@link kongaUI.filter:searchParams `search-params`}: Returns all fields from a entity metadata definition configured to be <i>searchable</i>
 * * {@link kongaUI.filter:resultParams `result-params`}: Returns all fields from a entity metadata definition configured to be <i>shown in results</i>
 * * {@link kongaUI.filter:updateParams `update-params`}: Returns all fields from a entity metadata definition configured to be <i>shown in updates</i>
 * * {@link kongaUI.filter:selectData `select-data`}: Receives a set of entities, and returns the same list but with only the fields required for a single-select or multi-select.
 * * {@link kongaUI.filter:shortify `shortify`}: Receives an String and a length, and returns a substring of that length.
 * * {@link kongaUI.filter:tableRendererComplex `table-renderer-complex`}: Serializes a complex field to be shown in a table cell.
 * * {@link kongaUI.filter:translateComplex `translate-complex`}: Configures a complex field to be translated using standard `translate` filter. 
 *
 *
 * ### Services
 *
 * * {@link kongaUI.actionManager `action-manager`}: Defines and controls all available actions to dispatch from the application. <b>TODO</b> extract the action definitions elsewhere.
 * * {@link kongaUI.Api `api`}: Connects the UI with the REST services that handle the information.
 * * {@link kongaUI.Common `common`}: Stores stuff that's accessible all across the application.
 * * {@link kongaUI.configurationManager `configuration-manager`}: Handles all configuration for the application (defined via metadata).
 * * {@link kongaUI.fieldMapper `field-mapper`}: Helps mapping a field's value into a given entity. 
 * * {@link kongaUI.metadata `metadata`}: Connects to the metadata REST service to receive all application definition.
 * * {@link kongaUI.permissionManager `permission-manager`}: Handles the permissions for the application.
 * * {@link kongaUI.Scaffold `scaffold`}: Builds-up new entities for creating, and queries for searching.
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
    'ui.bootstrap.datetimepicker',
    'mgcrea.ngStrap.popover',
    'mgcrea.ngStrap.select',
    'pascalprecht.translate',
    'dialogs.main',
    'config',
    'angularFileUpload'
  ])
  .run(['$route', function ($route) {
      $route.reload();
    }
  ])
  .config(function($popoverProvider) {
    angular.extend($popoverProvider.defaults, {
      autoClose: true,
      html: true
    });
  })
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
              // Configure encoding
              // TODO Improve
              if(!config.file) {
                config.headers['Content-Type'] = 'application/json';
              }

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
  .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
      // Configure routes
      $routeProvider
        .when('/home/', {
          templateUrl: '/views/home.html',
          controller: 'HomeCtrl',
          restricted: true
        })
        .when('/admin/', {
          templateUrl: '/views/admin.html',
          controller: 'AdminCtrl',
          restricted: true
        })
        .when('/entity/:entityType/search/', {
          templateUrl: '/views/entity-search.html',
          controller: 'EntitySearchCtrl',
          restricted: true,
        })
        .when('/entity/:entityType/:entityId/', {
          templateUrl: '/views/entity-update.html',
          controller: 'EntityUpdateCtrl',
          restricted: true,
        })

        // Catalog
        .when('/catalog/search/', {
          templateUrl: '/views/custom/catalog-search.html',
          controller: 'CatalogSearchCtrl',
          restricted: true,
        })
        .when('/catalog/order/', {
          templateUrl: '/views/custom/catalog-order.html',
          controller: 'CatalogOrderCtrl',
          restricted: true,
        })   

        // Init
        .when('/login/', {
          templateUrl:'/views/login.html',
          controller: 'LoginCtrl'
        })

        // Default
        .otherwise({
        	templateUrl: '/views/home.html',
        	controller: 'HomeCtrl',
        	restricted: true
        });

      $locationProvider.html5Mode(true);
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
  // .config(function($modalProvider) {
  //   angular.extend($modalProvider.options, {
  //     backdrop: 'static'
  //   });
  // });

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

/*
 * External modules needed for the application
 */ 

// ng-strap parseOptions
angular.module('mgcrea.ngStrap.helpers.parseOptions', [])

  .provider('$parseOptions', function() {

    var defaults = this.defaults = {
      regexp: /^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+(.*?)(?:\s+track\s+by\s+(.*?))?$/
    };

    this.$get = function($parse, $q) {

      function ParseOptionsFactory(attr, config) {

        var $parseOptions = {};

        // Common vars
        var options = angular.extend({}, defaults, config);
        $parseOptions.$values = [];

        // Private vars
        var match, displayFn, valueName, keyName, groupByFn, valueFn, valuesFn;

        $parseOptions.init = function() {
          $parseOptions.$match = match = attr.match(options.regexp);
          displayFn = $parse(match[2] || match[1]),
          valueName = match[4] || match[6],
          keyName = match[5],
          groupByFn = $parse(match[3] || ''),
          valueFn = $parse(match[2] ? match[1] : valueName),
          valuesFn = $parse(match[7]);
        };

        $parseOptions.valuesFn = function(scope, controller) {
          return $q.when(valuesFn(scope, controller))
          .then(function(values) {
            $parseOptions.$values = values ? parseValues(values, scope) : {};
            return $parseOptions.$values;
          });
        };

        $parseOptions.displayValue = function(modelValue) {
          var scope = {};
          scope[valueName] = modelValue;
          return displayFn(scope);
        };

        // Private functions

        function parseValues(values, scope) {
          return values.map(function(match, index) {
            var locals = {}, label, value;
            locals[valueName] = match;
            label = displayFn(scope, locals);
            value = valueFn(scope, locals);
            return {label: label, value: value, index: index};
          });
        }

        $parseOptions.init();
        return $parseOptions;

      }

      return ParseOptionsFactory;

    };

  });