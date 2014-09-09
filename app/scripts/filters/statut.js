'use strict';

/**
 * @ngdoc filter
 * @name sigmaNgApp.filter:statut
 * @function
 * @description
 * It turns the true/false statut, in Active/Inactive
 */
angular.module('sigmaNgApp')
  .filter('statut', function () {
    return function (value) {
		if(value){
			return 'message.radio.active';
		}
		return 'message.radio.inactive';
    };
  });
