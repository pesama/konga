'use strict';

/*
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
	        	scope.$emit('calendar-day-click', 
	        		{ 
	        			date: date, 
	        			jsEvent: jsEvent, 
	        			view: view, 
	        			resourceObj: resourceObj 
	        		});
	        },
	        eventClick: function(date, jsEvent, view) {
	        	scope.$emit('calendar-event-click', {
	        		date: date,
	        		jsEvent: jsEvent,
	        		view: view
	        	});
	        },
	        eventDrop: function() {
	        },
	        eventResize: function() {

	        },
	        eventRender: function(event, element, view) {
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
