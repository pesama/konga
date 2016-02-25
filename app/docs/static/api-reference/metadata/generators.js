/**
 * @ngdoc object
 * @name Metadata.Generators
 * @description 

Metadata objects are cool, and easily to understand if you read them properly formatted. However, writing yourself all the metadata required to successfully - and contextually completely - define an application would be a really tedious job. To simplify your life, Konga has a few generators available. 

# What are generators

Generators allow you to define metadata in an easier way than the plain JSON. Current generators support from `@Annotation`-based metadata modeling, to graphical tools to generate them via forms. The outcome is always the same: a `json` object. You can build your custom generator if none existing fits your needs. But please, if you do so, share it with all here! (just fork, edit, and pull-request).

# Konga Java annotations

<button class="btn btn-success">
	<i class="fa fa-github"></i>Fork on GitHub
	<br />
	<span class="muted">v1.0.0 Stable</span>
</button>

<br />

The very first generator (and the most thoroughly tested) is the {@link https://github.com/pritok/konga-metadata `konga-java-annotations`} library. It comes with built-in annotations to define the app, the entities and the fields, directly into your Java POJOs data model. It's real graphical for JavaEE backends, as it allows both data definitions and metadata definitions within the same files. It also frees you from annotating all, as its generator comes with a tough `convention-over-configuration` system, and it also reads reflexive information of the entities and fields themselves in order to determine the better metadata outcome - though if you haven't explicitely declared the parameters. 

## Installation

If you're planning to use `konga-metadata` within your Java-based backend, the easiest way to get it up and running is to use a dependency management system (e.g. {@link https://maven.apache.org/ `Maven`} or {@link http://gradle.org/ `Gradle`}):

<strong>Installing with maven:</strong>
<pre>
# pom.xml
<dependencies>
  <dependency>
    <groupId>io.konga</groupId>
    <artifactId>konga-metadata</artifactId>
    <version>1.0.0</version>
  </dependency>
</dependencies>
</pre>

<strong>Installing with Gradle:</strong>
<pre>
; build.gradle
dependencies(
  compile "io.konga:konga-metadata:1.0.0"
)
</pre>

Then you can directly start annotating your classes and their fields. Here you got an example:

TODO Example

## Generation

Within `konga-metadata` you will find a generator class (called `KongaGenerator`). You can therefore launch a metadata generation using it:

<pre>
KongaDefinition definition = new KongaDefinition( "Your App's name", "com.your.model.package" );
KongaMetadata metadata = KongaGenerator.readPackage( definition );
String metadataJson = metadata.toJson( );
</pre>

These lines will take all your annotated elements from the source package `com.your.model.package`, and parse all annotations, extracting a final `json` object, who you are eventually converting to a `json` String, either to store it or to transfer it anywhere. 

## Usage

The metadata this generator gives you is a valid metadata object to be directly injected into Konga. The way you perform such injection is of your choice. Learn more about {@link Standards.metadataInjection metadata injection}.

# Konga Cloud

Konga cloud is an enterprise project to generate metadata quickly via a graphical metadata-generation form. The secret is that we have annotated `konga-metadata` model itself, and generated the metadata, injecting it into Konga cloud's generation system. 

This project is currently ongoing and we sadly can't yet offer you access to it. We hope you can test it out soon!

 */