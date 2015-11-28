'use strict';

/**
 * @ngdoc directive
 * @name uikongaApp.directive:calendarInput
 * @description
 * # calendarInput
 */
angular.module('ui.konga')
  .directive('calendarInput', function () {
    return {
      templateUrl: '/konga/views/calendar-input.html',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        scope.uiConfif = {
	      calendar:{
	        height: 600,
	        editable: true,
	        header:{
	          left: '',
	          center: 'title',
	          right: 'today prev,next'
	        },
	        dayClick: scope.alertEventOnClick,
	        eventDrop: scope.alertOnDrop,
	        eventResize: scope.alertOnResize
	      }
	    };
      }
    };
  });
