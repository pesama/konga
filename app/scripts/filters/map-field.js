'use strict';

/**
 * @ngdoc filter
 * @name konga.filter:mapField
 * @function
 * @description
 * 
 * This filter helps you getting the value of a field name specified.
 *
 * # Basic filtering
 * 
 * ```
 * entity: {
 *   id: 2,
 *   name: 'test'	
 * },
 * field: 'name'
 * 
 * <span>{{ entity | mapField:field }}</span>
 *
 * Result: 'test'
 * ```
 *
 * This filter allows you to get the value of a field within an instance of an entity. It's used all across native forms for rendering the values of the fields.
 *
 * # Complex rendering
 * 
 * ```
 * entity: {
 *   id: 2,
 *   name: 'test',
 *   owner: {
 *     firstName: 'John',
 *     lastName: 'Doe'
 *   }
 * },
 * field: 'owner.firstName'
 * 
 * <span>{{ entity | mapField:field }}</span>
 *
 * Result: 'John'
 * ```
 * 
 * # Field unmapping
 *
 * This filter is made for **reading** values out from fields. You have a tool designed for the opposite purpose - i.e. {@link konga.fieldMapper `fieldMapper`}.
 * 
 * @param {Object} entity Defines the entity to manage
 * @param {Object} field Defines the field to manage
 */
angular.module('konga')
  .filter('mapField', ['util', function (util) {
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

		return entity[field.name];
    };
  }]);
