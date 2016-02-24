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

<span class="label label-danger">String</span>

Name for your entity. This unique name will identify your entity across all your application. All relationships to an entity will be declared using its name. Be wise while defining your entity names.

*/

/**
@ngdoc object
@propertyOf Metadata.Entity
@name superClass
@description

<span class="label label-danger">String</span>

Entity hierarchy. By defining a `superClass` to one entity (being the value of the superClass the name of the inheritance) Konga will create entities based on the child's model, along with all the inheritance tree entities.

*/

/**
@ngdoc object
@propertyOf Metadata.Entity
@name label
@description

<span class="label label-danger">String</span>
<span class="label label-default">Translateable</span>

Label for your entity. The String you configure here (or the placeholder for translated content) will identify the entity within your app.

*/

/**
@ngdoc object
@propertyOf Metadata.Entity
@name shortLabel
@description

<span class="label label-danger">String</span>
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

<span class="label label-danger">String</span>

Defines the search capabilities for the entity. If the value is null, search will be deactivated. For restricting it to some {@link Metadata.Permissions permission}, put its name here.

*/