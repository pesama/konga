/**
 * @ngdoc overview
 * @name index
 * @description 

<div class="row margin-top-3em">
	<div class="col-xs-12 text-center">
		<img src="http://konga.io/images/konga-logo.png" width="600" /> 
	</div>
</div>

# Quick start

Hi! Welcome to Konga's Quick Start. On these easy steps, you will see how to create a Konga application, interact with the metadata, and take a walk-through Konga's very basics. 

## Requirements

Konga runs on top of {@link https://angularjs.org `AngularJS`}, so some Angular knowledge will ease you considerably when dealing with this quick start.

The dependency management is handled using {@link https://www.npmjs.com/ `npm`}, so you need to get it installed in order to successfully get a Konga app running. Optionnally, you could also use {@link http://bower.io/ `bower`} to handle _front-end_ dependencies. For building the app, and for launching a development environment, {@link http://gruntjs.com/ `Grunt`} task runner is used. And last, but not least, Konga uses {@link http://yeoman.io/ `yeoman`} to scaffold your apps.

## Installation

### From scratch

For installing Konga from scratch with a brand new app, you can leverage {@link generators.yeoman Konga's Yeoman Generator}, that will build a fully working webapp with all konga features ready.

Install `yo`, `generator-konga`:
```
npm install -g yo generator-konga
```

Then run Konga's generator on your workspace path:
```
yo konga konga-quick-start
```

See the {@link generators.yeoman Generator documentation} for all the details and features it includes.

If you created an app using this method, you have all below steps done. Just launch your app with:
```
grunt serve
```

And see what you've got at `http://localhost:9010/`. When you are ready to move forward with in-depth konga readings, you can take the {@link quick-start.tutorial tutorial}.

### Existing app

Konga is both published in both `bower` (i.e. `konga`) and `npm` (i.e. `ui.konga`) registries. Using npm you can do the following:

```
npm install ui.konga --save
```

Then import konga in your app:
```
import konga from "ui.konga";
```

And include the konga stylesheet, placed under `lib/konga.[css|scss]`.

Bower installation uses a Grunt configuration (Gulp version comming) to inject everything required, and other handy stuff (create and manage `metadata`, customize the app in the command line, ...). All of these features interact directly with Yeoman's Generator. {@link generators.yeoman Read the docs} for more details.


## Metadata

Konga relies on metadata objects to execute most part of its features. Hence, you need to provide Konga with a metadata object defining your app. We have provide you with a test metadata object to follow this quick start right away. However, if you want to define directly a meaningful metadata object for your real purpose, go ahead and pick up your favorite {@link generators generator}. Then you can come back here and keep on following the quick start.

Sample metadata object:
<pre class="preview">
{"name":"Konga Live-Testing platform","entities":[{"classFor":"io.konga.ltp.metadata.models.Partner","name":"partner","superClass":null,"label":"entity.partner","shortLabel":null,"access":"RESTRICTED","stereotypes":[],"searchable":"","createable":"","editable":"","deleteable":"","searchType":"CASCADE","searchStyle":"STANDARD","resultsType":"CASCADE","resultsStyle":"STANDARD","detailsType":"CASCADE","detailsStyle":"STANDARD","updateType":"TABBED","updateStyle":"HORIZONTAL","template":"","apiName":null,"apiPath":"partners","categories":[],"security":{"permissions":null,"roles":null},"fields":[{"name":"id","label":"field.partner.id","shortLabel":null,"type":{"type":"NUMBER","complexType":null,"filter":null,"query":null,"list":null,"from":null},"access":"PUBLIC","isId":true,"isKey":true,"isLabel":false,"isParent":false,"quickSearch":{"value":null,"fields":null,"configuration":null},"searchable":{"value":null,"fields":null,"configuration":null},"editable":{"value":null,"fields":null,"configuration":null},"showInResults":{"value":null,"fields":null,"configuration":null},"showInUpdate":{"value":null,"fields":null,"configuration":null},"showInDetails":{"value":null,"fields":null,"configuration":null},"multiplicity":"ONE","categories":[],"apiName":null,"fieldType":{"search":"PLAIN","results":"PLAIN","details":"PLAIN","update":"PLAIN","configuration":null},"defaults":null,"searchConf":{"policy":"EXACT_MATCH","multiplicity":"ONE","fields":[]},"unique":false,"security":{"permissions":null,"roles":null},"validation":{"required":false,"minLength":null,"maxLength":null,"validators":null},"triggers":[],"priority":{"results":1000,"search":1000,"update":1000,"details":1000},"fieldSet":null,"actions":[],"overrideDefaults":[],"owner":"partner","sortable":true},{"name":"imageUrl","label":"field.partner.image-url","shortLabel":" ","type":{"type":"STRING","complexType":null,"filter":null,"query":null,"list":null,"from":null},"access":"PUBLIC","isId":false,"isKey":false,"isLabel":false,"isParent":false,"quickSearch":{"value":null,"fields":null,"configuration":null},"searchable":{"value":null,"fields":null,"configuration":null},"editable":{"value":"","fields":[],"configuration":null},"showInResults":{"value":"","fields":[],"configuration":[{"key":"USE_SHORT_LABEL","value":"true"}]},"showInUpdate":{"value":"","fields":[],"configuration":[]},"showInDetails":{"value":null,"fields":null,"configuration":null},"multiplicity":"ONE","categories":["category.partner.general"],"apiName":null,"fieldType":{"search":"PLAIN","results":"IMAGE","details":"PLAIN","update":"PLAIN","configuration":[]},"defaults":null,"searchConf":{"policy":"EXACT_MATCH","multiplicity":"ONE","fields":[]},"unique":false,"security":{"permissions":null,"roles":null},"validation":{"required":false,"minLength":null,"maxLength":null,"validators":null},"triggers":[],"priority":{"results":1000,"search":1000,"update":1000,"details":1000},"fieldSet":null,"actions":[],"overrideDefaults":[],"owner":"partner","sortable":false},{"name":"name","label":"field.partner.name","shortLabel":null,"type":{"type":"STRING","complexType":null,"filter":null,"query":null,"list":null,"from":null},"access":"PUBLIC","isId":false,"isKey":false,"isLabel":true,"isParent":false,"quickSearch":{"value":null,"fields":null,"configuration":null},"searchable":{"value":"","fields":[],"configuration":[]},"editable":{"value":"","fields":[],"configuration":null},"showInResults":{"value":"","fields":[],"configuration":[]},"showInUpdate":{"value":"","fields":[],"configuration":[]},"showInDetails":{"value":null,"fields":null,"configuration":null},"multiplicity":"ONE","categories":["category.partner.general"],"apiName":null,"fieldType":{"search":"PLAIN","results":"PLAIN","details":"PLAIN","update":"PLAIN","configuration":null},"defaults":null,"searchConf":{"policy":"EXACT_MATCH","multiplicity":"ONE","fields":[]},"unique":true,"security":{"permissions":null,"roles":null},"validation":{"required":true,"minLength":null,"maxLength":null,"validators":null},"triggers":[],"priority":{"results":1000,"search":1000,"update":1000,"details":1000},"fieldSet":null,"actions":[],"overrideDefaults":[],"owner":"partner","sortable":true},{"name":"emailDomain","label":"field.partner.email-domain","shortLabel":null,"type":{"type":"STRING","complexType":null,"filter":null,"query":null,"list":null,"from":null},"access":"PUBLIC","isId":false,"isKey":false,"isLabel":false,"isParent":false,"quickSearch":{"value":null,"fields":null,"configuration":null},"searchable":{"value":"","fields":[],"configuration":[]},"editable":{"value":"","fields":[],"configuration":null},"showInResults":{"value":"","fields":[],"configuration":[]},"showInUpdate":{"value":"","fields":[],"configuration":[]},"showInDetails":{"value":null,"fields":null,"configuration":null},"multiplicity":"ONE","categories":["category.partner.general"],"apiName":null,"fieldType":{"search":"PLAIN","results":"PLAIN","details":"PLAIN","update":"PLAIN","configuration":null},"defaults":null,"searchConf":{"policy":"EXACT_MATCH","multiplicity":"ONE","fields":[]},"unique":true,"security":{"permissions":null,"roles":null},"validation":{"required":true,"minLength":null,"maxLength":null,"validators":null},"triggers":[],"priority":{"results":1000,"search":1000,"update":1000,"details":1000},"fieldSet":null,"actions":[],"overrideDefaults":[],"owner":"partner","sortable":true},{"name":"developers","label":"field.partner.developers","shortLabel":null,"type":{"type":"COMPLEX","complexType":"developer","filter":"","query":[],"list":[],"from":null},"access":"PUBLIC","isId":false,"isKey":false,"isLabel":false,"isParent":false,"quickSearch":{"value":null,"fields":null,"configuration":null},"searchable":{"value":null,"fields":null,"configuration":null},"editable":{"value":"","fields":[],"configuration":null},"showInResults":{"value":null,"fields":null,"configuration":null},"showInUpdate":{"value":"","fields":["name","email"],"configuration":[]},"showInDetails":{"value":null,"fields":null,"configuration":null},"multiplicity":"ONE","categories":["category.partner.developers"],"apiName":null,"fieldType":{"search":"PLAIN","results":"PLAIN","details":"PLAIN","update":"PICK_LIST","configuration":[]},"defaults":null,"searchConf":{"policy":"EXACT_MATCH","multiplicity":"ONE","fields":[]},"unique":false,"security":{"permissions":null,"roles":null},"validation":{"required":false,"minLength":null,"maxLength":null,"validators":null},"triggers":[],"priority":{"results":1000,"search":1000,"update":1000,"details":1000},"fieldSet":null,"actions":[],"overrideDefaults":[],"owner":"partner","sortable":true},{"name":"applications","label":"field.partner.applications","shortLabel":null,"type":{"type":"COMPLEX","complexType":"application","filter":"","query":{"partner":"{id}"},"list":[],"from":null},"access":"PUBLIC","isId":false,"isKey":false,"isLabel":false,"isParent":false,"quickSearch":{"value":null,"fields":null,"configuration":null},"searchable":{"value":null,"fields":null,"configuration":null},"editable":{"value":"","fields":[],"configuration":null},"showInResults":{"value":null,"fields":null,"configuration":null},"showInUpdate":{"value":"","fields":["name","access","owner"],"configuration":[]},"showInDetails":{"value":null,"fields":null,"configuration":null},"multiplicity":"ONE","categories":["category.partner.applications"],"apiName":null,"fieldType":{"search":"PLAIN","results":"PLAIN","details":"PLAIN","update":"PICK_LIST","configuration":[]},"defaults":null,"searchConf":{"policy":"EXACT_MATCH","multiplicity":"ONE","fields":[]},"unique":false,"security":{"permissions":null,"roles":null},"validation":{"required":false,"minLength":null,"maxLength":null,"validators":null},"triggers":[],"priority":{"results":1000,"search":1000,"update":1000,"details":1000},"fieldSet":null,"actions":[],"overrideDefaults":[],"owner":"partner","sortable":true}],"fieldSets":[],"actions":[],"overrideDefaults":[],"configuration":[],"favoriteable":false,"resultClick":[]},{"classFor":"io.konga.ltp.metadata.models.Developer","name":"developer","superClass":null,"label":"entity.developer","shortLabel":null,"access":"RESTRICTED","stereotypes":[],"searchable":"","createable":"","editable":"","deleteable":"","searchType":"CASCADE","searchStyle":"STANDARD","resultsType":"CASCADE","resultsStyle":"STANDARD","detailsType":"CASCADE","detailsStyle":"STANDARD","updateType":"TABBED","updateStyle":"HORIZONTAL","template":"","apiName":null,"apiPath":"developers","categories":[],"security":{"permissions":null,"roles":null},"fields":[{"name":"id","label":"field.developer.id","shortLabel":null,"type":{"type":"NUMBER","complexType":null,"filter":null,"query":null,"list":null,"from":null},"access":"PUBLIC","isId":true,"isKey":true,"isLabel":false,"isParent":false,"quickSearch":{"value":null,"fields":null,"configuration":null},"searchable":{"value":null,"fields":null,"configuration":null},"editable":{"value":null,"fields":null,"configuration":null},"showInResults":{"value":null,"fields":null,"configuration":null},"showInUpdate":{"value":null,"fields":null,"configuration":null},"showInDetails":{"value":null,"fields":null,"configuration":null},"multiplicity":"ONE","categories":["category.developer.general"],"apiName":null,"fieldType":{"search":"PLAIN","results":"PLAIN","details":"PLAIN","update":"PLAIN","configuration":null},"defaults":null,"searchConf":{"policy":"EXACT_MATCH","multiplicity":"ONE","fields":[]},"unique":false,"security":{"permissions":null,"roles":null},"validation":{"required":false,"minLength":null,"maxLength":null,"validators":null},"triggers":[],"priority":{"results":1000,"search":1000,"update":1000,"details":1000},"fieldSet":null,"actions":[],"overrideDefaults":[],"owner":"developer","sortable":true},{"name":"name","label":"field.developer.name","shortLabel":null,"type":{"type":"STRING","complexType":null,"filter":null,"query":null,"list":null,"from":null},"access":"PUBLIC","isId":false,"isKey":false,"isLabel":true,"isParent":false,"quickSearch":{"value":null,"fields":null,"configuration":null},"searchable":{"value":"","fields":[],"configuration":[]},"editable":{"value":"","fields":[],"configuration":null},"showInResults":{"value":"","fields":[],"configuration":[]},"showInUpdate":{"value":"","fields":[],"configuration":[]},"showInDetails":{"value":null,"fields":null,"configuration":null},"multiplicity":"ONE","categories":["category.developer.general"],"apiName":null,"fieldType":{"search":"PLAIN","results":"PLAIN","details":"PLAIN","update":"PLAIN","configuration":null},"defaults":null,"searchConf":{"policy":"EXACT_MATCH","multiplicity":"ONE","fields":[]},"unique":false,"security":{"permissions":null,"roles":null},"validation":{"required":true,"minLength":null,"maxLength":null,"validators":null},"triggers":[],"priority":{"results":1000,"search":1000,"update":1000,"details":1000},"fieldSet":null,"actions":[],"overrideDefaults":[],"owner":"developer","sortable":true},{"name":"email","label":"field.developer.email","shortLabel":null,"type":{"type":"STRING","complexType":null,"filter":null,"query":null,"list":null,"from":null},"access":"PUBLIC","isId":false,"isKey":false,"isLabel":true,"isParent":false,"quickSearch":{"value":null,"fields":null,"configuration":null},"searchable":{"value":"","fields":[],"configuration":[]},"editable":{"value":"","fields":[],"configuration":null},"showInResults":{"value":"","fields":[],"configuration":[]},"showInUpdate":{"value":"","fields":[],"configuration":[]},"showInDetails":{"value":null,"fields":null,"configuration":null},"multiplicity":"ONE","categories":["category.developer.general"],"apiName":null,"fieldType":{"search":"PLAIN","results":"PLAIN","details":"PLAIN","update":"PLAIN","configuration":null},"defaults":null,"searchConf":{"policy":"EXACT_MATCH","multiplicity":"ONE","fields":[]},"unique":true,"security":{"permissions":null,"roles":null},"validation":{"required":true,"minLength":null,"maxLength":null,"validators":null},"triggers":[],"priority":{"results":1000,"search":1000,"update":1000,"details":1000},"fieldSet":null,"actions":[],"overrideDefaults":[],"owner":"developer","sortable":true},{"name":"partner","label":"field.developer.partner","shortLabel":null,"type":{"type":"COMPLEX","complexType":"partner","filter":"","query":[],"list":[],"from":null},"access":"PUBLIC","isId":false,"isKey":false,"isLabel":true,"isParent":false,"quickSearch":{"value":null,"fields":null,"configuration":null},"searchable":{"value":"","fields":[],"configuration":[]},"editable":{"value":"","fields":[],"configuration":null},"showInResults":{"value":"","fields":[],"configuration":[]},"showInUpdate":{"value":"","fields":[],"configuration":[]},"showInDetails":{"value":null,"fields":null,"configuration":null},"multiplicity":"ONE","categories":["category.developer.general"],"apiName":null,"fieldType":{"search":"SELECT","results":"PLAIN","details":"PLAIN","update":"SELECT","configuration":[]},"defaults":null,"searchConf":{"policy":"EXACT_MATCH","multiplicity":"ONE","fields":[]},"unique":false,"security":{"permissions":null,"roles":null},"validation":{"required":true,"minLength":null,"maxLength":null,"validators":null},"triggers":[],"priority":{"results":1000,"search":1000,"update":1000,"details":1000},"fieldSet":null,"actions":[],"overrideDefaults":[],"owner":"developer","sortable":true},{"name":"applications","label":"field.developer.applications","shortLabel":null,"type":{"type":"COMPLEX","complexType":"application","filter":"","query":{"owner":"{id}"},"list":[],"from":null},"access":"PUBLIC","isId":false,"isKey":false,"isLabel":false,"isParent":false,"quickSearch":{"value":null,"fields":null,"configuration":null},"searchable":{"value":null,"fields":null,"configuration":null},"editable":{"value":"","fields":[],"configuration":null},"showInResults":{"value":null,"fields":null,"configuration":null},"showInUpdate":{"value":"","fields":["name","access"],"configuration":[]},"showInDetails":{"value":null,"fields":null,"configuration":null},"multiplicity":"ONE","categories":["category.developer.applications"],"apiName":null,"fieldType":{"search":"PLAIN","results":"PLAIN","details":"PLAIN","update":"PICK_LIST","configuration":[]},"defaults":null,"searchConf":{"policy":"EXACT_MATCH","multiplicity":"ONE","fields":[]},"unique":false,"security":{"permissions":null,"roles":null},"validation":{"required":false,"minLength":null,"maxLength":null,"validators":null},"triggers":[],"priority":{"results":1000,"search":1000,"update":1000,"details":1000},"fieldSet":null,"actions":[],"overrideDefaults":[],"owner":"developer","sortable":true}],"fieldSets":[],"actions":[],"overrideDefaults":[],"configuration":[],"favoriteable":false,"resultClick":[]},{"classFor":"io.konga.ltp.metadata.models.Application","name":"application","superClass":null,"label":"entity.application","shortLabel":null,"access":"RESTRICTED","stereotypes":[],"searchable":"","createable":"","editable":"","deleteable":"","searchType":"CASCADE","searchStyle":"STANDARD","resultsType":"CASCADE","resultsStyle":"STANDARD","detailsType":"CASCADE","detailsStyle":"STANDARD","updateType":"CUSTOM","updateStyle":"HORIZONTAL","template":"","apiName":null,"apiPath":"ltp-applications","categories":[],"security":{"permissions":null,"roles":null},"fields":[{"name":"id","label":"field.application.id","shortLabel":null,"type":{"type":"NUMBER","complexType":null,"filter":null,"query":null,"list":null,"from":null},"access":"PUBLIC","isId":true,"isKey":true,"isLabel":false,"isParent":false,"quickSearch":{"value":null,"fields":null,"configuration":null},"searchable":{"value":null,"fields":null,"configuration":null},"editable":{"value":null,"fields":null,"configuration":null},"showInResults":{"value":null,"fields":null,"configuration":null},"showInUpdate":{"value":null,"fields":null,"configuration":null},"showInDetails":{"value":null,"fields":null,"configuration":null},"multiplicity":"ONE","categories":[],"apiName":null,"fieldType":{"search":"PLAIN","results":"PLAIN","details":"PLAIN","update":"PLAIN","configuration":null},"defaults":null,"searchConf":{"policy":"EXACT_MATCH","multiplicity":"ONE","fields":[]},"unique":false,"security":{"permissions":null,"roles":null},"validation":{"required":false,"minLength":null,"maxLength":null,"validators":null},"triggers":[],"priority":{"results":1000,"search":1000,"update":1000,"details":1000},"fieldSet":null,"actions":[],"overrideDefaults":[],"owner":"application","sortable":true},{"name":"name","label":"field.application.name","shortLabel":null,"type":{"type":"STRING","complexType":null,"filter":null,"query":null,"list":null,"from":null},"access":"PUBLIC","isId":false,"isKey":false,"isLabel":true,"isParent":false,"quickSearch":{"value":null,"fields":null,"configuration":null},"searchable":{"value":"","fields":[],"configuration":[]},"editable":{"value":"","fields":[],"configuration":null},"showInResults":{"value":"","fields":[],"configuration":[]},"showInUpdate":{"value":"","fields":[],"configuration":[]},"showInDetails":{"value":null,"fields":null,"configuration":null},"multiplicity":"ONE","categories":[],"apiName":null,"fieldType":{"search":"PLAIN","results":"PLAIN","details":"PLAIN","update":"PLAIN","configuration":null},"defaults":null,"searchConf":{"policy":"EXACT_MATCH","multiplicity":"ONE","fields":[]},"unique":false,"security":{"permissions":null,"roles":null},"validation":{"required":true,"minLength":null,"maxLength":null,"validators":null},"triggers":[],"priority":{"results":1000,"search":1000,"update":1000,"details":1000},"fieldSet":null,"actions":[],"overrideDefaults":[],"owner":"application","sortable":true},{"name":"owner","label":"field.application.owner","shortLabel":null,"type":{"type":"COMPLEX","complexType":"developer","filter":"","query":[],"list":[],"from":null},"access":"PUBLIC","isId":false,"isKey":false,"isLabel":false,"isParent":false,"quickSearch":{"value":null,"fields":null,"configuration":null},"searchable":{"value":null,"fields":null,"configuration":null},"editable":{"value":null,"fields":null,"configuration":null},"showInResults":{"value":null,"fields":null,"configuration":null},"showInUpdate":{"value":"","fields":[],"configuration":[]},"showInDetails":{"value":null,"fields":null,"configuration":null},"multiplicity":"ONE","categories":[],"apiName":null,"fieldType":{"search":"PLAIN","results":"PLAIN","details":"PLAIN","update":"SELECT","configuration":[]},"defaults":null,"searchConf":{"policy":"EXACT_MATCH","multiplicity":"ONE","fields":[]},"unique":false,"security":{"permissions":null,"roles":null},"validation":{"required":false,"minLength":null,"maxLength":null,"validators":null},"triggers":[],"priority":{"results":1000,"search":1000,"update":1000,"details":1000},"fieldSet":null,"actions":[],"overrideDefaults":[],"owner":"application","sortable":true},{"name":"icon","label":"field.application.icon","shortLabel":null,"type":{"type":"STRING","complexType":null,"filter":null,"query":null,"list":null,"from":null},"access":"PUBLIC","isId":false,"isKey":false,"isLabel":false,"isParent":false,"quickSearch":{"value":null,"fields":null,"configuration":null},"searchable":{"value":null,"fields":null,"configuration":null},"editable":{"value":"","fields":[],"configuration":null},"showInResults":{"value":null,"fields":null,"configuration":null},"showInUpdate":{"value":"","fields":[],"configuration":[]},"showInDetails":{"value":null,"fields":null,"configuration":null},"multiplicity":"ONE","categories":[],"apiName":null,"fieldType":{"search":"PLAIN","results":"PLAIN","details":"PLAIN","update":"PLAIN","configuration":null},"defaults":null,"searchConf":{"policy":"EXACT_MATCH","multiplicity":"ONE","fields":[]},"unique":false,"security":{"permissions":null,"roles":null},"validation":{"required":false,"minLength":null,"maxLength":null,"validators":null},"triggers":[],"priority":{"results":1000,"search":1000,"update":1000,"details":1000},"fieldSet":null,"actions":[],"overrideDefaults":[],"owner":"application","sortable":true},{"name":"access","label":"field.application.access","shortLabel":null,"type":{"type":"STRING","complexType":"","filter":"","query":[],"list":[{"key":"public","value":"field.application.access.public"},{"key":"partner","value":"field.application.access.partner"},{"key":"private","value":"field.application.access.private"}],"from":null},"access":"PUBLIC","isId":false,"isKey":false,"isLabel":false,"isParent":false,"quickSearch":{"value":null,"fields":null,"configuration":null},"searchable":{"value":"","fields":[],"configuration":[]},"editable":{"value":"","fields":[],"configuration":null},"showInResults":{"value":"","fields":[],"configuration":[]},"showInUpdate":{"value":"","fields":[],"configuration":[]},"showInDetails":{"value":null,"fields":null,"configuration":null},"multiplicity":"ONE","categories":[],"apiName":null,"fieldType":{"search":"PLAIN","results":"PLAIN","details":"PLAIN","update":"COMBOBOX","configuration":[]},"defaults":null,"searchConf":{"policy":"EXACT_MATCH","multiplicity":"ONE","fields":[]},"unique":false,"security":{"permissions":null,"roles":null},"validation":{"required":true,"minLength":null,"maxLength":null,"validators":null},"triggers":[],"priority":{"results":1000,"search":1000,"update":1000,"details":1000},"fieldSet":null,"actions":[],"overrideDefaults":[],"owner":"application","sortable":true},{"name":"metadata","label":"field.application.metadata","shortLabel":null,"type":{"type":"STRING","complexType":null,"filter":null,"query":null,"list":null,"from":null},"access":"PUBLIC","isId":false,"isKey":false,"isLabel":false,"isParent":false,"quickSearch":{"value":null,"fields":null,"configuration":null},"searchable":{"value":null,"fields":null,"configuration":null},"editable":{"value":"","fields":[],"configuration":null},"showInResults":{"value":null,"fields":null,"configuration":null},"showInUpdate":{"value":"","fields":[],"configuration":[]},"showInDetails":{"value":null,"fields":null,"configuration":null},"multiplicity":"ONE","categories":[],"apiName":null,"fieldType":{"search":"PLAIN","results":"PLAIN","details":"PLAIN","update":"PLAIN","configuration":null},"defaults":null,"searchConf":{"policy":"EXACT_MATCH","multiplicity":"ONE","fields":[]},"unique":false,"security":{"permissions":null,"roles":null},"validation":{"required":true,"minLength":null,"maxLength":10000000,"validators":null},"triggers":[],"priority":{"results":1000,"search":1000,"update":1000,"details":1000},"fieldSet":null,"actions":[],"overrideDefaults":[],"owner":"application","sortable":true}],"fieldSets":[],"actions":[],"overrideDefaults":[],"configuration":[{"key":"UPDATE_CUSTOM_VIEW","value":"APPLICATION_UPDATE_FORM"}],"favoriteable":false,"resultClick":[]}],"configuration":[]}
</pre>

This metadata contains definitions of three entities: `Partner`, `Developer` and `Application`. Partners hire Developers to create Apps. It's the very same metadata used for our {@link http://ltp.konga.io/ Live-testing Platform}.

Place this copied text (or your custom metadata object) in a `metadata.json` object, in your `/app/resources/` (or equivalent) folder.

## Configuring your app

There's little configuration needed for injecting Konga into your app. Yet there's some. There are three things you need to do:

<label>Require `konga` in your app' module declaration.</label>
<pre>
angular.module('kongaQuickStart', [..., 'konga', ...]);
</pre>
<label>Inject metadata and initial config on startup:</label>
<pre>
angular.module('kongaQuickStart')
  .run(['$rootScope', 'common', 'util', '$http', function($rootScope, common, util, $http) {
    $http.get('/resources/metadata.json').then(
      function(response) {
        var metadata = response.data;

        // Store metadata in common storage
        common.store('metadata', metadata);

        // Setup the $rootScope
        $rootScope.metadata = metadata;

        // And init the tools
        util.init(metadata);
      }
    )

  }]);
</pre>
<label>Engage `KongaController` into your app's dom:</label>
<pre>
<html ng-app="kongaQuickStart" ng-controller="KongaController">
  <head> ... </head>
  <body>
    <div ng-view></div>
  </body>
</html>
</pre>
<span class="text-muted">
You can inject konga into your dom anywhere you want. Konga will work with the dom's structure beneath the element you placed the main controller.
</span>

Now you can see how search forms, result tables, and creation/updation forms are automatically built. Just create a button anywhere:
<pre>
<!-- Entity search -->
<button class="btn btn-success" ng-click="operations.openEntitySearch('partner')">

<!-- Entity update -->
<button class="btn btn-success" ng-click="operations.openEntityUpdate('developer')">

<!-- Entity create -->
<button class="btn btn-success" ng-click="operations.openEntityCreate('application')">
</pre>

And forms will be rendered. If you launch your application with your favorite dev server, you'll see how forms are rendered as you select the operation to launch.

<strong>That's it for the Quick Start.</strong> I hope here you have at least an abstract understanding of what Konga does. There are more readings which will give you more concrete information about every piece of Konga, and will help you leverage all of Konga features to save your efforts developing apps.

<div class="row">
	<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 text-center">
		<a class="btn btn-danger" href="#/quick-start/tutorial">
			<i class="fa fa-book"></i>
			API Reference
		</a>
	</div>
	<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 text-center">
		<a class="btn btn-success" href="#/quick-start/tutorial">
			<i class="fa fa-magic"></i>
			Take the tutorial
		</a>
	</div>
</div>


</span>
 */