'use strict';

/**
 * @ngdoc directive
 * @name Konga Reference.directive:Result table
 * @scope
 * @restrict E
 * @description
 * Defines a result table that shows the results of a search.
 */
angular.module('konga')
  .directive('resultTable', function () {
    return {
      templateUrl: '/konga/views/result-table.html',
      replace: true, 
      restrict: 'E',
      scope: {
      	entityMetadata: '=',
      	entities: '=',
        updateEntity: '=onUpdate',
        paginationData: '=',
        paginationUpdate:'=',
        filterCode : '=',
        submitSorting: '=onSorting'
      },
      controller : function ($scope, $filter, $rootScope, permissionManager) {
        $scope.fields = [];
        $scope.categories = [];

        function divideComplexField(field) {
          var relatedMetadata = util.getMetadata(field.type.complexType);
          var relatedFields = util.getEntityFields(relatedMetadata);
          var nestFields = field.showInResults.fields;
          var selectedFields = $filter('selectedFields')(relatedFields, nestFields, field);
          for(var fi = 0; fi < selectedFields.length; fi++) {
            if(selectedFields[fi].fieldType.results === constants.FIELD_COMPLEX) {
              divideComplexField(selectedFields[fi]);
            }
            else {
              // Append the source
              selectedFields[fi].derivedPath.splice(0, 0, field);
              selectedFields[fi].derivedSource = field;

              // Push the field
              $scope.fields.push(selectedFields[fi]);
            }
          }
        }

        $scope.init = function() {
          $scope.categories = util.getEntityCategories($scope.entityMetadata, 1);
          
          var formType = $scope.entityMetadata.resultsType;

          if(formType === constants.CUSTOM_FORM) {
            var configuration = $filter('filter')($scope.entityMetadata.configuration, { key: constants.SEARCH_CUSTOM_VIEW });
            if(!configuration.length) {
              // TODO Show exception
            }
            $scope.contentUrl = mapper[configuration[0].value];
          }
          else {
            $scope.contentUrl = '/konga/views/' + formType.toLowerCase() + '-result-table.html';

            // Custom behavior for each form type
            switch(formType) {
            case constants.CATEGORIZED_CASCADE_FORM:
              // Get the categories used for search
              var configuration = $filter('filter')($scope.entityMetadata.configuration, { key: constants.RESULTS_USE_CATEGORY }, true);
              $scope.categories = [];
              for(var i = 0; i < configuration.length; i++) {
                var cat = configuration[i].value;

                // Shall we hide the header?
                var hideHeaderConf = $filter('filter')($scope.entityMetadata.configuration, { key: constants.HIDE_CATEGORY_HEADER, value: cat }, true);
                var showHeader = true;
                if(hideHeaderConf.length) {
                  showHeader = false;
                }


                var category = {
                  name: cat,
                  showHeader: showHeader
                };

                $scope.categories.push(category);
              }
              break;
            default:
              // Nothing to do
            }
          }

          // Generate fields
          var allFields = $filter('orderBy')(util.getEntityFields($scope.entityMetadata), '+priority.results');
          var filteredFields = $filter('resultParams')(allFields, $scope.entityMetadata);

          // Control complex fields
          for(var f = 0; f < filteredFields.length; f++) {
            var field = filteredFields[f];
            if(field.type.type === constants.FIELD_COMPLEX && field.fieldType.results === constants.FIELD_COMPLEX && field.showInResults.fields.length) {
              divideComplexField(field);
            }
            else {
              $scope.fields.push(field);
            }
          }

          // Organize the categorized fields
          $scope.categoryFields = {};
          $scope.sortedFieldsByCategory = [];
          for(var i = 0; i < $scope.categories.length; i++) {
            var category = $scope.categories[i].name;

            var matchingFields = $filter('filter')($scope.fields, { categories: category }, true);

            $scope.sortedFieldsByCategory = $scope.sortedFieldsByCategory.concat(matchingFields);

            $scope.categoryFields[category] = matchingFields;
          }

          // Setup editable
          var isEditable = $scope.entityMetadata.editable !== null;
          var isAllowed = null;
          if(isEditable) {
            isAllowed = permissionManager.isAllowed($scope.entityMetadata.editable);
          }
          var bEditable = !isEditable || !isAllowed;
          $scope.isEditable = !bEditable;
        };

        var	entityLabel = $filter('translate')($scope.entityMetadata.entityLabel);

      	$scope.extra = {
      		label: entityLabel,
      		labelPlaceholder: $scope.entityMetadata.entityLabel
   
      	};

        $scope.filerData = function () {
          var dataFilter = $filter('filter')($scope.entities, $scope.filterCode);
          $scope.paginationUpdate(dataFilter);
        };

        $scope.showInRed = function(statut) {
          return (angular.isUndefined(statut) || statut == null || statut ==true); 
        };

        $scope.resultClick = function(metadata, entity, index) {
        	
          // Look for custom actions
  	  	  var actions = metadata.overrideDefaults;
  	  	  var matchingActions = null;
  	  	  if(actions.length) {
  	  		  matchingActions = $filter('filter')(actions, { overrides: 'result-click' });
  	  	  }
        	
	  	    // Dispatch 'em all (in batch)
      	  if (matchingActions && matchingActions.length) {
      		  $rootScope.operations.dispatchActionBatch(matchingActions, { id: util.getEntityId(metadata, entity), entityType: metadata.name, self: $scope, item: entity, index: index });
      	  }
          // Is it editable?
          else if($scope.isEditable) {
        	  $scope.updateEntity(metadata, entity);
          }
        };
        
        $scope.showSorting = function(sorting, isDESC) {
          if (sorting !== '') {
            if (isDESC) {
              if (sorting === 'asc') {
                return 'dropup';
              } else {
                return '';
              }
            } else {
              return 'caret';
            }
          } else {
            return '';
          }
        };
        
        $scope.sorting = function(field, type) {

          // Reset sorting
          // for (var i = 0; i < $scope.fields.length; i++) {
          //     $scope.fields[i].sorting = '';
          // }

          // Apply sorting
          // field.sorting = type;
          
          //Call search function
          $scope.submitSorting(field, type);
          $scope.$broadcast('sorting', { field: field, type: type });
        };

        // var resultFields = $scope.fields = [];
        // for(var i = 0; i < filteredFields.length; i++) {
        //   var field = filteredFields[i];

        //   // Is it complex?
        //   if(field.fieldType.results === constants.FIELD_COMPLEX) {
        //     var complexType = field.type.complexType;
        //     var complexMetadata = util.getMetadata(complexType);

        //     var fieldFields = field.showInResults.fields;

        //     var complexFields = util.getEntityFields(complexMetadata);

        //     var selectedFields = $filter('selectedFields')(complexFields, fieldFields);

        //     for(var f = 0; f < selectedFields.length; f++) {
        //       var fieldObj = {
        //         field: field,
        //         subfield: selectedFields[f],
        //         complex: true
        //       };

        //       resultFields.push(fieldObj);
        //     }
        //   }
        //   else {
        //     resultFields.push(field);
        //   }
        // }

        var watchers = null;
        $scope.$on('suspend', function() {
          watchers = $scope.$$watchers;
          $scope.$$watchers = [];
        });

        $scope.$on('resume', function() {
          $scope.$$watchers = watchers;
        });        
      },
      link: function postLink(scope, element, attrs) {

        // scope.$watchCollection('filterCode', scope.filerData)
        
      }
      
    };
  });
