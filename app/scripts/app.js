'use strict';

/**
 * @ngdoc overview
 * @name index
 * @description
 *
 * <img src="http://konga.io/wp-content/uploads/2015/03/konga-logo.png">
 *
 * # konga ui
 * Welcome to `Konga Reference` documentation! Hope you like how we arranged everything. Otherwise please let us know!
 * Remember that you can go anytime to http://konga.io for more abstract reading.
 *
 * ## What does Konga offer me?
 * konga is an Angular-powered application engine, that relies on metadata definitions for creating a whole application context that defines CRUD forms over your defined entities. It enhances native components and also gives you a full set of rich Konga Reference for data management and other handy stuff.
 *
 * ### Metadata management
 * You can use konga to generate the administration pane of your web project automatically, by just defining its entities and their metadata.
 * 
 * Take a look to the {@link DataTypes.Metadata `metadata`}, {@link DataTypes.Entity `entity`} and {@link DataTypes.Field `field`} definitions to see all information you can assign to your entities.
 * For generating your own metadata, go to the {@link http://docs.konga.io/metadata `metadata.konga`} project's documentation.
 *
 * ### Customization
 * konga-powered apps are, in essence, Angular-powered apps. Therefore, you can use every angular feature within a konga project. 
 every app starts with your custom <b>HomeCtrl</b>. There you can define where do you want to use konga automation features and where not to. Furthermore, konga gives you customization entry points via its {@link Konga Reference.actionManager `action-driven-framework`} everywhere. 
 *
 * ### Step-by-step tutorial
 * TODO
 *
 * ## Installation
 *
 * You can install <b>Konga Reference</b> in your existing project via _bower_.
 * ```
 * bower install Konga Reference --save
 * ```
 * 
 * Then go to the {@link Konga Reference.configuration `Configuring your app`} section to prepare your application to be launched. 
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
 * @name Konga Reference
 * @module Konga Reference
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
 * `Konga Reference` contains several components, that build the application and all its parts.
 * 
 * ### Controllers
 * 
 * * {@link Konga Reference.controller:EntitySearchCtrl `entity-search`}: This controller builds-up a standard {@link Konga Reference.directive:searchPane search pane} with all fields configured in the metadata to be <i>searchable</i>. It also appends a {@link Konga Reference.directive:resultTable result table} with the search results (having as columns every one declared to be <i>shown in results</i>).
 * * {@link Konga Reference.controller.EntityUpdateCtrl `entity-update`}: This controller builds-up a standard {@link Konga Reference.directive:updateForm update form} with all fields configured in the metadata to be <i>shown in update</i>.
 *
 * #### Component controllers
 *
 * * {@link Konga Reference.controller.MultiSelectCtrl multi-select}: Controls all processes for the multi-select UI component. <b>TODO</b> Move to a directive, and `deprecate`.
 * * {@link Konga Reference.controller.SingleSelectCtrl single-select}: Controls all processes for the single-select UI component. <b>TODO</b> Move to a directive, and `deprecate`.
 *
 *
 * ### Directives
 * 
 * #### Form directives
 * 
 * * {@link Konga Reference.directive:searchPane `search-pane`}: Creates a search pane with all the fields configured to be <i>searchable</i>.
 * * {@link Konga Reference.directive:resultTable `result-pane`}: Creates a result table with all fields configured to be <i>shown in results</i>.
 * * {@link Konga Reference.directive:updateForm `update-form`}: Creates a form with all fields configured to be <i>shown in update</i>.
 *
 * #### Component directives
 *
 * * {@link Konga Reference.directive:rawInput `raw-input`}: Creates a form field that changes it's appearance depending on the field type.
 * * {@link Konga Reference.directive:listInput `list-input`}: Creates a list to render a complex field.
 * * {@link Konga Reference.directive:tableHeader `table-header`}: Creates a header for a table column.
 * * {@link Konga Reference.directive:tableCell `table-cell`}: Creates a cell for a table.
 * * {@link Konga Reference.directive:kongaSelect `konga-select`}: Provides functionality to the `single-select` and `multi-select` components.
 *
 * #### Util directives
 * 
 * * {@link Konga Reference.directive:scrollWatcher `scroll-watcher`}: Provides a method for listening to scroll changes on the target UI component.
 *
 * #### Misc directives
 *
 * * {@link Konga Reference.directive:menu `menu`}: Renders a menu for the application (i.e. navbar).
 * * {@link Konga Reference.directive:menuItem `menu-item`}: Renders a menu item.
 * * {@link Konga Reference.directive:formInfo `form-info`}: Creates a component that displays basic data for the entity being shown in update mode.
 *
 *
 * ### Filters
 *
 * * {@link Konga Reference.filter:mapField `map-eds-field`}: Receives an entity and a field metadata definition, and returns the value of such field within the entity. 
 * * {@link Konga Reference.filter:quickSearch `quick-search`}: Returns the fields within an entity definition configured to be used as <i>quick search</i> fields.
 * * {@link Konga Reference.filter:searchParams `search-params`}: Returns all fields from a entity metadata definition configured to be <i>searchable</i>
 * * {@link Konga Reference.filter:resultParams `result-params`}: Returns all fields from a entity metadata definition configured to be <i>shown in results</i>
 * * {@link Konga Reference.filter:updateParams `update-params`}: Returns all fields from a entity metadata definition configured to be <i>shown in updates</i>
 * * {@link Konga Reference.filter:selectData `select-data`}: Receives a set of entities, and returns the same list but with only the fields required for a single-select or multi-select.
 * * {@link Konga Reference.filter:shortify `shortify`}: Receives an String and a length, and returns a substring of that length.
 * * {@link Konga Reference.filter:tableRendererComplex `table-renderer-complex`}: Serializes a complex field to be shown in a table cell.
 * * {@link Konga Reference.filter:translateComplex `translate-complex`}: Configures a complex field to be translated using standard `translate` filter. 
 *
 *
 * ### Services
 *
 * * {@link Konga Reference.actionManager `action-manager`}: Defines and controls all available actions to dispatch from the application. <b>TODO</b> extract the action definitions elsewhere.
 * * {@link Konga Reference.Api `api`}: Connects the UI with the REST services that handle the information.
 * * {@link Konga Reference.Common `common`}: Stores stuff that's accessible all across the application.
 * * {@link Konga Reference.configurationManager `configuration-manager`}: Handles all configuration for the application (defined via metadata).
 * * {@link Konga Reference.fieldMapper `field-mapper`}: Helps mapping a field's value into a given entity. 
 * * {@link Konga Reference.metadata `metadata`}: Connects to the metadata REST service to receive all application definition.
 * * {@link Konga Reference.permissionManager `permission-manager`}: Handles the permissions for the application.
 * * {@link Konga Reference.Scaffold `scaffold`}: Builds-up new entities for creating, and queries for searching.
 *
 */

/**
 * @ngdoc overview
 * @name Konga Reference
 * @module Konga Reference
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
  'dialogs.controllers',
  'dialogs.services',
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
        controller: 'EntitySearchCtrl'
      })
      .when('/entity/:entityType/:entityId/', {
        templateUrl: '/konga/views/entity-update.html',
        controller: 'EntityUpdateCtrl'
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