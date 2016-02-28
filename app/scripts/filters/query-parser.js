'use strict';

/**
 * @ngdoc filter
 * @name konga.filter:queryParser
 * @function
 * @description
 * # queryParser
 * Filter in the konga.
 */
angular.module('konga')
  .filter('queryParser', ['util', function (util) {
    return function (field, entity, oldQuery) {

    	// Generate blank query
    	var query = oldQuery ? oldQuery : {};

    	// Get field's query
		var fieldQuery = field.type.query;

		// TODO Remove when evolution in Konga present for empty queries
		if(fieldQuery instanceof Array) {
			fieldQuery = {};
		}

		// Parse values from field's query
		for(var param in fieldQuery) {
			var value = fieldQuery[param];

			// Simple parsing
			if(value.match(util.constants.QUERY_PARAM_REGEXP)) {

				// Remove the brackets
				var realValue = value.replace(/[{-}]/g, '');

				// Get entity's value
				var entityValue = entity[realValue];

				if(entityValue !== null && entityValue !== undefined && !(entityValue.length === 0)) {
					query[param] = entityValue;
				}
			}

			// Complex parsing
			else if(value.match(util.constants.QUERY_COMPLEX_PARAM_REGEXP)) {

				// Remove the brackets
				var valuePath = value.replace(/[{-}]/g, '').split(/\./);
				var entityValue = entity;

				// Move along path
				for(var i = 0; i < valuePath.length; i++) {
					var step = valuePath[i];
					if(!entityValue) {
						break;
					}

					entityValue = entityValue[step];
				}

				if(entityValue !== null && entityValue !== undefined && !(entityValue.length === 0)) {
					query[param] = entityValue;
				}
			}

			// If not, put plain value
			else {
				query[param] = value;
			}
		}

		return query;
    };
  }]);
