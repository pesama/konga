/*
 * @ngdoc object
 * @name Action-driven framework.Modal
 * @description
 * Defines the parameters to configure a modal window.
 * It has several parameters:
 * * <b>controller</b>: The controller for the modal.
 * * <b>template</b>: Template URL for the modal.
 * * <b>parameters</b>: An object with `raw` parameters (to be interpreted by your custom code).
 * * <b>okHandler</b>: Handler for closing the modal.
 * * <b>koHandler</b>: Handler for dismissing the modal.
 * ## Example
 * An example Modal object would look like this:
 * <pre>
{
  controller: 'MyProjectModalCtrl',
  template: '/konga/views/my-project-modal-tpl.html',
  parameters: {
    // Custom parameters to use within the controller and the handlers
  },
  okHandler: function(modal, data) {
    // Do something with the data
    // As you can see you have the modal configuration here too
  },
  koHandler: function(modal, reason) {
    // Treat cancelation
    // Again, the modal info is here!
  }
}
 * </pre>
 */

/*
 * @ngdoc object
 * @name template
 * @propertyOf Action-driven framework.Modal
 * @description
 * The <b>URL</b> to the template for the modal. Konga's modals inherit Bootstrap's ones, so your template should be a `.modal` container.
 * 
 * This is an example of a modal:
 * <pre>
<div class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header" ng-show="modal.title">
        <button id="modal-tpl-closeX" 
                type="button" 
                class="close" 
                ng-click="close()">
          &times;
        </button>
        <h4 class="modal-title" ng-bind="modal.title"></h4>
      </div>

      <div class="modal-body">
        <div ng-include="modal.contentUrl"></div>
      </div>

      <div class="modal-footer">
        <button type="button" 
                class="btn btn-default" 
                id="modal-save" 
                ng-click="save()">
          {{ 'message.action.validate' | translate }}
        </button>
        <button type="button" 
                class="btn btn-default" 
                id="modal-cancel" 
                ng-click="close()">
          {{ 'message.action.cancel' | translate }}
        </button>
      </div>
    </div>
  </div>
</div>
 * </pre>
 */

/*
 * @ngdoc function
 * @name controller
 * @propertyOf Action-driven framework.Modal
 * @description
 * <b>Name</b> of the controller to engage to the modal.
 * You can inject `params` you will receive the {@link Action-driven framework.Modal.parameters `parameters`} configured when creating the modal
 * <pre>
angular.module("yourProjectApp")
  .controller('YourProjectModalCtrl', ['$scope', '...', 'params', 
    function($scope, ..., params) {
      ...
      // The 'params' dependency contains the parameters sent to the modal via configuration
      ...
  }]);
 * </pre>
 *
 */

 /*
 * @ngdoc object
 * @name parameters
 * @propertyOf Action-driven framework.Modal
 * @description
 * Parameters to configure the modal.
 * You can put anything here, and it will be available in many places:
 * * Modal controller via a `params` dependency injection.
 * * `OK` and `KO` handlers via first argument's `parameters` object
 */

 /*
  * @ngdoc function
  * @name okHandler
  * @methodOf Action-driven framework.Modal
  * @description
  * This function will be called once the user closes the modal with an affirmative action (this only applies if the modal has an action in which you will call the `$modalInstance.close()` instead of dismissing it).
  * @param {Object} action The action that defined the modal being closed
  * @param {Object} data The data being sent from modal's controller
  */

/*
  * @ngdoc function
  * @name koHandler
  * @methodOf Action-driven framework.Modal
  * @description
  * Callback to be executed when the user dismisses the modal.
  * @param {Object} action The action that defined the modal being closed
  * @param {String} reason The reason for which the modal is closing
  */