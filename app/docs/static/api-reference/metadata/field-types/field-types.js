/**
@ngdoc object
@name Metadata.FieldTypes
@description

Field types configure the appeareance of the input on the forms.

# Data types vs. Field types

{@link Metadata.DataTypes Data types} define structure, while field types define rendering. Depending on the {@link Metadata.DataTypes Data type} of the field there would be different eligible field types to choose.

Based on the {@link Metadata.DataTypes Data types} there is also a `default` field type to choose, though you can choose any other to adapt it to your favorite appeareance.

# TODO Usages and examples

*/

/**
 * @ngdoc object
 * @propertyOf Metadata.FieldTypes
 * @name QUANTITY
 * @description

It's basically a numerical input, but for referencing quantities. It has several {@link Metadata.ConfigurationPara configuration options} to setup the unit, the decimal amounts, etcetera:

* * **{@link Metadata.ConfigurationParam#properties_QUANTITY_UNIT `QUANTITY_UNIT`}:** Unit.
* * **{@link Metadata.ConfigurationParam#properties_QUANTITY_UNIT_SOURCE `QUANTITY_UNIT_SOURCE`}:** Where to get the unit from.
* * **{@link Metadata.ConfigurationParam#properties_QUANTITY_DECIMAL `QUANTITY_DECIMAL`}:** Decimal no.
* * **{@link Metadata.ConfigurationParam#properties_QUANTITY_DECIMAL_SOURCE `QUANTITY_DECIMAL_SOURCE`}:** Where to get the decimal no. configuration from.

 */

/**
 * @ngdoc object
 * @propertyOf Metadata.FieldTypes
 * @name PRICE
 * @description

Numerical input, for price representation. It's basically a {@link Metadata.FieldTypes#properties_NUMBER `NUMBER`} input, but with `currency` rendering. It relies on a {@link Metadata.ConfigurationParam#properties_CURRENCY `CURRENCY`} configuration param to setup the currency, and a {@link Metadata.ConfigurationParam#properties_CURRENCY_SOURCE `CURRENCY_SOURCE`} to define where this currency comes from (useful for varying currencies depending on the entity).
 */

/**
 * @ngdoc object
 * @propertyOf Metadata.FieldTypes
 * @name SELECT
 * @description

Used for {@link Metadata.DataTypes#properties_COMPLEX `COMPLEX`} data-typed fields. Text input with a button for quick targeting eligible elements. This field type uses all `complex`-intended parameters defined on the {@link Metadata.DataType data-type}. Supports both {@link Metdata.Multiplicities multiplicities}.
 */

/**
 * @ngdoc object
 * @propertyOf Metadata.FieldTypes
 * @name TABLE
 * @description

Renders a table to show data. These tables are intended to render numerical data, range-based, depending on several {@link Metadata.ConfigurationParam configuration parameters} given to the field's type:

* * **{@link Metadata.ConfigurationParam#properties_TABLE_CELL_FILTER `TABLE_CELL_FILTER`}:** Defines the filter to apply for each cell's value.
* * **{@link Metadata.ConfigurationParam#properties_TABLE_CONF_X_AXIS_MIN `TABLE_CONF_X_AXIS_MIN`}:** Defines the minimum `x-axis` value.
* * **{@link Metadata.ConfigurationParam#properties_TABLE_CONF_X_AXIS_MAX `TABLE_CONF_X_AXIS_MAX`}:** Defines the maximum `x-axis` value.
* * **{@link Metadata.ConfigurationParam#properties_TABLE_CONF_X_AXIS_PROPERTY `TABLE_CONF_X_AXIS_PROPERTY`}:** Defines the property (whitin the inner's table entity) to render onto the `x-axis`.
* * **{@link Metadata.ConfigurationParam#properties_TABLE_CONF_X_AXIS_STEP `TABLE_CONF_X_AXIS_STEP`}:** Defines the numerical step between one column and the next.

* * **{@link Metadata.ConfigurationParam#properties_TABLE_CONF_Y_AXIS_MIN `TABLE_CONF_Y_AXIS_MIN`}:** Defines the minimum `x-axis` value.
* * **{@link Metadata.ConfigurationParam#properties_TABLE_CONF_Y_AXIS_MAX `TABLE_CONF_Y_AXIS_MAX`}:** Defines the maximum `x-axis` value.
* * **{@link Metadata.ConfigurationParam#properties_TABLE_CONF_Y_AXIS_PROPERTY `TABLE_CONF_Y_AXIS_PROPERTY`}:** Defines the property (whitin the inner's table entity) to render onto the `x-axis`.
* * **{@link Metadata.ConfigurationParam#properties_TABLE_CONF_Y_AXIS_STEP `TABLE_CONF_Y_AXIS_STEP`}:** Defines the numerical step between one row and the next.

 */

/**
 * @ngdoc object
 * @propertyOf Metadata.FieldTypes
 * @name PICK_LIST
 * @description

Renders a list, for {@link Metadata.Multiplicities#properties_MANY `MANY`} multiplitity fields. 
 */

/**
 * @ngdoc object
 * @propertyOf Metadata.FieldTypes
 * @name SWITCH
 * @description

A switch is a physical toggle-button for selecting boolean values. 
 */

/**
 * @ngdoc object
 * @propertyOf Metadata.FieldTypes
 * @name OPTION
 * @description

An option is a boolean field rendered as a toggle-able checkbox.
 */

/**
 * @ngdoc object
 * @propertyOf Metadata.FieldTypes
 * @name COMPLEX
 * @description

Complex fields renders configured inner fields instead of the field itself (e.g. if you want to render `Vehicle` properties (such as `brand` and `wheel number`) instead of the `vehicle` itself). You need to declare into the {@link Metadata.Field field}'s `showInUpdate`->`fields` attribute the fields to render. 
 */

/**
 * @ngdoc object
 * @propertyOf Metadata.FieldTypes
 * @name PASSWORD
 * @description

HTML5's `password` input
 */

/**
 * @ngdoc object
 * @propertyOf Metadata.FieldTypes
 * @name CSS
 * @description

Renders a container with a `css` class assigned with the value of the field. Useful for inserting colored bullets, icons to categorise...
 */

/**
 * @ngdoc object
 * @propertyOf Metadata.FieldTypes
 * @name FILE 
 * @description

File input. 
 */

/**
 * @ngdoc object
 * @propertyOf Metadata.FieldTypes
 * @name IMAGE
 * @description

Image input. It renders an `<img ng-src="...">` with the `source` being the field's value.
 */

/**
 * @ngdoc object
 * @propertyOf Metadata.FieldTypes
 * @name CUSTOM
 * @description

Custom input. If none of the existing field types suit your needs, you can tag the field as `CUSTOM` and provide a valid {@link konga#viewMapper mapped} value to a view with your custom view. it's done via {@link Metadata.ConfigurationParam#properties_CUSTOM_FIELD_TYPE `CUSTOM_FIELD_TYPE`} property. 
 */

/**
 * @ngdoc object
 * @propertyOf Metadata.FieldTypes
 * @name LINK
 * @description

Renders a link to access the value. Field's value must be a valid URL.
 */
