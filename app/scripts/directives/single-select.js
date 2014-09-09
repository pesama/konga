'use strict';

angular.module('sigmaNgApp')
  .directive('singleSelect', function () {
    return {
      templateUrl: 'views/single-select.html',
      restrict: 'E',
      scope: {
      	sourceList: '=',
      	model: '='
      },
      controller: function($scope, $filter) {

      	// Stores the selected value
      	$scope.selected = null;

      	function updateValue() {
      		var codes = null;
      		var ids = null;
      		if($scope.selected) {
      			codes = $filter('onlyCodeEds')([$scope.selected]);
				ids = $filter('onlyIdEds')([$scope.selected]);
      		}
			$scope.model.value = {
				text: codes,
				ids: ids
			};
		}

      	/*
         * TODO Document
         */
        $scope.operations = {
        	init: function() {
				var list = $scope.sourceList;
				var res = [];
				for(var item in list) {
					var id = item;
					var key = list[item][0];
					var value = list[item][1];

					var obj = {
						id: id,
						key: key,
						value: value
					}
					res.push(obj);

					if(!$scope.selected 
							&& $scope.model 
							&& $scope.model.value
							&& $scope.model.value.text
							&& $scope.model.value.text.indexOf(key) !== -1) {

						// The object is selected
						$scope.selected = obj;
					} 
				}
				$scope.sourceList = res;
			},

			toggle: function(item) {
				// Is it already selected?
				if(item == $scope.selected) {
					$scope.selected = null;
				}
				else {
					$scope.selected = item;
				}
				updateValue();
			}
        }
      },
      link: function postLink(scope, element, attrs) {
        
      }
    };
  });
