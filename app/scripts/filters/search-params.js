'use strict';

/**
 * @ngdoc filter
 * @name sigmaNgApp.filter:searchParams
 * @function
 * @description
 * It receives an entity, and returns all its fields that could be used for searching purposes. 
 */
angular.module('sigmaNgApp')
  .filter('searchParams', function () {
    return function (fields, metadata) {
      var result = [];

      for(var i = 0; i < fields.length; i++) {
        var field = fields[i];

        if(field.searchable.value) {
            result.push(field);
        }
      }

      return result;
    };
  });
