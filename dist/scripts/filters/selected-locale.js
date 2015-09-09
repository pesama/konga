'use strict';

/**
 * @ngdoc filter
 * @name ui.konga.filter:selectedLocale
 * @function
 * @description
 * # selectedLocale
 * It receives an array of locales , and it returns an locale object which have the value of selected field equal true or returns empty.
 * @param {Array} locales Defines the array of locale
 */
angular.module('ui.konga')
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
