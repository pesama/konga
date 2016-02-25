/**
@ngdoc object
@name Metadata.AccessModes
@description

This enumeration defines how a entity is configured talking about visibility. When you create your data model, there would be some user-accessible entities (final entities, connected to APIs, etcetera), while others wouldn't be shown, and they will only provide functionality to the `public` ones (i.e. `system` entities - abstracts, hidden relationships...).

This field is not used into Konga directly. Instead, this information is given to you for easing menu creation, and any other batch entity-access functionality you want to develop for users to access the entities you want to show them.

# Filtering `PUBLIC` entities

If you want to create a menu which shows entities to users, you can easily leverage this property to remove the `HIDDEN` entities from the list:

<pre>
<ul class="nav" role="navbar">
	<li ng-repeat="entity in metadata.entities | filter:{ access: 'PUBLIC' }">
		<a ng-click="operations.openEntitySearch(entity)">
			{{ entity.label | translate }}
		</a>
	</li>
</ul>
</pre>

# TODO Other examples

*/

/**
 * @ngdoc object
 * @propertyOf Metadata.AccessModes
 * @name PUBLIC
 * @description
 *
 * Defines the entity as public. Public entities are intended to be the entities users consume directly, and they usually allow basic operations with an API connection (and/or any custom actions).
 */

/**
 * @ngdoc object
 * @propertyOf Metadata.AccessModes
 * @name HIDDEN
 * @description
 *
 * Defines the entity as hidden. These entities are `system` entities that final users don't need to know about. Marking them as HIDDEN will allow you quick-targeting, and to easily exclude them from menus and other batch entity rendering processes. 
 */