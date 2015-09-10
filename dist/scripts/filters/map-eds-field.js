'use strict';

/**
 * @ngdoc filter
 * @name kongaUI.filter:mapEdsField
 * @function
 * 
 * @description
 * It receives an entity and the defined path for the field to map, and it returns the value located in that path for such entity.
 * 
 * @param {Object} entity Defines the entity to manage
 * @param {Object} field Defines the field to manage
 */
angular.module('ui.konga')
  .filter('mapEdsField', function () {
    return function (entity, field) {
    	if(!entity) {
			return null;
		}

		if(field.derived) {
			var path = field.apiPath;
			var pathSteps = path.split('.');

			var current = entity;

			for(var i = 0; i < pathSteps.length; i++) {
				if(current) {
					current = current[pathSteps[i]];
				}
				else {
					// TODO Log something?
					current = null;
					break;
				}
			}

			return current;
		}

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
