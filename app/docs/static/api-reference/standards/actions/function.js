/**
 * @ngdoc function
 * @methodOf Standards.Actions
 * @name Function
 * @description
 * 
 * Function actions describe a piece of code wrapped into a `function`, that gets executed when the action is dispatched.
 *
 * This actions do not involve any graphical intervention on the screen - as {@link Standards.Actions#methods_Tab `tab`} and {@link Standards.Actions#methods_Modal `modal`} do, so this action type is ideal for internal processes. As you can leverage the `dependencyInjector` trough action parameters, you can inject anything you need to operate within your action.
 *
 *
 <pre>
 {
  fn: function(params) {
    // Include here your custom code
    var $rootScope = params.dependencyInjector.get('$rootScope');
    $rootScope.operations.addAlert('I\'m a cool action');
  }
 }
 </pre>

 @param {function()} fn
 The action to execute. The action will receive a **`params`** attribute, and the scope - **`this`** - will be set to the `$scope` of the dispatcher of the field.

 */