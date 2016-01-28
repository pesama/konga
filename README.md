# Konga UI `konga-project`

## Overview

`konga-ui` is the User Interface generator for `konga`. See more about Konga at the official website: http://konga.io/.

## Installation

### Tools

You will need to set some things up to get Konga up and running in a project:

* *NPM:* Get Node + NPM at https://nodejs.org/en/download/
* *Bower:* http://bower.io/
* *Grunt:* http://gruntjs.com/
* *Yeoman:* http://yeoman.io/

### Procedure

* Go to your Angular project's root and install Konga by typing:

```
bower install --save ui.konga
```

(Optionally you can start a new project from scratch using Yeoman and `generator-angular`: `yo angular my-app`)

* On your Angular's dependency declaration, add Konga's:

```
angular.module('myApp', [
	...
	'ui.konga',
	...
]);

```

* Create an `actions` directory under `/app/scripts/`. There will lay your custom actions.
* Create a `metadata.json` file under `/app` and paste these contents:

```
{"id":null,"name":"TODO List","appKey":null,"entities":[{"classFor":"demo.Task","name":"todo-task","superClass":null,"label":"TODO Task","shortLabel":null,"access":"PUBLIC","stereotypes":[],"searchable":"","createable":"","editable":"","deleteable":"","searchType":"CASCADE","searchStyle":null,"resultsType":"CASCADE","resultsStyle":null,"detailsType":"CASCADE","detailsStyle":null,"updateType":"CASCADE","updateStyle":null,"template":null,"apiName":null,"apiPath":"todo-tasks","categories":[],"security":{"permissions":null,"roles":null},"fields":[{"name":"id","label":null,"shortLabel":null,"hint":null,"type":{"type":null,"complexType":null,"filter":null,"query":null,"list":null,"from":null},"access":"PUBLIC","isId":true,"isKey":false,"isLabel":false,"linked":null,"isParent":false,"quickSearch":{"value":null,"fields":null,"configuration":null},"searchable":{"value":null,"fields":null,"configuration":null},"editable":{"value":null,"fields":null,"configuration":null},"showInResults":{"value":null,"fields":null,"configuration":null},"showInUpdate":{"value":null,"fields":null,"configuration":null},"showInDetails":{"value":null,"fields":null,"configuration":null},"multiplicity":"ONE","categories":[],"apiName":null,"fieldType":{"search":"PLAIN","results":"PLAIN","details":"PLAIN","update":"PLAIN","configuration":null},"defaults":null,"searchConf":{"policy":"EXACT_MATCH","multiplicity":"ONE","fields":[]},"unique":false,"security":{"permissions":null,"roles":null},"validation":{"required":null,"minLength":null,"maxLength":null,"validators":null},"triggers":[],"priority":{"results":1000,"search":1000,"update":1000,"details":1000},"fieldSet":null,"actions":[],"overrideDefaults":[],"owner":"todo-task","sortable":true},{"name":"code","label":"Code","shortLabel":null,"hint":null,"type":{"type":"STRING","complexType":null,"filter":null,"query":null,"list":null,"from":null},"access":"PUBLIC","isId":false,"isKey":true,"isLabel":false,"linked":null,"isParent":false,"quickSearch":{"value":null,"fields":null,"configuration":null},"searchable":{"value":"","fields":[],"configuration":[]},"editable":{"value":"","fields":[],"configuration":null},"showInResults":{"value":"","fields":[],"configuration":[]},"showInUpdate":{"value":"","fields":[],"configuration":[]},"showInDetails":{"value":null,"fields":null,"configuration":null},"multiplicity":"ONE","categories":[],"apiName":null,"fieldType":{"search":"PLAIN","results":"PLAIN","details":"PLAIN","update":"PLAIN","configuration":null},"defaults":null,"searchConf":{"policy":"EXACT_MATCH","multiplicity":"ONE","fields":[]},"unique":true,"security":{"permissions":null,"roles":null},"validation":{"required":true,"minLength":null,"maxLength":null,"validators":null},"triggers":[],"priority":{"results":1000,"search":1000,"update":1000,"details":1000},"fieldSet":null,"actions":[],"overrideDefaults":[],"owner":"todo-task","sortable":true},{"name":"name","label":"Name","shortLabel":null,"hint":null,"type":{"type":"STRING","complexType":null,"filter":null,"query":null,"list":null,"from":null},"access":"PUBLIC","isId":false,"isKey":false,"isLabel":true,"linked":null,"isParent":false,"quickSearch":{"value":null,"fields":null,"configuration":null},"searchable":{"value":"","fields":[],"configuration":[]},"editable":{"value":"","fields":[],"configuration":null},"showInResults":{"value":"","fields":[],"configuration":[]},"showInUpdate":{"value":"","fields":[],"configuration":[]},"showInDetails":{"value":null,"fields":null,"configuration":null},"multiplicity":"ONE","categories":[],"apiName":null,"fieldType":{"search":"PLAIN","results":"PLAIN","details":"PLAIN","update":"PLAIN","configuration":null},"defaults":null,"searchConf":{"policy":"EXACT_MATCH","multiplicity":"ONE","fields":[]},"unique":true,"security":{"permissions":null,"roles":null},"validation":{"required":true,"minLength":null,"maxLength":null,"validators":null},"triggers":[],"priority":{"results":1000,"search":1000,"update":1000,"details":1000},"fieldSet":null,"actions":[],"overrideDefaults":[],"owner":"todo-task","sortable":true},{"name":"completed","label":"Completed","shortLabel":null,"hint":null,"type":{"type":"BOOLEAN","complexType":"","filter":"","query":{},"list":[],"from":null},"access":"PUBLIC","isId":false,"isKey":false,"isLabel":false,"linked":null,"isParent":false,"quickSearch":{"value":null,"fields":null,"configuration":null},"searchable":{"value":"","fields":[],"configuration":[]},"editable":{"value":null,"fields":null,"configuration":null},"showInResults":{"value":"","fields":[],"configuration":[]},"showInUpdate":{"value":"","fields":[],"configuration":[]},"showInDetails":{"value":null,"fields":null,"configuration":null},"multiplicity":"ONE","categories":[],"apiName":null,"fieldType":{"search":"SWITCH","results":"SWITCH","details":"SWITCH","update":"SWITCH","configuration":[]},"defaults":null,"searchConf":{"policy":"EXACT_MATCH","multiplicity":"ONE","fields":[]},"unique":false,"security":{"permissions":null,"roles":null},"validation":{"required":null,"minLength":null,"maxLength":null,"validators":null},"triggers":[],"priority":{"results":1000,"search":1000,"update":1000,"details":1000},"fieldSet":null,"actions":[],"overrideDefaults":[],"owner":"todo-task","sortable":true},{"name":"priority","label":"Priority","shortLabel":null,"hint":null,"type":{"type":"NUMBER","complexType":"","filter":"","query":{},"list":[],"from":null},"access":"PUBLIC","isId":false,"isKey":false,"isLabel":false,"linked":null,"isParent":false,"quickSearch":{"value":null,"fields":null,"configuration":null},"searchable":{"value":"","fields":[],"configuration":[]},"editable":{"value":null,"fields":null,"configuration":null},"showInResults":{"value":"","fields":[],"configuration":[]},"showInUpdate":{"value":"","fields":[],"configuration":[]},"showInDetails":{"value":null,"fields":null,"configuration":null},"multiplicity":"ONE","categories":[],"apiName":null,"fieldType":{"search":"NUMBER","results":"NUMBER","details":"NUMBER","update":"NUMBER","configuration":[]},"defaults":null,"searchConf":{"policy":"EXACT_MATCH","multiplicity":"ONE","fields":[]},"unique":false,"security":{"permissions":null,"roles":null},"validation":{"required":null,"minLength":null,"maxLength":null,"validators":null},"triggers":[],"priority":{"results":1000,"search":1000,"update":1000,"details":1000},"fieldSet":null,"actions":[],"overrideDefaults":[],"owner":"todo-task","sortable":true}],"fieldSets":[],"actions":[],"overrideDefaults":[],"configuration":[],"favoriteable":false,"resultClick":[]},{"classFor":"demo.List","name":"todo-list","superClass":null,"label":"TODO List","shortLabel":null,"access":"PUBLIC","stereotypes":[],"searchable":"","createable":"","editable":"","deleteable":"","searchType":"CASCADE","searchStyle":null,"resultsType":"CASCADE","resultsStyle":null,"detailsType":"CASCADE","detailsStyle":null,"updateType":"CASCADE","updateStyle":null,"template":null,"apiName":null,"apiPath":"todo-lists","categories":[],"security":{"permissions":null,"roles":null},"fields":[{"name":"id","label":null,"shortLabel":null,"hint":null,"type":{"type":null,"complexType":null,"filter":null,"query":null,"list":null,"from":null},"access":"PUBLIC","isId":true,"isKey":false,"isLabel":false,"linked":null,"isParent":false,"quickSearch":{"value":null,"fields":null,"configuration":null},"searchable":{"value":null,"fields":null,"configuration":null},"editable":{"value":null,"fields":null,"configuration":null},"showInResults":{"value":null,"fields":null,"configuration":null},"showInUpdate":{"value":null,"fields":null,"configuration":null},"showInDetails":{"value":null,"fields":null,"configuration":null},"multiplicity":"ONE","categories":[],"apiName":null,"fieldType":{"search":"PLAIN","results":"PLAIN","details":"PLAIN","update":"PLAIN","configuration":null},"defaults":null,"searchConf":{"policy":"EXACT_MATCH","multiplicity":"ONE","fields":[]},"unique":false,"security":{"permissions":null,"roles":null},"validation":{"required":null,"minLength":null,"maxLength":null,"validators":null},"triggers":[],"priority":{"results":1000,"search":1000,"update":1000,"details":1000},"fieldSet":null,"actions":[],"overrideDefaults":[],"owner":"todo-list","sortable":true},{"name":"code","label":"Code","shortLabel":null,"hint":null,"type":{"type":"STRING","complexType":null,"filter":null,"query":null,"list":null,"from":null},"access":"PUBLIC","isId":false,"isKey":true,"isLabel":false,"linked":null,"isParent":false,"quickSearch":{"value":null,"fields":null,"configuration":null},"searchable":{"value":"","fields":[],"configuration":[]},"editable":{"value":"","fields":[],"configuration":null},"showInResults":{"value":"","fields":[],"configuration":[]},"showInUpdate":{"value":"","fields":[],"configuration":[]},"showInDetails":{"value":null,"fields":null,"configuration":null},"multiplicity":"ONE","categories":[],"apiName":null,"fieldType":{"search":"PLAIN","results":"PLAIN","details":"PLAIN","update":"PLAIN","configuration":null},"defaults":null,"searchConf":{"policy":"EXACT_MATCH","multiplicity":"ONE","fields":[]},"unique":true,"security":{"permissions":null,"roles":null},"validation":{"required":true,"minLength":null,"maxLength":null,"validators":null},"triggers":[],"priority":{"results":1000,"search":1000,"update":1000,"details":1000},"fieldSet":null,"actions":[],"overrideDefaults":[],"owner":"todo-list","sortable":true},{"name":"name","label":"Name","shortLabel":null,"hint":null,"type":{"type":"STRING","complexType":null,"filter":null,"query":null,"list":null,"from":null},"access":"PUBLIC","isId":false,"isKey":false,"isLabel":true,"linked":null,"isParent":false,"quickSearch":{"value":null,"fields":null,"configuration":null},"searchable":{"value":"","fields":[],"configuration":[]},"editable":{"value":"","fields":[],"configuration":null},"showInResults":{"value":"","fields":[],"configuration":[]},"showInUpdate":{"value":"","fields":[],"configuration":[]},"showInDetails":{"value":null,"fields":null,"configuration":null},"multiplicity":"ONE","categories":[],"apiName":null,"fieldType":{"search":"PLAIN","results":"PLAIN","details":"PLAIN","update":"PLAIN","configuration":null},"defaults":null,"searchConf":{"policy":"EXACT_MATCH","multiplicity":"ONE","fields":[]},"unique":true,"security":{"permissions":null,"roles":null},"validation":{"required":true,"minLength":null,"maxLength":null,"validators":null},"triggers":[],"priority":{"results":1000,"search":1000,"update":1000,"details":1000},"fieldSet":null,"actions":[],"overrideDefaults":[],"owner":"todo-list","sortable":true}],"fieldSets":[],"actions":[],"overrideDefaults":[],"configuration":[],"favoriteable":false,"resultClick":[]}],"configuration":[]}
```

