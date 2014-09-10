'use strict';

/**
 * @ngdoc directive
 * @name sigmaNgApp.directive:rawInput
 * @scope
 * @restrict E
 * @description
 * Defines an input that changes its appearance depending on the type the input field has. 
 *
 * # Data types
 * This directive supports several data types, which are rendered different and its data is managed also differently:
 *
 * ## Boolean inputs
 * Boolean inputs are rendered using two radio buttons, which the users can press and change the value. For searching, the input is converted to two checkboxes to let users choose between one or another, or both of them.
 *
 * ## Checkbox input (TODO Finish dev)
 * On this kind of input, a checkbox is rendered for each boolean input on the array of fields given.
 *
 * ## String input
 * This input is rendered as a text field (or a text area, depending on the lengths defined on the field properties - TODO!), for input any character.
 *
 * ## Date input
 * This input allows user to select a date, that is rendered on a text field.
 * 
 * ## Number input
 * TODO
 *
 * ## Email input
 * TODO
 *
 * ## Complex input
 * This input is used to select other entities and attach them to the source entity of the form. For doing such purpose, a few requirements need to be fulfilled:
 * <ul>
 * 	<li>
 *  	The {@link sigmaNgApp.Metadata metadata} {@link sigmaNgApp.Metadata#methods_codes codes} operation <b>must</b> receive a list of the codes available for the target entity type, in the form of:
 *  ```
 *	{
 * 		entity_id : [entity_code, entity_label]
 *	}
 * 	```
 *  	
 * 	</li>
 * </ul>
 * 
 * # Entity management
 * When using this input to render a form (which is the most common option) you may want to link the field to the entity. Thus on any field update the entity will be notified, and the object updation could be executed automatically (if the object is retrieved from a service - again, the most common option).
 *
 * 
 * @param {Object} property Field to modify with the input
 * @param {*} vertical TODO Document
 * @param {Boolean} disabled Defines whether the field is disabled
 * @param {Function} setValues Function called to set up the values (for complex inputs)
 * @param {Object} operations Available operations for the directive
 * @param {Boolean} ngRequired Defines whether the field is required
 * @param {Object} entity Defines the real entity to manage
 * @param {Object} metadata Defines the metadata of the entity
 * @param {Function} updateEntity Function to call when the field is updated
 * @param {Object} sourceList List of available product codes for that field type
 * @param {String} mode Defines the mode of the field (i.e. Search, Update). See {@link sigmaTools.Constants constants}
 */
