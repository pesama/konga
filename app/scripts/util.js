'use strict';

/**
 * @ngdoc object
 * @name sigmaTools.Util
 * @description
 * 
 * Provides a set of common utils used all across the application.
 *
 */
var util = {

	metadataObject : null,

	getMetadata: function(name) {
		for(var i = 0; i < util.metadataObject.entities.length; i++) {
			var current = util.metadataObject.entities[i];
			if(current.name === name) {
				return current;
			}
		}
		return null;
	},

	/**
	 * @ngdoc method
	 * @methodOf sigmaTools.Util
	 * @name getEntityFields
	 * @description
	 * Returns all fields for an entity type following all hierarchy upwards.
	 * @param {Object} entity Entity metadata information
	 * @returns {Array} All fields for that entity type
	 */
	getEntityFields: function(entity) {

		// Get direct fields
		var fields = entity.fields;

		// Does it have a superClass?
		// TODO Follow hierarchy
		if(entity.superClass) {
			var superClass = util.getMetadata(entity.superClass);

			var superFields = superClass.fields;
			var superFieldsCopy = [];
			for(var i = 0; i < superFields.length; i++) {
				var newField = angular.copy(superFields[i]);
				newField.owner = entity.name;
				superFieldsCopy.push(newField);
			}

			// Get its fields
			fields = fields.concat(superFieldsCopy);
		}

		return fields;
	},

	/**
	 * @ngdoc method
	 * @methodOf sigmaTools.Util
	 * @name getEntityId
	 * @description
	 * Returns the ID of an entity, or 'new' if the entity is not provided or the id does not exist
	 * @param {Object} metadata Entity metadata information
	 * @param {Object} entity The entity to retrieve the id from
	 * @param {Boolean} fieldName If true, returns only the name of the field
	 * @returns {*} The id of the entity
	 */
	getEntityId: function(metadata, entity, fieldName) {
		var id = constants.NEW_ENTITY_ID;

		var fields = util.getEntityFields(metadata);
		for(var i = 0; i < fields.length; i++) {
			var field = fields[i];

			// Is it the id?
			if(field.isId) {
				// TODO This will fail for indirect paths. However an id should NEVER be indirect.
				if (entity) { 
					id = entity[field.name] 
				};
				if(fieldName) {
					id = field.name;
				}
				break;
			}
		}

		return id;
	},

	/**
	 * @ngdoc method
	 * @methodOf sigmaTools.Util
	 * @name getEntityCode
	 * @description
	 * Returns the code of an entity, or 'new' if the entity is not provided or the code does not exist
	 * @param {Object} metadata Entity metadata information
	 * @param {Object} entity The entity to retrieve the code from
	 * @param {Boolean} fieldName If true, returns only the name of the field
	 * @returns {*} The code of the entity
	 */
	getEntityCode: function(metadata, entity, fieldName) {
		var code = constants.NEW_ENTITY_ID;

		var fields = util.getEntityFields(metadata);
		for(var i = 0; i < fields.length; i++) {
			var field = fields[i];

			// Is it the key?
			if (field.isKey && !field.related) {
				// TODO This will fail for indirect paths. However an id should NEVER be indirect.
				if (entity) {
					code = entity[field.name];
				}
				if (fieldName) {
					code = field.name;
				}
				break;
			}
		}

		return code;
	},

	/**
	 * @ngdoc method
	 * @methodOf sigmaTools.Util
	 * @name getEntityLabel
	 * @description
	 * Returns the label of an entity, or 'new' if the entity is not provided or the label does not exist
	 * @param {Object} metadata Entity metadata information
	 * @param {Object} entity The entity to retrieve the label from
	 * @param {Boolean} fieldName If true, returns only the name of the field
	 * @returns {String} The label of the entity
	 */
	getEntityLabel: function(metadata, entity, fieldName) {
		var label = constants.NEW_ENTITY_ID;

		var fields = util.getEntityFields(metadata);
		for(var i = 0; i < fields.length; i++) {
			var field = fields[i];
			// Is it the label?
			// TODO Finish annotation
			if(field.isLabel && !field.related) {
				// TODO This will fail for indirect paths. However an id should NEVER be indirect.
				if(entity) {
					label = entity[field.name];
				}
				if(fieldName) {
					label = field.name;
				}
				break;
			}
		}

		return label;
	},
	
	/**
	 * @ngdoc method
	 * @methodOf sigmaTools.Util
	 * @name downloadFile
	 * @description
	 * Download the file that we get from a service
	 * @param {Object} href Data of the file. Pattern: "data:" + resp.mimetype + ";base64, " + resp.value
	 * @param {Object} name Name of the file
	 */
	downloadFile: function(href, name){
	 		var a = document.createElement('a');
	 	    a.href = href;
	 	    a.download = name;
	 	    a.click();
	},
	
	/**
	 * @ngdoc method
	 * @methodOf sigmaTools.Util
	 * @name getEntityCategories
	 * @description
	 * Returns all Categories for an entity 
	 * @param {Object} entity Entity metadata information
	 * @returns {Array} All Categories for that entity type
	 */
	getEntityCategories: function(entity) {

		var categories = [];
		
		// Get direct fields
		var fields = entity.fields;

		for(var i=0; i<fields.length; i++){
			if (categories.indexOf(fields[i].category) == -1){
				//It means we've found a new category
				categories.push(fields[i].category);
			}
		}

		return categories;
	},

	init: function(metadataObject) {
		util.metadataObject = metadataObject;
	}
};

