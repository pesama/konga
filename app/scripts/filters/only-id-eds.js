'use strict';

/**
 * @ngdoc filter
 * @name sigmaNgApp.filter:onlyIdEds
 * @function
 * @description
 * # onlyIdEds
 * It receives an array of ENTITY entities, and returns another one containing just their ids.
 */
angular.module('sigmaNgApp')
  .filter('onlyIdEds', function () {
    return function (input) {
      var ret = [];
      for(var i = 0; i < input.length; i++) {
      	ret.push(input[i].id);
      }

      return ret;
    };
  });
