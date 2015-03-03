'use strict';

/**
 * @ngdoc function
 * @name sigmaNgApp.controller:SingleSelectCustomCtrl
 * @description
 * # SingleSelectCustomCtrl
 * Controller of the sigmaNgApp
 */
angular.module('sigmaNgApp')
  .controller('SingleSelectCustomCtrl', ['$scope', '$filter', '$modalInstance', 'model', 'field', 'parentField', 'common', 'api', '$timeout',
                                       	function ($scope, $filter, $modalInstance, model, field, parentField, common, api, $timeout) {

		$scope.id = 'single-select-custom';

    	$scope.model = model;      
    	console.log(model);
    	$scope.property = field;
    	console.log($scope.property);
    	$scope.selected = null;      	
    	$scope.filter = '';
    	$scope.idField = null;

    	$scope.limit = 50;
    	$scope.page = 1;

    	$scope.field = null;

    	$scope.loading = true;

    	var localEndpoint = null;

    	var relatedMetadata = null;

    	var scrollWatchEnabled = true;

    	var allFetched = false;
    	
    	$scope.fields = [];
        
      	var quickSearchFields = $scope.quickSearch = [];
		
    	var popupTitle = 'Choix de la valeur';
    	if (typeof (field.singleSelectCustom) === 'object' &&  field.singleSelectCustom.title !== '') {
    		popupTitle = field.singleSelectCustom.title;
    	}

    	/**
		 * TODO Document
		 */
		$scope.singleselectModal = {
			title : popupTitle, // TODO Externalize
			contentUrl : '/views/single-select-custom.html',
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
    		console.log('update value function');
    		var codes = [];
    		var ids = [];
    		var entity = null;
    		if($scope.selected) {
				entity = $scope.selected;//selected[0];
				codes.push(util.getEntityCode(relatedMetadata, $scope.selected));
				ids.push(util.getEntityId(relatedMetadata, $scope.selected));
    		}
			$scope.model = {
				text: codes,
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
				console.log('entity type');
				console.log(entityType);
				$scope.id = 'single-select-custom-' + entityType;

				relatedMetadata = util.getMetadata(entityType);

				quickSearchFields = $scope.quickSearch = $filter('quickSearch')(relatedMetadata);
				
				console.log(relatedMetadata);
				
				//var allFields = $filter('orderBy')(util.getEntityFields(relatedMetadata), '+priority');
		        //$scope.fields = $filter('resultParams')(allFields, relatedMetadata);
				if (typeof($scope.field.singleSelectCustom) === 'object') {
					$scope.fields = $scope.field.singleSelectCustom.fields;
					if ($scope.field.singleSelectCustom.quickSearchFields !== undefined) {
						quickSearchFields = $scope.quickSearch = $scope.field.singleSelectCustom.quickSearchFields;
					}
				}
		        
		        
		        
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

			toggle: function(entity) {

				// Is it already selected?
				if (entity === $scope.selected) {
					$scope.selected = null;
				} else {
					$scope.selected = entity;
				}
				updateValue();
			}
      };

      $scope.scroll = function(data) {
      	$scope.page++;

      	if(!allFetched) {
      		$scope.callService(function() {
					// try {
					// 	$scope.$apply();
					// } catch(e) {}
					// $scope.$broadcast('set-scroll', { relative: newScroll });
				});
      	}
		};

		$scope.callService = function(callback) {
			$scope.loading = true;
			
			var query = $scope.field.type.query;
			if (!query) {
				query = {};
			}

			// Configure pagination
			query.currentPage = $scope.page;
			query.itemsPerPage = $scope.limit;

			localEndpoint.search(query, function(data) {
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

				$scope.realList = $scope.realList.concat(newList);

				if($scope.model.entity) {
					// Configure already added
					var selectedId = $scope.model.entity[$scope.idField];

					// Configure selected variable
					for(var i = 0; i < $scope.realList.length; i++) {
						if(selectedId === $scope.realList[i][$scope.idField]) {
							$scope.selected = $scope.realList[i];
							break;
						}
					}
				}

				if(callback) {
					callback();
				}

				scrollWatchEnabled = true;
				$scope.loading = false;
			}, 
			function(error) {
				// TODO
			});
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

				  var query = $scope.field.type.query;
				  if (!query) {
					query = {};
				  }
	              query[name] = field.value;

	              if (!query[name].length) {
	                delete query[name];
	              }
	            }

				// reset list
				$scope.realList = [];
				$scope.page = 1;
				allFetched = false;
				$scope.callService(function() {
					// TODO Do something
				});			
			  
		  	}, 1000);
		};
}]);