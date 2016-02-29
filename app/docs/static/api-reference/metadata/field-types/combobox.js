/**
 * @ngdoc object
 * @propertyOf Metadata.FieldTypes
 * @name COMBOBOX
 * @description
 *
 * Combo for rendering targeted-options chosen on the {@link Metadata.DataType dataType}'s `list` attribute. It allows both {@link Medatata.Multiplicities#properties_ONE `ONE`} and {@link Medatata.Multiplicities#properties_MANY `MANY`} multiplicities.
 *
 * # Data types <span class="label label-primary">{@link Metadata.DataTypes#properties_STRING string}</span> <span class="label label-danger">{@link Metadata.DataTypes#properties_NUMBER number}</span>
 *
 * The `combobox input` is designed to be used with {@link Metadata.DataTypes#properties_STRING `string`} and {@link Metadata.FieldTypes#properties_NUMER `numbers`} data types.
 * 
 * The combobox input recovers **exactly** what's written on the input's value, and stores it _as-is_ into the entity. 
 *
 * # Multiplicities
 * 
 * The `combobox input` supports both {@link Metadata.Multiplicities#properties_ONE `ONE`} and {@link Metadata.Multiplicities#properties_MANY `MANY`} multiplicities.
 *
 * # Configuration
 * 
 * _Inherited from {@link konga.directive:rawInput `rawInput`}_
 *
 * The `combobox input` does not extend nor override `raw` functionality.
 *
 * # Events
 *
 * _Inherited from {@link konga.directive:rawInput `rawInput`}_
 *
 * The `combobox input` does not fire nor listen further events.
 *
 * # Validations
 *
 * The `combobox input` allows several validations:
 *
 * * **`required`:** The input won't be valid until it's some value it's filled.
 * * **`[min|max]Length`:** The input will match against a minimum and/or maximum peaks, and evaluated valid based on whether it's value is within bounds.
 * * **`pattern`:** You can append a {@link Metadata.ValidatorTypes#properties_REGEX `regex`} validator to your input, to match the text against the expression you set.
 *
 * @example
<example module="myAwesomeApp">
  <file name="combobox.html">
    <div class="form-demo row" ng-controller="FieldController">
      <div class="col-md-6">
        <raw-input 
          property="field"
          vertical="true"
          ng-repeat="field in fields | filter:{ name: 'combobox-field' }" 
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
      	<b>Value:</b> {{ entity['combobox-field'] }}
      	<br />
      	<b>Data type:</b> {{ typeof(entity['combobox-field']) }}
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