'use strict';

/**
 * @ngdoc filter
 * @name ui.konga.filter:onlyCodeEds
 * @function
 * @description
 * # onlyCodeEds
 * It receives an array of ENTITY entities, and returns another one containing just their codes (i.e. codeEds).
 * @param {Array} input Defines the array of entities to manage
 */
angular.module('ui.konga')
  .filter('onlyCodeEds', function () {
    return function (input) {
      var ret = [];
      for(var i = 0; i < input.length; i++) {
      	var key = input[i].key;

      	// Verify non-falsey values
      	if(key) {
      		key += "";
      	}

      	ret.push(key);
      }

      return ret;
    };
  });
