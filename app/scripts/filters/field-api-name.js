'use strict';

/*
 * @ngdoc filter
 * @name Konga Reference.filter:fieldApiName
 * @function
 * @description
 * # fieldApiName
 * Filter in the Konga Reference.
 */
angular.module('konga')
  .filter('fieldApiName', ['util', function (util) {
    return function (fieldName, source) {
		var attrs = fieldName.split(' ');
		if(attrs.length === 1) {
			return fieldName;
		}

		else if(attrs[1] === util.constants.COMPLEX_FIELD_AS) {

			if(source && attrs[1] === util.constants.SELF_FIELD) {
				return source.name;
			}
			return attrs[2];
		}
    };
  }]);
