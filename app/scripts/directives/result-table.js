'use strict';

/**
 * @ngdoc directive
 * @name sigmaNgApp.directive:resultTable
 * @scope
 * @restrict E
 * @description
 * Defines a result table that shows the results of a search.
 */
angular.module('sigmaNgApp')
  .directive('resultTable', function () {
    return {
      templateUrl: 'views/result-table.html',
      replace: true, 
      restrict: 'E',
      scope: {
      	entityMetadata: '=',
      	entities: '=',
        update: '=onUpdate',
        paginationData: '=',
        paginationUpdate:'=',
        filterCode : '='
      },
      controller : function ($scope, $filter) {
        $scope.filerData = function () {
          var dataFilter = $filter('filter')($scope.entities, $scope.filterCode);
          $scope.paginationUpdate(dataFilter);
        }
      },
      link: function postLink(scope, element, attrs) {
        scope.fields = util.getEntityFields(scope.entityMetadata);
        // scope.$watchCollection('filterCode', scope.filerData)
        
        scope.showInRed = function(statut) {
        	return (angular.isUndefined(statut) || statut == null || statut ==true); 
        }
      }
      
    };
  });
