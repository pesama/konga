/**
 * @ngdoc object
 * @propertyOf Metadata.FieldTypes
 * @name NUMBER
 * @description
  * HTML5 `number text` input. It renders as an `<input type="number">`, and accepts by default any string as value. You can append validators to assure integrity of the data within your requirements.
 *
 * # Data types <span class="label label-danger">{@link Metadata.DataTypes#properties_NUMBER number}</span>
 *
 * The `number input` is designed to be used with {@link Metadata.DataTypes#properties_NUMBER `number`} data types.
 * 
 * The number input uses the numerical value set in the field. The input should restrict users for writing any _non-numerical_ value tried to be written. 
 *
 * # Multiplicities
 * 
 * The `number input` is designed for {@link Metadata.Multiplicities#properties_ONE `ONE`} multiplicity.
 *
 * # Configuration
 * 
 * _Inherited from {@link konga.directive:rawInput `rawInput`}_
 *
 * The `number input` does not extend nor override `raw` functionality.
 *
 * # Events
 *
 * _Inherited from {@link konga.directive:rawInput `rawInput`}_
 *
 * The `number input` does not fire nor listen further events.
 *
 * # Validations
 *
 * The `number input` allows several validations:
 *
 * * **`required`:** The input won't be valid until it's some value it's filled.
 * * **`[min|max]Length`:** The input will match against a minimum and/or maximum number range, and evaluated valid based on whether it's value is within bounds.
 *
 * @example
<example module="myAwesomeApp">
  <file name="number.html">
    <div class="form-demo row" ng-controller="FieldController">
      <div class="col-md-6">
        <raw-input 
          property="field"
          vertical="true"
          ng-repeat="field in fields | filter:{ name: 'number-field' }" 
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
      	<b>Value:</b> {{ entity['number-field'] }}
      	<br />
      	<b>Data type:</b> {{ typeof(entity['number-field']) }}
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