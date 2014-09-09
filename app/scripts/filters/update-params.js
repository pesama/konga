'use strict';

/**
 * @ngdoc filter
 * @name sigmaNgApp.filter:updateParams
 * @function
 * @description
 * # updateParams
 * It receives an entity, and returns all its fields that could be used for updating purposes.
 */
angular.module('sigmaNgApp')
  .filter('updateParams', function () {
    return function (fields, metadata) {
      var result = [];

      for(var i = 0; i < fields.length; i++) {
        var field = fields[i];

        if(field.showInUpdate.value) {
            result.push(field);
        }
      }

      return result;
    };
  });
