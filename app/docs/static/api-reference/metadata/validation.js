/**
@ngdoc object
@name Metadata.Validation
@description

Defines the data validation options for a field. When a field is rendered into a validateable form (i.e. `update`), and each time users input data into the field, the validation processes verify the data respects the integrity constraints set up here. There are several standard validation options (such as `required`, `min` and `max` lenghts...), and an option to append any custom validation you need for any particular field (pattern validation, function validation, dates...).

# TODO Usages and examples

@param {Boolean} required
Defines whether the field is required for the entity to be valid. This validates when the input is not empty.

@param {Number} minLength
Defines the minimum length for the input to be valid. On String inputs, this value verifies the string length, while on numbers it verifies the number itself. On arrays, it validates the lenght of the array.

@param {Number} maxLength
Defines the maximum length for the input to be valid. On String inputs, this value verifies the string length, while on numbers it verifies the number itself. On arrays, it validates the lenght of the array.

@param {Array} validators
<span class="label type-hint type-hint-object">{@link Metadata.Validator Validator}</span>
Array of custom validators to append to the field. In order for a field to be valid, it must comply with all the standard parameters menctioned above, as well as with all custom validators defined here.

*/