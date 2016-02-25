/**
@ngdoc object
@name Metadata.TriggerMatches
@description

Defines the different possibilities with which a trigger could match the required value with the actual value.

# TODO Usages and examples

*/

/**
 * @ngdoc object
 * @propertyOf Metadata.TriggerMatches
 * @name VALUE
 * @description

Get the value of the field. This is useful if you want to launch something once your field's value turns to `red`.
 */

/**
 * @ngdoc object
 * @propertyOf Metadata.TriggerMatches
 * @name $SCOPE
 * @description

Get the full Angular's `$scope` for the field. This is useful if you don't want to evaluate the field's value itself, but some properties related to it instead. This `matching` type requires complex {@link Metadata.ValidatorTypes `validator types`} as you wouldn't ever be able to match field's `$scope` with a plain value.
 */
}

/**
 * @ngdoc object
 * @propertyOf Metadata.TriggerMatches
 * @name LENGTH
 * @description

Validates the trigger with the length of the value of the input. Useful for executing something once an array empties.
 */