/**
@ngdoc object
@name Metadata.TriggerMoments
@description

Describe when the triggers must be evaluated, and the functionality associated executed. 

# TODO Usages and examples

*/


/**
 * @ngdoc object
 * @propertyOf Metadata.TriggerMoments
 * @name IMMEDIATE
 * @description

Evaluates the trigger matching every time the field changes.
 */

/**
 * @ngdoc object
 * @propertyOf Metadata.TriggerMoments
 * @name COMMIT
 * @description

Evaluates the trigger matching once the user commits the form changes performed. This is useful for batch matching, but you need to have in mind that upon commits several fields have changed, and thus several triggers would be executed. Don't launch overwhelming alerts or confirmations on this `moment` type.
 */