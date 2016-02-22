'use strict';

/*
 * @ngdoc controller
 * @name konga.controller:EntityUpdateCtrl
 * @description
 * # EntityUpdateCtrl
 * Controller used for update ENTITY entities. It is route provides information about what type of entity we are searching for.
 * 
 *  # Local endpoint
 * Using the {@link konga.Api api} service, and sending the `entityType` parameter defined above, the service returns the proper endpoint, depending on which type of entity is received. Afterwards all CRUD operations between the UI and the web service will be performed to the appropriate endpoint. 
 *
 * 
 * # Pagination
 * To avoid retrieving too many results at once, they are paginated so the user could only see the number of results she decides. 
 * <br />
 *
 *
 * @param {$scope} $scope Local scope for the controller
 * @param {Api} api Api connector for REST service connection
 * @param {$routeParams} $routeParams Parameters of the route
 * @param {Common} common Common storage
 * @param {$rootScope} $rootScope Global scope (for receiving propagated data)
 * @param {$filter} $filter Filters for managing data
 * @param {Scaffold} scaffold Used to generate new entities
 * @param {$timeout} $timeout for returning value of registering a timeout function is promise, which will resolved when the timeout is reached and the timeout function is executed.
 * @param {permissionManager} permissionManager Service
 * @param {FieldMapper} filedMapper for managing the connection between the entities and their forms within the UI.

 */
angular.module('konga')
.controller('EntityUpdateCtrl', ['$scope', '$routeParams', 'api', 'standardApi', 'common', 'fieldMapper', '$filter', '$rootScope', 'scaffold', '$timeout', 'permissionManager', 'util', 
  	function ($scope, $routeParams, api, standardApi, common, fieldMapper, $filter, $rootScope, scaffold, $timeout, permissionManager, util) {
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
					//TODO: (Future general annotation rework)annotate a custom-action on the  resultClick from materiel and execute a function to control if ctrOperat is valid
					if(entityType==="Materiel" && !data.validCtrOperat){
						$rootScope.operations.notify('entity.materiel.warning-ctr-operat-title', 'entity.materiel.warning-ctr-operat');
					}
				    pageData.original = angular.copy($scope.entity);
				    $rootScope.operations.freeLoading('update_' + entityId);
				    if(entityType == 'ctrOperat'){
						$scope.entity.societes = $scope.entityMetadata.societes;
						$scope.entity.agences = $scope.entityMetadata.agences;
						$scope.entity.secteurs = $scope.entityMetadata.secteurs;
						$scope.entity.ctrMecaniques = $scope.entityMetadata.ctrMecaniques;
						$scope.entity.chantieres = $scope.entityMetadata.chantieres;
					}
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
  				
				  // TODO Verify commit triggers
				  var entity = $scope.entity;
				  
				  //Warning if the entity is user and has no related pair ctrOperat-role 
				  var emptyRoleForSomeCtrOperat = false;
				  if(entity.hasOwnProperty(util.constants.USER_ID)){
					  if(entity.roleCoUser==null || entity.roleCoUser.length==0){
						  $rootScope.operations.notify('entity.user.warning-no-pair-role-ctr-operat-title', 'entity.user.warning-no-pair-role-ctr-operat');
					  }else{					  
						  for(var i=0;i<entity.roleCoUser.length;i++){
							  //If some ctrOperat has no role => ERROR
							  if(entity.roleCoUser[i].role==null || entity.roleCoUser[i].role.length==0){ 
								  emptyRoleForSomeCtrOperat = true;
								  break;
							  }
						  }
					  }
				  }
				  
				  //Warning if the entity is role and has no related actions 
				  if($scope.entityMetadata.name == util.constants.SOURCE_ROLE){
					  if(entity.relActionRoles==null || entity.relActionRoles.length==0){
						  $rootScope.operations.notify('entity.user.warning-no-actions-role-title', 'entity.user.warning-no-actions-role-message');
					  }
				  }
				  
				  if(emptyRoleForSomeCtrOperat){
					  $rootScope.operations.notify('entity.user.warning-no-role-ctr-operat-title', 'entity.user.warning-no-role-ctr-operat','error');
					  isAllowed = false;
				  }
  			}
  			
  			if(!isAllowed && !emptyRoleForSomeCtrOperat){ //ano 7918
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
