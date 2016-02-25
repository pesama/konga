/**
@ngdoc object
@name Metadata.FieldSet
@description

Field sets define groups of fields, who are normally intended to be bound together into a view. Field sets are defined at {@link Metadata.Entity entity-level}, and thereafter its {@link Metadata.Field fields} could reference the field set they belong to by declaring its name.

# TODO Usages and examples

@param {String} name
Defines the name of the field set. This name must be unique within the {@link Metadata.Entity entity}-defined field sets. Fields that belong to a field set must declare this name (exactly) and it will be bound to the field set on the forms. 

@param {Object} configuration
<span class="label type-hint type-hint-object">{@link Metadata.ConfigurationParam ConfigurationParam}</span>
Configuration for the field set. There is only one standard param, whose `key` must be 'view', and the value a valid {@link konga.viewMapper mapped} view for a custom form. This parameter is used when the {@link Metadata.FormType form type} is set to `CUSTOM_TABBED`.
*/