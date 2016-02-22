'use strict';

/*
 * @ngdoc filter
 * @name konga.filter:statut
 * @function
 * @description
 * # statut
 * It turns the true/false statut, in Active/Inactive
 * @param {Array} value Defines the array of fields to filter
 * @param {Object} field Defines the field to manage
 */
angular.module('konga')
  .filter('activeInactive', ['configurationManager', function () {
    return function (value,field) {
		if (value) {
			return 'message.boolean.yes';
		} else {
			return 'message.boolean.no';
		}
    };
  }]);
