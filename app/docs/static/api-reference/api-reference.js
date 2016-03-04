/**
 * @ngdoc overview
 * @name index
 * @description
 *
 * <img src="/images/konga-logo.png" width="50%">
 *
 * # Konga's API Reference
 *
 * Welcome to Konga's API Reference. Here you got all the documentation, about everything Konga does and gives you. Here you can see a brief introduction about what you can find in each section.
 *
 * ## Metadata
 *
 * This section defines everything `konga-metadata` contains, and what each property and parameter means, and does:
 *
 * * **<i class="fa fa-wrench"></i> Definitions:** Definitions contain individual or grouped properties to configure your metadata. Some of these properties are interpreted by the `ui` giving a more meaningful context to the forms and the interactions engaged with them. Here you got a set of all `konga-metadata` definitions:
 *
 * 	* {@link Metadata.Application `Application`}: Defines your app globally, and the `root` level configuration.
 * 	* {@link Metadata.Entity `Entity`}: Contains the metadata for each entity your app needs to manage.
 * 	* {@link Metadata.Field `Field`}: Includes the definition of each field, with all the required parameters.
 * 	* {@link Metadata.Action `Action`}: Defines each customisation _entry-point_ within your metadata.
 * 	* {@link Metadata.Trigger `Trigger`}: Configure automated actions to be executed every time a field changes.
 * 	* {@link Metadata.ConfigurationParam `ConfigurationParam`}: Define the configuration parameters for your metadata items.
 * 	* {@link Metadata.ShowConfiguration `ShowConfiguration`}: Configure the rendering configuration for a field within a {@link Metadata.FormScopes `form scope`}.
 * 	* {@link Metadata.FieldType `FieldType`}: Define the rendering appeareance for a field within a {@link Metadata.FormScopes `form scope`}.
 * 	* {@link Metadata.DataType `DataType`}: Configure the typology of a field - i.e. data type, allowed values, filtering, querying...
 * 	* {@link Metadata.FieldSet `FieldSet`}: Setup groups among your fields within entities, mostly for category/group-based {@link Metadata.FormTypes `form types`}.
 * 	* {@link Metadata.Validation `Validation`}: Define the required validation options for your fields.
 * 	* {@link Metadata.Validator `Validator`}: Define custom validators to be appended to your {@link Metadata.Validation validation} configuration.
 *
 *
 *
 *
 * * **<i class="fa fa-tag"></i> Enumerations:** Enumerations contain the set of allowed parameters for the properties bound to them. Here you have all existing enumerations.
 *
 * 
 *
 *
 *
 * * **{@link Metadata.Generators <i class="fa fa-terminal"></i> Generators }:** Documents the available methods for generating your metadata.
 * * **{@link Metadata.Permissions <i class="fa fa-key"></i> Permissions }:** Learn here how to engage your Konga app with a rich permission system to restrict access at both entity and field levels.
 *
 * ## Standards
 *
 * Documentation on standard features. {@link Standards Standard features} are enough for building a full-working app, connected to an API. These are the main standard features:
 *
 * * **<i class="fa fa-paint-brush"></i> Modeling:** Define how your metadata is interpreted to build your {@link Standards.Apps `Apps`} and {@link Standards.Forms `Forms`}. It includes examples on every available {@link Metadata.FormScopes `form scope`}, and links to related inner elements.
 * * **<i class="fa fa-user"></i> Users:** Define how your user management integrates into Konga, and the features you can leverage using this system. 
 * * **<i class="fa fa-gamepad"></i> Tools:** Documents the set of tools Konga uses to manage your metadata, and the macros you can use to save time while developing.
 * * **<i class="fa fa-wrench"></i> Operations:** 
 */