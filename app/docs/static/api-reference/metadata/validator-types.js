/**
@ngdoc object
@name Metadata.ValidatorTypes
@description

Defines the different validation methods for evaluating the field's value against data-integrity methods. 

# TODO Usages and examples
*/


/**
 * @ngdoc object
 * @propertyOf Metadata.ValidatorTypes
 * @name EXACT_MATCH
 * @description

Validate the value using an `exact` match. Value must be identical to the matching value.
 */


/**
 * @ngdoc object
 * @propertyOf Metadata.ValidatorTypes
 * @name RANGE
 * @description

Validate the input with a `range`. It simply verifies your value is between the minimum and maximum defined. Validations on this case are written as '`M-X`' - where `M` represents the minimum value allowed, and `X` the maximum.
 */


/**
 * @ngdoc object
 * @propertyOf Metadata.ValidatorTypes
 * @name REGEXP
 * @description

Validate the value using `regular expressions`. These expressions must be declared as Strings, as they are validated using {@link https://docs.angularjs.org/api/ng/directive/ngPattern `ng-pattern`} (and it converts automatically the values provided to `RegExp`).
 */


/**
 * @ngdoc object
 * @propertyOf Metadata.ValidatorTypes
 * @name FUNCTION
 * @description

TODO
Custom {@link Metadata.Action action} to validate your input.  
 */


/**
 * @ngdoc object
 * @propertyOf Metadata.ValidatorTypes
 * @name INLINE
 * @description

Inline validation. If you use this method the text you include must be a syntax-valid expression that returns `true` or `false`. You can append the value into your inline expression using the String '`{value}`' 
 */


/**
 * @ngdoc object
 * @propertyOf Metadata.ValidatorTypes
 * @name DATE_GE
 * @description

Date validation. Validates that your date is **G**reater or **E**qual than the one provided. 
 */


/**
 * @ngdoc object
 * @propertyOf Metadata.ValidatorTypes
 * @name DATE_GT
 * @description

Date validation. Validates that your date is **G**reater **T**han the one provided.  
 */


/**
 * @ngdoc object
 * @propertyOf Metadata.ValidatorTypes
 * @name DATE_LE
 * @description

Date validation. Validates that your date is **L**ower or **E**qual than the one provided.   
 */


/**
 * @ngdoc object
 * @propertyOf Metadata.ValidatorTypes
 * @name DATE_LT
 * @description

Date validation. Validates that your date is **L**ower **T**han the one provided.   
 */