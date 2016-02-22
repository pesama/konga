'use strict';

/*
 * @ngdoc filter
 * @name konga.filter:formType
 * @function
 * @description
 * # formType
 * It receives an input ,and it returns a string 'formType filter' plus input.
 * @param {String} input Defines the String to be added.
 */
angular.module('konga')
  .filter('formType', function () {
    return function (input) {
      return 'formType filter: ' + input;
    };
  });
