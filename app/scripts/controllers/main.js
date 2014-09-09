'use strict';

/**
 * @ngdoc controller
 * @name sigmaNgApp.controller:MainCtrl
 * @module sigmaNgApp
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
 * It creates a new tab for <i>entity</i> searching. It <b>must</b> receive an entity definition, like the ones defined within the {@link sigmaNgApp.Metadata metadata} service calls.
 *
 * ### openEntityUpdate
 * When called, it launches a new tab whose purpose is to update an <i>entity</i> It must receive the {@link sigmaNgApp.Metadata metadata} information from the entity, as well as the entity itself.
 *
 * ### openEntityCreate
 * This method does the exactly same operation as the `openEntityUpdate`, but with the purpose of creating a new <i>entity</i>. It only requires to receive the {@link sigmaNgApp.Metadata metadata} information, and a new {@link sigmaNgApp.Scaffold scaffold} object for the received entity type will be created. 
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
angular.module('sigmaNgApp')
	.run(['$rootScope', '$location', '$cookieStore', '$http', 'Session', 'auth', 'user', 
	 function($rootScope, $location, $cookieStore, $http, Session, auth, user) {
		
		/* Reset error when a new view is loaded */
 		$rootScope.$on('$viewContentLoaded', function() {
 			delete $rootScope.error;
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
						user.get( //Get user information
							function(serviceUser) {						
								$rootScope.saveSessionInformation(serviceUser);
								
								user.roles( //Get roles from user
									function (roles) {		
										//Save roles in session
										Session.data.roles = roles;
										
										//Redirect to requested path
										$location.path(originalPath);										
									},
									function (error) {
										$rootScope.logout();
									});
							},
							function (error) {
								$rootScope.logout();
							});
					}
				} else {					
					$rootScope.logout();
				}
			}
		 });
		 
		$rootScope.saveSessionInformation = function(serviceUser){
			Session.data.isLogged = true;
			Session.data.user = serviceUser;
			 
			$rootScope.isLogged = Session.data.isLogged;
			$rootScope.username = Session.data.user.nom;
			if (Session.data.isFullyLogged != null) {
				$rootScope.isFullyLogged = Session.data.isFullyLogged;						
				$rootScope.ctrOperatName = Session.data.ctrOperatName;	
			} else {
				$rootScope.isFullyLogged = $cookieStore.get('isFullyLogged');					
				$rootScope.ctrOperatName = $cookieStore.get('ctrOperatName');
			}
		 };
		 
		var deleteSessionInformation = function() {
			Session.data.isLogged = false;
			delete $rootScope.isLogged;
			delete $rootScope.username;	
			delete $rootScope.isFullyLogged;						
			delete $rootScope.ctrOperatName;
		};
		
		$rootScope.deconnexion = function(){
    		
			$rootScope.operations.confirm('message.title.confirmation-desconnexion', 'message.confirmation-desconnexion', 
					function() {
				 		$rootScope.logout();
					},
					function() {
						// Do nothing
					});    		
    		
    	};
		
		$rootScope.logout = function() {
			deleteSessionInformation();
 			$cookieStore.remove('authToken');
 			$cookieStore.remove('isFullyLogged');
 			$cookieStore.remove('ctrOperatName');
 			$cookieStore.remove('roles');
 			$location.path("/login");
		};
		
		deleteSessionInformation = function() {
 			Session.data = {};
     		delete $rootScope.isLogged;
 			delete $rootScope.username;	
 			delete $rootScope.isFullyLogged;						
 			delete $rootScope.ctrOperatName;
     	};
		
	}])
	.controller('MainCtrl', ['$scope', '$location', '$filter', '$rootScope', '$timeout','common', 'scaffold', 'Metadata', 'dialogs', '$translate', 'Session', 'auth', 'user', '$cookieStore', 
		function($scope, $location, $filter, $rootScope, $timeout,common, scaffold, Metadata, dialogs, $translate, Session, auth, user, $cookieStore) {
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

			// *
			//  * @description
			//  * Metadata object.
			//  * Holds information about the site.
			 
			$scope.metadata = {
				headerNav1Url 	: 'views/header-nav1.html',
				headerNav2Url 	: 'views/header-nav2.html',
				footerTemplate 	: 'views/footer.html'
			};

			// Array of available languages
			$scope.selectedLanguage = 'message.languages.fr';

			/*
		  	 * TODO Document
		  	 */ 
		  	$rootScope.operations = $scope.operations = {

		  		addAlert: function(type, msg) {
		  			var alert = {
		  				type: type,
		  				msg: msg,
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

		  		confirm: function(title, message, okHandler, koHandler) {
		  			var dlg = null;

		  			var localeTitle = $filter('translate')(title);
		  			var localeMessage = $filter('translate')(message);

		  			dlg = dialogs.confirm(localeTitle, localeMessage);
			        dlg.result.then(function(btn) {
			        	if (okHandler) {
			        		okHandler(btn);
			        	}
			        },function(btn){
			        	if (koHandler) {
			        		koHandler(btn);
			        	}
			        });
		  		},
		  		
		  		notify: function(title, message) {
		  			var dlg = null;

		  			var localeTitle = $filter('translate')(title);
		  			var localeMessage = $filter('translate')(message);

		  			dlg = dialogs.notify(localeTitle, localeMessage);
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
						closable: false
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
					
					var ctrOperatId = (ctrOperat!=null)?ctrOperat.id:"";
					
					auth.fullauth(ctrOperat.id)
					.success(function(completeToken) {					
						var authToken = completeToken;
						Session.data.authToken = authToken;			
						if (Session.data.rememberMe) {
							$cookieStore.put('authToken', authToken);
						}
						user.get(
								function (resourceUser) {
									Session.data.ctrOperatName =  (ctrOperat != null) ? ctrOperat.libCtrOperat : '';
									Session.data.isFullyLogged = true;
									if (Session.data.rememberMe) {
										$cookieStore.put('isFullyLogged', Session.data.isFullyLogged);
										$cookieStore.put('ctrOperatName', Session.data.ctrOperatName);
									}	
									
									$rootScope.saveSessionInformation(resourceUser);
									user.roles(
											function (roles) {
												//Save roles in session
												Session.data.roles = roles;
												if (Session.data.rememberMe) {
													$cookieStore.put('roles', Session.data.roles);
												}
												// Close login
												$rootScope.operations.closeTabById('login');
												// Go home
												$rootScope.operations.goHome();
											},
											function (error) {
												$rootScope.logout();
												console.log('POST Error ' + error);
											}
									);
								},
								function(error) {
									$scope.logout();
									console.log('POST Error');
								}
						);							     					
				    }).error(function(err) {
				    	$scope.logout();
				    	console.error('Error setting the operational center for the user', err);
				    });					
				},

		  		// *
		  		//  * @ngdoc
		  		//  * @description
		  		//  * Opens a search pane for the entity selected
		  		 
		  		openEntitySearch: function(entityMetadata) {
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
						entityMetadata : entityMetadata
					};

					// Add the tab
					$scope.operations.addTab(tab);
		  		},

		  		// *
		  		//  * TODO Document
		  		 
		  		openEntityUpdate: function(entityMetadata, entity) {
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
	  				
	  				if (entityMetadata.name === 'ctrOperat') {
						if (typeof entity !== 'undefined') {
							entityMetadata.agences = entity.agences;
							entityMetadata.chantieres = entity.chantieres;
							entityMetadata.societes = entity.societes;
							entityMetadata.secteurs = entity.secteurs;
							entityMetadata.ctrsMecaniques = entity.ctrsMecaniques;
						} else {
							entityMetadata.agences = [];
							entityMetadata.chantieres = [];
							entityMetadata.societes = [];
							entityMetadata.secteurs = [];
							entityMetadata.ctrsMecaniques = [];
						}
						 
	  					var tab = {
	  							id : tabId, 
	  							title : tabTitle, 
	  							href : '/ctrOperat/' + entityMetadata.name + '/' + entityId + '/', 
	  							closable : true,
	  							hasChanges : false,
	  							// Entity metadata
	  							entityMetadata : entityMetadata
	  					};
	  				} else {
	  					var tab = {
	  							id : tabId, 
	  							title : tabTitle, 
	  							href : '/entity/' + entityMetadata.name + '/' + entityId + '/', 
	  							closable : true,
	  							hasChanges : false,
	  							// Entity metadata
	  							entityMetadata : entityMetadata
	  					};
	  				}

					// Add the tab
					$scope.operations.addTab(tab);
		  		},

		  		openCtrOperatCreate: function (entityMetadata) {
		  			var entityId = constants.NEW_ENTITY_ID;
		  			var tabId = constants.ENTITY_ID_PREFFIX 	+ 
		  						entityMetadata.name 		+ 
		  						constants.STRING_SEPARATOR  +
		  						entityId;

		  			var tabTitle = 'message.tabs.entity.create';
		  			
		  			var tab = {
						id : tabId, 
						title : tabTitle, 
						href : '/ctrOperat/' + entityMetadata.name + '/' + entityId + '/', 
						closable : true,
						hasChanges : false,
						// Entity metadata
						entityMetadata : entityMetadata
					};

					// Add the tab
					$scope.operations.addTab(tab);
		  		},
		  		// *
		  		//  * TODO Document
		  		 
		  		openEntityCreate: function(entityMetadata) {
		  				$scope.operations.openEntityUpdate(entityMetadata);
		  		},

		  	// 	*
				 // * Add new tab if doesn't exist, or open a tab if exist.
				 // * @function addTab
				 // * @param newTab
				 
				addTab : function(newTab) {
					// Verify existance
					var existingTabs = $filter('filter')($scope.tabs, { id: newTab.id });
					//newTab['active'] = true;
					if (!existingTabs.length) {
						// Push the new tab						
						$rootScope.tabs.push(newTab);
						existingTabs.push(newTab);
					}
					$scope.operations.redirectTo(existingTabs[0]);
				},

				// *
				//  * Handle the tab closing
				//  * @function closeTab
				//  * @param tab
				 
				closeTab : function(tab) {
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
							if (tab.hasChanges) {
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
					}
				},

				closeTabById: function(id) {
					for(var i=0; i<$rootScope.tabs.length; i++){
						if ($scope.tabs[i].id === id) {
							$scope.operations.closeTab($scope.tabs[i]);
							break;
						}
					}
				},

				// *
				//  * Redirect to tab href if exist
				//  * @function redirectTo
				//  * @param tab 
				 
				redirectTo : function(tab) {					
					angular.forEach($rootScope.tabs, function(item){item.active = false});
					// Select the tab
					$rootScope.pageData = common.getPageData(tab.id);
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

				requestLoading: function(source) {
					$scope.loading.push(source);
				},

				freeLoading: function(source) {
					var index = $scope.loading.indexOf(source);
					if (index === -1) {
						// TODO Throw exception
					}
					$scope.loading.splice(index, 1);
				},

				changeLocale: function(newLocale) {
					$scope.selectedLanguage = constants.LANGUAGE_MESSAGE_PREFFIX + newLocale;

					// Get the old locale
					var oldLocale = $translate.use();

					// Change the language
					$translate.use(newLocale);

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
		  	$scope.$on('locale-change', function(data) {
		  		// Change the locale in the tabs
		  		for(var item in $scope.tabExtra) {
		  			var extra = $scope.tabExtra[item];
		  			extra.label = $filter('translate')(extra.labelPlaceholder);
		  		}
		  	});

		  	
		  	
		}]);