'use strict';

/**
 * @ngdoc filter
 * @name sigmaNgApp.filter:selectData
 * @function
 * @description
 * # selectData
 * Filter in the sigmaNgApp.
 */
angular.module('sigmaNgApp')
  .filter('selectData', function () {
    return function (metadata, entities) {
		var result = [];

		for(var i = 0; i < entities.length; i++) {
			var obj = {
				id : util.getEntityId(metadata, entities[i]),
				key : util.getEntityCode(metadata, entities[i]),
				value : util.getEntityLabel(metadata, entities[i])
			}
			result.push(obj);
		}

      return result;
    };
  });
