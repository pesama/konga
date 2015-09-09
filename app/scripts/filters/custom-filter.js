'use strict';

/**
 * @ngdoc filter
 * @name ui.konga.filter:customFilter
 * @function
 * @description
 * # customFilter
 * Filter in the ui.konga.
 */
angular.module('ui.konga')
  .filter('customFilter', ['$filter', function ($filter) {
    return function (value, filter) {
      return $filter(filter)(value);
    };
  }]);
