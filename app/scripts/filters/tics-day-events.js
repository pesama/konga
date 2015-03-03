'use strict';

/**
 * @ngdoc filter
 * @name sigmaNgApp.filter:ticsDayEvents
 * @function
 * @description
 * # ticsDayEvents
 * Filter in the sigmaNgApp.
 */
angular.module('sigmaNgApp')
  .filter('ticsDayEvents', ['$filter', function ($filter) {
    return function (input, date) {
      var ret = [];

      for(var i = 0; i < input.length; i++) {
      	var evt = input[i];
      	var evtDate = evt.date;
      	var filterDate = $filter('date')(evtDate, 'yyyy-MM-dd');

      	if(filterDate === date) {
      		ret.push(evt);
      	}
      }

      return ret;
    };
  }]);
