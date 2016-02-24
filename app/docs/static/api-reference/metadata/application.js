/**
@ngdoc object
@name Metadata.Application
@description

This is the root of the metadata. Every Konga app needs one Application object to define a Konga application.


*/

 /**
 * @ngdoc object
 * @propertyOf Metadata.Application
 * @name appKey
 * @description
 *
 * <span class="label label-danger">String</span>
 * <span class="label label-primary">Cloud</span>
 *
 * App ID for your Konga Application within the cloud. This value identifies uniquely your app within Konga Cloud, and defines your access point to the app. If you plan to publish your app on Konga cloud, you'll need to get an app key on the {@link https://konga.cloud/services/app-key-generator appKey generator}.
 */

 /**
 * @ngdoc object
 * @propertyOf Metadata.Application
 * @name name
 * @description
 *
 * <span class="label label-danger">String</span>
 *
 * Name of your app. 
 */

 /**
 * @ngdoc object
 * @propertyOf Metadata.Application
 * @name entities
 * @description
 *
 * <span class="label label-warning">Array</span>
 *
 * Unique ID for the application. This property is only used in Konga Cloud, where Applications lay together in a database and retrieved at startup. You don't need it for defining your app.
 */