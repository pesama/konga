'use strict';

/**
 * @ngdoc filter
 * @name Konga Reference.filter:updateParams
 * @function
 * @description
 * # updateParams
 * It receives an array of fields , metadata and category, and it returns all entity's fields that could be used for updating purposes.
 * @param {Array} fields Defines an array of fields of the entity.
 * @param {Object} metadata Defines the metadata of the entity
 * @param {Object} the category of the entity
 * 
 */
angular.module('konga')
  .filter('updateParams', function () {
    return function (fields, metadata, category) {
      var result = [];

      for(var i = 0; i < fields.length; i++) {
        var field = fields[i];

        // TODO Verify permissions
        if(field.showInUpdate.value !== null) {
            if(category !== undefined) {
              if(field.categories.indexOf(category) !== -1) {
                result.push(field);
              }
            }
            else 
              result.push(field);
        }
      }

      return result;
    };
  });
