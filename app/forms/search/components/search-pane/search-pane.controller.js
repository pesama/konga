/**
 * Created by pelayosanchez on 27/04/16.
 */

class SearchPaneComponentController {
    constructor($scope) {
        $scope.fields = [];
        $scope.categories = [];

        $scope.init = function () {
            $scope.fields = util.getEntityFields($scope.entityMetadata);
            $scope.categories = util.getEntityCategories($scope.entityMetadata, 1);

            var formType = $scope.entityMetadata.searchType;

            if (formType === util.constants.CUSTOM_FORM) {
                var configuration = $filter('filter')($scope.entityMetadata.configuration, {key: util.constants.SEARCH_CUSTOM_VIEW});
                if (!configuration.length) {
                    // TODO Show exception
                }
                $scope.contentUrl = mapper[configuration[0].value];
            }
            else {
                $scope.contentUrl = '/konga/views/' + formType.toLowerCase() + '-search-pane.html';

                // Custom behavior for each form type
                switch (formType) {
                    case util.constants.CATEGORIZED_CASCADE_FORM:
                        // Get the categories used for search
                        var configuration = $filter('filter')($scope.entityMetadata.configuration, {key: util.constants.SEARCH_USE_CATEGORY}, true);
                        $scope.categories = [];
                        for (var i = 0; i < configuration.length; i++) {
                            var cat = configuration[i].value;
                            $scope.categories.push(cat);
                        }
                        break;
                    default:
                    // Nothing to do
                }
            }
        };

        function setupQuery(obj, query) {
            for (var i in obj) {
                if (typeof obj[i] === 'object') {
                    setupQuery(obj[i], query[i]);
                }
                else {
                    query[i] = obj[i];
                }
            }
        }

        $scope.resetQuery = function () {
            var newQuery = scaffold.newQuery($scope.entityMetadata);
            for (var param in $scope.query) {
                $scope.query[param] = newQuery[param];
            }
        };

        $scope.delayedSubmit = function () {
            $timeout(function () {
                $scope.operations.submit();
            }, 100);
        };

        var watchers = null;
        $scope.$on('suspend', function () {
            watchers = $scope.$$watchers;
            $scope.$$watchers = [];
        });

        $scope.$on('resume', function () {
            $scope.$$watchers = watchers;
        });
    }
}

SearchPaneComponentController.$inject = ['$scope'];
export default SearchPaneComponentController;