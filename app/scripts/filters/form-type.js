'use strict';

/**
 * @ngdoc filter
 * @name sigmaNgApp.filter:formType
 * @function
 * @description
 * # formType
 * It receives an input ,and it returns a string 'formType filter' plus input.
 * @param {String} input Defines the String to be added.
 */
angular.module('sigmaNgApp')
  .filter('formType', function () {
    return function (input) {
      return 'formType filter: ' + input;
    };
  });
