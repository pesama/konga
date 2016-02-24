/**
@ngdoc object
@name Metadata.Entity
@description

All elements within your data model are represented using this object. Entities define data structures for applications with options (rendering, operability, fields...)


*/

/**
@ngdoc object
@propertyOf Metadata.Entity
@name name
@description

<span class="label label-success">String</span>

Name for your entity. This unique name will identify your entity across all your application. All relationships to an entity will be declared using its name. Be wise while defining your entity names.

*/

/**
@ngdoc object
@propertyOf Metadata.Entity
@name superClass
@description

<span class="label label-success">String</span>

Entity hierarchy. By defining a `superClass` to one entity (being the value of the superClass the name of the inheritance) Konga will create entities based on the child's model, along with all the inheritance tree entities.

*/

/**
@ngdoc object
@propertyOf Metadata.Entity
@name label
@description

<span class="label label-success">String</span>
<span class="label label-default">Translateable</span>

Label for your entity. The String you configure here (or the placeholder for translated content) will identify the entity within your app.

*/

/**
@ngdoc object
@propertyOf Metadata.Entity
@name shortLabel
@description

<span class="label label-success">String</span>
<span class="label label-default">Translateable</span>

Short version of the {@link Metadata.Entity.Label label}. Just if you need a shorter name to render it somewhere small.

*/

/**
@ngdoc object
@propertyOf Metadata.Entity
@name access
@description

<span class="label label-warning">{@link Metadata.enumerations.AccessModes AccessMode}</span>

Accessibility of the entity. You can set the entity to be public or hidden (system entities).

*/

/**
@ngdoc object
@propertyOf Metadata.Entity
@name searchable
@description

<span class="label label-success">String</span>

Defines the search capabilities for the entity. If the value is null, search will be deactivated. For restricting it to some {@link Metadata.Permissions permission}, put its name here.

*/

/**
@ngdoc object
@propertyOf Metadata.Entity
@name createable
@description

<span class="label label-success">String</span>

Defines the creation capabilities for the entity. If the value is null, creation will be deactivated. For restricting it to some {@link Metadata.Permissions permission}, put its name here.

*/

/**
@ngdoc object
@propertyOf Metadata.Entity
@name editable
@description

<span class="label label-success">String</span>

Defines the edition capabilities for the entity. If the value is null, edition will be deactivated. For restricting it to some {@link Metadata.Permissions permission}, put its name here.

*/

/**
@ngdoc object
@propertyOf Metadata.Entity
@name deleteable
@description

<span class="label label-success">String</span>

Defines the deletion capabilities for the entity. If the value is null, deletion will be deactivated. For restricting it to some {@link Metadata.Permissions permission}, put its name here.

*/

/**
@ngdoc object
@propertyOf Metadata.Entity
@name favoriteable
@deprecated
@description

<span class="label label-success">Boolean</span>
<span class="label label-danger">Deprecated</span>

Defines whether the entity search filters could be saved in favorites. This feature is deprecated and will be removed on future versions.

*/

/**
@ngdoc object
@propertyOf Metadata.Entity
@name searchType
@description

<span class="label label-warning">{@link Metadata.FormTypes FormType}</span>

Defines the mode on which the search form will be rendered. See the {@link Metadata.FormTypes `FormTypes`} documentation for more details about the possible modes.

*/

/**
@ngdoc object
@propertyOf Metadata.Entity
@name resultsType
@description

<span class="label label-warning">{@link Metadata.FormTypes FormType}</span>

Defines the mode on which the results table will be rendered. See the {@link Metadata.FormTypes `FormTypes`} documentation for more details about the possible modes.

*/

/**
@ngdoc object
@propertyOf Metadata.Entity
@name updateType
@description

<span class="label label-warning">{@link Metadata.FormTypes FormType}</span>

Defines the mode on which the update form will be rendered. See the {@link Metadata.FormTypes `FormTypes`} documentation for more details about the possible modes.

*/

/**
@ngdoc object
@propertyOf Metadata.Entity
@name updateType
@description

<span class="label label-warning">{@link Metadata.FormTypes FormType}</span>

Defines the mode on which the update form will be rendered. See the {@link Metadata.FormTypes `FormTypes`} documentation for more details about the possible modes.

*/

/**
@ngdoc object
@propertyOf Metadata.Entity
@name detailsType
@description

<span class="label label-warning">{@link Metadata.FormTypes FormType}</span>

Defines the mode on which the details pane will be rendered. See the {@link Metadata.FormTypes `FormTypes`} documentation for more details about the possible modes.

*/

/**
@ngdoc object
@propertyOf Metadata.Entity
@name searchStyle
@description

<span class="label label-warning">{@link Metadata.FormStyles FormStyle}</span>

Defines the styling of the search pane. (How to structure the layout label/field, and among fields). See the {@link Metadata.FormStyles `FormStyles`} documentation for more details.

*/

/**
@ngdoc object
@propertyOf Metadata.Entity
@name resultsStyle
@description

<span class="label label-warning">{@link Metadata.FormStyles FormStyle}</span>

Defines the styling of the results table. See the {@link Metadata.FormStyles `FormStyles`} documentation for more details.

*/

/**
@ngdoc object
@propertyOf Metadata.Entity
@name updateStyle
@description

<span class="label label-warning">{@link Metadata.FormStyles FormStyle}</span>

Defines the styling of the update form. (How to structure the layout label/field, and among fields). See the {@link Metadata.FormStyles `FormStyles`} documentation for more details.

*/

/**
@ngdoc object
@propertyOf Metadata.Entity
@name detailsStyle
@description

<span class="label label-warning">{@link Metadata.FormStyles FormStyle}</span>

Defines the styling of the details pane. (How to structure the layout label/field, and among fields). See the {@link Metadata.FormStyles `FormStyles`} documentation for more details.

*/

/**
@ngdoc object
@propertyOf Metadata.Entity
@name apiPath
@description

<span class="label label-success">String</span>

Defines the path of this entity within the API's endpoint. 

_e.g. if your api's path is `/api` and your entity's `/api/path` then the `apiPath` for your entity will be '`path`'._

*/

/**
@ngdoc object
@propertyOf Metadata.Entity
@name categories
@description

<span class="label label-warning">Array<String></span>

Categorisation for the entity. This is used on certain {@link Metadata.FormModes form modes}, and you can leverage this info anywhere on your custom code.

*/

/**
@ngdoc object
@propertyOf Metadata.Entity
@name fieldSets
@description

<span class="label label-warning">{@link Metadata.FieldSet FieldSet}</span>

FieldSets bound fields with similara categorisation together, to be rendered in the same view. This is used on several {@link Metadata.FormModes form modes}.

*/

/**
@ngdoc object
@propertyOf Metadata.Entity
@name configuration
@description

<span class="label label-warning">Array<{@link Metadata.ConfigurationParam ConfigurationParam}></span>

Maps all configuration for the entity. Here could go from native {@link Metadata.ConfigurationParam configuration parameters} to any key/value item you need for doing your custom stuff.

*/

/**
@ngdoc object
@propertyOf Metadata.Entity
@name fields
@description

<span class="label label-warning">Array<{@link Metadata.Field Field}></span>

Fields within the entity. 

*/

/**
@ngdoc object
@propertyOf Metadata.Entity
@name actions
@description

<span class="label label-warning">Array<{@link Metadata.Action Action}></span>

Custom behaviors to be bounded to your entity. 

*/

/**
@ngdoc object
@propertyOf Metadata.Entity
@name overrideDefaults
@description

<span class="label label-warning">Array<{@link Metadata.Action Action}></span>

Custom actions to override native behaviors. 

*/