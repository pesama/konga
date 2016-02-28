/**
@ngdoc function
@name Metadata.Trigger
@description

A trigger is a custom feature that is linked to a field, and evaluates some property of the field (e.g. its value) in order to decide whether to execute such feature. Triggers are defined via metadata, and sometimes it's behavior is extended using {@link Metadata.Action actions}.

# TODO Usages and examples

@param {string} name
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

@param {string} value
Value to match the field's with.

*/