/**
@ngdoc object
@name Metadata.Multiplicities
@description

Multiplicities define how many elements could be inside a field. Of course your API will know how many elements each field can have, and will act accordingly... But Konga doesn't. By defining the multiplicity to a field Konga will be able to act differently depending on it, on some of the services and tools it provides you for handling data:

* * **{@link konga.scaffold `Scaffolding`}:** Scaffolding reads multiplicities to know whether to create a plain field or an Array instead.
* * **{@link konga.fieldMapper `Field mapping`}:** Field mappers act depending on the multiplicity, to decide how to map input's value into fields'.

*/

/**
 * @ngdoc object
 * @propertyOf Metadata.Multiplicities
 * @name ONE
 * @description

 0..1 elements per field. 
 */

/**
 * @ngdoc object
 * @propertyOf Metadata.Multiplicities
 * @name MANY
 * @description

 0..* elements within your field. 
 */