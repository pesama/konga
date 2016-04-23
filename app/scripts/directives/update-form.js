'use strict';

/**
 * @ngdoc directive
 * @name konga.directive:updateForm
 * @restrict E
 * @description
 *
 * Handles rendering and operations of updation/creation forms. It connects to the {@link konga.controller:EntityUpdateController `EntityUpdateController`} through several operations for field mapping, change notifictions, etcetera.

<img src="/static/update-form-basic-flow.png" width="80%" class="center">

The first operation is to receive fields, categories and fieldSets, that are used to render the update layout. These elements are provided to the view determined on the {@link Metadata.Field field's `formType`}.

Views are based on {@link konga.directive:rawInput `rawInput`} directives, who controls validation and mapping, along with all other field operations.

@param {Object} metadata
<span class="label type-hint type-hint-object">{@link Metadata.Entity Entity}</span>
The metadata of the entity being managed

@param {Object} entity
The entity object to map values to

@param {Boolean} creating
Whether the mode is `creation`.

@param {Array=} fields
Optionally, include a set of fields instead of retrieving all from the entity (default when this value is not set).

@param {function()} onUpdate
Define the behavior for field-update procedures - when an input's value changes. This function signature shall be similar to the default {@link konga.controller:EntityUpdateController#methods_updateEntityField `updateEntityField`} method, present on the {@link konga.controller:EntityUpdateController `EntityUpdateController`}. 

@param {function()=} onChange
Optional change tracker to know whether the field has changed

 */
angular.module('konga')
  .directive('updateForm', ['$routeParams', 'api', 'common', 'fieldMapper', '$filter', 'util', 'mapper', 
  	function ($routeParams, api, common, fieldMapper, $filter, util, mapper) {
	    return {
			template: '<div ng-include="templateUrl"></div>',
			restrict: 'E',
			replace: true,
			scope: {
		      	entity: '=',
		      	changes: '=',
		      	metadata: '=',
		      	params: '=',
		      	onUpdate: '=?',
		      	creating: '=',
		      	onChange: '=?',
		      	fields: '=?',
	      	},
	    	link: function postLink(scope, element, attrs) {
	        	// Depending on the form type, the form will be rendered differently
		      	scope.templateUrl = '/konga/views/cascade-update.html';

		      	if(!scope.fields) {
		      		scope.fields = util.getEntityFields(scope.metadata);
		      	}

		      	switch(scope.metadata.updateType) {
			      	case util.constants.TABBED_FORM:
			      		scope.templateUrl = '/konga/views/tabbed-update.html';
			      		//Get the Categories
			    		scope.fieldsets = util.getEntityFieldSets(scope.metadata);
		
			      		break;
			      	case util.constants.CUSTOM_TABBED_FORM:
			      		scope.templateUrl = '/konga/views/custom_tabbed-update.html';

			      		//Get the Categories
			    		scope.fieldsets = util.getEntityFieldSets(scope.metadata);

			    		scope.getView = function(name) {
			    			var view = mapper[name];

			    			if(!view) {
			    				// TODO Throw exception
			    			}

			    			return view;
			    		};

			      		break;	
			      	case util.constants.CUSTOM_FORM:
			      		var configuration = $filter('filter')(scope.metadata.configuration, { key: util.constants.UPDATE_CUSTOM_VIEW });
			      		if(!configuration.length) {
			      			// TODO Show exception
			      		}
			      		// Try mapped
			      		var templateUrl = mapper[configuration[0].value];
			      		if(!templateUrl) templateUrl = configuration[0].value;
			      		if(!templateUrl) {
			      			// TODO Throw exception
			      		}
			      		scope.templateUrl = templateUrl;
			      		
			      		break;
		      	}

		      	function updateChanges() {
					// See if there are changes
					var hasChanges = false;
					if ($scope.changes.length > 0) {
					  // Emit the changes notification
					  hasChanges = true;
					}

					$scope.$emit('changes', { pageId: pageData.pageId, hasChanges: hasChanges });
					$scope.$emit('changesCtrOperat', { type: scope.metadata.name, hasChanges : hasChanges });
				}

		      	scope.changeEntityField = function(metadata, result) {
					// Trigger callbacks
					function okHandler() {
						var refreshSearchKey = util.constants.REFRESH_SEARCH_KEY + scope.metadata.name;
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
				};

				/**
				 * @ngdoc function
				 * @methodOf konga.controller:EntityUpdateController
				 * @name operations.updateEntityField
				 * @description
				 *
				 * Performs updates on the entity being managed once the system detects changes on a field. While this is not needed for plain fields - as the {@link https://docs.angularjs.org/api/ng/directive/ngModel `ngModel`} directive does the trick - it's a cool feature for complex fields, as - by leveraging the {@link konga.fieldMapper `fieldMapper`} - the metadata is used to determine data types, and the entities modified accordingly.
				 *
				 * @param {Object} metadata
				 * <span class="label type-hint type-hint-object">{@link Metadata.Field `Field`}</span>
				 * The entity being managed by the form.
				 *
				 * @param {Object} value
				 * The `value` object managed by the {@link konga.directive:rawInput `rawInput`} directive.
				 *
				 * @param {Object} entity
				 * Your entity. This is the place where the field's value will be set.
				 *
				 * @param {Object=} parentField
				 * <span class="label type-hint type-hint-object">{@link Metadata.Field `Field`}</span>
				 * If you are dealing with a complex field - and the change origin was on an inner field - this parameter will contain the `root` field - i.e. the `complex` one.
				 *
				 * @param {Object=} parentEntity
				 * If you are dealing with a complex field - and the change origin was on an inner field - contains the `root` entity.
				 * 
				 */
				scope.updateEntityField =  function(metadata, value, entity, parentField, parentEntity) {
				  // Persist the changes on the entity
				  var result = fieldMapper.unmapField(metadata, scope.metadata.name, entity, value, parentField, parentEntity);
				  
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
				};

		      	scope.$on('changeTab', function(events, args){

		    		scope.$broadcast('tabChangeCustomTabbed', {tab: args.tab} );

		    	});

		    	if(!scope.onUpdate) scope.onUpdate = scope.updateEntityField;
		    	if(!scope.onChange) scope.onChange = scope.changeEntityField;
	   		}
	    };
	  }]);
