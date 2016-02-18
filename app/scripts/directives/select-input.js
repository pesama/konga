'use strict';

/*
 * @ngdoc directive
 * @name Konga Reference.directive:Select input
 * @description
 * # selectInput
 */
angular.module('konga')
  .directive('selectInput', ['api', '$filter', 'util', function (api, $filter, util) {
    return {
      templateUrl: '/konga/views/select-input.html',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        scope.textinput = scope.value.text;

        // // Only enabled for update mode
        // if(scope.mode !== util.constants.SCOPE_UPDATE) {
        //   return;
        // }

      	var entityType = scope.property.type.complexType;
      	var localEndpoint = api.getLocalEndpoint(entityType);
      	var metadata = util.getMetadata(entityType);
      	var apiPath = metadata.apiPath;
      	var quickSearch = $filter('quickSearch')(metadata)[0];
      	var paramName = !quickSearch.metadata ? null : $filter('fieldApiName')(quickSearch.metadata.name, quickSearch.metadata);

        var fields = util.getEntityFields(metadata);
        var codeField = $filter('filter')(fields, { isKey: true}, true)[0];
        var labelField = scope.labelField = $filter('filter')(fields, { isLabel: true}, true)[0];

        var active = false;
      	
      	scope.getElements = function(value) {
          var query = $filter('queryParser')(this.property, this.entity);
      		
          query.path = apiPath;
      		query[paramName] = value;

          active = true;

      		return localEndpoint.search(query)
            .$promise.then(function(data) {
              return data.map(function(item){
                var code = $filter('mapField')(item, codeField);
                var label = $filter('mapField')(item, labelField);
                var ret = {
                  label: code + ' - ' + label,
                  real: item
                };
                return ret;
              });
            });
      	};

        scope.formatInput = function(value, model, label) {
          var item = value.real;
          var text = '';
          
          // Is it a many to many field?
          if($filter('fieldMultiplicity')(this.property, this.mode) === util.constants.MULTIPLICITY_MANY) {
            if(!this.value.entity || !(this.value.entity instanceof Array)) {
              this.value.entity = [];
            }

            // Look for existing items like this one
            var existing = $filter('filter')(this.value.entity, { id: item.id }, true);

            if(!existing.length) {
              // Push the entity into the array
              this.value.entity.push(item);
            }

            text = this.value.entity.map(function(item) {
              return(item.id);
            }).join(',');

            // Delete text
            this.textinput = '';
          }

          // Or it's just one?
          else {

            // Set the entity
            this.value.entity = item;

            text = item.id;

            // Delete text
            this.textinput = $filter('mapField')(item, labelField);
          }

          // Setup value's text
          this.value.text = text;
        };

        scope.writeValue = function() {
          // this.removeField(this.property, true);
        };

        var multiplicity = scope.mode === 'search' ? scope.property.searchConf.multiplicity : scope.property.multiplicity;
        if(multiplicity === util.constants.MULTIPLICITY_ONE) {
          scope.$watch('value.text', function() {
            scope.textinput = scope.value.text;
          });
        }
      }
    };
  }]);
