'use strict';

/**
 * @ngdoc directive
 * @name sigmaNgApp.directive:searchPane
 * @scope
 * @restrict E
 * @description
 * Defines a search panel that controls all inputs of a search form for an entity type. 
 */
angular.module('sigmaNgApp')
  .directive('searchPane', function () {
    return {
      templateUrl: 'views/search-pane.html',
      replace: true, 
      restrict: 'E',
      scope: {
      	entityMetadata: '=',
        query: '=',    	
        productCodes: '=',
        submit: '=onSubmit'
      },
      controller:function($scope, $filter, $modal) {
    	  //THis function will open the Save filter
    	  $scope.openFilterModel = function (property) {
    		  
    		  //Correct data for query: all fieldType is complex need to convert to Array
    		  var fields = util.getEntityFields($scope.entityMetadata);
			  for(var i = 0; i < fields.length; i++) {
				  var fieldName = fields[i].fieldName;
	              if($scope.query[fieldName] !== undefined) {
	            	  if (fields[i].fieldType === constants.FIELD_COMPLEX 
	            			  && $scope.query[fieldName] !== null
	            			  && !(typeof  $scope.query[fieldName] === 'object')) {
	            		  var codes = $scope.query[fieldName].split(',');
	            		  $scope.query[fieldName] = codes;
	            	  }
	              }
			  }
    		  
    		  var modalInstance = $modal.open({
			  templateUrl: 'views/filter-manager.html',
			  controller: 'FilterManagerCtrl',
			  resolve: {
				  method: function () {
					  return property.operation;
				  },
				  formProperties: function() {
					  return $scope.query;
				  },
				  items: function () {
					  return $scope.sourceList;
				  },
				  model: function() {
					  return $scope.value;
				  }
			  }
    		  });
		
    		  modalInstance.result.then(function (newValue) {
    			  if (newValue !== null && newValue !== undefined) {
    				  var fields = util.getEntityFields($scope.entityMetadata);
    				  for(var i = 0; i < fields.length; i++) {
    					  var fieldName = fields[i].fieldName;
    		          
    		              if($scope.query[fieldName] !== undefined && newValue[fieldName] !== undefined) {
    		            	  //if (newValue[fieldName]  !== null && typeof  newValue[fieldName] === 'object') {
    		            	  //	$scope.query[fieldName]  = newValue[fieldName].join(','); 
    		            	  //} else {
    		            		  $scope.query[fieldName] = newValue[fieldName];
    		            	 // }
    		            	  
    		            	  $scope.$broadcast('update_' + fieldName);
    		              }
    				  }
    			  }
    			  console.log('Save successful');
    		  }, function () {
    			  console.log('Operation canceled');
    		  });
    	  };
	  },
      link: function postLink(scope, element, attrs) {
        scope.fields = util.getEntityFields(scope.entityMetadata);

        function rootifyQuery(query, obj) {
          for(var i in obj) {
            if(typeof(obj[i]) === 'object') {
              rootifyQuery(query, obj[i]);
            }
            // TODO Control arrays
            else {
              query[i] = obj[i];
            }
          }
        }

        scope.operations = {
          updateField: function(property, value, query, parent) {
            var fieldName = property.name;

            // Is there an api name present?
            if(parent) {

              var apiNames = parent.apiName;
              var index = parent.searchable.fields.indexOf(property.name);
              if(apiNames.length >= index) {
                fieldName = apiNames[index];
              }
            }

            // Special for checkboxes :)
            if(property.fieldType === constants.FIELD_BOOLEAN) {
              if(value.active == value.inactive) {
                // None or all, same thing
                value.text = '';
              }
              else {
                // If active, then its true. If not, means inactive is true, ergo, its false=active
                value.text = value.active;
              }
            }

            if(property.fieldType === constants.FIELD_DATE) {
              value.text  = value.comparator;
              value.text += '#';
              value.text += new Date(value.startDate);
              value.text += '#';
              value.text += new Date(value.endDate);
            } 

            var ret = value.text;
            // if(ret && typeof ret === 'object') ret = ret.join(',');

     
              // Update the query
              query[fieldName] = ret;

            
            return ret;
          },

          clear: function() {
            var fields = util.getEntityFields(scope.entityMetadata);
            for(var i = 0; i < fields.length; i++) {
              var fieldName = fields[i].fieldName;
              var defaults = fields[i].defaultValue;

              // Does the field exist on the query?
              if(scope.query[fieldName] !== undefined) {
                scope.query[fieldName] = defaults;
              }
            }

            // Submit the reset downwards
            // TODO Do we need to put extra stuff for the reset?
            scope.$broadcast('reset');
          },



          submit: function() {
            var query = {};
            rootifyQuery(query, scope.query);

            scope.submit(query);
          }
        };

        //Init with search
        // scope.operations.submit();
      }
    };
  });
