/**
@ngdoc object
@name Metadata.Validator
@description

Represents a custom validator defined for verifying a field's data integrity.

# TODO Usages and examples

@param {Object} type
<span class="label type-hint type-hint-object">{@link Metadata.ValidatorType ValidatorType}</span>
Defines the type of validation to execute on the field (e.g. `REGEXP`, `RANGE`, ...).

@param {string} value
Defines the value to be validated with. This value must comply with the structure required for the {@link Metadata.ValidatorTypes validator type} selected. See the docs for more details.

*/