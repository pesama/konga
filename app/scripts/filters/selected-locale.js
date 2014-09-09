'use strict';

/**
 * @ngdoc filter
 * @name sigmaNgApp.filter:selectedLocale
 * @function
 * @description
 * # selectedLocale
 * Filter in the sigmaNgApp.
 */
angular.module('sigmaNgApp')
  .filter('selectedLocale', function () {
    return function (locales) {
    	if(!locales) {
    		return {};
    	}
      for(var i = 0; i < locales.length; i++) {
      	if(locales[i].selected) {
      		return locales[i];
      	}
      }

      return {};
    };
  });
