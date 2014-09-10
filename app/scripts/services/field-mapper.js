'use strict';

/**
 * @ngdoc service
 * @name sigmaNgApp.fieldMapper
 * @description
 * This service helps managing the connection between the entities and their forms within the UI. 
 * When a field is changed in the form, its value is stored into the entity. 
 */
angular.module('sigmaNgApp')
  .service('fieldMapper', ['api', function fieldMapper(api) {
    this.mapField = function(fieldName, edsType, entity) {
    	// TODO Implement
    };

    this.unmapField = function(fieldMetadata, edsType, entity, value) {
		try {
			// Get the name of the field
			var fieldName = fieldMetadata.name;

			// Get the type of the field
			var fieldType = fieldMetadata.type.type;

			// If the entity is not related, and it's the key, the type is text
			if(fieldType === constants.FIELD_COMPLEX && fieldMetadata.isKey) {
				fieldType = constants.FIELD_TEXT;
			}

			// Escape the value (if needed)
			var escapedValue = null;

			// Create the extra params
			var extra = {};

			switch(fieldType) {
			case constants.FIELD_TEXT:
				escapedValue = value.text;
				break;
			case constants.FIELD_BOOLEAN:
				escapedValue = value.text; // It comes casted out-of-the-box :)
				break;
			case constants.FIELD_COMPLEX:
				var ids = value.ids;
				escapedValue = value.entity;
				// for(var i = 0; i < ids.length; i++) {
				// 	var entityId = value.ids[i];
				// 	var entityType = fieldMetadata.type.complexType;

				// 	var localEndpoint = api.getLocalEndpoint(entityType);
				// 	escapedValue.push(localEndpoint.get({id: entityId}));
				// }

				// if(fieldMetadata.multiplicity === constants.MULTIPLICITY_ONE) {
				// 	escapedValue = escapedValue[0];
				// }

				break;
// 			TODO Other cases
			default:
				escapedValue = value.text;
				break;

			}

			entity[fieldName] = escapedValue;
			// var current = entity;

			// var i = 0;
			// for(i = 0; i < pathSteps.length-1; i++) {
			// 	// TODO Verify nulls
			// 	current = current[pathSteps[i]];
			// }

			// // Assign the value
			// current[pathSteps[i]] = escapedValue;

			// TODO filter value type
			
		} catch(e) {
			value = null;
			escapedValue = null;
			// TODO Log or do something here
		}

		if(value) {
			value.escaped = escapedValue;
			value.extra = {};
		}

		return value;
    };
  }]);
