'use strict';

angular.module('sigmaNgApp')
  .directive('verticalTabs', function () {
  	var directiveDefinitionObject = {};
	directiveDefinitionObject.restrict = 'E';
	directiveDefinitionObject.transclude= true;
	directiveDefinitionObject.replace = true;
	directiveDefinitionObject.scope= {};
	
	directiveDefinitionObject.controller= function($scope){
		var tabContentList = $scope.tabContentList = [];
		
		$scope.select = function(tabContent){
			angular.forEach(tabContentList, function(tabContent){
				tabContent.selected = false;
				tabContent.active = '';
			});
			tabContent.selected = true;
			tabContent.active = 'active';
		};
		
		this.addTabContent = function(tabContent){
			if(tabContentList.length === 0){
				$scope.select(tabContent);
			}
			tabContentList.push(tabContent);
		};
	};
	
	directiveDefinitionObject.templateUrl = 'views/verticaltab.tp.html';
	
	return directiveDefinitionObject;
  });