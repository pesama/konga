'use strict';

/*
 * @ngdoc controller
 * @name ui.konga.controller:MultiSelectCtrl
 * @description
 * # MultiSelectCtrl
 * Controller of the ui.konga
 */
angular.module('konga')
  .controller('MultiSelectCtrl', ['$scope', '$filter', '$modalInstance', 'model', 'field', 'parentField', 'common', 'api', 'entity', 'metadata', 'items', '$timeout', '$rootScope', 'util', 
  	function ($scope, $filter, $modalInstance, model, field, parentField, common, api, entity, metadata, items, $timeout, $rootScope, util) {
   
   		$scope.id = 'multi-select';

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
		$scope.multiselectModal = {
			title: 'Choix des valeurs', // TODO Externalize
			contentUrl: '/konga/views/multi-select-modal.html',
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

      			for(var f = 0; f < $scope.realList.length; f++) {
      				if(ids.indexOf($scope.realList[f][$scope.idField]) !== -1) {
      					entity.push($scope.realList[f]);
      				}
      			}
      		}
			$scope.model = {
				text: ids,
				ids: ids,
				entity: entity,
				metadata: relatedMetadata
			};
		}

		/**
		 * TODO Document
		 */
		$scope.operations = {
			init: function() {

				var entityType = null;
				if(field.type.type === util.constants.FIELD_COMPLEX) {
					entityType = field.type.complexType;
					$scope.field = field;
				}
				else if(field.isKey) {
					entityType = field.owner;
					$scope.field = field;
				}
				else {
					// TODO careful! :)
					entityType = parentField.type.complexType;
					$scope.field = parentField;
				}

				$scope.id = 'multi-select-' + entityType;

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

			toggle: function(item, selected) {
				if(selected === undefined) {
					selected = !item.selected;
				} 
				item.selected = selected;
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
				if(allFetched) {
					for (var code = 0; code < $scope.sourceList.length; code++) {
						var item = $scope.sourceList[code];
						item.added = true;
						item.selected = false;
					}
					updateValue();
				}
				else {
					var configuration = {
						offset: 1,
						limit: 0
					};

					$scope.callService(configuration, function() {
						for (var code = 0; code < $scope.sourceList.length; code++) {
							var item = $scope.sourceList[code];
							item.added = true;
							item.selected = false;
						}
						updateValue();
					});
				}
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

		$scope.scroll = function() {
        	$scope.offset += $scope.limit;

        	if(!allFetched) {
        		$scope.callService(undefined, function() {
					// try {
					// 	$scope.$apply();
					// } catch(e) {}
					// $scope.$broadcast('set-scroll', { relative: newScroll });
				});
        	}
		};

		$scope.treatData = function(data, callback) {
			if(data.length < $scope.limit) {
				allFetched = true;
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

			var verifiedList = [];
			if($scope.offset > 1) {
				// Let's remove duplicates
				var idField = util.getEntityId(relatedMetadata, null, true);
				for(var i = 0; i < newList.length; i++) {
					var ok = true;
					for(var f = 0; f < $scope.realList.length; f++) {
						if(newList[i][idField] === $scope.realList[f][idField]) {
							ok = false;
							break;
						}
					}
					if(ok) {
						verifiedList.push(newList[i]);
					}
				}
			}
			else {
				verifiedList = newList;
			}

			var parsedList = $filter('selectData')(relatedMetadata, verifiedList);

			if($scope.offset === 0) {
				$scope.sourceList = parsedList;
				$scope.realList = verifiedList;
			}
			else {
				$scope.sourceList = $scope.sourceList.concat(parsedList);
				$scope.realList = $scope.realList.concat(verifiedList);
			}

			if($scope.model.entity) {
				// Configure already added
				var selectedIds = [];
				var selectedItems = [];
				for(var i = 0; i < $scope.model.entity.length; i++) {
					selectedIds.push($scope.model.entity[i][$scope.idField]);
					selectedItems.push($scope.model.entity[i]);
				}

				// Configure 'added' value
				for(var i = 0; i < $scope.sourceList.length; i++) {
					var index = selectedIds.indexOf($scope.sourceList[i].id);
					if(index !== -1) {
						$scope.sourceList[i].added = true;
						selectedItems.splice(index, 1);
						selectedIds.splice(index, 1);
					}
				}

				// Add added values who are not yet in the list
				var parsedEntities = $filter('selectData')(relatedMetadata, selectedItems, { added: true });
				$scope.sourceList = $scope.sourceList.concat(parsedEntities);
				$scope.realList = $scope.realList.concat(selectedItems);
			}

			if(callback) {
				callback();
			}

			scrollWatchEnabled = true;
			$scope.loading = false;
		};

		$scope.callService = function(configuration, callback) {
			$scope.loading = true;

			var oldQuery = query;

			query = $filter('queryParser')($scope.field, entity, oldQuery);

			query.path = relatedMetadata.apiPath;


			// Configure pagination
			query.offset = configuration && configuration.offset !== undefined ? configuration.offset : $scope.offset;
			query.limit = configuration && configuration.limit !== undefined ? configuration.limit : $scope.limit;

			// Configure ordering
			if(!query.sortBy) {
				query.sortBy = $scope.idField;
				query.sortAs = 'asc';
			}

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
					koHandler: function() {
						// TODO Do something
					}
				};

				$rootScope.operations.dispatchAction(action, parameters);
			}
			else {
				localEndpoint.search(query, function(data) {
					$scope.treatData(data, callback);
				}, 
				function() {
					// TODO
				});
			}

			// localEndpoint.search(query, function(data) {
				
			// }, 
			// function(error) {
			// 	// TODO
			// });
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
