'use strict';

/*
 * @ngdoc filter
 * @name Konga Reference.filter:customFilter
 * @function
 * @description
 * # customFilter
 * Filter in the Konga Reference.
 */
angular.module('konga')
  .filter('customFilter', ['$filter', function ($filter) {
    return function (value, filter) {
      return $filter(filter)(value);
    };
  }]);
