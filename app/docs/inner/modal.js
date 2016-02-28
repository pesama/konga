/**
 * @ngdoc object 
 * @name Standards.Modal
 * Defines the parameters to configure a modal window.
 * It has several parameters:
 * ## Example
 * An example Modal object would look like this:
 * <pre>
{
  controller: 'MyAwesomeModalController',
  template: '/views/my-awesome-modal.html',
  parameters: {
    // Custom parameters to use within the controller and the handlers
  },
  okHandler: function(modal, data) {
    // Do something with the data
  },
  koHandler: function(modal, reason) {
    // Treat cancelation
  }
}
 * </pre>

 * @param {string} template
 * The <b>URL</b> to the template for the modal. Konga modals are built by `bootstrap's`, so you need to follow the `<modal-content>` structure:
 * 
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
 * 
 * 
 * @param {string=} controller
 * <b>Name</b> of the controller to engage to the modal.
 * You can inject `params` you will receive the {@link Action-driven framework.Modal.parameters `parameters`} configured when creating the modal
 * <pre>
angular.module("myAwesomeApp")
  .controller('MyAwesomeModalCtrl', ['$scope', '...', 'params', 
    function($scope, ..., params) {
      ...
      // The 'params' dependency contains the parameters sent to the modal via configuration
      ...
  }]);
 * </pre>
 *

 * @param {object=} parameters
 * Parameters to configure the modal.
 * You can put anything here, and it will be available in many places:
 * * Modal controller via a `params` dependency injection.
 * * `OK` and `KO` handlers via first argument's `parameters` object

  * @param {function(action, data)} okHandler
  * This function will be called once the user closes the modal with an affirmative action (this only applies if the modal has an action in which you will call the `$modalInstance.close()` instead of dismissing it).

  * @param {function(action, reason)} koHandler

  * Callback to be executed when the user dismisses the modal.
  */