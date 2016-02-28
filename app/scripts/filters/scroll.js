'use strict';

/**
 * @ngdoc filter
 * @name konga.filter:scroll
 * @function
 * @description
 * # scroll
 * It receives an array of objects (i.e. input), and it returns another array containing elements of the old one arranging the index from 0 to limit.
 * @param {Object} input Defines an array of objects
 * @param {Number} limit Defines the number of object getting from input.
 */
angular.module('konga')
  .filter('scroll', function () {
    return function (input, limit) {
      return input.slice(0, limit);
    };
  });
