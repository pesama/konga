import KongaController 			from './global/konga.controller';
import FormSearchController 	from './forms/search/form.search.controller';
import FormUpdateController 	from './forms/update/form.update.controller';
import SearchPaneComponent 		from './forms/search/components/search-pane/form.search.component.search-pane';
import ResultTableComponent 	from './forms/search/components/result-table/form.search.component.result-table';

const moduleName = 'konga';

angular.module(moduleName)
	.controller('KongaController', KongaController);

angular.module(moduleName)
	.controller('FormSearchController', FormSearchController);

angular.module(moduleName)
	.controller('FormUpdateController', FormUpdateController);

angular.module(moduleName)
	.directive('searchPane', SearchPaneComponent);

angular.module(moduleName)
	.directive('resultTable', ResultTableComponent);