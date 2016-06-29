'use strict';

/**
 * @ngdoc directive
 * @name konga.directive:searchPane
 * @scope
 * @restrict E
 * @description
 * 
 * The `searchPane` is in charge of all rendering operations of the search forms, along with the communication with the controller for upper-level tasks, using the info received by lower-level elements - the {@link konga.directive:rawInput `rawInputs`}.
 *
 * <img src="/static/search-pane-basic-flow.png" width="80%" class="center">

 # Process
 * 
 * The `searchPane` receives the {@link Metadata.Entity metadata}, the query to map values on, at the function to call once it's finished, and launches the form.
 *
 ## Get fields and categories
 *
 * Leveraging {@link Standards.Tools#methods_getEntityFields `getEntityFields`} and {@link Standards.Tools#methods_getEntityCategories `getEntityCategories`} methods, the `searchPane` gets all fields and categories that will be used in the form.
 *
 * All field-dependent responsibilities are handled independently by each field, using {@link konga.directive:rawInput `rawInput`} directives. Hence, the main duty of the `searchPane` is to split form into independent pieces - the fields - and let them work. 
 *
 ## Setup view with `formType`
 * 
 * Once the fields and categories are fetched, the `formType` assigned for {@link Metadata.FormScopes#properties_SEARCH `search` scope} on the {@link Metadata.Field field's definition} is used to determine which view to render. 
 *
 * The selected view will be provided with the fields and categories fetched on earlier stages, so they could fully build the layout the form will have.

 <img src="/static/search-pane-formtype.png" width="50%" class="center">
 *
 * There's more detailed documentation about form types, along with examples, on the {@link Metadata.FormTypes `FormType`} documentation.
 
 # Submitting
 * 
 * All submit responsibility relies on the {@link konga.controller:EntitySearchController `EntitySearchController`}. All the `searchPane` does on submit is send the query up to the defined `submit` method.
 *
 * # Resetting
 * For resetting, a {@link konga.directive:searchPane#events_reset-form `reset-form`} event will be `$broadcasted`, and every {@link konga.directive:rawInput field} will restore to defaults.
 *
 *
 @param {Object} entityMetadata
 <span class="label type-hint type-hint-object">{@link Metadata.Entity Entity}</span>
 The metadata of the entity to create a form to. 

 @param {Object} query
 The query object to deal with (the search entity).

 @param {function()} submit
 The submit method. The `searchPane` will call it once the user launches the search.

 */
angular.module('konga')
  .directive('searchPane', ['util', '$filter', '$modal', '$timeout', 'scaffold', 
    function (util, $filter, $modal, $timeout, scaffold) {
      return {
        templateUrl: '/konga/views/search-pane.html',
        replace: true, 
        restrict: 'E',
        scope: {
        	entityMetadata: '=',
          query: '=',
          submit: '=onSubmit',
          dispatch: '=onDispatch',
          reset: '=?onReset'
        },
        controller: function($scope) {
          $scope.fields = [];
          $scope.categories = [];

          $scope.init = function() {
            $scope.fields = util.getEntityFields($scope.entityMetadata);
            $scope.categories = util.getEntityCategories($scope.entityMetadata, 1);

            var formType = $scope.entityMetadata.searchType;

            if(formType === util.constants.CUSTOM_FORM) {
              var configuration = $filter('filter')($scope.entityMetadata.configuration, { key: util.constants.SEARCH_CUSTOM_VIEW });
              if(!configuration.length) {
                // TODO Show exception
              }
              $scope.contentUrl = mapper[configuration[0].value];
            }
            else {
              $scope.contentUrl = '/konga/views/' + formType.toLowerCase() + '-search-pane.html';

              // Custom behavior for each form type
              switch(formType) {
              case util.constants.CATEGORIZED_CASCADE_FORM:
                // Get the categories used for search
                var configuration = $filter('filter')($scope.entityMetadata.configuration, { key: util.constants.SEARCH_USE_CATEGORY }, true);
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
          scope.delayedSubmit = function() {
            $timeout(function() {
              scope.operations.submit();
            }, 100);
          };

          scope.operations = {
            updateField: function(property, value, query, parent) {
              var fieldName = property.name;

              // Is there an api name present?
              if(parent) {
                fieldName = property.apiName;
              }

              // Special for checkboxes :)
              if(property.fieldType.search === util.constants.FIELD_BOOLEAN) {
                if(value.active == value.inactive) {
                  // None or all, same thing
                  value.text = '';
                }
                else {
                  // If active, then its true. If not, means inactive is true, ergo, its false=active
                  value.text = value.active;
                }
              }

              if(property.fieldType.search === util.constants.FIELD_DATE) {
                value.date.startDate = (value.date.startDate == "") ? 0 : value.date.startDate;
                value.date.endDate = (value.date.endDate == "") ? 0 : value.date.endDate;
                value.text = value.date;
              }
              else if(property.searchConf.policy === util.constants.VALIDATOR_RANGE && value.range.from !== '') {
                value.text = value.range;
              }

              var ret = value.text;
              // if(ret && typeof ret === 'object') ret = ret.join(',');
              // Update the query
              query[fieldName] = ret;
              return ret;
            },

            clear: function() {
              // Verify search action
              var matchingActions = $filter('filter')(scope.entityMetadata.overrideDefaults, { overrides: 'clear' }, true);
              if (matchingActions && matchingActions.length) {
                for(var i = 0; i < matchingActions.length; i++) {
                  scope.dispatch(matchingActions[i]);
                }
              }
              else {
                scope.dispatch({ name: 'clear'});
              }
            },



            submit: function() {

              scope.reset();

              // Verify search action
              var matchingActions = $filter('filter')(scope.entityMetadata.overrideDefaults, { overrides: 'search' }, true);
              if (matchingActions && matchingActions.length) {
                for(var i = 0; i < matchingActions.length; i++) {
                  scope.dispatch(matchingActions[i]);
                }
              }
              else {
                scope.dispatch({ name: 'search'});
              }
            }
          };
        }
      };
    }]);
