'use strict';

/*
 * @ngdoc controller
 * @name ui.konga.controller:SingleSelectCtrl
 * @description
 * # SingleSelectCtrl
 * Controller of the ui.konga
 */
angular.module('konga')
  .controller('SingleSelectCtrl', ['$scope', '$filter', '$modalInstance', 'model', 'field', 'parentField', 'common', 'api', 'entity', 'metadata', 'items', '$timeout', '$rootScope', 
  	function ($scope, $filter, $modalInstance, model, field, parentField, common, api, entity, metadata, items, $timeout, $rootScope) {

  		$scope.id = 'single-select';

      	$scope.model = model;      
      	// Stores the selected value
      	$scope.selected = null;      	

      	$scope.filter = {
      		value: ''
      	};

      	$scope.idField = null;

      	$scope.limit = 50;
      	$scope.offset = 0;

      	$scope.field = null;

      	$scope.loading = true;

      	var localEndpoint = null;

      	var relatedMetadata = null;

      	var scrollWatchEnabled = true;

      	var allFetched = false;

      	var query = null;

      	var quickSearchFields = $scope.quickSearch = [];

      	/**
		 * TODO Document
		 */
		$scope.singleselectModal = {
			contentUrl : '/konga/views/multi-select-modal.html',
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
      			for(var i = 0; i < $scope.realList.length; i++) {
      				if($scope.realList[i][$scope.idField] === $scope.selected.id) {
      					selected.push($scope.realList[i]);
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
				text: ids,
				ids: ids,
				entity: entity,
				metadata: relatedMetadata
			};
		}

      	/*
         * TODO Document
         */
        $scope.operations = {
        	init: function() {

				//var list = [];
				
				var entityType = null;
				if(field.type.type === constants.FIELD_COMPLEX) {
					entityType = field.type.complexType;
					$scope.field = field;
				}
				else {
					// TODO careful! :)
					entityType = parentField.type.complexType;
					$scope.field = parentField;
				}

				$scope.id = 'single-select-' + entityType;

				relatedMetadata = util.getMetadata(entityType);

				quickSearchFields = $scope.quickSearch = $filter('quickSearch')(relatedMetadata);

				// Get the id fieldname to use it afterwards
        		$scope.idField = util.getEntityId(relatedMetadata, null, true);

				$scope.sourceList = [];
				$scope.realList = [];

				localEndpoint = api.getLocalEndpoint(entityType);

				$scope.callService();

				$scope.$on($scope.id + '-scroll-watcher', function(event, msg) {
					if(msg.relative > 0.7 && scrollWatchEnabled) {
						scrollWatchEnabled = false;
						$scope.scroll(msg);
					}
				});
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

        $scope.scroll = function() {
        	$scope.offset += $scope.limit;

        	if(!allFetched) {
        		$scope.callService(function() {
					// try {
					// 	$scope.$apply();
					// } catch(e) {}
					// $scope.$broadcast('set-scroll', { relative: newScroll });
				});
        	}
		};

	$scope.treatData = function(data, callback){
			
			if(data.length < $scope.limit) {
				allFetched = true;
			}

			// Is there any filter configured?
			var filter = $scope.field.type.filter;

			var newList = null;

			// Do the field and the entity have the same type?
			if(entity && metadata.name === $scope.field.type.complexType) {
				// We need to remove the same element
				var idField = util.getEntityId(metadata, null, true);
				var filterObj = {};
				filterObj[idField] = entity[idField];

				var same = filterObj[idField] ? $filter('filter')(data, filterObj, true) : [];

				if(same.length) {
					var elt = same[0];
					var index = data.indexOf(elt);

					if(index !== -1) {
						data.splice(index, 1);
					}
				}
			}

			// Is there any filter configured?
			var filter = $scope.field.type.filter;

			var newList = null;

			if(filter && filter.length) {
				try {
					newList = $filter(filter)(data);
				} catch(e) {
					// TODO Throw exception
					newList = data;
				}
			}
			else {
				newList = data;
			}

			var parsedList = $filter('selectData')(relatedMetadata, newList);

			if($scope.offset === 1) {
				$scope.sourceList = parsedList;
				$scope.realList = newList;	
			}
			else {
				$scope.sourceList = $scope.sourceList.concat(parsedList);
				$scope.realList = $scope.realList.concat(newList);
			}

			if($scope.model.entity) {
				// Configure already added
				var selectedId = $scope.model.entity[$scope.idField];

				// Configure selected variable
				for(var i = 0; i < $scope.sourceList.length; i++) {
					if(selectedId === $scope.sourceList[i].id) {
						$scope.selected = $scope.sourceList[i];
						break;
					}
				}
			}

			if(callback) {
				callback();
			}

			scrollWatchEnabled = true;
			$scope.loading = false;
			
		};
		
		$scope.callService = function(callback) {
			$scope.loading = true;
			
			var oldQuery = query;

			query = $filter('queryParser')($scope.field, entity, oldQuery);

			query.path = relatedMetadata.apiPath;
	
			// Configure pagination
			query.offset = $scope.offset;
			query.limit = $scope.limit;
		

			// TODO Find a better place to do this!
			var from = $scope.field.type.from;
			if(from) {
				var action = {
					name: from
				};

				var parameters = {
					query: query,
					metadata: relatedMetadata,
					self: $scope,
					okHandler: function(data) {
						$scope.treatData(data, callback);
					},
					koHandler: function(error) {
						// TODO Do something
					}
				};

				$rootScope.operations.dispatchAction(action, parameters);
			}
			else {
				localEndpoint.search(query, function(data) {
					$scope.treatData(data, callback);
				}, 
				function(error) {
					// TODO
				});
			}
		};

		$scope.timeout = 1;
		$scope.executeQuickSearch = function() {
			$scope.loading = true;
			$timeout.cancel($scope.timeout);
			$scope.timeout = $timeout(function() {

				for(var i = 0; i < quickSearchFields.length; i++) {
	              var field = quickSearchFields[i];
	              var name = field.metadata.apiName ? field.metadata.apiName : field.metadata.name;
	              // TODO Verify validation and all

	              query[name] = field.value;

	              if(!query[name].length) {
	                delete query[name];
	              }
	            }

				$scope.offset = 0;
				allFetched = false;
				$scope.callService(function() {
					// TODO Do something
				});			
			  
		  	}, 1000);
		};
  }]);
