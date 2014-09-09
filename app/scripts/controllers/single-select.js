'use strict';

/**
 * @ngdoc controller
 * @name sigmaNgApp.controller:SingleSelectCtrl
 * @description
 * # SingleSelectCtrl
 * Controller of the sigmaNgApp
 */
angular.module('sigmaNgApp')
  .controller('SingleSelectCtrl', ['$scope', '$filter', '$modalInstance', 'items', 'model', 'field', 
  	function ($scope, $filter, $modalInstance, items, model, field) {
      	$scope.model = model;      
      	// Stores the selected value
      	$scope.selected = null;      	
      	$scope.filter = '';

      	/**
		 * TODO Document
		 */
		$scope.singleselectModal = {
			title : 'Select value', // TODO Externalize
			contentUrl : 'views/multi-select-modal.html',
			animation : 'am-fade-and-slide-top',
			save: function() {
				var newValue = $scope.model;			
				$modalInstance.close(newValue);
			},

			cancel: function () {
				$modalInstance.dismiss('cancel');
			}
		};

      	function updateValue() {
      		var codes = null;
      		var ids = null;
      		if($scope.selected) {
      			codes = $filter('onlyCodeEds')([$scope.selected]);
				ids = $filter('onlyIdEds')([$scope.selected]);
      		}
			$scope.model = {
				text: codes,
				ids: ids
			};
		};

      	/*
         * TODO Document
         */
        $scope.operations = {
        	init: function() {
				var list = items;
				var entityType = field.type.complexType;
				var relatedMetadata = util.getMetadata(entityType);
				$scope.sourceList = $filter('selectData')(relatedMetadata, list);
			},

			toggle: function(item) {
				// Is it already selected?
				if (item == $scope.selected) {
					$scope.selected = null;
				} else {
					$scope.selected = item;
				}
				updateValue();
			}
        };
  }]);
