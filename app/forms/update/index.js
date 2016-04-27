/**
 * Created by pelayosanchez on 27/04/16.
 */

// Form update management
import FormUpdateController from './update.controller.js';
import Components           from './components';

angular.module(moduleName)
    .controller('FormUpdateController', FormUpdateController);

export default {
    updateController: FormUpdateController,
    updateComponents: Components
};