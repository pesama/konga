/**
 * @ngdoc object
 * @name Basics.4 - Dealing with permissions
 * @description
 *
 * # Permission management
 *
 * Public apps don't usually need to handle permissions (as assets, pages and content are public). However, private apps most of the times need permissions to decide whether a content can be rendered, an operation executed, etcetera. Konga allows both entity and field level permission management, to allow/dissallow operations to users depending on their permission set.
 *
 * If you want to download the source of this step directly, do this at your project's root:
```
git checkout -f step-4
```
 *
 * ## Determining our permissions.
 *
 * Just as before, let's have a sit-down with the team to decide the permissions needed for our app:
 *
 * * **Organisations** can only be managed (created, searched, updated) by someone with the '`org-admin`' permission within her permission set. 
 * * Everyone can see apps's key, yet **only '`app-admin`'** personnel can edit it**.
 * * A '`dev-admin`' permission is required to delete **developers**.
 *
 *
 * ## Modifying the metadata
 *
 * Let's go through our metadata classes again, setting up the permissions needed.
 *
 * * **`Organisation.java`:** Organisation operations are only enabled for "org-admin":
<pre>
@ Entity("organisation")
@ Label("Organisation")
@ Createable("org-admin")
@ Searchable("org-admin")
@ Editable("org-admin")
public class Organisation {
</pre>
 *
 * * **`Application.java`:** Application's `key` is only editable to "app-admin":
<pre>
@ Field
@ Label("App key")
@ EntityKey
@ Searchable
@ ShowInResults
@ ShowInUpdate
@ Required
@ Editable("app-admin")
private String code;
</pre>
 *
 * * **`Developer.java`:** Developers can't be deleted, except for "dev-admin":
<pre>
@ Entity("developer")
@ Label("Developer")
@ Createable
@ Searchable
@ Editable
@ Deleteable("dev-admin")
public class Developer {
</pre>
 *
 * 
 * Generate your metadata again and inject it into the `metadata` constant, just as {@link Basics.2%20-%20Injecting%20Metadata before}. Then open your app again. 
 *
 * You won't see any effect on your app at first sight. Entities are public and readable, and your access problems won't be faced until Konga tries to execute the restricted functionalities (or render access to them). If you go to the `Applications` form, and click on `+Add`, the field `App key` should be disabled - as expected. 
 *
 *
 * ## Handling permissions -> `userData`
 *
 * We've seen how we declare permissions within the metadata, to restrict operations and accesses depending on them. This is a cool feature, yet we need some method to tell Konga what we are actually allowed to do. This is what the {@link api/konga.userData `userData`} value is for.
 *
 * Konga does not fetch your permissions from any server, nor read them from any object. Instead, it publishes a `roles` array within `userData`, where you can fill the permissions for the user within our app. Let's grant ourselves some permissions. On the `/app/scripts/app.js` file, let's create another `.run()` method to handle permissions:
 *
 * **`/app/scripts/app.js`** (append)
<pre>
.run(['userData', function(userData) {

    // We want to edit 'app key'
    userData.roles.push('app-admin');

    // We want to create and manage 'orgs'
    userData.roles.push('org-admin');
  }]);
</pre>
 *
 * Once you've done this change, open your app and the `Applications` form. Under the creation form, you will see how the 'app key' field is now enabled, and ready for you to use it. 
 *
 * ## Enhancing our application
 *
 * More steps of this tutorial coming. **Stay tuned!**
 *
 * 
 *
 * 
 */