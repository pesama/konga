'use strict';

/**
 * @ngdoc controller
 * @name kongaUI.controller:MainCtrl
 * @module kongaUI
 * @description
 * Main controller. It's always engaged, controlling the tabs, the authentication, and other common stuff.
 * 
 * # Authentication 
 * TODO Document
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
 * It creates a new tab for <i>entity</i> searching. It <b>must</b> receive an entity definition, like the ones defined within the {@link kongaUI.Metadata metadata} service calls.
 *
 * ### openEntityUpdate
 * When called, it launches a new tab whose purpose is to update an <i>entity</i> It must receive the {@link kongaUI.Metadata metadata} information from the entity, as well as the entity itself.
 *
 * ### openEntityCreate
 * This method does the exactly same operation as the `openEntityUpdate`, but with the purpose of creating a new <i>entity</i>. It only requires to receive the {@link kongaUI.Metadata metadata} information, and a new {@link kongaUI.Scaffold scaffold} object for the received entity type will be created. 
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
	.run(['$rootScope', '$location', '$cookieStore', '$http', 'Session', 'auth', 'User', '$modal', 'common', 'Metadata', '$window', 
	 function($rootScope, $location, $cookieStore, $http, Session, auth, User, $modal, common, Metadata, $window) {
		
		/* Reset error when a new view is loaded */
 		$rootScope.$on('$viewContentLoaded', function() {
 			delete $rootScope.error;
 		});

 		$rootScope.$on('rootSearch', function(conf, data) {
 			$rootScope.$broadcast('entity-search', { type : data.type });
 		});
 		
		$rootScope.$on('$routeChangeStart', function (event, next) {
			if (next.restricted) {
				var originalPath = $location.path();
				var authTokenCookie = $cookieStore.get('authToken');
				var authTokenSession = Session.data.authToken;
				if (authTokenCookie !== undefined || authTokenSession !== undefined) {
					if (Session != null && Session.data != null && Session.data.user != null) {
						$location.path(originalPath);
					} else {
						User.get( //Get user information
							function(serviceUser) {						
								$rootScope.saveSessionInformation(serviceUser);
								
								
							},
							function () {
								$rootScope.logout();
							});
					}
				} else {					
					$rootScope.logout();
				}
			}
		 });
		 
		$rootScope.saveSessionInformation = function(serviceUser){
			$rootScope.user = Session.data.user = serviceUser;
			Session.data.roles = [];
		 };
		 
		var deleteSessionInformation = function() {
			Session.data.isLogged = false;
			delete $rootScope.isLogged;
			delete $rootScope.username;	
			delete $rootScope.isFullyLogged;
		};
		
		$rootScope.openParams = function(){
			var userParamsTab = {
  				id:'userParams', 
  				title: 'message.tabs.user-params', 
  				href:'/userParams/', 
  				closable:true
	  		};

			$rootScope.operations.addTab(userParamsTab);
			$location.path("/userParams");
		};
		
		$rootScope.logout = function(reload) {
			deleteSessionInformation();
 			$cookieStore.remove('authToken');
 			$cookieStore.remove('isFullyLogged');
 			
 			$rootScope.tabs.splice(0, $rootScope.tabs.length);
 			$location.path('/login/');

 			// FIXME Remove this.
 			if(reload)
 				window.location.reload();
		};
	}])
	.controller('MainCtrl', ['$scope', '$location', '$filter', '$rootScope', '$timeout','common', 'scaffold', 'Metadata', 'dialogs', '$translate', 'Session', 'auth', 'User', '$cookieStore', 'actionManager', '$modal', 'permissionManager', 'ENV', 
		function($scope, $location, $filter, $rootScope, $timeout,common, scaffold, Metadata, dialogs, $translate, Session, auth, User, $cookieStore, actionManager, $modal, permissionManager, ENV) {

			$scope.configConstants = ENV;

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

			/*
		  	 * TODO Document
		  	 */ 
		  	$rootScope.operations = $scope.operations = {

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
		  	          }, 4000);
		  		},

		  		removeAlert: function(index) {
		  			$scope.alerts.splice(index, 1);
		  		},

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
		  		 * TODO Document
		  		 */
		  		addFavorite: function() {

		  		},

		  		// *
		  		//  * TODO Document
		  		 
		  		goHome: function() {
		  			var homeTab = {
						id:'home', 
						title: 'message.tabs.home', 
						href:'/home/', 
						closable: false,
						type: constants.TAB_TYPE_HOME
					};

					this.addTab(homeTab);
		  		},

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

		  		login: function() {
		  			var loginTab = {
		  				id:'login', 
		  				title: 'message.tabs.login', 
		  				href:'/login/', 
		  				closable:false, 
		  				templateInclude: {
		  					title: 'Login', 
		  					url:'templates/login.html'
		  				}
		  			};

		  			this.addTab(loginTab);
		  		},
		  		
			  	/**
				 * Complete used authentications, redirects user to home and saves the data from his operational center. 
				 * This function is called only when the user has just one operational center.
				 * @function completeAuthentication 
				 */
				completeAuthentication : function(ctrOperat){
					
					$rootScope.operations.requestLoading('completeAuthentication');
					
					var ctrOperatId = (ctrOperat!=null)?ctrOperat.id:"";
					
					auth.fullauth(ctrOperat.id)
					.success(function(completeToken) {					 
						var authToken = completeToken;
						Session.data.authToken = authToken;	
						//If Remember Me, or we are changing the operational center and there is already a cookie
						if (Session.data.rememberMe || $cookieStore.get('authToken')!=null) {
							$cookieStore.put('authToken', authToken);
						}

						var userOk = false;
						var menuOk = false;

						User.get(
								function (resourceUser) {
									Session.data.ctrOperatName =  (ctrOperat != null) ? ctrOperat.libCtrOperat : '';
									Session.data.ctrOperatId =  (ctrOperat != null) ? ctrOperat.id : null;
									Session.data.isFullyLogged = true;
									//If Remember Me, or we are changing the operational center and there is already a cookie
									if (Session.data.rememberMe || $cookieStore.get('ctrOperatId')!=null) {
										$cookieStore.put('isFullyLogged', Session.data.isFullyLogged);
										$cookieStore.put('ctrOperatName', Session.data.ctrOperatName);
										$cookieStore.put('ctrOperatId', Session.data.ctrOperatId);
										$cookieStore.put('moreThanOneCtrOperat', Session.data.moreThanOneCtrOperat);
									}	
									
									$rootScope.saveSessionInformation(resourceUser);
									User.roles(
											function (roles) {
												//Save roles in session
												Session.data.roles = roles;												
												// Close login
												$rootScope.operations.closeTabById('login');
												userOk = true;
												
												//Update the Favorits for the user and the new ctrOperat 
												$rootScope.$broadcast('favoritesChanged',{});
												
												if(menuOk) {
													// Go home
													$rootScope.operations.goHome();
												}
												$rootScope.operations.freeLoading('completeAuthentication');
											},
											function (error) {
												$rootScope.logout();
												console.log('POST Error ' + error);
												$rootScope.operations.freeLoading('completeAuthentication');
											}
									);
								},
								function() {
									$scope.logout();
									console.log('POST Error');
									$rootScope.operations.freeLoading('completeAuthentication');
								}
						);		

						Metadata.mainmenu(
							function(menu) {
								$rootScope.mainmenu = $scope.mainmenu = menu;
								// Store the menu on common
								common.store('mainmenu', $scope.mainmenu);
	
								menuOk = true;
								if(userOk) {
									// Go home
									$rootScope.operations.goHome();
								}
							},
							function() {
								console.log('Error loading mainmenu');
							});	
					
						
				    }).error(function(err) {
				    	$scope.logout();
				    	console.error('Error setting the operational center for the user', err);
				    	$rootScope.operations.freeLoading('completeAuthentication');
				    });					
				},

		  		// *
		  		//  * @ngdoc
		  		//  * @description
		  		//  * Opens a search pane for the entity selected
		  		 
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

		  		// *
		  		//  * TODO Document
		  		 
		  		openEntityUpdate: function(entityMetadata, entity, params) {
		  			if(typeof entityMetadata === 'string') {
		  				entityMetadata = util.getMetadata(entityMetadata);
		  			}

		  			var entityId = util.getEntityId(entityMetadata, entity);

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

		  		// *
		  		//  * TODO Document
		  		 
		  		openEntityCreate: function(entityMetadata) {
		  			// Verify permissions
		  			var permission = entityMetadata.createable;
		  			if(permissionManager.isAllowed(permission)) {
		  				$scope.operations.openEntityUpdate(entityMetadata);
		  			}
		  			else {
		  				var forbidden = {
		  					name: 'action-forbidden'
		  				};
		  				$scope.operations.dispatchAction(forbidden);
		  			}
		  		},

		  		openModal: function(action) {

		  			$rootScope.$broadcast('suspend', {});

		  			var currentTab = null;
		  			if(action.parameters.closeTab) {
		  				var existingTabs = $filter('filter')($scope.tabs, { id: $scope.tabId });
		  				currentTab = existingTabs[0];
		  				var homeTab = $filter('filter')($scope.tabs, { id: 'home' })[0];
		  				$scope.operations.redirectTo(homeTab);
		  			}
			  	
		  			var modalInstance = $modal.open({
				      templateUrl: action.template,
				      controller: action.controller,
				      size: 'lg',
				      windowClass: action.windowClass,
				      backdrop: action.backdrop ? action.backdrop : true,
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

		  	// 	*
				 // * Add new tab if doesn't exist, or open a tab if exist.
				 // * @function addTab
				 // * @param newTab
				 
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

				// *
				//  * Handle the tab closing
				//  * @function closeTab
				//  * @param tab
				//	* @param force
				 
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

				closeTabById: function(id) {
					for(var i=0; i<$rootScope.tabs.length; i++){
						if ($scope.tabs[i].id === id) {
							$scope.operations.closeTab($scope.tabs[i], false);
							break;
						}
					}
				},
				
				closeAllTabsButHome: function(force) {
					var copyTabs = $rootScope.tabs.slice(0);
					for(var i=0; i<copyTabs.length; i++){
						if(copyTabs[i].id != 'home'){
							$scope.operations.closeTab(copyTabs[i], force);
						}
					}
				},
				
				closeAllTabs: function(force) {
					var copyTabs = $rootScope.tabs.slice(0);
					for(var i=0; i<copyTabs.length; i++){
						$scope.operations.closeTab(copyTabs[i], force);
					}
				},

				// *
				//  * Redirect to tab href if exist
				//  * @function redirectTo
				//  * @param tab 
				 
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

				// *
				//  * Create a new global var updateData to communicate between search page and update pages
				//  * @function setUpdateData
				//  * @param data
				 
				setUpdateData : function(data) {
					$scope.updateData = data;
				},

				requestLoading: function(source, message) {
					$scope.loading.push(source);
					$scope.loadingMessage = message;
				},

				freeLoading: function(source) {
					var index = $scope.loading.indexOf(source);
					if (index === -1) {
						// TODO Throw exception
					}
					$scope.loading.splice(index, 1);
				},

				setLoadingMessage: function(message) {
					$scope.loadingMessage = message;
				},

				changeLocale: function(newLocale) {
					$scope.selectedLanguage = constants.LANGUAGE_MESSAGE_PREFFIX + newLocale;

					// Get the old locale
					var oldLocale = $translate.use();

					// Change the language
					$translate.use(newLocale);
					moment.locale(newLocale);

					$scope.$broadcast('locale-change', { old: oldLocale, new: newLocale });
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
		  	
		  	// Request loading
			$scope.operations.requestLoading('metadata');

			// Get ENTITY information
			$scope.metadata = $rootScope.metadata = Metadata.get({lang: 'es'}, function(data) {
				// Store the metadata on common
				common.store('metadata', $scope.metadata);
				util.init(data);
				$scope.operations.freeLoading('metadata');
			});

			$scope.showHeader = function() {
				return !!Session.data.user;
			};
		}]);