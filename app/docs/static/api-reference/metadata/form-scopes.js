/**
@ngdoc object
@name Metadata.FormScopes
@description

Form Scopes define the different form modes Konga controls and maintains. Depending on the form scope - and mostly its intentions - fields will have different behaviors, validation rules, ...

# TODO Usages and examples

*/

/**
 * @ngdoc object
 * @propertyOf Metadata.FormScopes
 * @name SEARCH
 * @description

Search forms are intended for generating custom queries to filter API results. {@link Metadata.Validation Validation} rules here are not enabled, and {@link konga.scaffold scaffolding} system will generate queries instead of entities. 
Entities and fields could have a completely different behavior for search than for the other form scopes, as filtering formats could be different than the final-entity one - generated by the {@link Metadata.FormScopes#properties_UPDATE `UPDATE`} forms.
 */

/**
 * @ngdoc object
 * @propertyOf Metadata.FormScopes
 * @name RESULTS
 * @description

Results scope is natively linked with a data table for rendering the results the API returned to the query sent from the {@link Metadata.FormScopes#properties_SEARCH `SEARCH` pane}.
 */

/**
 * @ngdoc object
 * @propertyOf Metadata.FormScopes
 * @name UPDATE
 * @description

Update forms manage updation (and creation) of instances of an entity. It has an access from the {@link Metadata.FormScopes#properties_RESULTS `RESULTS`} table lines - although you can connect its access anywhere you wish.
 */

/**
 * @ngdoc object
 * @propertyOf Metadata.FormScopes
 * @name DETAILS
 * @description

Details is a form to view the data, without the ability to edit it. It's useful for `viewing-mode` interfaces. 
 */