'use strict';

/**
 * @ngdoc filter
 * @name ui.konga.filter:searchParams
 * @function
 * @description
 * # searchParams
 * It receives an entity metadata information, and returns all its fields that could be used for searching purposes.
 * @param {Array} fields Defines an array of fields of the entity
 * @param {Object=} metadata Defines the metadata of the entity 
 */
angular.module('ui.konga')
  .filter('searchParams', function () {
    return function (fields, metadata) {
      var result = [];

      for(var i = 0; i < fields.length; i++) {
        var field = fields[i];

        // TODO Verify permissions
        if(field.searchable.value !== null) {
            result.push(field);
        }
      }

      return result;
    };
  });
