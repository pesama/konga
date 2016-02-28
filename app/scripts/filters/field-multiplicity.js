'use strict';

/**
 * @ngdoc filter
 * @name konga.filter:fieldMultiplicity
 * @function
 * @description
 * # fieldMultiplicity
 * Filter in the konga.
 */
angular.module('konga')
  .filter('fieldMultiplicity', ['util', function (util) {
    return function (field, mode) {
      if(mode === util.constants.SCOPE_SEARCH) {
      	return field.searchConf.multiplicity;
      }

      return field.multiplicity;
    };
  }]);
