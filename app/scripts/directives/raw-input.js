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

						// On search path does not exist, and the entity field it's always a property directly under the query
						var path = $scope.property.fieldName;

						// But on update the path could be different, as some fields might be related, and thus 
						// have longer paths
						if(this.mode === constants.SCOPE_UPDATE) {
							path = $scope.property.fieldPath;
						}

						var value;
						if(this.mode === constants.SCOPE_UPDATE) {
						    value = $filter('mapEdsField')($scope.entity, $scope.property);
						} else {
							value = $scope.entity[$scope.property.fieldName];
						}

						// If the field is complex, get the source list for the related entity
						if($scope.property.type.type === constants.FIELD_COMPLEX) {

							var related = $scope.property.type.complexType;

							// Get the real metadata
							var realMetadata = common.getMetadata(related);

							// Store the entity
							this.value.entity = realMetadata;

							// Store the values in the source list (for picking)
							var localEndpoint = api.getLocalEndpoint(related);
							$rootScope.operations.requestLoading('raw-input>' + $scope.property.name + ' ' +$scope.property.owner);
							localEndpoint.search({}, function(data) {
								$scope.value.list = data;
								$rootScope.operations.freeLoading('raw-input>' + $scope.property.name + ' ' +$scope.property.owner);
							});

							// If updating do some extra stuff
							if($scope.mode === constants.SCOPE_UPDATE) {
								var realEntity = $filter('mapEdsField')($scope.entity, $scope.property);

								$scope.label = util.getEntityLabel(realMetadata, realEntity);

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
								$scope.value.metadata = realMetadata;
							}
						}
						
						else{
							var isKey = $scope.property.isKey; 
							if($scope.property.related && $scope.property.type.type === constants.FIELD_LIST &&  $scope.property.multiplicity === constants.MULTIPLICITY_MANY  && $scope.mode === constants.SCOPE_UPDATE && ($scope.property.isKey == true)) {
								
								var originalPath = $scope.property.fieldPath;
								
								//Split by entities
								var entities = originalPath.split('.');
							
								// Get the real entity
								//FIX THIS!!!!!! It's only valid for many to many cases (for instance: relActionRoles.action.libaction) 
								var realEntity = $filter('mapEdsField')($scope.entity, entities[0]);
								
								//Set the values in the list
								this.value.list = [];
								
								for (var i = 0; i < realEntity.length; i++){
									
									var prefix;
									var variable;
									
									if (entities.length >= 4){
										prefix = entities.slice(0, entities.length - 4).join('.');
										variable = prefix.concat(entities.slice(entities-length-3, entities.length-2).join('.').concat('.'+i+'.').concat(entities.slice(entities.length-2, entities.length-1).join('.')));
									}
									else{
										variable = entities.slice(entities.length-3, entities.length-2).join('.').concat('.'+i+'.').concat(entities.slice(entities.length-2, entities.length-1).join('.'));
									}
									
									this.value.list.push($filter('mapEdsField')($scope.entity, variable));
									

								}
							}

							if(value !== undefined) {
								if ($scope.property.type.type === constants.FIELD_DATE)
									this.value.text = $filter("date")(new Date(value), 'yyyy-MM-dd'); 
								else
									this.value.text = value;
							}
						}

						// if(typeof value === 'object') {
						// 	this.value.data = value;
						// 	if ($scope.property.type.type === constants.FIELD_COMPLEX || $scope.property.type.type === constants.FIELD_LIST) {
						// 		this.value.text = value ? value.join(',') : '';
						// 	}
						// }

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
				// if((init !== undefined && $scope.value.text != init) || (initCheck !== false && ($scope.value.active !== initactive || $scope.value.inactive !== initinactive))) {

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

					init = result ? result.text : null;
					// TODO Modify when auto-completing
					if(init !== undefined) {
						// TODO Change temp to $scope
						if(init && init.split) $scope.modal.temp.value = init.split(',');
						else $scope.modal.temp.value = init;
					}
					else {
						$scope.modal.temp.value = null;
					}
				// }
			}

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

			var multi = $scope.mode === constants.SCOPE_SEARCH || $scope.property.multiplicity === constants.MULTIPLICITY_MANY;

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
			        }
			      }
			    });
	
			    modalInstance.result.then(function (newValue) {
			    		$scope.value.text = newValue.text ? newValue.text.join(',') : '';
			    		$scope.value.ids = newValue.ids;
			    	 			    	
			    }, function () {
			      console.log('Operation canceled');
			    });
			  };

			  // Inputs with multiplicity = MANY are rendered as lists
			if($scope.property.multiplicity === constants.MULTIPLICITY_MANY) {
				// Get the entityType
				var related = $scope.property.related;

				// Array of fields for the table
				var allMetadatas = common.read('metadata');
	      		var relatedMetadata = common.getMetadata(allMetadatas, related);
	      		var entityFields = util.getEntityFields(relatedMetadata);
	      		$scope.entityFields = $filter('showInResults')(entityFields, relatedMetadata);

				// var list = $scope.sourceList;
				// var res = [];
				// for(var item in list) {
				// 	var id = item;
				// 	var key = list[item][0];
				// 	var value = list[item][1];

				// 	// TODO Verify added

				// 	var obj = {
				// 		id: id,
				// 		key: key,
				// 		value: value
				// 	}
				// 	res.push(obj);
				// }
				// $scope.sourceArray = res;

				// var localEndpoint = api.getLocalEndpoint(related);
				// $scope.sourceArray = localEndpoint.search();
				//$scope.value.list = [];

			}
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

			// Inputs with multiplicity = MANY are rendered as lists
			if(scope.property.multiplicity === constants.MULTIPLICITY_MANY) {
				fieldType = constants.FIELD_LIST;
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
