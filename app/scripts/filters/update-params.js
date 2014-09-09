'use strict';

/**
 * @ngdoc filter
 * @name sigmaNgApp.filter:updateParams
 * @function
 * @description
 * # updateParams
 * It receives an entity, and returns all its fields that could be used for updating purposes.
 */
angular.module('sigmaNgApp')
  .filter('updateParams', function () {
    return function (entity) {
      
      // Get the fields of the entity
      var entityFields = entity.fields;

      // Security measures
      if(!entityFields) return [];

      // Get the total fields
      var totalFields = util.getEntityFields(entity);

      // Initialize the matching files
      var matchingFields = [];

      // Move along the files
      for(var i = 0; i < totalFields.length; i++) {
      	var field = totalFields[i];

      	// Is it shown in update forms?
      	var showInUpdate = field.showInUpdate.value;

      	// Is it direct?
      	var direct = field.direct;

      	// Is it a key
      	var key = field.isKey;

      	/*
      	 * Criteria:
      	 * 	- Show in update
      	 * 	- isKey if the field has multiplicity MANY
      	 */
      	if(showInUpdate.value){
      		if (key && (field.multiplicity === constants.MULTIPLICITY_MANY)) {
      			matchingFields.push(field);
      		}
      		else{
      			if (field.multiplicity !== constants.MULTIPLICITY_MANY) {
      				matchingFields.push(field);
      			}
      		}
      	}
      }

      return matchingFields;
    };
  });
