/**
 * Created by pelayosanchez on 27/04/16.
 */

//Search form management
import FormSearchController from './search.controller';
import Components           from './components';


angular.module(moduleName)
    .controller('FormSearchController', FormSearchController);

export default {
    searchController: FormSearchController,
    searchComponents: Components
};
