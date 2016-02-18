'use strict';

/*
 * @ngdoc directive
 * @name Konga Reference.directive:Price input
 * @description
 * # priceInput
 */
angular.module('konga')
  .directive('priceInput', ['$filter', '$timeout', function ($filter, $timeout) {
    return {
      templateUrl: '/konga/views/price-input.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.currency = '';

        scope.inner = {
          text: '',
          timeout: null
        };

        var configuration = scope.property.fieldType.configuration[0];
        var currency = $filter('filter')(configuration, {key: 'CURRENCY'}, true)[0];

        scope.currency = currency.value;

        scope.$watch('value.text', function() {
          scope.formatInput(true);
        });

        scope.formatInput = function(inverse) {
          var value = null;
          if(inverse) {
            value = $filter('number')(scope.value.text, 2);
            scope.inner.text = value;

          }
          else {
            if(scope.inner.timeout) {
              $timeout.cancel(scope.inner.timeout);
            }
            scope.inner.timeout = $timeout(function() {
              scope.value.text = scope.inner.text;
              // scope.formatInput(true);
            }, 1000);
          }
        };
      }
    };
  }]);
