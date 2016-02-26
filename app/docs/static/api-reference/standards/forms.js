/**
 * @ngdoc object
 * @name Standards.Forms
 * @description 

Forms are the way konga renders entities. There is a form model for each {@link Metadata.FormScopes form scope}. Depending on the form scope, some features will be able, others may not, and some other might behave differently. Here you got all the form scope views defined.

# Search & Results

{@link Metadata.FormScopes#properties_SEARCH Search} and {@link Metadata.FormScopes#properties_RESULTS Results} scopes are bound together into a same view, providing you direct filtering and result-list rendering in the same layout.

<img src="http://static.konga.io/konga-search-form.png" width="60%" class="center" >

## Structure

On the left side of the screen is located the `search` pane. This will render **{@link Standards.Fields fields}** for each of the **`searchable`** elements, along with a **button for submitting** a query, and another to **clear** the fields. 

At the right side is the result table. As you can see, on top of it there's a field for Quick search (see the {@link Metadata.Field Field} documentation for more details about quick searches), and options for paging the results (**results per page** and page selection).

The {@link konga.standardApi `standardApi`} relies on a specific returning-object structure to understand results, and to activate paging and quick-searching. This object must be returned by the service on every `SEARCH` request:

<pre>
{
  "data": [], 
  "count": N
}
</pre>

Where data represents the array object with the results, and count the total items found for your query. If your data has not this structure and you want to use `offset-based` paging, you can create an Angular `$interceptor` for `SEARCH` responses to apply the format before finishing the process. This system uses `offset` and `limit` fields for paging.

***Row columns** show the **`showInResults`** fields, and by default it includes a built-in sorting functions - sending `sortBy` and `sortAs` attributes to the standard API. You can disable sorting by setting the `sortable` attribute of the {@link Metadata.Field field} to `false`.

By clicking a row you **will access to the update form** of the item of that row.

At the bottom-right corner of the image there's an **add** button, whose action is launching an update form for creating a new entity.

## <span class="text-success"><i class="fa fa-code"></i> Elements involved</span>

* * **{@link konga.controller:EntitySearchCtrl `EntitySearchCtrl`}:** This controller handles all search features. It renders a layout where it allocates inner components, and connection to other operations (add, custom actions...).
* * **{@link konga.directive:searchPane `searchPane`}:** Handles the search-form rendering and operations (filtering, submitting, clearing...). It also controls customisation of the form via the {@Metadata.Entity `Entity` metadata}. 
* * **{@link konga.directive:resultTable `resultTable`}:** Handles the result table rendered on the right side. It's responsible for all operations performed on it (sorting, paging, row clicks...). It's furthermore in charge of the customisation of the table via the {@link Metadata.FormType form type} given for this method.

## <span class="text-danger"><i class="fa fa-key"></i> Permissions</span>

* * **Searchable:** Only if the user's permissions include the entity's `searchable` permissions the left panel will appear. Fields are also affected to this rule, so only the ones `searchable` will be rendered.
* * **Editable:** Only if the entity is `editable` the user would be able to click on a line and jump to the update form.
* * **Createable:** Only if your permissions apply to those defined on entity's `createable`, the `add` button will appear, and the creation form rendered when requested.
* * **Show in results:** The fields configured to be shown in results will be the only columns rendered on the table.


## <span class="text-warning"><i class="fa fa-magic"></i> Actions</span>

* * **`search`:** Dispatched once user clicks on the 'search' button.
* * **`clear`:** Dispatched once user clicks on the 'clear' button.
* * **`result-click`:** Dispatched once user clicks on a result row.
* * **`add`:** Dispatched once user clicks on the 'add' button.


# Update

Update forms receives a single entity, or it's ID, and renders a form with all the fields marked to be shown in update. Creation is the same as edition, but instead of querying for an element, a new empty entity is created using the {@link konga.scaffold `scaffolding` system}.

<img class="center" src="http://static.konga.io/konga-update-form.png" width="60%">

On the image you can see all fields rendered in cascade, along with three buttons on the bottom. These buttons are for **`save`**, **`cancel`**, and **`delete`**.

## <span class="text-success"><i class="fa fa-code"></i> Elements involved</span>

* * **{@link konga.controller:EntityUpdateCtrl `EntityUpdateCtrl`}:** This controller handles all edition features. It renders a layout where it allocates all fields, along with the basic operations (save, cancel, delete, custom actions...).
* * **{@link konga.directive:updateForm `updateForm`}:** Handles the rendering of the form itself. This controls customisation, and basic operations performed onto fields.

## <span class="text-danger"><i class="fa fa-key"></i> Permissions</span>

* * **Show In Update:** Only the fields marked with `showInUpdate` will be rendered on update forms.
* * **Editable:** Only if the entity is `editable` the user would be able to click on a line and jump to the update form. Same applies for fields, if a field is not `editable`, and it's shown, it will be disabled
* * **Deleteable:** Only if your permissions apply to those defined on entity's `deleteable`, the `delete` button will appear, and the deletion will be executed when requested.


## <span class="text-warning"><i class="fa fa-magic"></i> Actions</span>

* * **`save`:** Dispatched once user clicks on the 'save' button.
* * **`cancel`:** Dispatched once user clicks on the 'cancel' button.
* * **`delete`:** Dispatched once user clicks on the 'delete' button.

# Details

TODO


 */
