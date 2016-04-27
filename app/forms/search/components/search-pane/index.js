/**
 * Created by pelayosanchez on 27/04/16.
 */


import Component        from './search-pane.directive';
import mainView         from './search-pane.template.html';
import cascadeView      from './search-pane.cascade.template.html';
import categorizedView  from './search-pane.categorized_cascade.template.html';

angular.module(moduleName)
    .directive('searchPane', Component)
    .run(['$templateCache', function($templateCache) {
        $templateCache.put('/konga/views/search-pane.html', mainView);
        $templateCache.put('/konga/views/cascade-search-pane.html', cascadeView);
        $templateCache.put('/konga/views/categorized_cascade-search-pane.html', categorizedView);
    }]);

export default Component;