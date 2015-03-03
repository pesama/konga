'use strict';

/**
 * @ngdoc filter
 * @name sigmaNgApp.filter:ticsElements
 * @function
 * @description
 * # ticsElements
 * Filter in the sigmaNgApp.
 */
angular.module('sigmaNgApp')
  .filter('ticsElements', function () {
    return function (input) {
    	var elements = [];
    	var elementIds = [];

    	for(var i = 0; i < input.length; i++) {
    		var element = input[i].evenementStandard;
    		var id = element.idEvenement;

    		if(elementIds.indexOf(id) === -1) {
    			elementIds.push(id);
    			elements.push(element);
    		}
    	}

    	return elements;
    };
  });
