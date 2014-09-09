'use strict';

/**
 * @ngdoc filter
 * @name sigmaNgApp.filter:resultParams
 * @function
 * @description
 * # resultParams
 * Filter in the sigmaNgApp.
 */
angular.module('sigmaNgApp')
  .filter('resultParams', function () {
    return function (fields, metadata) {
      var result = [];

      for(var i = 0; i < fields.length; i++) {
      	var field = fields[i];

        if(field.showInResults.value) {
        		result.push(field);
        }
      }

      return result;
    };
  });
