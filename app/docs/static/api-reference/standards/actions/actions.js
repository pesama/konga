/**
 * @ngdoc object
 * @name Standards.Actions
 * @description
 * 
 * Konga describes a few built-in data types to let you use them on your data models to enrich Konga's operability. Data types are just plain `JS` objects with a set of particular properties, which are used to deal with {@link Standards `standard`} and {@link Customisation `custom`} features.
 *
 * The {@link Customisation.Action%20driven `action-driven` framework} uses the {@link Standards.Data%20types#methods_Tab `Tab`}, {@link Standards.Data%20types#methods_Modal `Modal`} and {@link Standards.Data%20types#methods_Function `Function`} to define actions that execute code on certain moments of your apps lifecycle, both natively and custom.
 *
 * # Parameters
 *
 * Every action launched within Konga includes contextual information about the action caller - e.g. entities, fields, ... - along with the elements being managed at the time.
 *
 <pre>
{
  self: $scope,
  item: Resource,
  entityType: string,
  parameters: {
	dependencyInjector: $injector,
	actionManager: actionManager
  }
}
 </pre>
 *
 * * **`self`:** Includes the scope of the element that dispatched the action.
 * * **`item`:** Includes the entity being managed on the element that dispatched the action.
 * * **`entityType`:** {@link Metadata.Entity `Entity`} name.
 * * **`parameters.dependencyInjector`:** Reference to Angular's `$injector`, for loading any needed dependency.
 * * **`parameters.actionManager`:** Direct access to the {@link konga.actionManager `actionManager`}, to dispatch actions quickly if your action needs it.
 *
 * # Scope-based parameters
 *
 * Depending on the {@link Metadata.FormScope `form scope`} the app was at the moment of the action execution, several more parameters would be appended to the `params` object:
 *
 * ## Results
 *
 * On results, a click on the {@link konga.directive:resultTable `resultTable`} row will trigger a `result-click` action, that will include an **`index`** element with the index of the element within the table, and a parameter **`id`** with the {@link Standards.Tools#methods_getEntityId id} of the entity selected.
 *
 * ## Update
 *
 * Update forms include also the **`id`** attribute identifying the entity being managed (and included in the object into the `item` property.). 
 *
 * # Field actions
 *
 * Certain `fieldTypes` allow the rendering of actions within their templates, that dispatch field-level actions once interacted with. The {@link konga.directive:rawInput `rawInput`} appends to the action parameters the **`field`** being managed, along with another data object, named **`data`**.
 *
 * The data attribute contains the parameters given to the action dispatching method. Native field-level action's params are:
 * 
<pre>
{
  ...
  data: {
    entity: entity
  }
}
</pre>
 * 
 * This is the inner entity the user's clicked on, within the field - i.e. fields with multiplicity {@link Metadata.Multiplicities#properties_MANY `many`}. Your custom actions dispatched on your `fieldTypes` could include any property, that will be injected to the action into its `data` attribute.
 *
 */