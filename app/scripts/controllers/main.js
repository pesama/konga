'use strict';

/**
 * @ngdoc controller
 * @name ui.konga.controller:MainCtrl
 * @module ui.konga
 * @description
 * This must be the root controller of the application, and it's suggested to be placed at the `<body>` element. It contains all common {@link konga.operations `operations`}. 
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
 * It creates a new tab for <i>entity</i> searching. It <b>must</b> receive an entity definition, like the ones defined within the {@link ui.konga.Metadata metadata} service calls.
 *
 * ### openEntityUpdate
 * When called, it launches a new tab whose purpose is to update an <i>entity</i> It must receive the {@link ui.konga.Metadata metadata} information from the entity, as well as the entity itself.
 *
 * ### openEntityCreate
 * This method does the exactly same operation as the `openEntityUpdate`, but with the purpose of creating a new <i>entity</i>. It only requires to receive the {@link ui.konga.Metadata metadata} information, and a new {@link ui.konga.Scaffold scaffold} object for the received entity type will be created. 
 * 
 * # Notifications
 * This controller handles the notifications, that are shown to the user in the form of a <i>bootstrap</i> `alert`. Every controller within the application can use this system, by calling the operation `addAlert` available on the `$rootScope`. It's useful to notify the user when a server-related operation finished, both for success and error response types. Notification system is engaged on any place where the `$rootScope` dependency is included. 
 *
 * 
 * # Loading processes
 * When the data required to use some specific view is not yet received, you can append a loader to the application, that would block every possible interaction with the interface until the loading process ends. For such purpose, you have the possibility of <b>requesting a load</b>, and of <b>freeing it</b> once your data is ready. You can use the operations `requestLoading(code)` and `freeLoading(code)`, where `code` is a unique string that identifies the source who requested the loader. The value of such variable is up to you, but it should be unique in order for the loader to work properly. Both operations are available from the `$rootScope.operations` object. 
 *
 * @param {$scope} $scope Contains the scope variables for the controller
 * @param {$location} $location Controls the location of the app (for changing paths)
 * @param {$filter} $filter Uses filters to manage data
 * @param {$rootScope} $rootScope Propagates functionality to other levels
 * @param {Common} common Common methods for storing data 
 * @param {Scaffold} scaffold Used to create new objects for the entities
 */
