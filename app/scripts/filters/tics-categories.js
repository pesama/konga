'use strict';

/**
 * @ngdoc filter
 * @name sigmaNgApp.filter:ticsCategories
 * @function
 * @description
 * # ticsCategories
 * Filter in the sigmaNgApp.
 */
angular.module('sigmaNgApp')
  .filter('ticsCategories', ['$filter', function ($filter) {
    return function (input) {
      var ret = [];

      for(var i = 0; i < input.length; i++) {
      	var category = input[i].attribMadEr;
      	if(ret.indexOf(category) === -1) {
      		ret.push(category);
      	}
      }

      return ret;
    };
  }]);