angular.module('sigmaNgApp')
  .directive('rawInput', function() {
	    return {
	      restrict: 'E',
	      replace: true,
	      scope: {
	    	property: '=',
	    	vertical: '=',
	    	disabled: '=',
	    	setValues: '&',
	    	operations: '=',
	    	ngRequired: '=',
	    	entity: '=',
	    	metadata: '=',
	    	updateEntity: '=onUpdate',
	    	changeEntity: '=onChange',
	    	mode: '@',
	    	parentField: '='
	      },
	      controller: function($scope, $filter, $modal, $timeout, common, api, $rootScope) {
	      	var resolveWatcher = null, valueWatcher = null;
	      	var init = undefined, initCheck = false, initactive = true, initinactive = false;

	      	$scope.value = {
	      		text: '',
	      		list: []
	      	};

	      	$scope.label = '';

	      	var related = $scope.property.related;
	      	var entityLabel = null;
	      	var entityLabelPlaceholder = null;

	      	// If the field is not related, the entity type is the entity being updated
	      	// TODO Translate on change!
	      	if(!related) {
	      		entityLabel = $filter('translate')($scope.metadata.label);
	      		entityLabelPlaceholder = $scope.metadata.label;
	      	}
	      	else {
	      		var allMetadatas = common.read('metadata');
	      		var relatedMetadata = common.getMetadata(allMetadatas, related);
	      		entityLabel = $filter('translate')(relatedMetadata.label);
	      		entityLabelPlaceholder = relatedMetadata.label;
	      	}

	      	// Extra parameters for the internationalization
	      	$scope.extra = {
	      		label: entityLabel,
	      		labelPlaceholder: entityLabelPlaceholder
	      	};

			$scope.update = function(init) {
				var value = '';

				// if(this.mode === constants.SCOPE_UPDATE) {
					// There's an entity and it's ready to be used
					if(this.entity && this.entity.$resolved !== false) {
						var value;
						if(this.mode === constants.SCOPE_UPDATE) {
						    value = $filter('mapEdsField')($scope.entity, $scope.property);
						} else {
							value = $scope.entity[$scope.property.name];
						}

						// If the field is complex, get the source list for the related entity
						if($scope.property.type.type === constants.FIELD_COMPLEX) {

							var related = $scope.property.type.complexType;

							// Get the real metadata
							var realMetadata = common.getMetadata(related);

							// Store the entity
							this.value.metadata = realMetadata;

							// Store the values in the source list (for picking)
							var localEndpoint = api.getLocalEndpoint(related);
							if(localEndpoint) {
								$rootScope.operations.requestLoading('raw-input>' + $scope.property.name + ' ' +$scope.property.owner);
								localEndpoint.search({}, function(data) {
									$scope.value.list = data;
									$rootScope.operations.freeLoading('raw-input>' + $scope.property.name + ' ' +$scope.property.owner);
								});
							}

							// If updating do some extra stuff
							if($scope.mode === constants.SCOPE_UPDATE) {
								var realEntity;
								if(!$scope.parentField || $scope.parentField.multiplicity === constants.MULTIPLICITY_ONE) {
									realEntity = $filter('mapEdsField')($scope.entity, $scope.property);	
								}
								else {
									realEntity = [];
									for(var i = 0; i < $scope.entity.length; i++) {
										realEntity.push($filter('mapEdsField')($scope.entity[i], $scope.property));
									}
								}

								// Try and set a label
								try {
									$scope.label = util.getEntityLabel(realMetadata, realEntity);
								}catch(e) {
									// XXX muahahahahahhahahaha
								}

								$scope.value.entity = realEntity;

								// TODO Control multiplicity
								$scope.value.text = util.getEntityCode(realMetadata, realEntity);

							}

							// If there are some nested fields used, go on
							var nestFields = null;
							if($scope.mode === constants.SCOPE_SEARCH && $scope.property.searchable.fields.length) {
								nestFields = $scope.property.searchable.fields;
							} // for search :)
							else if($scope.mode === constants.SCOPE_UPDATE && $scope.property.showInUpdate.fields.length) { // And for update!
								nestFields = $scope.property.showInUpdate.fields;
							}

							// Is there some field to nest?
							if(nestFields) {
								var allFields = util.getEntityFields(realMetadata);
								var selectedFields = $filter('selectedFields')(allFields, nestFields);
								$scope.value.fields = selectedFields;
							}
						}
						else {
							$scope.value.text = value;
						}

						// Start watchers
						// Listen to value updates
						$scope.$watch('value.text', function(newValue, oldValue) {
							if(newValue !== oldValue) {
								$timeout(valueWatcher, 50);
							}
						});

						// Special treatment for checkboxes
						if($scope.mode === constants.SCOPE_SEARCH && $scope.property.type.type == constants.FIELD_BOOLEAN) {
							$scope.$watch('value.active', valueWatcher);
							$scope.$watch('value.inactive', valueWatcher);
						}
					}

					// There's an entity, but it's not ready to be used yet
					// Watch for changes and repeat
					else if(this.entity && this.entity.$resolved === false) {
						resolveWatcher = $scope.$watch('entity.$resolved', function() {
							if($scope.entity.$resolved !== false) {
								resolveWatcher();
								$scope.update(true);
							}
						})

					}
				// }
			};


			/**
	  		 * Determines whether to disable a field based on their properties
	  		 */
	  		$scope.disableField = function(mode, field) {

	  			// Get the editable flag
	  			var editable = field.editable;

	  			/* 
	  			 * If we are in search mode and the field is shown, 
	  			 * it will NEVER be disabled
	  			 */
	  			if(mode === constants.SCOPE_SEARCH) {
	  				return false;
	  			}

	  			// TODO Other filters

	  			/*
	  			 * In update mode, only the not editable fields would be disabled
	  			 */
	  			return !editable;
	  		};

	  		$scope.validation = {
	  			pattern: function() {

	  				// On search mode we don't need validation
	  				if($scope.mode === constants.SCOPE_SEARCH) {
	  					return new RegExp(".");
	  				}

	  				var regexp = new RegExp($scope.property.pattern);
	  				return regexp;
	  			},

	  			required: function() {
	  				// On search mode we don't need validation
	  				if($scope.mode === constants.SCOPE_SEARCH) {
	  					return false;
	  				}

	  				return $scope.property.validation.required;
	  			},

	  			minlength: function() {
	  				// On search mode we don't need validation
	  				if($scope.mode === constants.SCOPE_SEARCH) {
	  					return 0;
	  				}

	  				var minLength = $scope.property.validation.minLength;

	  				return minLength ? minLength : 0;
	  			},

	  			maxlength: function() {
	  				// On search mode we don't need validation
	  				if($scope.mode === constants.SCOPE_SEARCH) {
	  					return 0;
	  				}

	  				var maxLength = $scope.property.validation.maxLength;

	  				return maxLength ? maxLength : 0;
	  			}
	  		}

			valueWatcher = function() {
				initactive = $scope.value.active;
				initinactive = $scope.value.inactive;

				// Set the real value in the entity
				var sendValue = angular.copy($scope.value);
				var result = $scope.updateEntity($scope.property, sendValue, $scope.entity, $scope.parentField, $scope.$index);

				// Notify the changes (verify if there's someone listening too)
				if(result && $scope.changeEntity) {
					// Submit the changes to the parent controller
					var sendResult = angular.copy(result);
					$scope.changeEntity($scope.property, sendResult);
				}
			};

			// Listen for property changes
			// On update mode we listen with the path. On search mode with the field name 
			var listenerName = 'update_' + ($scope.mode === constants.SCOPE_UPDATE ? $scope.property.fieldPath : $scope.property.fieldName);
			$scope.$on(listenerName, function(events, args) {
				$scope.update();
			});
	  		
			// Listen for reset requests
			$scope.$on('reset', function(event, args) {
				$scope.update();
			});

			// Listen to locale changes
			$scope.$on('locale-change', function(data) {

		  		// Change the locale in the tabs
		  		$scope.extra.label = $filter('translate')($scope.extra.labelPlaceholder);
		  	});

			/*
			 * If the input is in 'search' mode, all list inputs will be multi-selectable.
			 * On 'update' mode, the list inputs only receive one value.
			 */
			var multiField = null;
			if($scope.mode === constants.SCOPE_SEARCH) {
				multiField = $scope.property.searchConf.multiplicity;
			}
			else if($scope.parentField) {
				multiField = $scope.parentField.multiplicity;
			}
			else {
				multiField = $scope.property.multiplicity;
			}

			var multi = multiField === constants.MULTIPLICITY_MANY;
			
			var selectTemplate 		= multi ? 'views/multi-select.html' : 'views/single-select.html';
			var selectController 	= multi ? 'MultiSelectCtrl' : 'SingleSelectCtrl';

			$scope.modal = {
				temp: {}
			};

			$scope.openMultiSelect = function () {
			    var modalInstance = $modal.open({
			      templateUrl: selectTemplate,
			      controller: selectController,
			      size: 'lg',
			      resolve: {
			        items: function () {
			          return $scope.value.list;
			        },
			        model: function() {
			        	return angular.copy($scope.value);
			        },
			        field: function() {
			        	return angular.copy($scope.property);
			        },
			        parentField: function() {
			        	return angular.copy($scope.parentField);
			        }
			      }
			    });
	
			    modalInstance.result.then(function (newValue) {
			    		$scope.value.text = newValue.text ? newValue.text.join(',') : '';
			    		$scope.value.ids = newValue.ids;
			    		$scope.value.entity = newValue.entity;

			    		// Get the label and in label
			    		$scope.label = util.getEntityLabel($scope.value.metadata, $scope.value.entity);

			    	 			    	
			    }, function () {
			      console.log('Operation canceled');
			    });
			  };
	      },
	      link: function(scope, element, attrs) {
			var fieldType = scope.property.fieldType[scope.mode];

			/*
			 *  Map some variables
			 */

			// Booleans on search mode are shown as checkboxes
			if(scope.mode === constants.SCOPE_SEARCH && fieldType == constants.FIELD_BOOLEAN) {
				fieldType = constants.FIELD_CHECKBOX; // Change radio to checkbox on search
				scope.value.text = '';
				scope.value.active = true;
				scope.value.inactive = false;
			}

			// Dates on search mode are displayed as two dates and a comparator (i.e. date-search)
			if(scope.mode === constants.SCOPE_SEARCH && fieldType === constants.FIELD_DATE) {
				fieldType = constants.FIELD_DATESEARCH;
			}

			// Text fields with 'maxLength' above 255 are rendered as text areas
			if(fieldType == constants.FIELD_PLAIN && scope.property.validation.maxLength > 255) {
				fieldType = constants.FIELD_TEXTAREA;
			}

			// Direct Entity keys are shown as text
			if(scope.property.related === null && scope.property.isKey) {
				fieldType = constants.FIELD_TEXT;
			}

			scope.contentUrl = 'views/raw-' + fieldType.toLowerCase() + '-input.html';
			scope.datePicker = { opened: false };
			scope.toggleDatePicker = function(){
				scope.datePicker.opened = (scope.datePicker.opened)? false:true;
			};
	          
			scope.aucun = null;

			scope.update(true);
		},
	    templateUrl: 'views/raw-input.html'
	};
});
