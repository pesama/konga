'use strict';

/**
 * @ngdoc directive
 * @name sigmaNgApp.directive:updateForm
 * @description
 * # updateForm
 */
angular.module('sigmaNgApp')
  .directive('updateForm', function () {
    return {
		template: '<div ng-include="templateUrl"></div>',
		restrict: 'E',
		replace: true,
		scope: {
	      	entity: '=',
	      	metadata: '=',
	      	onUpdate: '=',
	      	onChange: '='
      	},
      	controller: function ($scope, $routeParams, api, common, fieldMapper, $filter, $rootScope, scaffold) {
	      	// Depending on the form type, the form will be rendered differently
	      	$scope.templateUrl = 'views/cascade-update.html';

	      	switch($scope.metadata.formType) {
	      	case constants.TABBED_FORM:
	      		$scope.templateUrl = 'views/tabbed-update.html';
	      		//Get the Categories
	    		$scope.categories = util.getEntityCategories($scope.metadata);
	      		break;
	      	}

		},
    	link: function postLink(scope, element, attrs) {
        	//element.text('this is the updateForm directive');

        	scope.fields = util.getEntityFields(scope.metadata);
   		}
    };
  });
