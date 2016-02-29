'use strict';

/**
 * @ngdoc directive
 * @name konga.directive:calendarInput
 * @restrict E
 * @description
 *
 * The `calendarInput` is a {@link konga.directive:rawInput `rawInput`} field type that renders a {@link http://fullcalendar.io/ `fullcalendar`} as field's layout, if the {@link Metadata.Field field's} `fieldType` is set to {@link Metadata.FieldTypes#properties_CALENDAR `CALENDAR`}.
 *
 * The calendar field is just a container of objects, that have properties for defining an {@link http://fullcalendar.io/docs/event_data/Event_Object/ `Event Object`}. The calendar takes these properties and renders the events into the ui, giving you full access to your events - and the calendar for including new - through events.
 *
 * # <span class="text-success"><i class="fa fa-rocket"></i>Events</span>
 *
 * The `calendarInput` communicates with the outside via events. Events are fired on the ui component once an user triggers an action within its bounds. The events the `calendarInput` fires are:
 *
 * * **`calendar-day-clicked`:** Fired when the user clicks on a calendar day.
 * * **`calendar-event-clicked`:** Fired when the user clicks on an existing event.
 * * **`calendar-event-render`:** Used when an event finishes its `rendering` process.
 *
 * All events include a data object that gives enough contextual information about where the event has its origin, letting you fully interact with the calendar creating events on `day click`, or opening modals with an existing event information...
 * 
 * TODO Examples
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
