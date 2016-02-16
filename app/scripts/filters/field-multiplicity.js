'use strict';

/**
 * @ngdoc filter
 * @name Konga Reference.filter:fieldMultiplicity
 * @function
 * @description
 * # fieldMultiplicity
 * Filter in the Konga Reference.
 */
angular.module('konga')
  .filter('fieldMultiplicity', function () {
    return function (field, mode) {
      if(mode === constants.SCOPE_SEARCH) {
      	return field.searchConf.multiplicity;
      }

      return field.multiplicity;
    };
  });
