/**
@ngdoc function
@name Metadata.Entity
@description

All elements within your data model are represented using this object. Entities define data structures for applications with options (rendering, operability, fields...)


@param {String} name

Name for your entity. This unique name will identify your entity across all your application. All relationships to an entity will be declared using its name. Be wise while defining your entity names.


@param {String} superClass

Entity hierarchy. By defining a `superClass` to one entity (being the value of the superClass the name of the inheritance) Konga will create entities based on the child's model, along with all the inheritance tree entities.


@param {String} label

Label for your entity. The String you configure here (or the placeholder for translated content) will identify the entity within your app. <span title="Translateable"><i class="fa fa-language"></i></span>


@param {String} shortLabel


Short version of the {@link Metadata.Entity.Label label}. Just if you need a shorter name to render it somewhere small. <span title="Translateable"><i class="fa fa-language"></i></span>


@param {Object} access
<span class="label type-hint type-hint-object">{@link Metadata.AccessModes AccessMode}</span>

Accessibility of the entity. You can set the entity to be public or hidden (system entities).


@param {String} searchable

Defines the search capabilities for the entity. If the value is null, search will be deactivated. For restricting it to some {@link Metadata.Permissions permission}, put its name here.


@param {String} createable

Defines the creation capabilities for the entity. If the value is null, creation will be deactivated. For restricting it to some {@link Metadata.Permissions permission}, put its name here.


@param {String} editable

Defines the edition capabilities for the entity. If the value is null, edition will be deactivated. For restricting it to some {@link Metadata.Permissions permission}, put its name here.


@param {String} deleteable

Defines the deletion capabilities for the entity. If the value is null, deletion will be deactivated. For restricting it to some {@link Metadata.Permissions permission}, put its name here.

@param {Object} searchType
<span class="label type-hint type-hint-object">{@link Metadata.FormTypes FormType}</span>

Defines the mode on which the search form will be rendered. See the {@link Metadata.FormTypes `FormTypes`} documentation for more details about the possible modes.


@param {Object} resultsType
<span class="label type-hint type-hint-object">{@link Metadata.FormTypes FormType}</span>

Defines the mode on which the results table will be rendered. See the {@link Metadata.FormTypes `FormTypes`} documentation for more details about the possible modes.


@param {Object} updateType
<span class="label type-hint type-hint-object">{@link Metadata.FormTypes FormType}</span>

Defines the mode on which the update form will be rendered. See the {@link Metadata.FormTypes `FormTypes`} documentation for more details about the possible modes.


@param {Object} updateType
<span class="label type-hint type-hint-object">{@link Metadata.FormTypes FormType}</span>

Defines the mode on which the update form will be rendered. See the {@link Metadata.FormTypes `FormTypes`} documentation for more details about the possible modes.


@param {Object} detailsType
<span class="label type-hint type-hint-object">{@link Metadata.FormTypes FormType}</span>

Defines the mode on which the details pane will be rendered. See the {@link Metadata.FormTypes `FormTypes`} documentation for more details about the possible modes.


@param {Object} searchStyle
<span class="label type-hint type-hint-object">{@link Metadata.FormStyles FormStyle}</span>

Defines the styling of the search pane. (How to structure the layout label/field, and among fields). See the {@link Metadata.FormStyles `FormStyles`} documentation for more details.


@param {Object} resultsStyle
<span class="label type-hint type-hint-object">{@link Metadata.FormStyles FormStyle}</span>

Defines the styling of the results table. See the {@link Metadata.FormStyles `FormStyles`} documentation for more details.


@param {Object} updateStyle
<span class="label type-hint type-hint-object">{@link Metadata.FormStyles FormStyle}</span>

Defines the styling of the update form. (How to structure the layout label/field, and among fields). See the {@link Metadata.FormStyles `FormStyles`} documentation for more details.


@param {Object} detailsStyle
<span class="label type-hint type-hint-object">{@link Metadata.FormStyles FormStyle}</span>

Defines the styling of the details pane. (How to structure the layout label/field, and among fields). See the {@link Metadata.FormStyles `FormStyles`} documentation for more details.


@param {String} apiPath

Defines the path of this entity within the API's endpoint. 

_e.g. if your api's path is `/api` and your entity's `/api/path` then the `apiPath` for your entity will be '`path`'._


@param {Array} categories

Categorisation for the entity. This is not used by Konga directly, but let's you categorise your entities to configure things (such as menus) quickly.


@param {Object} fieldSets
<span class="label type-hint type-hint-object">{@link Metadata.FieldSet FieldSet}</span>

FieldSets bound fields with similara categorisation together, to be rendered in the same view. This is used on several {@link Metadata.FormModes form modes}.


@param {Array} configuration
<span class="label type-hint type-hint-object">{@link Metadata.ConfigurationParam ConfigurationParam}</span>

Maps all configuration for the entity. Here could go from native {@link Metadata.ConfigurationParam configuration parameters} to any key/value item you need for doing your custom stuff.


@param {Array} fields
<span class="label type-hint type-hint-object">{@link Metadata.Field Field}</span>

Fields within the entity. 


@param {Array} actions
<span class="label type-hint type-hint-object">{@link Metadata.Action Action}</span>

Custom behaviors to be bounded to your entity. 


@param {Array} overrideDefaults
<span class="label type-hint type-hint-object">{@link Metadata.Action Action}</span>

Custom actions to override native behaviors. 

*/