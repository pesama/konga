'use strict';

/**
 * @ngdoc filter
 * @name konga.filter:priceTableRenderer
 * @function
 * @description
 * # priceTableRenderer
 * Filter in the konga.
 */
angular.module('konga')
  .filter('priceRenderer', ['$filter', function ($filter) {
    return function (input, field, symbol) {
      var configuration = field.fieldType.configuration[0];

      var configurationThousand = $filter('filter')(configuration, { key: 'CURRENCY_THOUSAND_SEPARATOR' }, true)[0];

      var configurationDecimal = $filter('filter')(configuration, { key: 'CURRENCY_DECIMAL_SEPARATOR' }, true)[0];
      
      var value = $filter('number')(input, 2);

      var strValue = value + '';

      return strValue;
    };
  }]);
