/**
 * Created by pelayosanchez on 27/04/16.
 */

import Component 	    from './result-table.directive';
import cascadeView      from './result-table.cascade.template.html';
import categorizedView  from './result-table.categorized.template.html';

angular.module(moduleName)
    .directive('resultTable', Component.getInstance)
    .run(['$templateCache', function($templateCache) {
        $templateCache.put('/konga/views/cascade-result-table.html', cascadeView);
        $templateCache.put('/konga/views/categorized_cascade-result-table.html', categorizedView);
    }]);

export default Component;