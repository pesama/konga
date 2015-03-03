'use strict';

/**
 * @ngdoc filter
 * @name sigmaNgApp.filter:fieldMultiplicity
 * @function
 * @description
 * # fieldMultiplicity
 * Filter in the sigmaNgApp.
 */
angular.module('sigmaNgApp')
  .filter('fieldMultiplicity', function () {
    return function (field, mode) {
      if(mode === constants.SCOPE_SEARCH) {
      	return field.searchConf.multiplicity;
      }

      return field.multiplicity;
    };
  });
