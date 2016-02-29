/**
 * @ngdoc object
 * @propertyOf Metadata.FieldTypes
 * @name PLAIN
 * @description
 *
 * The classical `plain text` input. It renders as an `<input type="text">`, and accepts by default any string as value. You can append validators to assure integrity of the data within your requirements.
 *
 * # Data types <span class="label label-primary">{@link Metadata.DataTypes#properties_STRING string}</span>
 *
 * The `plain input` is designed to be used with {@link Metadata.DataTypes#properties_STRING `string`} data types. You can use it for {@link Metadata.FieldTypes#properties_NUMER `numbers`} or {@link Metadata.FieldTypes#properties#DATE `dates`}, though they have their specific data types.
 * 
 * The plain input recovers **exactly** what's written on the input's value, and stores it _as-is_ into the entity. 
 *
 * # Multiplicities
 * 
 * The `plain input` is designed for {@link Metadata.Multiplicities#properties_ONE `ONE`} multiplicity.
 *
 * # Configuration
 * 
 * _Inherited from {@link konga.directive:rawInput `rawInput`}_
 *
 * The `plain input` does not extend nor override `raw` functionality.
 *
 * # Events
 *
 * _Inherited from {@link konga.directive:rawInput `rawInput`}_
 *
 * The `plain input` does not fire nor listen further events.
 *
 * # Validations
 *
 * The `plain input` allows several validations:
 *
 * * **`required`:** The input won't be valid until it's some value it's filled.
 * * **`[min|max]Length`:** The input will match against a minimum and/or maximum peaks, and evaluated valid based on whether it's value is within bounds.
 * * **`pattern`:** You can append a {@link Metadata.ValidatorTypes#properties_REGEX `regex`} validator to your input, to match the text against the expression you set.
 *
 * @example
<example module="myAwesomeApp">
  <file name="plain.html">
    <div class="form-demo row" ng-controller="FieldController">
      <div class="col-md-6">
        <raw-input 
          property="field"
          vertical="true"
          ng-repeat="field in fields | filter:{ name: 'plain-field' }" 
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
      	<b>Value:</b> {{ entity['plain-field'] }}
      	<br />
      	<b>Data type:</b> {{ typeof(entity['plain-field']) }}
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