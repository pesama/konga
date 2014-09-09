'use strict';

/**
 * @ngdoc directive
 * @name sigmaNgApp.directive:formInfo
 * @description
 * # formInfo
 */
angular.module('sigmaNgApp')
  .directive('formInfo', function() {
	return {
		restrict: 'E',
		scope: {
			metadata : '=',
			entity : '='
		},
		templateUrl: 'views/form-info.html',
		controller: function($scope) {
			// Get the code
			$scope.idField = util.getEntityId($scope.metadata, null, true);

			/**
			 * @description Stores all available operations for the filtermanager
			 */
			$scope.operations = {
				selectFilter: function(filter) {
					// TODO Assert not null					
					$scope.filter = filter;
				}
			}
		},
		link: function(scope, element, attrs) {          
       	}
	};
});