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
      	$scope.idField = null;

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
      		var codes = [];
      		var ids = [];
      		var entity = null;
      		if($scope.selected) {
      			
      			var selected = [];
      			for(var i = 0; i < items.length; i++) {
      				if(items[i][$scope.idField] === $scope.selected.id) {
      					selected.push(items[i]);
      				}
      			}

				// We are single-selecting, so get the first one of them
				if(selected.length) {
					entity = selected[0];
					codes.push($scope.selected.key);
					ids.push($scope.selected.id);
				}
      		}
			$scope.model = {
				text: codes,
				ids: ids,
				entity: entity
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

				// Get the id fieldname to use it afterwards
        		$scope.idField = util.getEntityId(relatedMetadata, null, true);

				$scope.sourceList = $filter('selectData')(relatedMetadata, list);

				// Configure already added
				var selectedId = $scope.model.entity[$scope.idField];

				// Configure selected variable
				for(var i = 0; i < $scope.sourceList.length; i++) {
					if(selectedId === $scope.sourceList[i].id) {
						$scope.selected = $scope.sourceList[i];
						break;
					}
				}
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
