'use strict';

/**
 * @ngdoc directive
 * @name konga.directive:updateForm
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
Define the behavior for field-update procedures - when an input's value changes.

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
		      	onUpdate: '=',
		      	creating: '=',
		      	onChange: '=',
		      	fields: '=?'
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
		      	scope.$on('changeTab', function(events, args){

		    		scope.$broadcast('tabChangeCustomTabbed', {tab: args.tab} );

		    	});
	   		}
	    };
	  }]);
