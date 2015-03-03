'use strict';

angular.module('sigmaNgApp')
  .directive('verticalTabs', function () {
  	var directiveDefinitionObject = {};
	directiveDefinitionObject.restrict = 'E';
	directiveDefinitionObject.transclude= true;
	directiveDefinitionObject.replace = true;
	directiveDefinitionObject.scope= {};
	
	directiveDefinitionObject.controller= function($scope, $rootScope){
		var tabContentList = $scope.tabContentList = [];
		
		$scope.select = function(tabContent){
			angular.forEach(tabContentList, function(tabContent){
				tabContent.selected = false;
				tabContent.active = '';
			});
			tabContent.selected = true;
			tabContent.active = 'active';
			$rootScope.pageData.currentTab = tabContent.title;
			$scope.$emit('changeTab', {tab: tabContent} );
		};
		
		this.addTabContent = function(tabContent){
			if(tabContentList.length === 0 && !$rootScope.pageData.currentTab){
				$scope.select(tabContent);
			}
			if($rootScope.pageData.currentTab){
				if(tabContent.title === $rootScope.pageData.currentTab){
					$scope.select(tabContent);
				}
			}
			tabContentList.push(tabContent);
		};
	};
	
	directiveDefinitionObject.templateUrl = '/views/verticaltab.tp.html';
	
	return directiveDefinitionObject;
  });