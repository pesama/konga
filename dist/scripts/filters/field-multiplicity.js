'use strict';

/**
 * @ngdoc filter
 * @name ui.konga.filter:fieldMultiplicity
 * @function
 * @description
 * # fieldMultiplicity
 * Filter in the ui.konga.
 */
angular.module('ui.konga')
  .filter('fieldMultiplicity', function () {
    return function (field, mode) {
      if(mode === constants.SCOPE_SEARCH) {
      	return field.searchConf.multiplicity;
      }

      return field.multiplicity;
    };
  });
