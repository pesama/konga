'use strict';

/**
 * @ngdoc filter
 * @name sigmaNgApp.filter:ticsEvents
 * @function
 * @description
 * # ticsEvents
 * Filter in the sigmaNgApp.
 */
angular.module('sigmaNgApp')
  .filter('ticsEvents', ['$filter', function ($filter) {
    return function (input, element, date, sourceId) {
      var events = [];

      for(var i = 0; i < input.length; i++) {
      	var evt = input[i];


      	if(evt.evenementStandard.idEvenement === element.idEvenement && $filter('date')(date.getTime(), 'dd-MM-yyyy') === $filter('date')(evt.date, 'dd-MM-yyyy')) {

          // Does it belong to the same chantier?
          evt.$belongs = evt.chantier.id === sourceId;

      		events.push(evt);
      	}
      }

      return events;
    };
  }]);
