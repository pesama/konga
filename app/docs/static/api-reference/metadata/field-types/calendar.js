/**
 * @ngdoc object
 * @propertyOf Metadata.FieldTypes
 * @name CALENDAR
 * @description
 *
 * The `calendarInput` is a {@link konga.directive:rawInput `rawInput`} field type that renders a {@link http://fullcalendar.io/ `fullcalendar`} as field's layout, if the {@link Metadata.Field field's} `fieldType` is set to {@link Metadata.FieldTypes#properties_CALENDAR `CALENDAR`}.
 *
 * The calendar field is just a container of objects, that have properties for defining an {@link http://fullcalendar.io/docs/event_data/Event_Object/ `Event Object`}. The calendar takes these properties and renders the events into the ui, giving you full access to your events - and the calendar for including new - through events.
 *
 * # Data types <span class="label label-success">{@link Metadata.DataTypes#properties_COMPLEX calendar}</span>
 *
 * The `calendar input` is designed to be used with {@link Metadata.DataTypes#properties_COMPLEX `calendar`} data types.
 * 
 * The calendar input uses . 
 *
 * # Multiplicities
 * 
 * The `calendar input` is designed for {@link Metadata.Multiplicities#properties_MANY `MANY`} multiplicity.
 *
 * # Configuration
 * 
 * _Inherited from {@link konga.directive:rawInput `rawInput`}_
 *
 * The `calendar input` does not extend nor override `raw` functionality.
 *
 * # Events
 *
 * _Inherited from {@link konga.directive:rawInput `rawInput`}_
 *
 * * * **`calendar-day-clicked`:** Fired when the user clicks on a calendar day.
 * * **`calendar-event-clicked`:** Fired when the user clicks on an existing event.
 * * **`calendar-event-render`:** Used when an event finishes its `rendering` process.
 *
 * All `calendarInput` events include a data object with the information about the action:
 <pre>
   {
     date: Date,
     jsEvent: Event,
     view: view,
     resourceObj: resourceObj
   }
 </pre>
 *
 * # Validations
 *
 * The `calendar input` allows these validations:
 *
 * * **`[min|max]Length`:** The input won't validate unless the event size is within the bounds defined.
 *
 * For the `calendar input` you might want to add {@link Customisation.Action-driven#properties_customActions custom actions} to allow easier interactions with the calendar and its events. 
 *
 *
 * @example
<example module="myAwesomeApp">
  <file name="calendar.html">
    <div class="form-demo row" ng-controller="FieldController">
      <raw-input 
        property="field"
        vertical="true"
        ng-repeat="field in fields | filter:{ name: 'calendar-field' }" 
        entity="entity" 
        on-update="onUpdate"
        on-change="onChange"
        metadata="metadata"
        mode="update"
        creating="true"
        index="0">
      </raw-input>
    </div>
  </file>
  <file name="controller.js">
    angular.module('myAwesomeApp')
      .controller('FieldController', ['$scope', 'util', 'scaffold', function($scope, util, scaffold) {
        // Get metadata
        $scope.metadata = util.getMetadata('fieldtype-demo');

        // Get fields
        $scope.fields = util.getEntityFields($scope.metadata);

        // Create an entity
        $scope.entity = scaffold.newEntity($scope.metadata);

        // Listen for updates
        $scope.log = [];
        $scope.onUpdate = function(metadata, value, entity, parentField, parentEntity) {
          entity[metadata.name] = value.text;
          $scope.log.push('setting value ' + value.text);
        }

        $scope.typeof = function(value) {
          if(value === null) return 'null';
          if(value === undefined) return 'undefined';
          return typeof(value);
        };
      }]);
  </file>
</example> 
 * 
 */