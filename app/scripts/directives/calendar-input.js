'use strict';

/**
 * @ngdoc directive
 * @name konga.directive:calendarInput
 * @restrict E
 * @description
 *
 * Calendar input. It's rendered by the `rawInput` once it founds a field with the {@link Metadata.FieldTypes#properties_CALENDAR `calendar`} `fieldType`.
 *
 * # Object structure
 * 
 * A {@link Metadata.FieldTypes#properties_CALENDAR `calendar`} type is a rendering mode for any field that represents an array of {@link Standards.Data%20types#properties_Event}
 * 
 */
angular.module('konga')
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
