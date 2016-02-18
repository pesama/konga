'use strict';

/**
 * @ngdoc filter
 * @name Konga Reference.filter:selectedFields
 * @function
 * @description
 * # selectedFields
 * It receives parameters such as real, name, apiNames(if any), source, and it returns an array of  fields in nested fields for rendering purpose.
 * @param {Array} real Defines the array fields of entity to manage
 * @param {Array} names Defines the array of field name
 * @param {Array=} apiNames Defines the array of apiName of entities
 * @param {Array=} source Defines the field to manage
 */
angular.module('konga')
  .filter('selectedFields', ['$filter', 'util', function ($filter, util) {
    return function (real, names, source) {
    	
      // If no name is given, return all
    	var result = [];

      var sortedResult = [];

      // Prepare sorted results
      for(var i = 0; i < names.length; i++) {
        sortedResult.push(name);
      }

    	for(var i = 0; i < real.length; i++) {
        
        // Direct values go this way
        var nameIndex = names.indexOf(real[i].name);
    		if(nameIndex !== -1) {
    			var fieldToPush = angular.copy(real[i]);
          
          // Setup extra params for rendering
          fieldToPush.derived = true;
          fieldToPush.apiName = $filter('fieldApiName')(names[nameIndex]);
          fieldToPush.apiPath = real[i].name;
          fieldToPush.derivedPath = [];
          fieldToPush.categories = source.categories;

          // Override field configuration (avoid COMPLEX recursivity)
          // TODO Export this to configuration param
          for(var showConf in fieldToPush.fieldType) {
            if(fieldToPush.fieldType[showConf] === util.constants.FIELD_COMPLEX) {
              fieldToPush.fieldType[showConf] = util.constants.FIELD_SELECT;
            }
          }

          result.push(fieldToPush);
    		}
    	}

      // Now let's look for indirect fields
      for(var i = 0; i < names.length; i++) {
        var name = names[i];
        var nameAttrs = name.split(' ');

        // Look if SELF field is included
        if(nameAttrs[0] === util.constants.SELF_FIELD) {
          var fieldCopy = angular.copy(source);

          // Override field configuration (avoid COMPLEX recursivity)
          // TODO Export this to configuration param
          for(var showConf in fieldCopy.fieldType) {
            fieldCopy.fieldType[showConf] = util.constants.FIELD_SELECT;
          }

          // Setup extra params for rendering
          fieldCopy.derived = true;
          fieldCopy.apiName = $filter('fieldApiName')(name, fieldCopy);
          fieldCopy.apiPath = fieldCopy.name;
          fieldCopy.derivedPath = [];
          fieldCopy.isSelf = true;

          result.push(fieldCopy);
          continue;
        }

        if(nameAttrs[0].indexOf('.') !== -1) {
          var fieldPath = nameAttrs[0].split('.');
          var path = [];

          var current = null;
          var currentFields = real;

          for(var f = 0; f < fieldPath.length; f++) {
            current = fieldPath[f];

            // Move along all fields looking for the one
            for(var g = 0; g < currentFields.length; g++) {
              var currentField = currentFields[g];
              if(currentField.name === current) {
                var fieldType = currentField.type;

                if(f === fieldPath.length -1) {
                  var fieldToPush = angular.copy(currentField);

                  // Setup extra params for rendering
                  fieldToPush.derived = true;
                  fieldToPush.apiName = $filter('fieldApiName')(name);
                  fieldToPush.apiPath = nameAttrs[0];
                  fieldToPush.derivedPath = path;
                  fieldToPush.categories = source.categories;

                  // Override field configuration (avoid COMPLEX recursivity)
                  // TODO Export this to configuration param
                  for(var showConf in fieldToPush.fieldType) {
                    if(fieldToPush.fieldType[showConf] === util.constants.FIELD_COMPLEX) {
                      fieldToPush.fieldType[showConf] = util.constants.FIELD_SELECT;
                    }
                  }

                  result.push(fieldToPush);
                }
                // Field must be complex, unless it's the last iteration on the path
                else if(fieldType.type === util.constants.FIELD_COMPLEX) {
                  var complexType = fieldType.complexType;
                  var complexMetadata = util.getMetadata(complexType);

                  var complexFields = util.getEntityFields(complexMetadata);
                  currentFields = complexFields;

                  // Append the field to the current path
                  path.push(currentField);
                }

                break;
              }
            }
          }
        }
      }

      // Prepare sorted results
      for(var i = 0; i < result.length; i++) {
        var apiPath = result[i].apiPath;
        var index = names.indexOf(apiPath);

        sortedResult.splice(index, 1, result[i]);
      }

      return sortedResult;
    };
  }]);
