/**
@ngdoc function
@name Metadata.Field
@description

Fields represent each property of the entities. Field configuration includes data typing, rendering and validation options, custom behaviors, automated triggers...

@param {String} name

Name of the field. 


@param {String} label

Label for the field. <span title="Translateable"><i class="fa fa-language"></i></span>


@param {String} shortLabel

Short version of the label. <span title="Translateable"><i class="fa fa-language"></i></span>


@param {Object} type
<span class="label type-hint type-hint-object">{@link Metadata.DataType DataType}</span>

Field's data type. This value stores not only the type name but also other information, such as valid options (useful for {@link Metadata.FieldTypes.COMBOBOX `combo boxes`}), and other options used for {@link Metadata.DataTypes.COMPLEX `reference`} fields.


@param {Boolean} [isId=false]

The entity's field with this flag set to `true` will represent the unique ID of such entity. This field's value is used to query APIs <!-- (unless specified otherwise) --> and other tasks requiring computed-identification of the entity. This field normally represents the key of the element in any persistence system, and it's hidden on every form.


@param {Boolean} [isKey=false]
If this property is `true` on a certain field, the entity will be humanly-identifiable using such field. While `isId` represents computer-identification (primary keys), `isKey` is another unique identification, but for human quick-targeting (such as people's IDs, or car's plate numbers). If your entity does not have a value like this, you can annotate the same field with both `isId` and `isKey`.


@param {Boolean} [isLabel=false]

Entity's field with this flag to `true` represents the name of the entity. In a example `Human` entity, the field marked with `isLabel` would be `fullName`.


@param {String} multiplicity
<span class="label type-hint type-hint-object">{@link Metadata.Multiplicities Multiplicities}</span>

Defines the multiplicity of the element.


@param {Array} categories

Categorisation of the field. This is used on certain {@link Metadata.FormModes form modes}, and you can leverage this info anywhere on your custom code.


@param {String} [fieldSet=null]

Defines the group this field belongs to. It's set up as a String, but it **must** be the name of a fieldSet defined at {@link Metadata.Entity.fieldSet entity level}. This is used in `TABBED`, and `CUSTOM_TABBED` forms, and you can easily pick all the fields of a fieldSet using a filter (everywhere in your custom code).


@param {String} [defaults=null]

Default value of the field. It's used on {@link konga.scaffold `scaffoldings`} of entities and queries. It's always set up as a string, and is cast based on the field's {@link Field.type `type`}.


@param {Object} [priority=null]
<span class="label type-hint type-hint-object">{@link Metadata.Priority Priority}</span>

Defines the [sorting] priority for the fields within the forms. You can set up same priority for all {@link Metadata.FormScopes form scopes}, or define separate priority for each one.


@param {Array} actions
<span class="label type-hint type-hint-object">{@link Metadata.Action Action}</span>

Array of custom actions associated with the field. Depending on the {@link Metadata.FieldType field type} chosen for the field, the actions will be rendered (and engaged and executed) differently. See the {@link Metadata.FieldTypes field types} documentation for more details.


@param {Array} overrideDefaults
<span class="label type-hint type-hint-object">{@link Metadata.Action Action}</span>

Array of custom actions to override field's defaults. Depending on the {@link Metadata.FieldType field type} chosen for the field, there would be a different set of actions available to override. See the {@link Metadata.FieldTypes field types} documentation for more details.


@param {Object} searchConf
<span class="label type-hint type-hint-object">{@link Metadata.SearchConf SearchConf}</span>

Defines the configuration parameters for using this field as a filter in queries. You can define multiplicities, type of search, etcetera. {@link Metadata.SearchConf See the SearchConf documentation}.


@param {Object} validation
<span class="label type-hint type-hint-object">{@link Metadata.Validation Validation}</span>

Defines the validation options for the field. Depending on the {@link Metadata.FieldType field type} chosen for the field, some validation options could not be applied.


@param {Object} searchable
<span class="label type-hint type-hint-object">{@link Metadata.ShowConfiguration ShowConfiguration}</span>

Defines the search capabilities for the field. This property defines search permissions, inner fields (for {@link Metadata.DataTypes.COMPLEX `reference`} items), and some other configuration parameters.


@param {Object} quickSearch
<span class="label type-hint type-hint-object">{@link Metadata.ShowConfiguration ShowConfiguration}</span>

Defines the search capabilities for the field on the `quickSearch` pane. This property defines search permissions, inner fields (for {@link Metadata.DataTypes.COMPLEX `reference`} items), and some other configuration parameters.


@param {Object} showInResults
<span class="label type-hint type-hint-object">{@link Metadata.ShowConfiguration ShowConfiguration}</span>

Defines the `results pane` configuration for the field. This property defines viewing permissions, inner fields (for {@link Metadata.DataTypes.COMPLEX `reference`} items), and some other configuration parameters.


@param {Object} showInUpdate
<span class="label type-hint type-hint-object">{@link Metadata.ShowConfiguration ShowConfiguration}</span>

Defines the `update form` configuration for the field. This property defines viewing permissions, inner fields (for {@link Metadata.DataTypes.COMPLEX `reference`} items), and some other configuration parameters.


@param {Object} showInDetails
<span class="label type-hint type-hint-object">{@link Metadata.ShowConfiguration ShowConfiguration}</span>

Defines the `details form` configuration for the field. This property defines search permissions, inner fields (for {@link Metadata.DataTypes.COMPLEX `reference`} items), and some other configuration parameters.


@param {Object} editable
<span class="label type-hint type-hint-object">{@link Metadata.ShowConfiguration ShowConfiguration}</span>

Defines the edition permissions for the field. The other fields of the {@link Metadata.ShowConfiguration property} are not used.


@param {Boolean} required

Defines whether the field is required. A required field won't let the form submit untill it's not filled up.


@param {Array} configuration
<span class="label type-hint type-hint-object">{@link Metadata.ConfigurationParam ConfigurationParam}</span>

Configuration parameters for the field


@param {Array} triggers
<span class="label type-hint type-hint-object">{@link Metadata.Trigger Trigger}</Trigger}>

Triggers for the field. Triggers are automated tasks susceptible of executing when a field changes. See the {@link Metadata.Trigger `trigger`} docs for more info.


 @param {Object} linked
 <span class="label type-hint type-hint-object">{@link Metadata.Linked Linked}</span>

Defines a dependence for this field to others. With this you can engage a custom {@link Metadata.Action action} to the link, to be executed once the linked fields change (e.g. generating a `fullName` attribute based on a name and a surname).

*/
