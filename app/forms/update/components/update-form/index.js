/**
 * Created by pelayosanchez on 27/04/16.
 */

import Component        from './update-form.directive.js';
import cascadeView      from './update-form.cascade.template.html';
import tabbedView       from './update-form.tabbed.template.html';
import customTabbedView from './update-form.custom_tabbed.template.html';

angular.module(moduleName)
    .directive('updateForm', Component)
    .run(['$templateCache', function($templateCache) {
        $templateCache.put('/konga/views/cascade-update.html', cascadeView);
        $templateCache.put('/konga/views/tabbed-update.html', tabbedView);
        $templateCache.put('/konga/views/custom_tabbed-update.html', customTabbedView);
    }]);

export default Component;