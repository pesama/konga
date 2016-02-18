'use strict';

/*
 * @ngdoc directive
 * @name Konga Reference.directive:Update form
 * @description
 * # updateForm
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
	      	controller: function ($scope) {
		      	// Depending on the form type, the form will be rendered differently
		      	$scope.templateUrl = '/konga/views/cascade-update.html';

		      	if(!$scope.fields) {
		      		$scope.fields = util.getEntityFields($scope.metadata);
		      	}

		      	switch($scope.metadata.updateType) {
			      	case util.constants.TABBED_FORM:
			      		$scope.templateUrl = '/konga/views/tabbed-update.html';
			      		//Get the Categories
			    		$scope.categories = util.getEntityCategories($scope.metadata, 1);
		
			    		$scope.matchCategory = function(index, category) {
			    			var field = $scope.fields[index];
			    			return field.categories.indexOf(category) !== -1;
			    		};
		
			      		break;
			      	case util.constants.CUSTOM_TABBED_FORM:
			      		$scope.templateUrl = '/konga/views/custom_tabbed-update.html';

			      		//Get the Categories
			    		$scope.fieldsets = util.getEntityFieldSets($scope.metadata);

			    		$scope.getView = function(name) {
			    			var view = mapper[name];

			    			if(!view) {
			    				// TODO Throw exception
			    			}

			    			return view;
			    		};

			      		break;	
			      	case util.constants.CUSTOM_FORM:
			      		var configuration = $filter('filter')($scope.metadata.configuration, { key: util.constants.UPDATE_CUSTOM_VIEW });
			      		if(!configuration.length) {
			      			// TODO Show exception
			      		}
			      		$scope.templateUrl = mapper[configuration[0].value];
			      		
			      		break;
		      	}
		      	$scope.$on('changeTab', function(events, args){

		    		$scope.$broadcast('tabChangeCustomTabbed', {tab: args.tab} );

		    	}); 


			},
	    	link: function postLink(scope, element, attrs) {
	        	//element.text('this is the updateForm directive');
	   		}
	    };
	  }]);
