/**
@ngdoc object
@name Metadata.FieldType
@description

Defines the rendering options for the field. Normally a {@link Metadata.DataType data type} (e.g. String, number, date...) is directly linked - at least by default - to a field type (plain text, number, date...). However, you can set up a different field type to adjust even more the data of your field with the rendering (rendering a `price` input instead of just a number).

# TODO Usages and demos


@param {String} search
<span class="label type-hint type-hint-object">{@link Metadata.FieldTypes FieldTypes}</span>
Defines the field type to use for search forms. 

@param {String} results
<span class="label type-hint type-hint-object">{@link Metadata.FieldTypes FieldTypes}</span>
Defines the field type to use for results tables.

@param {String} details
<span class="label type-hint type-hint-object">{@link Metadata.FieldTypes FieldTypes}</span>
Defines the field type to use for details panes.

@param {String} update
<span class="label type-hint type-hint-object">{@link Metadata.FieldTypes FieldTypes}</span>
Defines the field type to use for update forms. 

@param {Array} configuration
<span class="label type-hint type-hint-object">{@link Metadata.ConfigurationParam ConfigurationParam}</span>

*/