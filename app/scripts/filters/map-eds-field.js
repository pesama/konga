'use strict';

/**
 * @ngdoc filter
 * @name sigmaNgApp.filter:mapEdsField
 * @function
 * @description
 * It receives an entity and the defined path for the field to map, and it returns the value located in that path for such entity. 
 */
angular.module('sigmaNgApp')
  .filter('mapEdsField', function () {
    return function (entity, field) {
    	if(!entity) {
			return null;
		}

		// var pathSteps = path.split('.');

		// for(var i = 0; i < pathSteps.length; i++) {
		// 	if(current) {
		// 		current = current[pathSteps[i]];
		// 	}
		// 	else {
		// 		// TODO Log something?
		// 		current = null;
		// 		break;
		// 	}
		// }

		// Verify if field is complex
		if(field.type.type === constants.FIELD_COMPLEX) {
			// TODO
			return entity[field.name];
		}
		else {

			return entity[field.name];
		}
    };
  });
