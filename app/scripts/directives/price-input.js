'use strict';

/**
 * @ngdoc directive
 * @name konga.directive:priceInput
 * @description
 * # priceInput
 */
angular.module('konga')
  .directive('priceInput', ['$filter', '$timeout', function ($filter, $timeout) {
    return {
      templateUrl: 'views/price-input.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.currency = '';
        scope.showCurrency = true;

        scope.inner = {
          text: ''
        };

        function init(first) {
          var configuration = scope.property.fieldType.configuration[0];
          var currency = $filter('filter')(configuration, {key: 'CURRENCY'}, true)[0];

          var configurationSource = $filter('filter')(configuration, { key: 'CURRENCY_SOURCE' }, true)[0];

          if(!configurationSource) {
            scope.currency = currency.value;
          }
          else {
            switch(configurationSource.value) {
            case 'translate':
              scope.currency = $filter('translate')(currency.value);
              break;
            case 'entity':
              var unitSplit = currency.value.split('.');
              var source = scope.entity;
              for(var i = 0; i < unitSplit.length && source; i++) {
                source = source[unitSplit[i]];
              }
              scope.currency = source;
              
              if(first) {
                // Setup watcher
                scope.$watch('entity.' + currency.value, function() {
                  init();
                });
              }
              break;
            case 'none':
              scope.showCurrency = false;
              scope.currency = 'N/A'; 
              break;
            default:
              scope.currency = currency.value;
            }
          }
        }

        init(true);

        scope.$watch('value.text', function(newValue, oldValue) {
          scope.formatInput(true);
        });

        scope.formatInput = function(inverse, validate) {

          if(validate) {
            // Invalidate form to wait for formatting
            scope.$emit('form-invalid', {
              field: scope.property.name,
              owner: scope.property.owner,
              validation: 'price-formatting',
              valid: false
            });
          }

          var value = null;
          if(inverse) {
            value = $filter('priceRenderer')(scope.value.text, scope.property);
            scope.inner.text = value;

          }
          else {
            if(scope.inner.timeout) {
              $timeout.cancel(scope.inner.timeout);
            }
            scope.inner.timeout = $timeout(function() {
              var input = scope.inner.text ? scope.inner.text
                            .replace(',', '.')
                            .replace(/\s/g, '') : scope.inner.text;
                            
              scope.value.text = input ? parseFloat(input) : null;
              scope.formatInput(true);

              scope.$emit('form-invalid', {
                field: scope.property.name,
                owner: scope.property.owner,
                validation: 'price-formatting',
                valid: true
              });
            }, 1500);
          }
        };
      }
    };
  }]);
