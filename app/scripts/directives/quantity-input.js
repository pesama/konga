'use strict';

/**
 * @ngdoc directive
 * @name konga.directive:quantityInput
 * @description
 * # quantityInput
 */
angular.module('konga')
  .directive('quantityInput', function () {
    return {
      templateUrl: 'views/quantity-input.html',
      restrict: 'E',
      controller: function($scope, $filter) {
      	// Setup default unit
      	$scope.unit = 'u.';
        $scope.decimal = 0;
        $scope.step = 1;

        function init(first) {
          // Find configuration parameters
          var configuration = $scope.property.fieldType.configuration[0];
          
          // Unit
          var configurationUnit = $filter('filter')(configuration, { key: 'QUANTITY_UNIT' }, true)[0];
          var configurationUnitSource = $filter('filter')(configuration, { key: 'QUANTITY_UNIT_SOURCE' }, true)[0];

          // Decimals
          var configurationDecimal = $filter('filter')(configuration, { key: 'QUANTITY_DECIMAL' }, true)[0];
          var configurationDecimalSource = $filter('filter')(configuration, { key: 'QUANTITY_DECIMAL_SOURCE' }, true)[0];

          // Configure unit
          if(configurationUnit) {
            var unit = configurationUnit.value;
            var source = configurationUnitSource ? configurationUnitSource.value : null;
            switch(source) {
            case 'translate':
              $scope.unit = $filter('translate')(unit);
              break;
            case 'entity':
              var unitSplit = unit.split('.');
              var source = $scope.entity;
              for(var i = 0; i < unitSplit.length && source; i++) {
                source = source[unitSplit[i]];
              }

              if(first) {
                // Setup watcher
                $scope.$watch('entity.' + unit, function() {
                  init();
                });
              }

              $scope.unit = source;
              break;
            default: 
              $scope.unit = unit;
              break;
            }
          }

          // Configure decimals
          if(configurationDecimal) {
            var decimal = configurationDecimal.value;
            var source = configurationDecimalSource ? configurationDecimalSource.value : null;
            switch(source) {
            case 'plain':
              $scope.decimal = parseInt(decimal);
              break;
            case 'entity':
              var decimalSplit = decimal.split('.');
              var source = $scope.entity;
              for(var i = 0; i < decimalSplit.length && source; i++) {
                source = source[decimalSplit[i]];
              }

              if(first) {
                // Setup watcher
                $scope.$watch('entity.' + decimal, function() {
                  init();
                });
              }

              $scope.decimal = source;
              break;
            default: 
              $scope.decimal = decimal;
              break;
            }
          }

          // Configure step
          for(var i = 0; i < $scope.decimal; i++) {
            $scope.step /= 10;
          }
        }

        if($scope.entity.$resolved !== false) {
          init(true);
        }
        else {
          $scope.$watch('entity.$resolved', function() {
            if($scope.entity.$resolved) {
              init(true);
            }
          })
        }

      },
      link: function postLink(scope, element, attrs) {
        
      }
    };
  });
