'use strict';

/**
 * @ngdoc filter
 * @name sigmaNgApp.filter:onlyCodeEds
 * @function
 * @description
 * It receives an array of ENTITY entities, and returns another one containing just their codes (i.e. codeEds).
 */
angular.module('sigmaNgApp')
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
