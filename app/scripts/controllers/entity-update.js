'use strict';

/**
 * @ngdoc function
 * @name sigmaNgApp.controller:EntityUpdateCtrl
 * @description
 * # EntityUpdateCtrl
 * Controller of the sigmaNgApp
 */
angular.module('sigmaNgApp')
.controller('EntityUpdateCtrl', ['$scope', '$routeParams', 'api', 'common', 'fieldMapper', '$filter', '$rootScope', 'scaffold', '$timeout', 
  	function ($scope, $routeParams, api, common, fieldMapper, $filter, $rootScope, scaffold, $timeout) {
	  	// Get the local params
		var entityType = $routeParams.entityType;
		var entityId	= $routeParams.entityId;

		function updateChanges() {
			// See if there are changes
			var hasChanges = false;
			if ($scope.changes.length > 0) {
			  // Emit the changes notification
			  hasChanges = true;
			}

			$scope.$emit('changes', { pageId: pageData.pageId, hasChanges: hasChanges });
		}

		var localEndpoint = api.getLocalEndpoint(entityType);

		// Initialize the entity
		$scope.entity = {};

		// Get the search element
		// TODO Conditionalify (¿?¿?¿?¿?)
		$scope.entityMetadata = common.getMetadata(entityType);

	    // See if the entity is eresable
	    $scope.deletable = $scope.entityMetadata.deleteable && (entityId !== constants.NEW_ENTITY_ID);
	      
		var allFields = util.getEntityFields($scope.entityMetadata);
		$scope.fields = $filter('filter')(allFields, { editable: true });

		// Get product codes
		// var productCodes = $scope.productCodes = common.read('product-codes');  js-hint not used

		var pageData = $rootScope.pageData;

		if (pageData.init) {
			$scope.entity = pageData.entity;
			$scope.changes = pageData.changes;
			updateChanges();
		} else {
			// Verify if we are creating or updating
			if (entityId != constants.NEW_ENTITY_ID) {

			  // Request a loader
			  $rootScope.operations.requestLoading('update_' + entityId);

			  // Get the current entity
			  $scope.entity = pageData.entity = localEndpoint.get({id: entityId}, function() {
			    pageData.original = angular.copy($scope.entity);
			    $rootScope.operations.freeLoading('update_' + entityId);
			  });
			} else {

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
	                    value: $filter('mapEdsField')($scope.entity, fieldPath)
	                  };
	                  $scope.$broadcast('update_' + fieldPath, message);
	                }
	              }

	              resolveWatcher();
	            }
	          });
	        // }
		}

		/**
		* TODO Document
		*/
		$scope.operations = {
			/**
			 * TODO Document
			 */
			saveEntity: function() {

			  // TODO Verify commit triggers
			  var entity = $scope.entity;
			  
			  // Verify if the entity is new
			  if(entityId === constants.NEW_ENTITY_ID) {
			    
			    // Create eds
			    entity.$create(
			    		function(data) {
					      $rootScope.operations.addAlert(constants.ALERT_TYPE_SUCCESS, 'global.entity-create-success'); 
					      $scope.changes = [];
					      pageData.original = angular.copy(data);
					      $scope.entity = pageData.entity = data;
					      updateChanges();

					      // Request a tab closing and a tab opening in update mode
					      $rootScope.operations.closeTabById(pageData.pageId);

					      // we open it delay as it takes some time to close.
					      $timeout(function() {
					      	$rootScope.operations.openEntityUpdate($scope.entityMetadata, $scope.entity);
					      }, 50);
			    		}, 
			    		function(error) {
			    			$rootScope.operations.addAlert(constants.ALERT_TYPE_ERROR, 'global.operation-incomplete'); 
			    		});
			  } else {
			    // Save eds
				  entity.$save(
					  function(data) {
				      $rootScope.operations.addAlert(constants.ALERT_TYPE_SUCCESS, 'global.changes-success');
				      $scope.changes = [];
				      pageData.original = angular.copy(data);
				      $scope.entity = pageData.entity = data;
				      updateChanges();
				    }, function(error) {
				      $rootScope.operations.addAlert(constants.ALERT_TYPE_ERROR, 'global.operation-incomplete'); 
				    });
			  }
			},

			cancelUpdate: function() {
				
			  // Remove all page parameters
			  pageData.init = false;

			  // Close the page
			  $rootScope.operations.closeTabById(pageData.pageId);
			},
			
			deleteEntity: function() {			  
				function okDeleteEntity() {
					localEndpoint.delete({id: util.getEntityId($scope.entityMetadata, entity)}, 
							function success(data) {
								$rootScope.operations.addAlert(constants.ALERT_TYPE_SUCCESS, 'global.delete-success'); 
							}, 
							function error() {
								$rootScope.operations.addAlert(constants.ALERT_TYPE_ERROR, 'global.operation-incomplete'); 
							});
					// Remove all page parameters
					pageData.init = false;

					// Close the page
					$rootScope.operations.closeTabById(pageData.pageId);
				}			
				
				function koDeleteEntity() {					
				}
		      
				var entity = $scope.entity;

 			    // Verify if the entity is not new
			    if (entityId !== constants.NEW_ENTITY_ID) {
				  $rootScope.operations.confirm('message.entiteDeletable.deleting.title', 'message.entiteDeletable.deleting.message', okDeleteEntity, koDeleteEntity);
			    }			 
			},

			changeEntityField: function(metadata, result) {
				// Trigger callbacks
				function okHandler() {
            		$scope.operations.saveEntity();
            	}

            	function koHandler() {
            		// TODO Change when storing actions.
	                var undoValue = angular.copy(result);
	                undoValue.text = oldValue;

	                $scope.operations.updateEntityField(metadata, undoValue);

	                $scope.$broadcast('update_' + metadata.fieldPath, {/* TODO Add something here */});
            	}

				var fieldValue = result.text;
				if ($scope.entity.$resolved === false) {
					return;
				}

				// Is there any difference?
				var oldValue = $filter('mapEdsField')(pageData.original, metadata);
				var differs = fieldValue !== oldValue;

			    var index = $scope.changes.indexOf(metadata.fieldName);

			    // Has changes?
			    if (differs && index === -1) {
			      $scope.changes.push(metadata.fieldName);

			      // Verify immediate triggers
			      // TODO Verify scope
			      var triggers = metadata.triggers;
			      for (var i = 0; i < triggers.length; i++) {
			        var trigger = triggers[i];

			        // Is the moment 'immediate'?
			        if (trigger.moment === constants.TRIGGER_MOMENT_IMMEDIATE) {

  			          // Does the trigger criteria match?
			          if (fieldValue == trigger.value) { // FIXME Does it work without casting?
			            // TODO Verify 'changed' flag
			          
			            // Verify trigger type
			            switch (trigger.action) {
			            case constants.TRIGGER_ACTION_CONFIRM:
							// TODO Change appearance
			            	$rootScope.operations.confirm(trigger.parameters[0], trigger.parameters[1], okHandler, koHandler);

			              break;
			            // TODO Other types
			            default:
			              break;
			            }
			          }
			        }
			      }
			    } else if(!differs && index !== -1) {
				  // Or not?
			      $scope.changes.splice(index, 1);
			    }
			    updateChanges();
			},

			/**
			 * TODO Document
			 */
			updateEntityField: function(metadata, value) {
			  // Persist the changes on the entity
			  var result = fieldMapper.unmapField(metadata, entityType, $scope.entity, value);
			  if (result) {
			    // Get the escaped value
			    var escaped = result.escaped;
			    if (escaped) {

			      // Verify if it's a resource (see if field type is 'complex')
			      var fieldType = metadata.fieldType;
			      var multiplicity = metadata.multiplicity;
			      if (fieldType === constants.FIELD_COMPLEX || fieldType == constants.FIELD_LIST) {
			    	// If multiplicity is one, we create an array only with it
			      	// Otherwise we use the source array
			      	var path = result.path;
			      	var extraPath = '';
			      	if(escaped.$resolved !== false) {

				      	// If no item is selected, we update the field as-is
				      	if (!escaped.length) {
				      		$scope.$broadcast('update_' + metadata.fieldPath, {/* TODO Add something here */});
				      	}

				      	// Now let's listen to changes
				      	for (var i = 0; i < escaped.length; i++) {
				      		if (multiplicity === constants.MULTIPLICITY_MANY) {
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

		$scope.$on('discard', function(conf, data) {
			if (data.pageId === pageData.pageId) {
			  // Are we updating?
			  if (entityType !== 'new') {

			    // we charge from REST because we have it cached
			    $scope.entity = pageData.entity = localEndpoint.get({id: entityType});
			  }
			}
		});
  }]);
