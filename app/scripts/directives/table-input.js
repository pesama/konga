'use strict';

/**
 * @ngdoc directive
 * @name Konga Reference.directive:Table input
 * @description
 * # tableInput
 */
angular.module('konga')
  .directive('tableInput', ['$filter', '$timeout', 'scaffold', 'util', 
      function ($filter, $timeout, scaffold, util) {
    return {
      templateUrl: '/konga/views/table-input.html',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {

      	var entityFields = util.getEntityFields(scope.metadata);

      	var innerEntityTypeName = scope.property.type.complexType;
      	var innerEntityType = util.getMetadata(innerEntityTypeName);
      	var innerEntityTypeFields = util.getEntityFields(innerEntityType);

      	// Rows
      	scope.rows = null;

      	// Columns
      	scope.columns = null;

      	// Limit X values
      	scope.minX = null;
      	scope.maxX = null;

      	// Limit Y values
      	scope.minY = null;
      	scope.maxY = null;

      	// Step values
      	scope.stepX = null;
      	scope.stepY = null;

      	// Value field (TODO Configure)
      	scope.valueField = 'value';

      	// Init timeout
      	var initTimeout = null;

      	// Read configuration
      	var configuration = scope.configuration = {};
      	var configurationSource = scope.property.fieldType.configuration[0];
      	
      	// X Axis Property
      	var xAxisPropertyConfiguration = $filter('filter')(configurationSource, { key: constants.TABLE_CONF_X_AXIS_PROPERTY }, true)[0];
      	var xAxisPropName = xAxisPropertyConfiguration.value;
      	configuration.xAxisProperty = $filter('filter')(innerEntityTypeFields, { name: xAxisPropName }, true)[0];

      	// Y Axis Property
      	var yAxisPropertyConfiguration = $filter('filter')(configurationSource, { key: constants.TABLE_CONF_Y_AXIS_PROPERTY }, true)[0];
      	var yAxisPropName = yAxisPropertyConfiguration.value;
      	configuration.yAxisProperty = $filter('filter')(innerEntityTypeFields, { name: yAxisPropName }, true)[0];

      	// Limits
      	function initLimits(first) {
      		// Get conf
      		var xAxisMinConfiguration = $filter('filter')(configurationSource, { key: constants.TABLE_CONF_X_AXIS_MIN })[0];
      		var yAxisMinConfiguration = $filter('filter')(configurationSource, { key: constants.TABLE_CONF_Y_AXIS_MIN })[0];
      		var xAxisMaxConfiguration = $filter('filter')(configurationSource, { key: constants.TABLE_CONF_X_AXIS_MAX })[0];
      		var yAxisMaxConfiguration = $filter('filter')(configurationSource, { key: constants.TABLE_CONF_Y_AXIS_MAX })[0];

      		// Get prop names
      		var xAxisMinPropName = xAxisMinConfiguration.value.replace(/[\{\}]/g, '');
			var yAxisMinPropName = yAxisMinConfiguration.value.replace(/[\{\}]/g, '');
			var xAxisMaxPropName = xAxisMaxConfiguration.value.replace(/[\{\}]/g, '');
			var yAxisMaxPropName = yAxisMaxConfiguration.value.replace(/[\{\}]/g, '');

			// Get properties
			var xAxisMinProperty = $filter('filter')(entityFields, { name: xAxisMinPropName })[0];
			var yAxisMinProperty = $filter('filter')(entityFields, { name: yAxisMinPropName })[0];
			var xAxisMaxProperty = $filter('filter')(entityFields, { name: xAxisMaxPropName })[0];
			var yAxisMaxProperty = $filter('filter')(entityFields, { name: yAxisMaxPropName })[0];

			// Assign initial values
			scope.minX = $filter('mapField')(scope.entity, xAxisMinProperty);
			scope.minY = $filter('mapField')(scope.entity, yAxisMinProperty);
			scope.maxX = $filter('mapField')(scope.entity, xAxisMaxProperty);
			scope.maxY = $filter('mapField')(scope.entity, yAxisMaxProperty);

			// Add watchers (only first time)
			if(first === true) {
				scope.$watch('entity.' + xAxisMinPropName, initLimits);
				scope.$watch('entity.' + xAxisMaxPropName, initLimits);
				scope.$watch('entity.' + yAxisMinPropName, initLimits);
				scope.$watch('entity.' + yAxisMaxPropName, initLimits);
			}
			else {
				if(initTimeout) {
					$timeout.cancel(initTimeout);
					initTimeout = null;
				}
				initTimeout = $timeout(function() {
					init();
				}, 500);
			}
      	}

      	// Steps
      	function initSteps(first) {
      		// Get conf
      		var xAxisStepConfiguration = $filter('filter')(configurationSource, { key: constants.TABLE_CONF_X_AXIS_STEP })[0];
      		var yAxisStepConfiguration = $filter('filter')(configurationSource, { key: constants.TABLE_CONF_Y_AXIS_STEP })[0];

      		// Get prop names
      		var xAxisStepPropName = xAxisStepConfiguration.value.replace(/[\{\}]/g, '');
			var yAxisStepPropName = yAxisStepConfiguration.value.replace(/[\{\}]/g, '');

			// Get properties
			var xAxisStepProperty = $filter('filter')(entityFields, { name: xAxisStepPropName })[0];
			var yAxisStepProperty = $filter('filter')(entityFields, { name: yAxisStepPropName })[0];

			// Assign initial values
			scope.stepX = $filter('mapField')(scope.entity, xAxisStepProperty);
			scope.stepY = $filter('mapField')(scope.entity, yAxisStepProperty);

			// Add watchers(only first time)
			if(first === true) {
				scope.$watch('entity.' + xAxisStepPropName, initSteps);
				scope.$watch('entity.' + yAxisStepPropName, initSteps);
			}
			else {
				if(initTimeout) {
					$timeout.cancel(initTimeout);
					initTimeout = null;
				}
				initTimeout = $timeout(function() {
					init();
				}, 500);
			}
      	}

      	function init() {
      		if(!(scope.minX > 0 && scope.minY > 0 && scope.stepX > 0 && scope.stepY > 0 && scope.maxX > scope.minX && scope.maxY > scope.minY)) {
      			return;
      		}

      		// Calculate difference between max and min
      		var difX = scope.maxX - scope.minX;
      		var difY = scope.maxY - scope.minY;

      		// TODO Warn if division is decimal

      		// Calculate rowNum and colNum
      		var rowNum = (difY / scope.stepY) | 0;
      		var colNum = (difX / scope.stepX) | 0;

      		// Generate rows
      		var rows = scope.rows = [];
      		if(rowNum > 0) {
	      		for(var i = 0; i <= rowNum; i++) {
	      			rows.push({
	      				value: scope.minY + i * scope.stepY
	      				// TODO Other values?
	      			});
	      		}
      		}

      		// Generate columns
      		var columns = scope.columns = [];
      		if(colNum > 0) {
	      		for(var i = 0; i <= colNum; i++) {
	      			columns.push({
	      				value: scope.minX + i * scope.stepX
	      			});
	      		}
      		}

      		// Generate steps
      		var steps = scope.steps = [];
      		// TODO Verify existence
      		var existingSteps = $filter('mapField')(scope.entity, scope.property);
      		for(var r = 0; r < rows.length; r++) {
      			for(var c = 0; c < columns.length; c++) {
      				// Does it exist within the entity?
      				var queryObj = {};
      				queryObj[xAxisPropName] = columns[c].value;
      				queryObj[yAxisPropName] = rows[r].value;
      				var existingStep = $filter('filter')(existingSteps, queryObj, true)[0];

      				// It does exist
      				if(existingStep) {
      					steps.push(existingStep);

      					// TODO Setup rendered flag
      				}

      				// It does not, create new one
      				else {
      					var newStep = scaffold.newEntity(innerEntityType);
      					newStep[xAxisPropName] = columns[c].value;
      					newStep[yAxisPropName] = rows[r].value;

      					// Setup provisory flag
      					newStep.$provisory = true;

      					steps.push(newStep);
      				}
      			}
      		}

      		// TODO Configure warnings
      	}

      	if(scope.entity.$resolved !== false) {
      		initLimits(true);
      		initSteps(true);
      		init();
      	}
      	else {
      		var resolveWatcher = scope.$watch('entity.$resolved', function() {
      			if(scope.entity.$resolved !== false) {
      				resolveWatcher();
      				initLimits(true);
      				initSteps(true);
      				init();
      			}
      		})
      	}

      	scope.getQueryObj = function(row, column) {
      		var queryObj = {};
      		queryObj[xAxisPropName] = column.value;
      		queryObj[yAxisPropName] = row.value;

      		return queryObj;
      	};

      	scope.updateValue = function(step) {
      		// TODO Setup min value
      		if(step.value > 0) {
      			if(step.$invalid) delete step.$invalid;
  			} 
  			else {
  				step.$invalid = true;
  			}
      		// We only update if the step is provisory, as definitive steps get updated automatically
      		if(step.$provisory) {
      			// Update entity
      			delete step.$provisory;
      			scope.value.entity.push(step);
      		}
      		else {
      			var listenerName = scope.property.owner + '_' + scope.property.name;
      			scope.$emit('manually_change_' + listenerName);
      		}

      		var invalidSteps = $filter('filter')(scope.steps, { $invalid: true });
      		
      		scope.$emit('form-invalid', {
				field: scope.property.name,
				owner: scope.property.owner,
				validation: 'table-valid',
				valid: !invalidSteps.length
			});
      	};
      }
    };
  }]);
