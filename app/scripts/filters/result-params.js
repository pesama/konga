'use strict';

/**
 * @ngdoc filter
 * @name Konga Reference.filter:resultParams
 * @function
 * @description
 * # resultParams
 * It receives an array of fields and metadata , and it returns another array of fields containing the value of sorting field equal 'asc'.
 * @param {Array} fields Defines an array of fields of the entity
 * @param {Object} metadata Defines the metadata of the entity
 */
angular.module('konga')
  .filter('resultParams', function () {
    return function (fields, metadata) {
      var result = [];
      var hasDefaultSorting = false;

      for(var i = 0; i < fields.length; i++) {
      	var field = fields[i];

        // TODO Verify permissions
        if(field.showInResults.value !== null) {
        	field.sorting = '';
        	if(field.priority.results === 1) {
        		field.sorting = 'asc';
        		hasDefaultSorting = true;
        	}
        	result.push(field);
        }
      }
      
      if (!hasDefaultSorting && result.length > 0) {
    	  result[0].sorting = 'asc';
      }

      return result;
    };
  });
