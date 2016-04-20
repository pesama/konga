/**
 * @ngdoc overview
 * @name index
 * @description 
 *
 *
 * <div style="margin-top: 3em;margin-left: 1em;" class="pull-right">
 *    <iframe width="420" height="315" src="http://www.youtube.com/embed/ZJ5EaWzPAQ0?autoplay=0"></iframe>
 * </div>
 *
 * # What is Konga?
 *
 * Konga is an application engine, whose purpose is to improve development experience when dealing with form-based apps, by reducing required times and efforts drammatically - <b>up to 80%</b>. It does so by introducing a new concept into our classical development tasks: <b>Metadata modeling</b>.
 *
 * <div class="text-center">
 *  <img src="/static/konga-bottom-first.png" width="300">
 * </div>
 *
 * <div style="clear:both"></div>
 * 
 * ## Metadata modeling
 *
 * <div style="margin-left: 1em;" class="pull-right">
 *    <iframe width="420" height="315" src="http://www.youtube.com/embed/TEFZLjadqAw?autoplay=0"></iframe>
 * </div>
 *
 * <b>Metadata modeling</b> helps you define your elements, and convert them into an object, interpreted by Konga to generate your app. So instead of creating the forms manually for each entity, you would just define the metadata, and let Konga do the rest.
 *
 *
 * The <b>metadata object</b> definitions cover all contextual information about the data of your app - e.g. <b>identification</b>, <b>data typing</b> or <b>validation</b>. Definitions are applied to these elements:
 *
 * * **Application:** Is the root of your app, and you can provide it with a name, and certain configuration.
 * * **Entities:** Define the elements of your app - e.g. Car, Person, ... - and can configure <b>identification</b>, <b>allowed operations</b> - CRUD -  and <b>appearance</b>.
 * * **Fields:** Describe the properties of any <b>entity</b>, and can control <b>identification</b>, <b>data typing</b>, <b>appearance</b> and <b>operations</b>.
 *
 * <div class="text-center" style="clear:both">
 *  <img src="/static/konga-bottom-second.png" width="500">
 * </div> 
 *
 * 
 * ## Konga UI
 *
 * Konga UI is an AngularJS library, that includes a set of standards that will help you create a fully-working UI to manage some data with very little coding. It contains the required features to read the metadata, and generate <b>search & results</b> and <b>update</b> forms automatically. All views and behaviors can be overriden easily, to configure the application anywhere you want.
 *
 * 
 *
 * * **
 *
 *

 */
 /*
 * ## The very first app
 *
 * We will build our very first app using Konga. The purpose of the app will be to manage a fake API - i.e. {@link http://jsonplaceholder.typicode.com/ `http://jsonplaceholder.typicode.com/`}, using some of the entities it offers:
 *
 * <img src="/static/quickstart-model-initial.png" width="50%" class="center">
 *
 * ## Download the project
 *
 * <a class="btn btn-primary" href="https://github.com/pritok/konga-quickstart/archive/master.zip" target="_blank">
 * 	<i class="fa fa-download"></i> Download as zip
 * </a>
 * <a class="btn btn-success" href="https://github.com/pritok/konga-quickstart/archive/master.zip" target="_blank">
 * 	<i class="fa fa-github"></i> Fork on GitHub
 * </a>
 * 
 * <i class="fa fa-github"></i> Clone on Github
 * ```
git clone https://github.com/pritok/konga-quickstart
 * ``` 
 *
 * ## Installing dependencies
 *
 * <span class="text-warning"><i class="fa fa-warning"></i> You need to get **{@link https://npmjs.org/ `npm`}**, {@link http://gruntjs.com `grunt`} and **{@link http://bower.io/ `bower`}** installed to launch this application.</span>
 *
 * We need to install dependencies before launching our application. Open a terminal and go to the project's root, and run this:
 * 
 * ```
npm install
bower install
 * ```
 *
 * ## Running the app
 *
 * Once you have your dependencies installed, on a terminal at the root of the project, type:
 *
 * ```
grunt serve
 * ```
 *
 * A browser will open and you will see the app running at `http://localhost:9000`.
 *
 *
 * # The code
 *
 * The project you downloaded it's basically a {@link https://github.com/yeoman/generator-angular#readme `angular-generator`} project, scaffolded with {@link http://yeoman.io/ `Yeoman`}. We've added some things to the project, and removed others, to get a Konga app running with the model shown above.
 *
 * ## No controllers
 * 
 * As you've sure seen, there's no controllers folder within your project. Your app runs fully on {@link api/Standards Konga standards}, so you don't need any specific code for handling these forms.
 *
 * The resposibility for rendering and managing the forms you see on your app, are the {@link api/konga.controller:EntitySearchController `EntitySearchController`} and the {@link api/konga.controller:EntityUpdateController `EntityUpdateController`}, for searching and updating, respectively. There's also a main controlled - called {@link api/konga.controller:KongaController `KongaController`}, which is engaged on your `app/index.html` file:
 * 
 * <i class="fa fa-file-code-o"></i> `app/index.html`
<pre >
<body ng-app="kongaQuickStartApp" ng-controller="KongaController">
</pre>
 * 
 * This controller gives the app full access to Konga's {@link api/Standards.Operations `operations`}, for building forms based on your metadata.
 *
 * ## Metadata
 *
 * On your project there's a folder called **`metadata`**, who contains all the data model for your app. It's a Java project, that leverages the **{@link api/Metadata.Generators `konga-metadata`}** generator for Java. This generator converts the metadata definitions given in the `POJO` models into a **`json`** object, understandeable by the `ui`. 
 *
 * For easing metadata injection, **there's a constant at `app/scripts/services/metadata.js`**, who contains the `json` object extracted from the Java generator:
 *
 * <i class="fa fa-file-code-o"></i> `app/scripts/services/metadata.js`
<pre>
angular.module('kongaQuickStartApp')
  .constant('metadata', {"id":null,"name":"Konga Quick Start", ...
</pre>
 *
 * ## App initialisation
 *
 * When your application loads, there's a method who takes the metadata from the `metadata` constant, injecting it into Konga, initialising the form-generation features:
 *
 * <i class="fa fa-file-code-o"></i> `app/scripts/app.js`
<pre>
.run(['konga', 'metadata', function(konga, metadata) {

    // Configure API endpoint
    // Using demo REST API by JsonPlaceholder
    konga.config('apiEndpoint', 'http://jsonplaceholder.typicode.com');

    // Load the grid view mapping 
    konga.viewMapper('GRID_RESULTS_VIEW', 'views/grid-results.html');

    // And the GOOGLE_MAPS_FIELDTYPE
    konga.viewMapper('GOOGLE_MAPS_FIELDTYPE', 'views/raw-google-maps-input.html');

    // Inject metadata
    konga.init(metadata);
  }]);
</pre>
 *
 * ## Menu
 *
 * On the top of your app there's a menu, who shows accesses for `TODO Items`, `Photos` and `Users`. These links launch search forms for each of the three entities, once you clicked on them. 
 *
 * <i class="fa fa-file-code-o"></i> `app/index.html`
<pre>
<ul class="nav navbar-nav">
  <li ng-repeat="entity in metadata.entities | filter:{ access: 'PUBLIC' }"><a ng-click="operations.openEntitySearch(entity)">{{ entity.label }}</a></li>
  <li><a ng-href="#/">Contact</a></li>
</ul>
</pre>
 * 
 * This basically iterates through every entity defined in the metadata, whose access has been set to {@link api/Metadata.AccessModes#properties_PUBLIC `PUBLIC`}. If you remove that filter, three more entities will appear on the menu - i.e. `Geo`, `Address` and `Company`. These are inner entities used for `Users`, but we don't want them to be accessible from the menu. Hence, they're tagged as {@link api/konga.AccessModes#properties_HIDDEN `HIDDEN`}. 
 *
 * 
 * ## Custom stuff
 *
 * Konga standards build result tables for rendering results. This is neat for data handling, but when we are dealing with pictures, maybe a `grid` would be better. Thus, the {@link api/Metadata.FormType `formType`} value for {@link api/Metadata.FormScopes#properties_RESULTS `RESULTS`} scope has been set to {@link api/Metadata.FormTypes#properties_CUSTOM `CUSTOM`}, and we have provided a view mapped at `views/grid-results.html`.
 *
 * <i class="fa fa-code"></i> `metadata/Photo.java`
<pre>
@ Entity("photo")
@ Label("Photo")
@ Searchable
@ Editable
@ Deleteable
@ FormType(results=FormTypes.CUSTOM)
@ ApiPath("photos")
@ Configuration(
	@ Raw(key="RESULTS_CUSTOM_VIEW", value="GRID_RESULTS_VIEW")
)
public class Photo {
	...
</pre>
 * 
 *
 * ## Move forward
 *
 * The Quick Start ends here. We've seen how to get these metadata configured, for handling `Users`, `Photos` and `TODO Lists`. However, there are still many things to do to get this app completed. It would be nice to have it done, though... :)
 *
 *
 * # Move even forward
 *
 * Now that we've finished this introduction to Konga, you can take the {@link resources/Konga_101 `Konga 101`} tutorial. You can also take the {@link resources/QuickStart_Extended `QuickStart extended`} tutorial to finish this app with some awesome features and customisation.
 * 
 * <div class="row">
 *	<div class="col-xs-12 col-md-6 text-right">
 * 		<a class="btn btn-danger" ng-href="#/api">
 * 			<i class="fa fa-book"></i> API Reference
 * 		</a>
 *	</div>
 *	<div class="col-xs-12 col-md-6 text-left">
 * 		<a class="btn btn-primary" ng-href="#/resources">
 * 			<i class="fa fa-rocket"></i> Resources
 * 		</a>
 *	</div>
 * </div>
 *
 */