angular.module('ui.konga')
	.controller('MainCtrl', ['$scope', '$location', '$filter', '$rootScope', '$timeout','common', 'scaffold', 'Metadata', 'dialogs', '$translate', 'Session', 'auth', 'User', '$cookieStore', 'actionManager', '$modal', 'permissionManager', 'ENV', 
		function($scope, $location, $filter, $rootScope, $timeout,common, scaffold, Metadata, dialogs, $translate, Session, auth, User, $cookieStore, actionManager, $modal, permissionManager, ENV) {

			$scope.configConstants = ENV;

			$rootScope.status = {
				load: true,
				loaders: ['metadata']
			};

			// Redirect for loading if needed
			var path = $location.path();
			if(path.indexOf('/loading') !== 0 && $rootScope.status.loaders.length) {
				var after = encodeUriComponent(path);
				$location.path('/loading/' + after);
			}

			/**
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

			// This is documented on app.js
		  	$rootScope.operations = $scope.operations = {

		  		/**
		  		 * @ngdoc method
		  		 * @name addAlert
		  		 * @methodOf konga.operations
		  		 * @param {String} type The type of alert (e.g. `success`, `error`). It inherites _Bootstrap_'s `bg-...` classes.
		  		 * @param {String} message The message for the alert
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
		  		 * @methodOf konga.operations
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
		  		 * @methodOf konga.operations
		  		 * @param {String} title The title for the confirmation dialog.
		  		 * @param {String} message The message for the confirm dialog
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
		  		 * @methodOf konga.operations
		  		 * @param {String} title The title for the confirmation dialog.
		  		 * @param {String} message The message for the confirm dialog
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
		  		 * @name goHome
		  		 * @methodOf konga.operations
		  		 * @description
		  		 * Takes the user to the home screen. You must define the `/home/` route with home's content
		  		 */
		  		goHome: function() {
		  			var homeTab = {
						id:'home', 
						title: 'message.tabs.home', 
						href:'/home/', // TODO KONGA_HOME_URI
						closable: false,
						type: constants.TAB_TYPE_HOME
					};

					this.addTab(homeTab);
		  		},

		  		/**
		  		 * @ngdoc method
		  		 * @name goAdmin
		  		 * @methodOf konga.operations
		  		 * @description
		  		 * If your application has an _admin_ section, use this link to go to that page. You must direct the `/admin/` route to the admin's content.
		  		 */
		  		goAdmin: function() {
		  			var homeTab = {
						id:'admin', 
						title: 'message.tabs.admin', 
						href:'/admin/', 
						closable: true,
						type: constants.TAB_TYPE_HOME
					};

					this.addTab(homeTab);
		  		},

		  		/**
		  		 * @ngdoc method
		  		 * @name openEntitySearch
		  		 * @methodOf konga.operations
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
		  			var tabId = constants.ENTITY_ID_PREFFIX + 
		  						entityMetadata.name + 
		  						constants.SEARCH_SUFFIX;

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
						type: constants.TAB_TYPE_SEARCH
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
		  		 * @methodOf konga.operations
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
		  			var tabId = constants.ENTITY_ID_PREFFIX + 
		  					entityMetadata.name + constants.STRING_SEPARATOR + entityId;

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
							type: constants.TAB_TYPE_UPDATE
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
		  		 * @methodOf konga.operations
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
		  		 * @methodOf konga.operations
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
		  		 * @methodOf konga.operations
		  		 * @param {Tab} tab The tab configuration
		  		 * @description
		  		 * Opens a tab with the configured {@link DataTypes.Tab `parameters`}.
		  		 */
				addTab : function(newTab) {
					// Get the active tab
					var tabActive = $filter('filter')($scope.tabs, { active: true })[0];

					// Verify existance
					var existingTabs = $filter('filter')($scope.tabs, { id: newTab.id }, true);
					//newTab['active'] = true;
					if (!existingTabs.length) {

						//Ouverture d’un onglet depuis un formulaire de recherche, 
						//l’onglet doit s’ouvrir à la suite du formulaire d’ouverture et non en dernier
						if (newTab.type === constants.TAB_TYPE_UPDATE) {
							var indexActive = $scope.tabs.indexOf(tabActive);
							$scope.tabs.splice(indexActive + 1, 0, newTab);

							existingTabs.push(newTab);

						} else {

							// Push the new tab						
							$rootScope.tabs.push(newTab);
							existingTabs.push(newTab);
						}

						// Setup extra object
						// var extra = $scope.tabExtra[newTab.id] = {};

						// // Tabs have in extra all parameters for usage
						// for(var tabParam in newTab) {
						// 	if(newTab.hasOwnProperty(tabParam)) {
						// 		extra[tabParam] = newTab[tabParam];
						// 	}
						// }

						// Do we need to set-up the metadata?
						if(!newTab.entityMetadata && newTab.entityType) {
							newTab.entityMetadata = util.getMetadata(newTab.entityType);
						}

						// If it's an entity related tab, translate the label
						// if(newTab.entityMetadata) {
				  // 			extra.label = $filter('translate')(newTab.entityMetadata.label);
				  // 			extra.labelPlaceholder = newTab.entityMetadata.label;
						// }
					}
					
					// Save the previous tab
					existingTabs[0].previousTab = tabActive;

					$scope.operations.redirectTo(existingTabs[0]);
				},

				/**
		  		 * @ngdoc method
		  		 * @name closeTab
		  		 * @methodOf konga.operations
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
		  		 * @methodOf konga.operations
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
		  		 * @methodOf konga.operations
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
		  		 * @methodOf konga.operations
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
		  		 * @methodOf konga.operations
		  		 * @param {String} id Unique id for the loader. It will be identified with this parameter for deletion when freed.
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
		  		 * @methodOf konga.operations
		  		 * @param {String} id Unique id for the loader. It must be the same id given when the loader was requested.
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
		  		 * @methodOf konga.operations
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
		  		 * @methodOf konga.operations
		  		 * @param {String=} locale The language to change to
		  		 * @description
		  		 * This mehtod changes the language of the full engine and its running application. It also notifies via a {@link Events.locale-change `locale-change`} event broadcasted to all listening controllers.
		  		 */
				changeLocale: function(newLocale) {
					$scope.selectedLanguage = constants.LANGUAGE_MESSAGE_PREFFIX + newLocale;

					// Get the old locale
					var oldLocale = $translate.use();

					// Change the language
					$translate.use(newLocale);
					moment.locale(newLocale);

					$scope.$broadcast('locale-change', { 'old': oldLocale, 'new': newLocale });
				},
				
				//TODO : Add function for Search Action
				action: function() {
		  			// Generate the id for the new tab
		  			var tabId = "action";

		  			// TODO Externalize
		  			var tabTitle = 'message.tabs.action.search';
		  			//$scope.tabExtra.label = $filter('translate')(entityMetadata.label);

		  			var tab = {
						id : tabId, 
						title : tabTitle, 
						href : '/action/', 
						closable : true,
						// Entity metadata
						//entityMetadata : entityMetadata
					};

					// Add the tab
					$scope.operations.addTab(tab);
		  		},

		  		/**
				 * Decodes a String and converts it into an action
				 * The form of the action String MUST BE:
				 *  - Action name
				 *  - Entity type
				 *  - '#' Entity id (Optional)
				 *
				 * Parameters are concat using the ':' separator
				 */
				decodeAction : function(actionStr, dispatch) {
					var action = {
					  name: '',
					  scope: '',
					  label: ''
					};
					var actionParameters = {};

					var actionParams = actionStr.split(':');
					if(actionParams.length < 2) {
					  // TODO Throw exception
					}
					action.name = actionParams[0];
					var entityType = actionParams[1];
					actionParameters.entityType = entityType;

					// Parse the other params
					for(var i = 2; i < actionParams.length; i++) {
					  var currentParam = actionParams[i];

					  // Is it the id?
					  if(currentParam.indexOf('#') === 0) {
					    actionParameters.id = currentParam.substring(1);
					  }
					}

					if(dispatch) {
						this.dispatchAction(action, actionParameters);
					}

					return action;
				},

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

			$scope.showHeader = function() {
				return !!Session.data.user;
			};
		}]);