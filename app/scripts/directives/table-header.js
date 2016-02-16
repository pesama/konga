'use strict';

/**
 * @ngdoc directive
 * @name Konga Reference.directive:Table header
 * @description
 * # tableHeader
 */
angular.module('konga')
  .directive('tableHeader', function () {
    return {
      templateUrl: '/konga/views/table-header.html',
      restrict: 'E',
      replace: true,
      scope: {
      	field: '=',
        selectSortingField: '=sorting',
      	showSorting: '=',
        mode: '@'
      },
      controller: function($scope, $filter, $rootScope) {
      	$scope.label = $scope.field.label;
      	$scope.owner = '';
      	var sourceField = $scope.field;
        $scope.sort = null;
        $scope.styles = [];

        if(['CSS', 'NUMBER', 'PRICE'].indexOf($scope.field.fieldType.results) !== -1) {
          $scope.styles.push('text-center');
        }
      	
      	if($scope.field.owner){
      		for(var i = 0; i < $rootScope.metadata.entities.length; i++){
      			if($scope.field.owner == $rootScope.metadata.entities[i].name){
      				if($rootScope.metadata.entities[i].label != null){
      					$scope.owner = $filter('translate')($rootScope.metadata.entities[i].label);
      				}else{
      					$scope.owner = $scope.field.owner;
      				}
      				break;
      			}
      		}
      	}

        if($scope.field.derived) {
        	// Get the original field to know it's configuration
        	sourceField = $scope.field.derivedPath[0];
        }

        if(!$scope.field.derived && $scope.field.isKey) {
          $scope.sort = 'asc';
        }

        var configurationSource = [];

        switch($scope.mode) {
        case constants.SCOPE_RESULTS:
          configurationSource = sourceField.showInResults.configuration;
          break;
        case constants.SCOPE_UPDATE:
          configurationSource = $scope.field.showInUpdate.configuration;
          break;
        }

        var configuration = $filter('filter')(configurationSource, { key: constants.USE_SHORT_LABEL });

      	if(configuration && configuration.length && configuration[0].value === 'true') {
      		$scope.label = $scope.field.shortLabel;
      	}

        $scope.sorting = function(type) {
          // if($scope.field.derived) {
          //   var action = {
          //     name: 'action-under-development'
          //   };

          //   $rootScope.operations.dispatchAction(action, {});
          // }
          // else {
            $scope.selectSortingField($scope.field, type);
          // }
        };

        var watchers = null;
        $scope.$on('suspend', function() {
          watchers = $scope.$$watchers;
          $scope.$$watchers = [];
        });

        $scope.$on('resume', function() {
          $scope.$$watchers = watchers;
        });

        $scope.$on('sorting', function(evt, args) {
          var field = args.field;
          var type = args.type;

          if(field === $scope.field) {
            $scope.sort = type;
          }
          else {
            $scope.sort = null;
          }
        });
      },
      link: function postLink(scope, element, attrs) {
      }
    };
  });
