
(function() {

	// Assign $rootScope values
	angular.module('docsApp')
		.run(['$rootScope', function($rootScope) {

			// Section order
			$rootScope.sectionOrder = {
				home: 0,
				api: 1
			};

		}]);
})();