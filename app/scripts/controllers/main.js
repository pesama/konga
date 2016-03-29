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
		  			$rootScope.$broadcast('suspend', {});

		  			var currentTab = null;
			  	
		  			var modalInstance = $modal.open({
				      templateUrl: action.template,
				      controller: action.controller,
				      size: action.size || 'md',
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
					$rootScope.operationTriggered = true;
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

		  	// Listen to path changes (for history)
		  	$rootScope.$on('$locationChangeStart', function (event, next, current) {
		  		if($rootScope.operationTriggered) {
		  			$rootScope.operationTriggered = false;
		  			return;
		  		}
		        for(var i=0; i<$rootScope.tabs.length; i++){
					if ($scope.tabs[i].href === $location.path()) {
						$scope.operations.redirectTo($scope.tabs[i]);
						break;
					}
				}
		    });
		}]);