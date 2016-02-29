/**
 * @ngdoc object
 * @propertyOf Metadata.FieldTypes
 * @name BOOLEAN
 * @description
 *
 * Default input for boolean values. It's intended for Yes/No fields. It renders two `radio buttons` as layout, one for `true` and one for `false`. On search mode it renders to `checkboxes` instead, for allowing selecting multiple/none options. On results table value is mapped and render 'Yes' for `true` and 'No' for `false`.
 *
 * # Data types <span class="label label-success">{@link Metadata.DataTypes#properties_BOOLEAN boolean}</span>
 *
 * The `boolean input` is designed to be used with {@link Metadata.DataTypes#properties_BOOLEAN `boolean`} data types.
 * 
 * The boolean input uses . 
 *
 * # Multiplicities
 * 
 * The `boolean input` is designed for {@link Metadata.Multiplicities#properties_ONE `ONE`} multiplicity.
 *
 * # Configuration
 * 
 * _Inherited from {@link konga.directive:rawInput `rawInput`}_
 *
 * The `boolean input` does not extend nor override `raw` functionality.
 *
 * # Events
 *
 * _Inherited from {@link konga.directive:rawInput `rawInput`}_
 *
 * The `boolean input` does not fire nor listen further events.
 *
 * # Validations
 *
 * The `boolean input` allows these validations:
 *
 * * **`required`:** The input won't be valid until it's some value it's filled. Although this works fine, on `boolean inputs` you should consider using `defaults` value.
 *
 * @example
<example module="myAwesomeApp">
  <file name="boolean.html">
    <div class="form-demo row" ng-controller="FieldController">
      <div class="col-md-6">
        <raw-input 
          property="field"
          vertical="true"
          ng-repeat="field in fields | filter:{ name: 'boolean-field' }" 
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
      	<b>Value:</b> {{ entity['boolean-field'] }}
      	<br />
      	<b>Data type:</b> {{ typeof(entity['boolean-field']) }}
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