/**
@ngdoc object
@name Metadata.FormTypes
@description

Form types define how to render the form fields layout. 

# TODO Usages and examples

*/

/**
 * @ngdoc object
 * @propertyOf Metadata.FormTypes
 * @name CASCADE
 * @description
 *
Render the fields in a cascade - i.e. one after another. 
 */

/**
 * @ngdoc object
 * @propertyOf Metadata.FormTypes
 * @name CATEGORIZED_CASCADE
 * @description
 *
Render the form as a field-cascade, but grouping the fields by 'category', and labeling each category. Depending on the {@link Metadata.FormScopes form scope}, some configuration parameters are needed:

* * **{@link Metadata.ConfigurationParam#properties_SEARCH_USE_CATEGORY `SEARCH_USE_CATEGORY`}:** <span class="label label-warning">SEARCH</span> Define the categories to use on search (one or more).
* * **{@link Metadata.ConfigurationParam#properties_RESULTS_USE_CATEGORY `RESULTS_USE_CATEGORY`}:** <span class="label label-success">RESULTS</span> Define the categories to use on results (one or more).
* * **{@link Metadata.ConfigurationParam#properties_HIDE_CATEGORY_HEADER `HIDE_CATEGORY_HEADER`}:** <span class="label label-success">RESULTS</span> If this parameter is associated with a rendered category, its header will be hidden. 

 */
}
}

/**
 * @ngdoc object
 * @propertyOf Metadata.FormTypes
 * @name TABBED
 * @description
 *
Render the form as separated tabs, using the entity's `fieldSets`.
 */

/**
 * @ngdoc object
 * @propertyOf Metadata.FormTypes
 * @name STEPPED
 * @description
 *
TODO
 */

/**
 * @ngdoc object
 * @propertyOf Metadata.FormTypes
 * @name CUSTOM_TABBED
 * @description
 *
The same as the {@link Metadata.FormTypes#properties_TABBED `TABBED`} type, but each tab is rendered using a custom view. You need to define the `fieldSet` `view` param to a valid {@link konga#viewMapper mapped} view for this to work. 
 */

/**
 * @ngdoc object
 * @propertyOf Metadata.FormTypes
 * @name CUSTOM
 * @description
 *
When standard form types don't fit your needs, you can declare the form to have a `CUSTOM` view, attaching any view you want to the form's behavior. For using this you need to provide a {@link Metadata.ConfigurationParam ConfigurationParam} depending on the {@link Metadata.FormScopes form scope}:

* * **{@link Metadata.ConfigurationParam#properties_SEARCH_CUSTOM_VIEW `SEARCH_CUSTOM_VIEW`}:** <span class="label label-warning">SEARCH</span> Custom view for search (value must be a valid {@link konga#viewMapper mapped} view).
* * **{@link Metadata.ConfigurationParam#properties_UPDATE_CUSTOM_VIEW `UPDATE_CUSTOM_VIEW`}:** <span class="label label-primary">UPDATE</span> Custom view for updates (value must be a valid {@link konga#viewMapper mapped} view).
 */}
