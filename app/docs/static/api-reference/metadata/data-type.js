/**
@ngdoc object
@name Metadata.DataType
@description

Defines the typology of the fields. By giving this information to Konga, it will be able to render your fields properly, and engage all available operations any field of each type must have.

# TODO Usages and demos

@param {String} type
<span class="label type-hint type-hint-object">{@link Metadata.DataTypes DataTypes}</span>
This is the real type of the field. You can put here a 'plain-type' value (e.g. `STRING`, `NUMBER`, ...) or declare a field as a reference to another (a relationship) by setting this value to `COMPLEX`.

@param {String} complexType
If your field is declared as `COMPLEX` you must declare the name of the entity it references to. Just put the name of the entity here.

@param {String} filter
Some times you are retrieving a field's value, but you want to render it in a different way (apply some mask to a String, filter an array...). This property lets you define the name of an Angular filter, that will be applied to your field to render its value. 

@param {Array} query
<span class="label type-hint type-hint-object">{@link Metadata.ConfigurationParam ConfigurationParam}</span>
If your field is `COMPLEX`, sometimes you don't want users to be able to select any entity, but to apply a query to the element search instead. Using this property you can append as many parameters as you want to your query, via {@link Metadata.ConfigurationParam configuration parameters}. Values appended to this can be plain values (e.g. you want to show all the `Vehicles` whose type is `Car`), or apply an expression referencing any other field in your entity or its relationships (e.g. you allow selecting all `Vehicles` with a partial `{plate}`). These values are automatically parsed once launched the queries, using the parameters set in that moment to the entity and its fields. It uses a tool called {@link konga.queryParser query-parser}. In the docs you will find all the details about it.

@param {Array} list
<span class="label type-hint type-hint-object">{@link Metadata.ConfigurationParam ConfigurationParam}</span>
Even if your field has a `plain` type, you might want to restrict the authorized values it can allocate. This is achieved using this property, who defines a set of `key`/`value` possibilities for your fields. This is useful for `combo boxes` or other constriained-input {@link Metadata.FieldTypes field types}.

@param {String} from
If your field is `COMPLEX` this field allows you to override the `query` function to retrieve the possible elements to assign. Just put here an {@link Metadata.Action action} name, and once user tries to select an item for the field the action will be dispatched instead of the API queried.


*/