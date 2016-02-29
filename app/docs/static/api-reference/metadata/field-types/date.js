/**
 * @ngdoc object
 * @propertyOf Metadata.FieldTypes
 * @name DATE
 * @description
 *
 * Date fields render date objects and let users select dates from a tooltip. `Date fields` support validation both with `String` patterns and `date` validations.
 *
 * # Data types <span class="label label-primary">{@link Metadata.DataTypes#properties_STRING string}</span>
 *
 * The `date input` is designed to be used with {@link Metadata.FieldTypes#properties#DATE `dates`}. However, it can handle {@link Metadata.DataTypes#properties_STRING `strings`} with a `date` format - i.e. '`yyyy-MM-dd`' - and {@link Metadata.FieldTypes#properties_NUMER `numbers`} for managing timestamps.
 * 
 *
 * # Multiplicities
 * 
 * The `date input` is designed for {@link Metadata.Multiplicities#properties_ONE `ONE`} multiplicity.
 *
 * # Configuration
 * 
 * _Inherited from {@link konga.directive:rawInput `rawInput`}_
 *
 * The `date input` does not extend nor override `raw` functionality.
 *
 * # Events
 *
 * _Inherited from {@link konga.directive:rawInput `rawInput`}_
 *
 * The `date input` does not fire nor listen further events.
 *
 * # Validations
 *
 * The `date input` allows several validations:
 *
 * * **`required`:** The input won't be valid until it's some value it's filled.
 * * **`[min|max]Length`:** The input will match against a minimum and/or maximum peaks, and evaluated valid based on whether it's value is within bounds.
 * * **`pattern`:** You can append a {@link Metadata.ValidatorTypes#properties_REGEX `regex`} validator to your input, to match the text against the expression you set.
 *
 * @example
<example module="myAwesomeApp">
  <file name="date.html">
    <div class="form-demo row" ng-controller="FieldController">
      <div class="col-md-6">
        <raw-input 
          property="field"
          vertical="true"
          ng-repeat="field in fields | filter:{ name: 'date-field' }" 
          entity="entity" 
          on-update="onUpdate"
          on-change="onChange"
          metadata="metadata"
          mode="update"
          creating="true"
          index="0">
        </raw-input>
      </div>
      <div class="col-md-6">
      	<b>Value:</b> {{ entity['date-field'] | date }}
      	<br />
      	<b>Data type:</b> {{ typeof(entity['date-field']) }}
      </div>
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