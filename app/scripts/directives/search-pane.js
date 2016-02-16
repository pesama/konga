'use strict';

/**
 * @ngdoc directive
 * @name Konga Reference.directive:Search Pane
 * @scope
 * @restrict E
 * @description
 * Defines a search panel that controls all inputs of a search form for an entity type. 
 */
angular.module('konga')
  .directive('searchPane', function () {
    return {
      templateUrl: '/konga/views/search-pane.html',
      replace: true, 
      restrict: 'E',
      scope: {
      	entityMetadata: '=',
        query: '=',    	
        productCodes: '=',
        submit: '=onSubmit'
      },
      controller:function($scope, $filter, $modal, $timeout, scaffold) {
        $scope.fields = [];
        $scope.categories = [];

        $scope.init = function() {
          $scope.fields = util.getEntityFields($scope.entityMetadata);
          $scope.categories = util.getEntityCategories($scope.entityMetadata, 1);

          var formType = $scope.entityMetadata.searchType;

          if(formType === constants.CUSTOM_FORM) {
            var configuration = $filter('filter')($scope.entityMetadata.configuration, { key: constants.SEARCH_CUSTOM_VIEW });
            if(!configuration.length) {
              // TODO Show exception
            }
            $scope.contentUrl = mapper[configuration[0].value];
          }
          else {
            $scope.contentUrl = '/konga/views/' + formType.toLowerCase() + '-search-pane.html';

            // Custom behavior for each form type
            switch(formType) {
            case constants.CATEGORIZED_CASCADE_FORM:
              // Get the categories used for search
              var configuration = $filter('filter')($scope.entityMetadata.configuration, { key: constants.SEARCH_USE_CATEGORY }, true);
              $scope.categories = [];
              for(var i = 0; i < configuration.length; i++) {
                var cat = configuration[i].value;
                $scope.categories.push(cat);
              }
              break;
            default:
              // Nothing to do
            }
          }
        };

        function setupQuery(obj, query) {
          for(var i in obj) {
            if(typeof obj[i] === 'object') {
              setupQuery(obj[i], query[i]);
            }
            else {
              query[i] = obj[i];
            }
          }
        }

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
    			  templateUrl: '/konga/views/filter-manager.html',
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

              $scope.resetQuery();
              
              setupQuery(newValue, $scope.query);

    				  for(var i = 0; i < $scope.fields.length; i++) {
    					  var field = $scope.fields[i];

          		  var eventName = 'update_' + field.owner + '_' + field.name;
          	    $scope.$broadcast(eventName);
    				  }
    			  }
    			  console.log('Save successful');
    		  }, function () {
    			  console.log('Operation canceled');
    		  });
    	  };

        $scope.resetQuery = function() {
          var newQuery = scaffold.newQuery($scope.entityMetadata);
          for(var param in $scope.query) {
            $scope.query[param] = newQuery[param];
          }
        };

        $scope.delayedSubmit = function() {
          $timeout(function() {
            $scope.operations.submit();
          }, 100);
        };

        var watchers = null;
        $scope.$on('suspend', function() {
          watchers = $scope.$$watchers;
          $scope.$$watchers = [];
        });

        $scope.$on('resume', function() {
          $scope.$$watchers = watchers;
        });
  	  },
      link: function postLink(scope) {
        scope.operations = {
          updateField: function(property, value, query, parent) {
            var fieldName = property.name;

            // Is there an api name present?
            if(parent) {
              fieldName = property.apiName;
            }

            // Special for checkboxes :)
            if(property.fieldType.search === constants.FIELD_BOOLEAN) {
              if(value.active == value.inactive) {
                // None or all, same thing
                value.text = '';
              }
              else {
                // If active, then its true. If not, means inactive is true, ergo, its false=active
                value.text = value.active;
              }
            }

            if(property.fieldType.search === constants.FIELD_DATE) {
              value.date.startDate = (value.date.startDate == "") ? 0 : value.date.startDate;
              value.date.endDate = (value.date.endDate == "") ? 0 : value.date.endDate;
              value.text = value.date;
            }
            else if(property.searchConf.policy === constants.VALIDATOR_RANGE && value.range.from !== '') {
              value.text = value.range;
            }

            var ret = value.text;
            // if(ret && typeof ret === 'object') ret = ret.join(',');
            // Update the query
            query[fieldName] = ret;
            return ret;
          },

          clear: function() {
            // return;
            // var fields = util.getEntityFields(scope.entityMetadata);
            // for(var i = 0; i < fields.length; i++) {
            //   var fieldName = fields[i].name;
            //   var defaults = fields[i].defaults;

            //   // Does the field exist on the query?
            //   if(scope.query[fieldName] !== undefined) {
            //     scope.query[fieldName] = defaults;
            //   }
            // }
            
            //Call Search function to get the result with default search criteria
            // scope.resetQuery();

            // Submit the reset downwards
            // TODO Do we need to put extra stuff for the reset?
            scope.$broadcast('reset-form');

            scope.delayedSubmit();
          },



          submit: function() {
        	  scope.query.resetPaging = true;
        	  scope.query.resetSorting = true;
        	  scope.submit(scope.query);
          }
        };

        //Init with search
        // scope.operations.submit();
      }
    };
  });
