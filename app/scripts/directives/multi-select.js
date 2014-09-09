'use strict';

angular.module('sigmaNgApp')
  .directive('multiSelect', function () {
    return {
 		restrict: 'E',
 		replace: true, 
 		scope: {
 			sourceList: '=',
 			model: '='
 		},
 		templateUrl: 'views/multi-select.html',

 		controller: function($scope, $filter) {

 			function updateValue() {
				var addedItems = $filter('filter')($scope.sourceList, {added: true});
				var codes = $filter('onlyCodeEds')(addedItems);
				var ids = $filter('onlyIdEds')(addedItems);
				$scope.model.value = {
					text: codes,
					ids: ids
				};
 			}

			/**
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


						// Is it selected?
						var added = false;
						if($scope.model && $scope.model.value && $scope.model.value.text) {
							added = $scope.model.value.text.indexOf(key) !== -1;
						} 

						var obj = {
							id: id,
							key: key,
							value: value,
							selected: false,
							added: added
						}
						res.push(obj);
					}
					$scope.sourceList = res;
				},

				toggle: function(item) {
					item.selected = !item.selected;
				},

				add : function() {
					for(var code = 0; code < $scope.sourceList.length; code++) {
						// Get the item
						var item = $scope.sourceList[code];

						// Is it selected?
						if(item.selected) {
							item.added = true;
						}
						item.selected = false;
					}
					updateValue();
				},
			
				remove : function() {
					for(var code = 0; code < $scope.sourceList.length; code++) {
						// Get the item
						var item = $scope.sourceList[code];

						// Is it selected?
						if(item.selected) {
							item.added = false;
						}
						item.selected = false;
					}
					updateValue();
				},
			
				addAll : function() {
					for(var code = 0; code < $scope.sourceList.length; code++){
						var item = $scope.sourceList[code];
						item.added = true;
						item.selected = false;
					}
					updateValue();
				},
			
				removeAll : function() {
					for(var code = 0; code < $scope.sourceList.length; code++){
						var item = $scope.sourceList[code];
						item.added = false;
						item.selected = false;
					}
					updateValue();
				}
			};			
			
 		},
 		link: function(scope, element, attrs) {
 			
       	}
 	};
 });