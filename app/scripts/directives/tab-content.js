'use strict';

angular.module('konga')
  .directive('tabContent', function () {
    return {
		require: '^verticalTabs',
		restrict: 'E',
		transclude: true,
		replace: true,
		scope: {
			title: '@',
			id: '=tabId'
		},
		link: function(scope, element, attrs, tabsCtrl) {
			tabsCtrl.addTabContent(scope);
		},
		templateUrl: '/konga/views/vertical-tabs-element.tp.html'
	};
  });
