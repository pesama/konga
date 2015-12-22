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
        scope.uiConfig = {
	      calendar:{
	        height: 600,
	        editable: true,
	        header:{
	          left: '',
	          center: 'title',
	          right: 'today prev,next'
	        },
	        firstDay: 1,
	        events: scope.value.entity,
	        dayClick: function(date, jsEvent, view, resourceObj) {
	        	// TODO Do something

	        	scope.$emit('calendar-day-click', 
	        		{ 
	        			date: date, 
	        			jsEvent: jsEvent, 
	        			view: view, 
	        			resourceObj: resourceObj 
	        		});
	        },
	        eventDrop: function() {
	        },
	        eventResize: function() {

	        },
	        eventRender: function(event, element, view) {
	        	// TODO Do something

	        	scope.$emit('calendar-event-render', 
	        		{ 
	        			event: event, 
	        			element: element,
	        			view: view
	        		});
	        }
	      }
	    };
      }
    };
  });
