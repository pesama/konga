/**
 * @ngdoc object
 * @name Standards.Metadata
 * @description
 *
 * To create the application context Konga uses a metadata object. 
 * Such metadata define all entities within your app, and all their fields, configuration, and actions.
 * Metadata is given to Konga at startup.
 *
 * TODO Image 
 *
 * # Generating metadata
 *
 * Metadata generation process consist on transforming the definition of the entities and fields needed for your application into a konga-readable json object. You can generate the metadata in several ways:
 *
 * TODO More
 *
 * ## Yeoman generator
 *
 * Konga's Yeoman generator (i.e. `generator-konga`) includes built-in operations to create metadata information about your app. This metadata is stored in separate json objects to ease you reading them, and they are autommatically merged once you build or run your app.
 *
 * To use this tool you need to `[sudo] npm install -g` `yo generator-konga`.
 * 
 * Then you can use these commands to create new metadata:
 * 
 * * `yo konga:metadata`: Create new metadata object (i.e. App definition).
 * * `yo konga:entity`: Create a new entity for your app.
 * * `yo konga:update-entity`: 'Update an existing entity'.
 * * `yo konga:delete-entity`: 'Delete an existing entity'.
 * * `yo konga:config`: Add a new configuration parameter.
 * * `yo konga:action`: Create an action *(code creation involved)*.
 *
 * TODO More
 * 
 * ## `konga-metadata` for Java
 *
 * If you are a Java lover and you plan to build your backend as a webapp, you can use {@link https://github.com/pritok/konga-metadata `konga-metadata`}, a Java library with the annotations needed to define your model, along with the generator to get the JSON from it.
 * 
 * You can download, fork or clone `konga-metadata` project via {@link https://github.com/pritok/konga-metadata GitHub}, or include it with your favorite dependency management:
 *
 * Maven:
 * <pre>
<dependency>
  <groupId>io.konga</groupId>
  <artifactId>konga-metadata</groupId>
  <version>1.0</version>
</dependency>
 * </pre>
 *
 * Gradle:
 * <pre>
compile "io.konga:konga-metadata:1.0"
 * </pre>
 */