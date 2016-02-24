/**
@ngdoc function
@name Metadata.Trigger
@description

@param {String} name
Name of the trigger. Useful for logging and for having things sorted out.

@param {Object} moment
<span class="label type-hint type-hint-object">{@link Metadata.TriggerMoments TriggerMoment}</span>
Defines when to execute your trigger (immediately or upon commit).

@param {Object} match
<span class="label type-hint type-hint-object">{@link Metadata.TriggetMatches TriggetMatch}</span>
Defines which parameter of the field to validate (e.g. its value, its length...).

@param {Object} scope
<span class="label type-hint type-hint-object">{@link Metadata.FormScopes FormScope}</span>
Configures the form scope to engage the trigger to.

@param {Object} type
<span class="label type-hint type-hint-object">{@link Metadata.TriggerTypes TriggerType}</span>
Defines the action type to execute.

@param {Object} matchType
<span class="label type-hint type-hint-object">{@link Metadata.ValidatorTypes ValidatorType}</span>
How to match the field's value with the triggering value.

@param {Array} parameters
List of parameters to be sent to the trigger

@param {String} value
Value to match the field's with.

*/