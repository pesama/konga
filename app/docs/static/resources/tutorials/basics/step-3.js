/**
 * @ngdoc object
 * @propertyOf Tutorials.Basics
 * @name Refining_metadata
 * @description
 *
 * # Metadata definitions
 *
 * We have already seen how to easily create metadata objects using `konga-metadata` generator for Java, along with the built-in Java annotations. While this is cool, it doesn't actually serve any need. At least just yet. Let's enrich a bit more our metadata, defining all fields and operations within our three main entities. 
 *
 * If you want to download the source of this step directly, do this at your project's root:
```
git checkout -f step-3
```
 *
 * ## Literature
 *
 * To build the metadata easier, let's first define what we want to achieve. 
 *
 * * We want Konga to know about our `primary keys`, but we don't want any of them shown to users, ever. 
 * * We want to search all three entities, by any field - but the ID.
 * * We want every field on results - but the ID.
 * * We want to see and be able to edit any field on updation - but the ID.
 * * We want to be able to delete `Applications` and `Developers`, but organisations are never removed.
 * * All visible fields are required. 
 *
 * With these simple premises, let's define our metadata:
 *
 * **`Organisation.java`**
<pre>
package io.konga.tutorial.model;

import io.konga.metadata.annotations.Createable;
import io.konga.metadata.annotations.Editable;
import io.konga.metadata.annotations.Entity;
import io.konga.metadata.annotations.EntityId;
import io.konga.metadata.annotations.EntityKey;
import io.konga.metadata.annotations.Field;
import io.konga.metadata.annotations.Label;
import io.konga.metadata.annotations.Required;
import io.konga.metadata.annotations.Searchable;
import io.konga.metadata.annotations.ShowInResults;
import io.konga.metadata.annotations.ShowInUpdate;

@ Entity("organisation")
@ Label("Organisation")
@ Createable
@ Searchable
@ Editable
public class Organisation {

	@ Field
	@ EntityId
	private Integer id;
	
	@ Field
	@ Label("Org name")
	@ EntityKey
	@ Searchable
	@ ShowInResults
	@ ShowInUpdate
	@ Required
	@ Editable
	private String name;
	
	@ Field
	@ Label("Country ID")
	@ EntityKey
	@ Searchable
	@ ShowInResults
	@ ShowInUpdate
	@ Required
	@ Editable
	private String country;
}

</pre>
 *
 *
 * **`Application.java`**
<pre>
package io.konga.tutorial.model;

import io.konga.metadata.annotations.Createable;
import io.konga.metadata.annotations.Deleteable;
import io.konga.metadata.annotations.Editable;
import io.konga.metadata.annotations.Entity;
import io.konga.metadata.annotations.EntityId;
import io.konga.metadata.annotations.EntityKey;
import io.konga.metadata.annotations.Field;
import io.konga.metadata.annotations.Label;
import io.konga.metadata.annotations.Required;
import io.konga.metadata.annotations.Searchable;
import io.konga.metadata.annotations.ShowInResults;
import io.konga.metadata.annotations.ShowInUpdate;

@ Entity("application")
@ Label("Application")
@ Createable
@ Searchable
@ Editable
@ Deleteable
public class Application {

	@ Field
	@ EntityId
	private Integer id;
	
	@ Field
	@ Label("App key")
	@ EntityKey
	@ Searchable
	@ ShowInResults
	@ ShowInUpdate
	@ Required
	@ Editable
	private String code;
	
	@ Field
	@ Label("App name")
	@ EntityKey
	@ Searchable
	@ ShowInResults
	@ ShowInUpdate
	@ Required
	@ Editable
	private String name;
}

</pre>
 *
 * 
 * **`Developer.java`**
<pre>
package io.konga.tutorial.model;

import io.konga.metadata.annotations.Createable;
import io.konga.metadata.annotations.Deleteable;
import io.konga.metadata.annotations.Editable;
import io.konga.metadata.annotations.Entity;
import io.konga.metadata.annotations.EntityId;
import io.konga.metadata.annotations.EntityKey;
import io.konga.metadata.annotations.Field;
import io.konga.metadata.annotations.Label;
import io.konga.metadata.annotations.Required;
import io.konga.metadata.annotations.Searchable;
import io.konga.metadata.annotations.ShowInResults;
import io.konga.metadata.annotations.ShowInUpdate;

@ Entity("developer")
@ Label("Developer")
@ Createable
@ Searchable
@ Editable
@ Deleteable
public class Developer {

	@ Field
	@ EntityId
	private Integer id;
	
	@ Field
	@ Label("Developer name")
	@ EntityKey
	@ Searchable
	@ ShowInResults
	@ ShowInUpdate
	@ Required
	@ Editable
	private String name;
	
	@ Field
	@ Label("Developer email")
	@ EntityKey
	@ Searchable
	@ ShowInResults
	@ ShowInUpdate
	@ Required
	@ Editable
	private String email;
}

</pre>
 *
 *
 * These files, while still contain basic metadata, are far more defined than before, including the basic configuration for the fields. The information now provided is enough for Konga to build the forms, and show you the basics of its functioning.
 *
 * ## Metadata generation and injection
 *
 * Just as we did before, launch the metadata application, to generate a new `metadata.json` file. Then, go again to the `/app/scripts/services/metadata.js` file and paste the new `json` contents where the old were:
 *
 * **`/app/scripts/services/metadata.js`**
<pre>
'use strict';

angular.module('uiApp')
  .constant('metadata', {"id":null,"name":"Konga Tutorial Basics","appKey":null,"entities":[{"classFor":"io.konga.tutorial.model.Developer","name":"developer","superClass":null,"label":"Developer","shortLabel":null,"access":"PUBLIC","stereotypes":[],"searchable":"","createable":"","editable":"","deleteable":"","searchType":"CASCADE","searchStyle":null,"resultsType":"CASCADE","resultsStyle":null,"detailsType":"CASCADE","detailsStyle":null,"updateType":"CASCADE","updateStyle":null,"template":null,"apiName":null,"apiPath":null,"categories":[],"security":{"permissions":null,"roles":null},"fields":[{"name":"id","label":null,"shortLabel":null,"hint":null,"type":{"type":"NUMBER","complexType":null,"filter":null,"query":null,"list":null,"from":null},"access":"PUBLIC","isId":true,"isKey":false,"isLabel":false,"linked":null,"isParent":false,"quickSearch":{"value":null,"fields":null,"configuration":null},"searchable":{"value":null,"fields":null,"configuration":null},"editable":{"value":null,"fields":null,"configuration":null},"showInResults":{"value":null,"fields":null,"configuration":null},"showInUpdate":{"value":null,"fields":null,"configuration":null},"showInDetails":{"value":null,"fields":null,"configuration":null},"multiplicity":"ONE","categories":[],"apiName":null,"fieldType":{"search":"PLAIN","results":"PLAIN","details":"PLAIN","update":"PLAIN","configuration":null},"defaults":null,"searchConf":{"policy":"EXACT_MATCH","multiplicity":"ONE","fields":[]},"unique":false,"security":{"permissions":null,"roles":null},"validation":{"required":null,"minLength":null,"maxLength":null,"validators":null},"triggers":[],"priority":{"results":1000,"search":1000,"update":1000,"details":1000},"fieldSet":null,"actions":[],"overrideDefaults":[],"owner":"developer","sortable":true},{"name":"name","label":"Developer name","shortLabel":null,"hint":null,"type":{"type":"STRING","complexType":null,"filter":null,"query":null,"list":null,"from":null},"access":"PUBLIC","isId":false,"isKey":true,"isLabel":false,"linked":null,"isParent":false,"quickSearch":{"value":null,"fields":null,"configuration":null},"searchable":{"value":"","fields":[],"configuration":[]},"editable":{"value":"","fields":[],"configuration":null},"showInResults":{"value":"","fields":[],"configuration":[]},"showInUpdate":{"value":"","fields":[],"configuration":[]},"showInDetails":{"value":null,"fields":null,"configuration":null},"multiplicity":"ONE","categories":[],"apiName":null,"fieldType":{"search":"PLAIN","results":"PLAIN","details":"PLAIN","update":"PLAIN","configuration":null},"defaults":null,"searchConf":{"policy":"EXACT_MATCH","multiplicity":"ONE","fields":[]},"unique":false,"security":{"permissions":null,"roles":null},"validation":{"required":true,"minLength":null,"maxLength":null,"validators":null},"triggers":[],"priority":{"results":1000,"search":1000,"update":1000,"details":1000},"fieldSet":null,"actions":[],"overrideDefaults":[],"owner":"developer","sortable":true},{"name":"email","label":"Developer email","shortLabel":null,"hint":null,"type":{"type":"STRING","complexType":null,"filter":null,"query":null,"list":null,"from":null},"access":"PUBLIC","isId":false,"isKey":true,"isLabel":false,"linked":null,"isParent":false,"quickSearch":{"value":null,"fields":null,"configuration":null},"searchable":{"value":"","fields":[],"configuration":[]},"editable":{"value":"","fields":[],"configuration":null},"showInResults":{"value":"","fields":[],"configuration":[]},"showInUpdate":{"value":"","fields":[],"configuration":[]},"showInDetails":{"value":null,"fields":null,"configuration":null},"multiplicity":"ONE","categories":[],"apiName":null,"fieldType":{"search":"PLAIN","results":"PLAIN","details":"PLAIN","update":"PLAIN","configuration":null},"defaults":null,"searchConf":{"policy":"EXACT_MATCH","multiplicity":"ONE","fields":[]},"unique":false,"security":{"permissions":null,"roles":null},"validation":{"required":true,"minLength":null,"maxLength":null,"validators":null},"triggers":[],"priority":{"results":1000,"search":1000,"update":1000,"details":1000},"fieldSet":null,"actions":[],"overrideDefaults":[],"owner":"developer","sortable":true}],"fieldSets":[],"actions":[],"overrideDefaults":[],"configuration":[],"favoriteable":false,"resultClick":[]},{"classFor":"io.konga.tutorial.model.Organisation","name":"organisation","superClass":null,"label":"Organisation","shortLabel":null,"access":"PUBLIC","stereotypes":[],"searchable":"","createable":"","editable":"","deleteable":null,"searchType":"CASCADE","searchStyle":null,"resultsType":"CASCADE","resultsStyle":null,"detailsType":"CASCADE","detailsStyle":null,"updateType":"CASCADE","updateStyle":null,"template":null,"apiName":null,"apiPath":null,"categories":[],"security":{"permissions":null,"roles":null},"fields":[{"name":"id","label":null,"shortLabel":null,"hint":null,"type":{"type":"NUMBER","complexType":null,"filter":null,"query":null,"list":null,"from":null},"access":"PUBLIC","isId":true,"isKey":false,"isLabel":false,"linked":null,"isParent":false,"quickSearch":{"value":null,"fields":null,"configuration":null},"searchable":{"value":null,"fields":null,"configuration":null},"editable":{"value":null,"fields":null,"configuration":null},"showInResults":{"value":null,"fields":null,"configuration":null},"showInUpdate":{"value":null,"fields":null,"configuration":null},"showInDetails":{"value":null,"fields":null,"configuration":null},"multiplicity":"ONE","categories":[],"apiName":null,"fieldType":{"search":"PLAIN","results":"PLAIN","details":"PLAIN","update":"PLAIN","configuration":null},"defaults":null,"searchConf":{"policy":"EXACT_MATCH","multiplicity":"ONE","fields":[]},"unique":false,"security":{"permissions":null,"roles":null},"validation":{"required":null,"minLength":null,"maxLength":null,"validators":null},"triggers":[],"priority":{"results":1000,"search":1000,"update":1000,"details":1000},"fieldSet":null,"actions":[],"overrideDefaults":[],"owner":"organisation","sortable":true},{"name":"name","label":"Org name","shortLabel":null,"hint":null,"type":{"type":"STRING","complexType":null,"filter":null,"query":null,"list":null,"from":null},"access":"PUBLIC","isId":false,"isKey":true,"isLabel":false,"linked":null,"isParent":false,"quickSearch":{"value":null,"fields":null,"configuration":null},"searchable":{"value":"","fields":[],"configuration":[]},"editable":{"value":"","fields":[],"configuration":null},"showInResults":{"value":"","fields":[],"configuration":[]},"showInUpdate":{"value":"","fields":[],"configuration":[]},"showInDetails":{"value":null,"fields":null,"configuration":null},"multiplicity":"ONE","categories":[],"apiName":null,"fieldType":{"search":"PLAIN","results":"PLAIN","details":"PLAIN","update":"PLAIN","configuration":null},"defaults":null,"searchConf":{"policy":"EXACT_MATCH","multiplicity":"ONE","fields":[]},"unique":false,"security":{"permissions":null,"roles":null},"validation":{"required":true,"minLength":null,"maxLength":null,"validators":null},"triggers":[],"priority":{"results":1000,"search":1000,"update":1000,"details":1000},"fieldSet":null,"actions":[],"overrideDefaults":[],"owner":"organisation","sortable":true},{"name":"country","label":"Country ID","shortLabel":null,"hint":null,"type":{"type":"STRING","complexType":null,"filter":null,"query":null,"list":null,"from":null},"access":"PUBLIC","isId":false,"isKey":true,"isLabel":false,"linked":null,"isParent":false,"quickSearch":{"value":null,"fields":null,"configuration":null},"searchable":{"value":"","fields":[],"configuration":[]},"editable":{"value":"","fields":[],"configuration":null},"showInResults":{"value":"","fields":[],"configuration":[]},"showInUpdate":{"value":"","fields":[],"configuration":[]},"showInDetails":{"value":null,"fields":null,"configuration":null},"multiplicity":"ONE","categories":[],"apiName":null,"fieldType":{"search":"PLAIN","results":"PLAIN","details":"PLAIN","update":"PLAIN","configuration":null},"defaults":null,"searchConf":{"policy":"EXACT_MATCH","multiplicity":"ONE","fields":[]},"unique":false,"security":{"permissions":null,"roles":null},"validation":{"required":true,"minLength":null,"maxLength":null,"validators":null},"triggers":[],"priority":{"results":1000,"search":1000,"update":1000,"details":1000},"fieldSet":null,"actions":[],"overrideDefaults":[],"owner":"organisation","sortable":true}],"fieldSets":[],"actions":[],"overrideDefaults":[],"configuration":[],"favoriteable":false,"resultClick":[]},{"classFor":"io.konga.tutorial.model.Application","name":"application","superClass":null,"label":"Application","shortLabel":null,"access":"PUBLIC","stereotypes":[],"searchable":"","createable":"","editable":"","deleteable":"","searchType":"CASCADE","searchStyle":null,"resultsType":"CASCADE","resultsStyle":null,"detailsType":"CASCADE","detailsStyle":null,"updateType":"CASCADE","updateStyle":null,"template":null,"apiName":null,"apiPath":null,"categories":[],"security":{"permissions":null,"roles":null},"fields":[{"name":"id","label":null,"shortLabel":null,"hint":null,"type":{"type":"NUMBER","complexType":null,"filter":null,"query":null,"list":null,"from":null},"access":"PUBLIC","isId":true,"isKey":false,"isLabel":false,"linked":null,"isParent":false,"quickSearch":{"value":null,"fields":null,"configuration":null},"searchable":{"value":null,"fields":null,"configuration":null},"editable":{"value":null,"fields":null,"configuration":null},"showInResults":{"value":null,"fields":null,"configuration":null},"showInUpdate":{"value":null,"fields":null,"configuration":null},"showInDetails":{"value":null,"fields":null,"configuration":null},"multiplicity":"ONE","categories":[],"apiName":null,"fieldType":{"search":"PLAIN","results":"PLAIN","details":"PLAIN","update":"PLAIN","configuration":null},"defaults":null,"searchConf":{"policy":"EXACT_MATCH","multiplicity":"ONE","fields":[]},"unique":false,"security":{"permissions":null,"roles":null},"validation":{"required":null,"minLength":null,"maxLength":null,"validators":null},"triggers":[],"priority":{"results":1000,"search":1000,"update":1000,"details":1000},"fieldSet":null,"actions":[],"overrideDefaults":[],"owner":"application","sortable":true},{"name":"code","label":"App key","shortLabel":null,"hint":null,"type":{"type":"STRING","complexType":null,"filter":null,"query":null,"list":null,"from":null},"access":"PUBLIC","isId":false,"isKey":true,"isLabel":false,"linked":null,"isParent":false,"quickSearch":{"value":null,"fields":null,"configuration":null},"searchable":{"value":"","fields":[],"configuration":[]},"editable":{"value":"","fields":[],"configuration":null},"showInResults":{"value":"","fields":[],"configuration":[]},"showInUpdate":{"value":"","fields":[],"configuration":[]},"showInDetails":{"value":null,"fields":null,"configuration":null},"multiplicity":"ONE","categories":[],"apiName":null,"fieldType":{"search":"PLAIN","results":"PLAIN","details":"PLAIN","update":"PLAIN","configuration":null},"defaults":null,"searchConf":{"policy":"EXACT_MATCH","multiplicity":"ONE","fields":[]},"unique":false,"security":{"permissions":null,"roles":null},"validation":{"required":true,"minLength":null,"maxLength":null,"validators":null},"triggers":[],"priority":{"results":1000,"search":1000,"update":1000,"details":1000},"fieldSet":null,"actions":[],"overrideDefaults":[],"owner":"application","sortable":true},{"name":"name","label":"App name","shortLabel":null,"hint":null,"type":{"type":"STRING","complexType":null,"filter":null,"query":null,"list":null,"from":null},"access":"PUBLIC","isId":false,"isKey":true,"isLabel":false,"linked":null,"isParent":false,"quickSearch":{"value":null,"fields":null,"configuration":null},"searchable":{"value":"","fields":[],"configuration":[]},"editable":{"value":"","fields":[],"configuration":null},"showInResults":{"value":"","fields":[],"configuration":[]},"showInUpdate":{"value":"","fields":[],"configuration":[]},"showInDetails":{"value":null,"fields":null,"configuration":null},"multiplicity":"ONE","categories":[],"apiName":null,"fieldType":{"search":"PLAIN","results":"PLAIN","details":"PLAIN","update":"PLAIN","configuration":null},"defaults":null,"searchConf":{"policy":"EXACT_MATCH","multiplicity":"ONE","fields":[]},"unique":false,"security":{"permissions":null,"roles":null},"validation":{"required":true,"minLength":null,"maxLength":null,"validators":null},"triggers":[],"priority":{"results":1000,"search":1000,"update":1000,"details":1000},"fieldSet":null,"actions":[],"overrideDefaults":[],"owner":"application","sortable":true}],"fieldSets":[],"actions":[],"overrideDefaults":[],"configuration":[],"favoriteable":false,"resultClick":[]}],"configuration":[]});
</pre>
 *
 * **Wow.** The file is now **huge!**. But don't worry, that means we are now able to do some more things.
 *
 * ## Reference `KongaController` on the UI App
 *
 * Konga operations rely on a global controller - i.e. {@link api/konga.controller:KongaController `KongaController`}, that contains all basic operations konga is able to launch. To use it, you need to engage it into your app. Go to your `index.html` file and engage `KongaController` under the `<body>` tag:
 *
 * **`/index.html`**
<pre>
<body ng-app="uiApp" ng-controller="KongaController">
</pre>
 *
 * ## Modify our `main` view
 *
 * To open konga forms, you need to leverage the existing {@link api/Standards.Operations `Operations`}. We will open now a `search` form by clicking the button:
 *
 * **`/app/views/main.html`**
<pre>
<div class="jumbotron">
  <h1>Konga Tutorial</h1>
  
  <p>
  Here you have all the entities declared on your metadata:
  </p>
  <div class="row">
    <div class="col-md-4" ng-repeat="entity in metadata.entities">
      <button class="btn btn-success" ng-click="operations.openEntitySearch(entity)">{{ entity.name }}</button>
    </div>
  </div>
</div>
</pre>
 * 
 *
 * As you can see we've just appended a `ng-click` directive to our buttons, to get the {@link api/Standards.Operations#methods_openEntitySearch `openEntitySearch(entity)`} operation launched on click. 
 *
 * ## Trying our app
 *
 * If you launch your app using `grunt serve`, and click on the `developer` button once it opens, you should see the `Developer` search form rendered, with all interactions engaged. It's true styling is not the best. But we'll work on that!
 *
 * ## Profiling our application
 *
 * Now that metadata generation is done, we are finally able to execute the app and see the forms working. Now it's time to create permissions for the entities and fields, and see how konga engages with your permission management system. **{@link Basics.Dealing_with_permissions Go to the next step}**
 */