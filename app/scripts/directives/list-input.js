'use strict';

/*
 * @ngdoc directive
 * @name Konga Reference.directive:listInput
 * @description
 * # listInput
 */
angular.module('konga')
  .directive('listInput', ['util', function (util) {
    return {
  		templateUrl : '/konga/views/list-input.html',
  		restrict: 'E',
  		transclude : false,
  		replace: true,
  		scope : {
  			originalFields : '=fields',
  			list : '=',
  			actions: '=',
  			metadata : '=',
  			property: '=?',
  			setSelectedElements : '=',
  			disabledIds : '=',
  			dispatchFieldAction : '='
  		},
  		controller: function ($scope, $filter) {
  			$scope.paginate = true;

  			// Read configuration
  			var configuration = $scope.property.fieldType.configuration[0];

  			// Pagination
  			var paginationConfiguration = $filter('filter')(configuration, { key: util.constants.SHOW_PAGINATION, value: 'false' }, true);

  			if(paginationConfiguration && paginationConfiguration.length) {
  				$scope.paginate = false;
  			}

  			$scope.filteredList = $scope.list;

  			function filterList() {
				// Is there any filter configured?
				if ($scope.property) {
					var filter = $scope.property.type.filter;

					var newList = $scope.list;
					if(filter && filter.length) {
						newList = $filter(filter)($scope.list);
					}
					$scope.filteredList = newList;
				}
  			}

  			var listenerName = $scope.property.owner + '_' + $scope.property.name;
 			$scope.$on('updateFilter_'+listenerName, function() {
	         	filterList();
	        });

  			$scope.$watchCollection('originalFields', function(newFields){
  				
	  			$scope.originalFields = newFields;
	  			// Generate fields
		        // var allFields = $filter('orderBy')($scope.originalFields, '+priority.results');
		        var allFields = newFields;
		        
		        $scope.fields = [];
		
		        function divideComplexField(field) {
		          var relatedMetadata = util.getMetadata(field.type.complexType);
		          var relatedFields = util.getEntityFields(relatedMetadata);
		          var nestFields = field.showInResults.fields;
		          var selectedFields = $filter('selectedFields')(relatedFields, nestFields);
		          for(var fi = 0; fi < selectedFields.length; fi++) {
		            if(selectedFields[fi].fieldType.results === util.constants.FIELD_COMPLEX) {
		              divideComplexField(selectedFields[fi]);
		            }
		            else {
		              // Append the source
		              selectedFields[fi].derivedPath.splice(0, 0, field);

		              // Push the field
		              $scope.fields.push(selectedFields[fi]);
		            }
		          }
		        }

		        // Control complex fields
		        for(var f = 0; f < allFields.length; f++) {
		          var field = allFields[f];
		          if(field.type.type === util.constants.FIELD_COMPLEX && field.fieldType.results === util.constants.FIELD_COMPLEX && field.showInResults.fields.length) {
		            divideComplexField(field);
		          }
		          else {
		            $scope.fields.push(field);
		          }
        		}
  			});
  			
  			$scope.selectAllItmsData = false;
  			$scope.selectedData = false;
  			$scope.paginationData = {
	  			currentItems : 0,
	  			totalItems : 0,
	  			limit : $scope.paginate ? 10 : 1000, // TODO Change this
	  			offset : 1,
	  			maxPages : 1
  			};

  			$scope.selected = [];

  			$scope.selectedIds = {};
  			// Set up the quick search
			$scope.quickSearchParams = {
				value: '',
				param:{}
			};

  			$scope.getTotalItems = function () {
  				var totalItems = $scope.paginationData.count = ($scope.list)? $scope.list.length:0;
		  		var count = 0;
		  		if ($scope.selectedData) {
		  			angular.forEach($scope.list, function (item) {
		  				if (item.selected) {
		  					count++;
		  				}
		  			});
		  			totalItems = count;
		  		}
		  		return totalItems;
  			};
  			
  			$scope.currentItems = function() {
  				var totalItems = $scope.getTotalItems();
		    	if (totalItems>0) {
		    		var items = $scope.paginationData.offset * $scope.paginationData.limit;
		    		$scope.paginationData.currentItems = (items > totalItems)? totalItems : items;
		    	} else {
		    		$scope.paginationData.currentItems =  0;
		    	}   
		  	};
		  	  
		  	  
		  	$scope.maxPages = function () {
		  		var totalItems = $scope.getTotalItems();
		  		$scope.paginationData.maxPages = Math.ceil(totalItems/$scope.paginationData.limit);
		  		if ($scope.paginationData.maxPages < $scope.paginationData.offset && $scope.paginationData.maxPages > 0) {
		  			$scope.paginationData.offset = $scope.paginationData.maxPages;
		  		}
		  	};
		  	/**
		  	 * Handle Table pagination
		  	 * @function pageChanged
		  	 */	
		  	$scope.pageChanged = function(orientation) {
		  		switch (orientation) {
		  			case 'first':
		  				$scope.paginationData.offset = 1;
		  				break;
		  			case 'previous':
		  				$scope.paginationData.offset = ($scope.paginationData.offset-1 > 1)? $scope.paginationData.offset-1: 1;
		  				break;
		  			case 'next':
		  				$scope.paginationData.offset = ($scope.paginationData.offset+1 < $scope.paginationData.maxPages)? $scope.paginationData.offset+1: $scope.paginationData.maxPages;
		  				break;
		  			case 'last':
		  				$scope.paginationData.offset = $scope.paginationData.maxPages;
		  				break;
		  		}
		  		if (!orientation || typeof orientation == 'undefined') {
		  			$scope.maxPages();
		  		}   
		  	   
		  	    $scope.currentItems();
		  	};

		  	$scope.selectAllHandler = function () {
				var length = ($scope.list)? $scope.list.length:0;
				for (var i = 0; i < length; i++) {
					if ((typeof $scope.disabledIds !== 'undefined' && !$scope.disabledIds[$scope.list[i].id]) 
							|| (typeof $scope.disabledIds === 'undefined')) {
						$scope.list[i].selected = $scope.selectAllItmsData;
					}
				}
				$scope.pageChanged();
			};
			$scope.onDisplaySelectedItems = function() {
				$scope.paginationData.offset = 1;
				$scope.pageChanged();
			};

			$scope.onSelectListEds = function () {
				$scope.pageChanged();
				$scope.filteredList = $scope.list;
			};

			$scope.quickSearchHandler = function () {
				var result = {};
				angular.forEach($scope.quickSearchParams.param, function (item, key) {
					if (key.indexOf('.')>0) {
						var keyList = key.split('.');
						result[keyList[0]] = {};
						switch (keyList.length) {
							case 2:
								result[keyList[0]][keyList[1]] = item;
							break;
							case 3:
								result[keyList[0]][keyList[1]] = {};
								result[keyList[0]][keyList[1]][keyList[2]] = item;
							break;
							case 4:
								result[keyList[0]][keyList[1]] = {};
								result[keyList[0]][keyList[1]][keyList[2]] = {};
								result[keyList[0]][keyList[1]][keyList[2]][keyList[3]] = item;
							break;
						}
					}else{
						result[key]=item;
					}
				});
				$scope.quickSearchParams.value =	result;
				$scope.paginationData.offset = 1;
				$scope.pageChanged();
			};
			
			if($scope.property.fieldType.update == util.constants.FIELD_PICK_LIST) {
				var validation = $scope.property.validation;

				var length = $scope.list ? $scope.list.length : 0;
				
				if(validation.minLength && length < validation.minLength) {
//					realInput.addClass('invalid-min-length');
					$scope.$emit('form-invalid', {
						field: $scope.property.name,
						owner: $scope.property.owner,
						validation: 'min-length',
						valid: false
					});
				}
			}
  			$scope.validate = function () {
  				var dataFilter = $filter('filter')($scope.list, { selected: true }, transclude);
  		// 		var listIds = [];
  		// 		for (var i = 0; i < dataFilter.length; i++) {
				// 	listIds[dataFilter[i].id]=true;
				// };
  		// 		$scope.selectedIds[$scope.edsType] = listIds;
  				$scope.setSelectedElements($scope.edsType, dataFilter);
  			};

  			$scope.cancel = function () {
  				$scope.selectAllItmsData = false;
  				$scope.selectAllHandler();
  			};
  			
  			/*$scope.dispatchFieldAction = function(action, entitySelected) {
		  		var actions = $scope.actions;
		  		var matchingActions = null;
		  		if(actions.length) {
		  			matchingActions = $filter('filter')(actions, { name: action.name });
		  		}

		  		// Custom actions
		  		if(matchingActions && matchingActions.length) {
		  			$rootScope.operations.dispatchActionBatch(matchingActions, { id: util.getEntityId($scope.metadata, $scope.entity), entityType: $scope.metadata.name, self: $scope, item: $scope.entity, field: $scope.property, entitySelected : entitySelected});
		  		}
			};*/

			var watchers = null;
	        $scope.$on('suspend', function() {
	          watchers = $scope.$$watchers;
	          $scope.$$watchers = [];
	        });

	        $scope.$on('resume', function() {
	          $scope.$$watchers = watchers;
	        });
  		},
  		link : function (scope) {
			scope.$watchCollection('selectAllItmsData', scope.selectAllHandler);
			scope.$watchCollection('selectedData', scope.onDisplaySelectedItems);
			scope.$watchCollection('list', scope.onSelectListEds);
			scope.$watchCollection('quickSearchParams.param',scope.quickSearchHandler);
			scope.$watchCollection('disabledIds', function () {
				console.log('disabledIds '+scope.disabledIds);	
			});
  		}
  	};
  }]);
