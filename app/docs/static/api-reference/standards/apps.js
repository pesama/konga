/**
 * @ngdoc object
 * @name Standards.Apps
 * @description 

Konga apps are essentially Angular applications who include `konga` module:

<pre>
angular.module('myAwesomeApp', [ ..., 'konga', ... ]);
</pre>

This will provide you with a full set of features. Yet, you have to attach the controller. 

<pre>
<html ng-app="myAwesomeApp" ng-controller="KongaController">
  ...
</html>
</pre>
<div class="text-muted">You can engage `KongaController` at any level in your app's `dom`, and Konga will work from there. But as is non intrusive and you can call it when you need it, it's recommended to be placed at the root of the structure (or in the `<body>` tag) </div>

Then you will have all the operations engaged and your app ready to run with Konga. You need to define and inject though some metadata.

<pre>
angular.module('myAwesomeApp')
  .run(['common', 'util', '$rootScope', 'metadata', function(common, util, $rootScope, metadata) {
    common.store('metadata', metadata);
    util.init(metadata); 
    $rootScope.metadata = metadata;
  }]);
</pre>

* * **{@link konga.common `common.store('metadata', metadata)`}:** Store the metadata in the {@link konga.commom common storage}.
* * **{@link Standards.Tools `util.init(metadata)`}:** Initialize the tools.
* * **`$rootScope.metadata = metadata`:** Save metadata on the `$rootScope`.

<div class="well text-warning">
	When released v1.3.0, these initialisation requirements will disappear, and the `metadata` will be load using a constant with that name. 
</div>


# Application configuration

## Built-in routes <span class="label label-primary">Routing</span>

Konga comes with two built-in `$routes` to handle standard operations:

* * <strong>`/entity/:entityName/search`</strong>: Used for search entities of `:entityName`'s type.
* * <strong>`/entity/:entityName/:entityId`</strong>: Used for updating `:entityName`'s entity identified with `:entityId`. If the `:entityId` attribute is set to the String `new`, then the updation will be a creation, and the system will act accordingly.


You can configure several things in your konga application using {@link konga.kongaConfig `kongaConfig` value}:

## API connection <span class="label label-danger">APIs</span>
<br />
Konga's built-in {@link konga.standardApi `standardApi`} needs a valid `endpoint` to connect to. This endpoint must connect to a RESTful API. If you plan to use the {@link konga.standardApi `standardApi`}, provide this value to {@link konga.kongaConfig `kongaConfig`} on startup:
<pre>
angular.module('myAwesomeApp')
  .run(['kongaConfig', function(kongaConfig) {
    kongaConfig.apiEndpoint = 'http://api.konga.cloud/';
  }]);
</pre>

And the standard api will be ready to work with your API.

### Using `access_tokens` to query APIs

Konga does not cover natively this feature. But once you've got covered the authentication phase, you can inject the `token` via a request interceptor. This is a handy Angular capability, and it's documented {@link https://docs.angularjs.org/api/ng/service/$http here}.

## View stack <span class="label label-success">UI</span>

Konga views are opened and kept in memory until you close them. It has also features for coming back to your view, restoring the full context and data of your previous form. This allows you to have several things opened at once.

## Application layout <span class="label label-success">UI</span>

Konga places - by default - the forms into your `<div ng-view></div>` tag when you request it via {@link Standards.Operations operations}. Furthermore, it has a layout in case you want your application to be a full Konga-powered app. If you want to use this feature, include the `main.html` view into your app's `index.html`.
<pre>
<body>
  <div ng-include="'/konga/views/main.html'"></div>
</body>
</pre>

This will provide you with common features such as a `toastrs`, loaders, and let you configure further your application:

### Look and feel

You can configure the application's {@link Metadata.ConfigurationParam#properties_LOOK_AND_FEEL `look&field`} via {@link Metadata.Application metadata}. There are two modes you can set your application to:

***Tabbed**

This mode displays a tabbed `navbar` on top of the `<div ng-view></div>` tag, that stores - and accesses - each of the views opened. 

***Plain**

Plain rendering of the view. Here the tabs are not rendered, though still present. You can access via `$rootScope.tabs`. You can leverage the tab {@link Standards.Operations operations} for managing them in plain mode.



 */