'use strict';

/**
 * @ngdoc controller
 * @name sigmaNgApp.controller:MultiSelectCtrl
 * @description
 * # MultiSelectCtrl
 * Controller of the sigmaNgApp
 */
angular.module('sigmaNgApp')
  .controller('MultiSelectCtrl', ['$scope', '$filter', '$modalInstance', 'items', 'model', 
  	function ($scope, $filter, $modalInstance, items, model) {
   
	  	$scope.sourceList = items;
	  	$scope.model = model;

	  	$scope.selected = null;

	  	$scope.filter = '';

	  	/**
		 * TODO Document
		 */
		$scope.multiselectModal = {
			title: 'Select values', // TODO Externalize
			contentUrl: 'views/multi-select-modal.html',
			animation: 'am-fade-and-slide-top',
			save: function() {
				var newValue = $scope.model;			
				$modalInstance.close(newValue);
			},

			cancel: function () {
				$modalInstance.dismiss('cancel');
			}
		};

	  	function updateValue() {
			var addedItems = $filter('filter')($scope.sourceList, {added: true});
			var codes = $filter('onlyCodeEds')(addedItems);
			var ids = $filter('onlyIdEds')(addedItems);
			$scope.model.text = codes;
			$scope.model.ids = ids;
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
					if($scope.model && $scope.model.text) {
						added = $scope.model.text.indexOf(key) !== -1;
					} 

					var obj = {
						id: id,
						key: key,
						value: value,
						selected: false,
						added: added
					};
					res.push(obj);
				}
				$scope.sourceList = res;
			},

			toggle: function(item) {
				item.selected = !item.selected;
			},

			add : function() {
				for (var code = 0; code < $scope.sourceList.length; code++) {
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
				for (var code = 0; code < $scope.sourceList.length; code++) {
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
				for (var code = 0; code < $scope.sourceList.length; code++) {
					var item = $scope.sourceList[code];
					item.added = true;
					item.selected = false;
				}
				updateValue();
			},
		
			removeAll : function() {
				for (var code = 0; code < $scope.sourceList.length; code++) {
					var item = $scope.sourceList[code];
					item.added = false;
					item.selected = false;
				}
				updateValue();
			}
		};
	  }]);