For demo purposes we are going to create a basic `TODO` list with Lists and Tasks.

![alt tag](http://konga.io/wp-content/uploads/2016/01/PriceTables-ERD-New-Page.png)

* Configure Grunt task to load metadata: On your `Gruntfile.js` file type this:

```
ngconstant: {
  // Options for all targets
  options: {
    space: '  ',
    wrap: '"use strict";\n\n {%= __ngModule %}',
    name: 'myApp-config',
    dest: '<%= yeoman.dist %>/scripts/config.js'
  },
  // Environment targets
  development: {
    constants: {
      // In case you already use grunt-ngconstant, you simply need to add this line to the 'constants' object
      metadata: grunt.file.readJSON('app/metadata.json')
    }
  }
},
```

And attach the task `ngconstant` to Grunt's `serve` task:

```
grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
  if (target === 'dist') {
    return grunt.task.run(['build', 'connect:dist:keepalive']);
  }

  grunt.task.run([
    'clean:server',
    'wiredep',
    'concurrent:server',
    'autoprefixer:server',
    'concat:actions',
    'ngconstant', // Add your task here
    'ngtemplates',
    'connect:livereload',
    'watch'
  ]);
});
```

* Include the new `configuration` dependency to your app

```
angular.module('myApp', [
  ...
  'ui.konga',
  'myApp-config',
  ...
]);
```

And reference the `config.js` file on your `index.html` file:

```
<script src="scripts/config.js"></script>
```

* Attach metadata loading and Session startup:

```
angular.module('myApp')
.run(['Session', function(Session) {
  Session.data.authToken = '';
  Session.data.roles = [];
}])
.run(['metadata', '$rootScope', 'common', function(metadata, $rootScope, common) {
  // Save in scope
  // FIXME Remove
  $rootScope.metadata = metadata;

  // Store the metadata
  common.store('metadata', metadata);

  // Init the tools
  util.init(metadata);
}]);
```

* Finally, engage Konga's `main controller` to your `index.html` file:

```
<body ng-app="myApp" ng-controller="KongaCtrl">
...
</body>
```

### Launching

In order to start Konga behaviors, you need to setup an entry point to Konga within your app. We are going to add a simple button that will launch TODO List searching when clicked.

* On the first view loaded in your app, include this:

```
<button ng-click="operations.openEntitySearch('todo-list')" class="btn btn-success">Open TODO List</button>
```

* From this point you should be able to see a view to manage lists, and beneath it some views to manage their tasks.

TODO Screenshots
