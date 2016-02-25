/**
@ngdoc object
@name Metadata.DataTypes
@description

Data types define the typology of the field and its value. Depending on the data type chosen for a field, there would be different operations applied, {@link Metadata.Validation validation} rules, {@link konga.scaffold scaffolding} and {@link konga.fieldMapper field mapping} processes, etcetera.

# TODO Usages and examples

*/

/**
 * @ngdoc object
 * @propertyOf Metadata.DataTypes
 * @name STRING
 * @description

Defines a plain String input. Using this data type along with some {@link Metadata.Validation validation rules}, and using {@link Metadata.ValidatorType#properties_REGEXP `REGEXP`} {@link Metadata.Validator validators},  you can easily configure the String field as a valid `email` address - or any other formal-syntax String.
 */

/**
 * @ngdoc object
 * @propertyOf Metadata.DataTypes
 * @name NUMBER
 * @description

Defines a numeric field. Numbers allow Integers, Doubles, Longs... Any numeric input. If you use this data type along with {@link Metadata.FieldTypes#properties_NUMBER `NUMBER`} field type, it will easily allow you to manage numbers, and their integrity, configure {@link Metadata.ValidatorTypes#properties_RANGE `range`} {@link Metadata.SearchConf search configuration}, etcetera.
 */


/**
 * @ngdoc object
 * @propertyOf Metadata.DataTypes
 * @name BOOLEAN
 * @description

Defines a boolean (yes|no) field. There are a couple of {@link Metadata.FieldTypes field types} related to this data type. With {@link Metadata.FieldTypes#properties_BOOLEAN `BOOLEAN`} field type you will have a `checkbox` rendered input on search forms, that will allow you to search (true|false|both) values. There's also a cool {@link Metadata.FieldTypes#properties_SWITCH `switch`} input to simulate an on/off button instead of boring `radio buttons`.
 */

/**
 * @ngdoc object
 * @propertyOf Metadata.DataTypes
 * @name DATE
 * @description

Date types. This field allows values from `timestamps` to formal-date-strings (i.e. 'yyyy-mm-dd'). This data type could be rendered as a {@link Metadata.FieldTypes#properties_DATE `date`} or a {@link Metadata.FieldTypes#properties_DATETIME `date&time`} field, depending on whether you need time accuracy or just day-based dates.
 */

/**
 * @ngdoc object
 * @propertyOf Metadata.DataTypes
 * @name COMPLEX
 * @description

Complex data types reference an inner entity. This is useful to render and interact with relationships, as Konga will have full comprehension of the values for the field. For using this data type you will need to define also the `complexType` this element refers to. And you have also handy tools for filtering, querying, selecting data sources... See the {@link Metadata.DataType data type} documentation for all the possible features.
 */
}

/**
 * @ngdoc object
 * @propertyOf Metadata.DataTypes
 * @name FILE
 * @description

This data type represents a physical file that travels through Konga forms. Fields annotated with this type are usually Strings that links to the file location, although you can use `base64`-encoded files, or any other flavor you'd like. 
 */