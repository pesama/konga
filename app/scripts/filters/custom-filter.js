'use strict';

/**
 * @ngdoc filter
 * @name konga.filter:customFilter
 * @function
 * @description
 * # customFilter
 * Filter in the konga.
 */
angular.module('konga')
  .filter('customFilter', ['$filter', function ($filter) {
    return function (value, filter) {
      return $filter(filter)(value);
    };
  }]);
