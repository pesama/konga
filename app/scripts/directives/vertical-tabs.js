'use strict';

angular.module('konga')
  .directive('verticalTabs', [function () {
  	return {
		restrict: 'E',
		transclude: true,
		replace: true,
		scope: true,
		controller: function($scope) {
			var tabContentList = $scope.tabContentList = [];
			
			$scope.select = function(tabContent){
				angular.forEach(tabContentList, function(tabContent){
					tabContent.selected = false;
					tabContent.active = '';
				});
				tabContent.selected = true;
				tabContent.active = 'active';
				$scope.$emit('changeTab', {tab: tabContent} );
			};
			
			this.addTabContent = function(tabContent){
				if(tabContentList.length === 0){
					$scope.select(tabContent);
				}

				tabContentList.push(tabContent);
			};
		},
		link: function postLink(scope, element, attrs) {
		},
		templateUrl: '/konga/views/verticaltab.tp.html'
	}
  }]);