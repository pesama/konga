/**
 * @ngdoc object
 * @name Basics.2 - Injecting metadata
 * @description
 * 
 * # Metadata injection
 * 
 * On **{@link Basics.1%20-%20Application%20Basic%20Metadata the previous step}** we have generated a basic metadata object, with three entities - though yet without any field. We will now inject that metadata object into our `ui` application and see how Konga is recognizing our metadata.
 *
 * If you want to download the source of this step directly, do this at your project's root:
```
git checkout -f step-2
```
 *
 * ## Create the constant
 * 
 * We won't cover any injection method on this tutorial. Instead, we will paste the full `json` content of the `metadata.json` file generated on the previous step into an angular constant, and we will work from there. 
 *
 * On your `app/scripts/services/` folder, create a file called `metadata.js`:
<pre>
'use strict';

angular.module('uiApp')
  .constant('metadata', 42);

</pre>
 * 
 * And reference the new `script` into the `index.html` using this tag:
<pre>
<script src="scripts/services/metadata.js"></script>
</pre>
 *
 * If you are familiar with {@link http://yeoman.io Yeoman} and its {@link https://github.com/yeoman/generator-angular#readme `Angular generator`}, you can do these two steps at once by typing:
```
yo angular:constant metadata
```
 *
 * At your project's root.
 *
 * 
 * ## Injecting the metadata
 *
 * Our constant is created, yet it does not contain the metadata information. Let's copy/paste the `metadata.json` object into our constant:

 * **`/app/scripts/services/metadata.js`
<pre>
'use strict';

angular.module('uiApp')
  .constant('metadata', {"id":null,"name":"Konga Tutorial Basics","appKey":null,"entities":[{"classFor":"io.konga.tutorial.model.Developer","name":"developer","superClass":null,"label":null,"shortLabel":null,"access":"PUBLIC","stereotypes":[],"searchable":null,"createable":null,"editable":null,"deleteable":null,"searchType":"CASCADE","searchStyle":null,"resultsType":"CASCADE","resultsStyle":null,"detailsType":"CASCADE","detailsStyle":null,"updateType":"CASCADE","updateStyle":null,"template":null,"apiName":null,"apiPath":null,"categories":[],"security":{"permissions":null,"roles":null},"fields":[],"fieldSets":[],"actions":[],"overrideDefaults":[],"configuration":[],"favoriteable":false,"resultClick":[]},{"classFor":"io.konga.tutorial.model.Organisation","name":"organisation","superClass":null,"label":null,"shortLabel":null,"access":"PUBLIC","stereotypes":[],"searchable":null,"createable":null,"editable":null,"deleteable":null,"searchType":"CASCADE","searchStyle":null,"resultsType":"CASCADE","resultsStyle":null,"detailsType":"CASCADE","detailsStyle":null,"updateType":"CASCADE","updateStyle":null,"template":null,"apiName":null,"apiPath":null,"categories":[],"security":{"permissions":null,"roles":null},"fields":[],"fieldSets":[],"actions":[],"overrideDefaults":[],"configuration":[],"favoriteable":false,"resultClick":[]},{"classFor":"io.konga.tutorial.model.Application","name":"application","superClass":null,"label":null,"shortLabel":null,"access":"PUBLIC","stereotypes":[],"searchable":null,"createable":null,"editable":null,"deleteable":null,"searchType":"CASCADE","searchStyle":null,"resultsType":"CASCADE","resultsStyle":null,"detailsType":"CASCADE","detailsStyle":null,"updateType":"CASCADE","updateStyle":null,"template":null,"apiName":null,"apiPath":null,"categories":[],"security":{"permissions":null,"roles":null},"fields":[],"fieldSets":[],"actions":[],"overrideDefaults":[],"configuration":[],"favoriteable":false,"resultClick":[]}],"configuration":[]});
</pre>
 *
 * Our metadata will be already on the `metadata` constant. Now it's time to inject it:
 *
 * ## Injecting metadata on our app
 *
 * Our application - as any Angular app - goes through a `run` phase before being ready. There we will proceed with metadata injection. Append these lines on your `/app/scripts/app.js` file. 
 *
 * **`/app/scripts/app.js`**
<pre>

</pre>
 */