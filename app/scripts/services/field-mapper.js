'use strict';

/**
 * @ngdoc service
 * @name konga.fieldMapper
 * @description
 * 
 * Used for setting values in entity fields.
 *
 * # Mapping vs. unmapping
 *
 * Within this documentation, you will see contents about both mapping and unmapping. **Mapping** is the process to get a value out from a field, while **unmapping** is setting the value on it.
 *
 * # Unmapping process
 *
 * The unmapping process starts usually when a user performs changes on an input's value. Native forms contain automatic behaviors for handling data changes, calling this unmapping process beneath them. However, if you deal with custom forms, you will need to define your own handlers for data changes, for manually triggering the unmapping process.
 * 
 * ## 
 * 
 *  
 */
angular.module('konga')
  .service('fieldMapper', ['api','common','scaffold', '$filter', 'util', function fieldMapper(api, common, scaffold, $filter, util) {
    this.unmapField = function(fieldMetadata, edsType, entity, value, parentField, parentEntity) {
		try {
			// Get the name of the field
			var fieldName = fieldMetadata.name;

			// Get the type of the field
			var fieldType = fieldMetadata.type.type;

			// If the entity is not related, and it's the key, the type is text
			if(fieldType === util.constants.FIELD_COMPLEX && fieldMetadata.isKey) {
				fieldType = util.constants.FIELD_TEXT;
			}

			// Escape the value (if needed)
			var escapedValue = null;

			// Create the extra params
			//var extra = {};

			switch(fieldType) {
			case util.constants.FIELD_TEXT:
				escapedValue = value.text;
				break;
			case util.constants.FIELD_BOOLEAN:
				escapedValue = value.text; // It comes casted out-of-the-box :)
				break;
			case util.constants.FIELD_NUMBER:
				// TODO Encapsulate in a try
				escapedValue = parseFloat((value.text+"").split(',').join('.'));
				break;
			case util.constants.FIELD_COMPLEX:
				//var ids = value.ids;
				escapedValue = value.entity;
				// for(var i = 0; i < ids.length; i++) {
				// 	var entityId = value.ids[i];
				// 	var entityType = fieldMetadata.type.complexType;

				// 	var localEndpoint = api.getLocalEndpoint(entityType);
				// 	escapedValue.push(localEndpoint.get({id: entityId}));
				// }

				// if(fieldMetadata.multiplicity === util.constants.MULTIPLICITY_ONE) {
				// 	escapedValue = escapedValue[0];
				// }

				break;
			case util.constants.FIELD_FILE:
				escapedValue = value.files;
				escapedValue.$filesIncluded = !!escapedValue.length;
				break;
// 			TODO Other cases
			default:
				escapedValue = value.text;
				break;

			}

			//if it has parentField and its parent is type COMPLEX
			if (parentField && (parentField.type.type === util.constants.FIELD_COMPLEX)){
				
				//Get the metadata of its parent
				var entityMetadata = common.getMetadata(parentField.type.complexType);
				var entityParent = null;

				// Get the parent's multiplicity
				var parentMultiplicity = parentField.multiplicity;

				if(parentMultiplicity === util.constants.MULTIPLICITY_ONE) {
					// Avoid input unrecognized fields
					// FIXME Find a better way (SM)
					if(parentEntity[fieldName] !== undefined) {
						parentEntity[fieldName] = escapedValue;
					}
				}
				else {
					var parentFieldName = parentField.name;
					parentEntity[parentFieldName].splice(0, entity.length);
				
					for (var i = 0; i < escapedValue.length; i++) {
						//Create a new entity of its parent with the metadata
						entityParent = scaffold.newEntity(entityMetadata);
					
						//First time, inicialize the object
						if (!entityParent[fieldName])
							entityParent[fieldName] = {};
						
						//Complete the entity of parent with the datas of escapedValue
						entityParent[fieldName] = escapedValue[i];
						
						//Push the entity of parent in the entity
						if (entityParent != null)
							parentEntity[parentFieldName].push(entityParent);
					}	
				}
				
				
			} else {
				entity[fieldName] = escapedValue;
			}
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
