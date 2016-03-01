/**
 * @ngdoc object
 * @name Basics.1 - Application Basic Metadata
 * @description
 *
 * Metadata generation
 *
 * Now that our applications are configured and ready to be launched, is time to define some basic `metadata` for our `ui` to manage. 

 * If you want to download the source of this step directly, do this at your project's root:
```
git checkout -f step-1
```
 *
 * ## Creating the Metadata classes 
 *
 * <img src="http://static.konga.io/tutorial-basics-datamodel.png" width="40%" class="center">
 *
 * Here you have the basic model we will deal with for now. We basically need to create three Java classes - i.e. `Organisations`, `Applications` and `Developers` - and set up some metadata for Konga. Let's run:
 *
 * **Create** the classes `Organisation.java`, `Application.java` and `Developer.java` under the **`io.konga.tutorial.model`** package:
 * 
 * **`Organisation.java`**
<pre>
package io.konga.tutorial.model;

@ Entity("organisation")
public class Organisation {

	private Integer id;
	
	private String name;
	
	private String country;
}
</pre>

 * **`Application.java`**
<pre>
package io.konga.tutorial.model;

@ Entity("application")
public class Application {

	private Integer id;
	
	private String code;
	
	private String name;
}
</pre>
 *
 * **`Developer.java`**
<pre>
package io.konga.tutorial.model;

@ Entity("developer")
public class Developer {

	private Integer id;
	
	private String name;
	
	private String email;
}
</pre>
 *
 * 
 *As we won't deal with the Java application directly - and we will use Java annotations to generate the model instead - we don't need any getters nor setters. At least for now.
 *
 * 
 * ## Creating the generator
 *
 * Konga generator for Java is a class that reads the metadata for the model - i.e. a `model package` given. The generator handles all the process, starting by reading all `@Entity` annotations defined on the model package.
 *
 * **Create** a file called `CloudGenerator.java` on your **`io.konga.tutorial.generator`** package:
 *
 * **`CloudGenerator.java`**
<pre>
package io.konga.tutorial.generator;

import java.io.FileWriter;

import io.konga.metadata.definition.KongaDefinition;
import io.konga.metadata.definition.KongaMetadata;
import io.konga.metadata.generator.KongaGenerator;

public class CloudGenerator {

	public CloudGenerator() throws Exception {
		KongaDefinition definition = new KongaDefinition("Konga Tutorial Basics", 
				"io.konga.tutorial.model");
		
		KongaMetadata metadata = KongaGenerator.readPackage(definition);
		
		System.out.println("parsing");
		
		String metadataJson = metadata.toJson();
		
		FileWriter fw = new FileWriter("../metadata.json");
		fw.write(metadataJson);
		fw.close();
		
		System.out.println("ready");
	}

	public static void main(String[] args) {
		try {
			new CloudGenerator();
		} catch(Exception e) {
			e.printStackTrace();
		}
	}

}

</pre>
 *
 * The Konga generator leverages a `KongaDefinition` object, that receives the name of your app, and the model package to look for annotated entities:
```
KongaDefinition definition = new KongaDefinition("Konga Tutorial Basics", "io.konga.tutorial.model");
```
 *
 * Once your definition is set, you can use static method `readPackage` of the `KongaGenerator` class, that will read all your metadata and return you a `KongaMetadata` object. Beneath that object there are is all the configuration for your app, read from the annotated classes. 
 *
 * As we will generate our metadata `on-demand`, we've provided our `CloudGenerator` class with a built-in `main` method. Go ahead and execute the app. 
 *
 * ## The metadata
 *
 * Once your app finishes - you should see a `parsing` message, followed by a `ready` message through the console - you will have your `json` metadata object generated under your project's root (outside the `metadata` object). Let's see what it contains:
 *
<pre>
{
    "id": null,
    "name": "Konga Tutorial Basics",
    "appKey": null,
    "entities": [
        {
            "classFor": "io.konga.tutorial.model.Developer",
            "name": "developer",
            "superClass": null,
            "label": null,
            "shortLabel": null,
            "access": "PUBLIC",
            "stereotypes": [],
            "searchable": null,
            "createable": null,
            "editable": null,
            "deleteable": null,
            "searchType": "CASCADE",
            "searchStyle": null,
            "resultsType": "CASCADE",
            "resultsStyle": null,
            "detailsType": "CASCADE",
            "detailsStyle": null,
            "updateType": "CASCADE",
            "updateStyle": null,
            "template": null,
            "apiName": null,
            "apiPath": null,
            "categories": [],
            "security": {
                "permissions": null,
                "roles": null
            },
            "fields": [],
            "fieldSets": [],
            "actions": [],
            "overrideDefaults": [],
            "configuration": [],
            "favoriteable": false,
            "resultClick": []
        },
        {
            "classFor": "io.konga.tutorial.model.Organisation",
            "name": "organisation",
            "superClass": null,
            "label": null,
            "shortLabel": null,
            "access": "PUBLIC",
            "stereotypes": [],
            "searchable": null,
            "createable": null,
            "editable": null,
            "deleteable": null,
            "searchType": "CASCADE",
            "searchStyle": null,
            "resultsType": "CASCADE",
            "resultsStyle": null,
            "detailsType": "CASCADE",
            "detailsStyle": null,
            "updateType": "CASCADE",
            "updateStyle": null,
            "template": null,
            "apiName": null,
            "apiPath": null,
            "categories": [],
            "security": {
                "permissions": null,
                "roles": null
            },
            "fields": [],
            "fieldSets": [],
            "actions": [],
            "overrideDefaults": [],
            "configuration": [],
            "favoriteable": false,
            "resultClick": []
        },
        {
            "classFor": "io.konga.tutorial.model.Application",
            "name": "application",
            "superClass": null,
            "label": null,
            "shortLabel": null,
            "access": "PUBLIC",
            "stereotypes": [],
            "searchable": null,
            "createable": null,
            "editable": null,
            "deleteable": null,
            "searchType": "CASCADE",
            "searchStyle": null,
            "resultsType": "CASCADE",
            "resultsStyle": null,
            "detailsType": "CASCADE",
            "detailsStyle": null,
            "updateType": "CASCADE",
            "updateStyle": null,
            "template": null,
            "apiName": null,
            "apiPath": null,
            "categories": [],
            "security": {
                "permissions": null,
                "roles": null
            },
            "fields": [],
            "fieldSets": [],
            "actions": [],
            "overrideDefaults": [],
            "configuration": [],
            "favoriteable": false,
            "resultClick": []
        }
    ],
    "configuration": []
}
</pre>
 *
 * A bit big, right? These metadata contains the basic information for your entities, using all default values - as we only specified a "`name`" for our entities, but nothing else. 
 *
 *
 * ## Including our metadata in the UI
 *
 * Now that we have a valid metadata to execute, let's inject it into Konga - i.e. the UI - and see what we got. **{@link Basics.2%20-%20Injecting%20Metadata Go to the next step}**.
 *
 */