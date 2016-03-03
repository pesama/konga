/**
 * @ngdoc overview
 * @name Metadata
 * @description 

# Metadata

Metadata objects are formal representations of your data model. Konga uses this model to know which entities you need to handle, and building rich, contextual forms for you to do it. Metadata definitions include data structure and validation, data types, field linking and relationships, constraints, configuration parameters, operations allowed and automated tasks. With only a metadata object you can create a fully working app, ready to be launched and tested. {@link http://ltp.konga.io Try it}.

<a href="/static/metadata-diagram.png" target="_blank">
	<img src="/static/metadata-diagram.png" width="80%" class="center">
</a>

This is the full metadata information you can provide within your metadata definition. Let's take a look at everything it contains:

* * {@link Metadata.Application Applications}: Define the root of your project, and configure the global parameters.
* * {@link Metadata.Entity Entities}: Define each of the elements of your data model.
* * {@link Metadata.Field Fields}: Contains the information about each property of the entities.
* * {@link Metadata.Action Actions}: Define custom behaviors for your application's items.
* * {@link Metadata.Trigger Triggers}: Automated code features to be executed on field changes.
* * {@link Metadata.ShowConfigurations Show sonfigurations}: Define whether (and how) to show your different generated forms.
* * {@link Metadata.ConfigurationParam Configuration params}: Simple key, value map. This item is used in many ways.
* * {@link Metadata.FieldType Field types}: Define how the fields are rendered.
* * {@link Metadata.DataType Data types}: Configure the typology of the field.
* * {@link Metadata.FieldSet Field sets}: Group fields together.
* * {@link Metadata.SearchConf Search configurations}: Configure the filtering options for the fields.
* * {@link Metadata.Validation Validations}: Data constraints for the field.
* * {@link Metadata.Validator Validators}: Custom data integrity options.

*/