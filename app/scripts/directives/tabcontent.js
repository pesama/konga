'use strict';

angular.module('sigmaNgApp')
  .directive('tabContent', function () {
    var directiveDefinitionObject = {};
	directiveDefinitionObject.require= '^verticalTabs';
	directiveDefinitionObject.restrict= 'E';
	directiveDefinitionObject.transclude= true;
	directiveDefinitionObject.replace = true;
	directiveDefinitionObject.scope= {
		title: '@'
	};
	directiveDefinitionObject.link= function(scope, element, attrs, tabsCtrl){
			tabsCtrl.addTabContent(scope);
	};
	directiveDefinitionObject.templateUrl = 'views/vertical-tabs-element.tp.html';
	return directiveDefinitionObject;
  });
