/**
@ngdoc function
@name Metadata.ShowConfiguration
@description

Defines visual properties for an element. Every {@link Metadata.Field field} is configured with several show configurations, for each {@link Metadata.FormScopes form scope} and operations.

# Permissions

One thing a Show Configuration sets up is the permissions for accessing the featured being configured. A permission is a unique String, and for using that particular behavior, you will need to have that String within your {@link konga.userData `userData`}.roles array. 

If the property is set to null, no one will be able to access the feature. If set to an empty chain (i.e. ""), the feature will be public.

To get full understanding about how permissions work with Konga, take a look at the {Metadata.Permissions permissions} documentation.

# Inner fields

If you are working with a `COMPLEX` fieldType, you might want to access not only to the root field, but to its inner fields instead. If that's your case, just fill up the `fields` variable with all the field names to render.


@param {String} value 
Permission for accesing the field. More on {@link Metadata.Permissions permissions}.

@param {Array} fields
Inner field names to render instead of the root entity itself.

@param {Array} configuration
<span class="label type-hint type-hint-object">{@link Metadata.ConfigurationParam ConfigurationParam}</span>
Aditional configuration parameters

*/