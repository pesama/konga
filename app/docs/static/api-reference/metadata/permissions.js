/**
 * @ngdoc object
 * @name Metadata.Permissions
 * @description 


Along with metadata definitions to select available operations and methods within entities and fields, Konga lets you configure permissions for these behaviors, to allow or deny different users to perform them. 

# Permission management

Konga does not control which permissions a user has on an app. Instead, it leaves you an opened service - i.e. {@link konga.userData `userData`} - and one of the parameters it publishes is a `roles` array. On app startup, you can retrieve your permissions using your favorite method, and inject them to the {@link konga.userData#properties_roles `userData.roles` array}. From that moment on all forms will rely on the permissions assigned to enable or disable the different options. 

You have a full comprehensive guide on how to use `userData` on the {@link konga.userData `userData`} docs. 

## What is a permission?

A permission is a String, that is attached to any operation definition for entities and fields. Once the user tries to execute a permission-based operation, Konga launches an allowance verification for the operation, using the built-in {@link konga.permissionManager permission manager}. This service relies on the values present on the `roles` array, verifying if the user has the proper permissions for executing the intended task.

* **Example:** 
You have an entity `Vehicle`, whose `searchable` property is set with the permission '`search-vehicle`'. When your users try to search vehicles, they could only be able to do it if '`search-vehicle`' is a permission present on their `roles` array. 

## Public operations

Sometimes you want to leave a feature opened to the public. If that's your case, then you can easily do that by assigning an empty String (i.e. "") to such operation. The {@link konga.permissionManager permission manager} will understand this as a public behavior, allowing users to perform the actions they're trying to execute.

## Disabled operations

Same as above - though on the other hand - you will find yourself in a case you don't want anybody to do certain task. For that purpose the value to append to the operations is `null`. Once the {@link konga.permissionManager permission manager} finds a `nulled` operation, it will autommatically return `false`, leaving everybody outside that forbidden feature. 

# Entity-level permissions

Permissions can be applied to entities to define the basic operations user can launch on them. These operations are:

* * **Createable.**
* * **Editable.**
* * **Deleteable.**
* * **Searchable.**

<pre>
// Public
entity.createable = "";
// Hidden
entity.editable = null;
// Restricted
entity.deleteable = "delete-entity";
entity.searchable = "search-entity";
</pre>

# Field-level permissions

TODO 

*/