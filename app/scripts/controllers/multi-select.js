'use strict';

/**
 * @ngdoc controller
 * @name sigmaNgApp.controller:MultiSelectCtrl
 * @description
 * # MultiSelectCtrl
 * Controller of the sigmaNgApp
 */
angular.module('sigmaNgApp')
  .controller('MultiSelectCtrl', ['$scope', '$filter', '$modalInstance', 'items', 'model', 'field', 'parentField', 
  	function ($scope, $filter, $modalInstance, items, model, field, parentField) {
   
	  	$scope.model = model;      
      	// Stores the selected value
      	$scope.selected = null;      	
      	$scope.filter = '';
      	$scope.idField = null;

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
      		var codes = [];
      		var ids = [];
      		var entity = [];
      		var selectedItems = $filter('filter')($scope.sourceList, { added: true });
      		if(selectedItems.length) {
      			for(var i = 0; i < selectedItems.length; i++) {
   					ids.push(selectedItems[i].id);
   					codes.push(selectedItems[i].key);
	      		}	

      			for(var f = 0; f < items.length; f++) {
      				if(ids.indexOf(items[f][$scope.idField]) !== -1) {
      					entity.push(items[f]);
      				}
      			}
      		}
			$scope.model = {
				text: codes,
				ids: ids,
				entity: entity
			};
		};

		/**
		 * TODO Document
		 */
		$scope.operations = {
			init: function() {

				var list = items;
				var entityType = null;
				if(field.type.type === constants.FIELD_COMPLEX) {
					entityType = field.type.complexType;
				}
				else {
					// TODO careful! :)
					entityType = parentField.type.complexType;
				}

				var relatedMetadata = util.getMetadata(entityType);

				// Get the id fieldname to use it afterwards
        		$scope.idField = util.getEntityId(relatedMetadata, null, true);

				$scope.sourceList = $filter('selectData')(relatedMetadata, list);

				// Configure already added
				var selectedIds = [];
				for(var i = 0; i < $scope.model.entity.length; i++) {
					selectedIds.push($scope.model.entity[i][$scope.idField]);
				}

				// Configure 'added' value
				for(var i = 0; i < $scope.sourceList.length; i++) {
					if(selectedIds.indexOf($scope.sourceList[i].id) !== -1) {
						$scope.sourceList[i].added = true;
					}
				}
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
