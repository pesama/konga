'use strict';

/*
 * @ngdoc directive
 * @name ui.konga.directive:Menu Item
 * @description 
 * # menuItem
 */
angular.module('ui.konga')
  .directive('menuItem', function ($compile) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
	    	item: '=',
	  },
	  controller: function($scope, $rootScope) {


	  	$scope.executeString = function(action){
	  		var actions = action.action.split(':');

        // Dispatch the action
        // $rootScope.operations.decodeAction(action.action, true);

	  		switch (actions[0]) {
	  			case 'search-entity':
	  				$rootScope.operations.openEntitySearch(actions[1]);
	  				break;
	  			default: 
					var dispatchAction = {};
					dispatchAction.name = action.action;					
					$rootScope.operations.dispatchAction(dispatchAction, {});
	  				break;
	  		}
  		};
		
	  },
      link: function postLink(scope, element) {
        var template;

        template= "<ul ng-if='item.children.length != 0' class='dropdown-menu'>";

        //If the element has grandson, then the item should have the css class dropdown-submenu
        if (scope.item.children.length != 0 && scope.item.children[0].children.length != 0) {
        	template +=  "<li ng-repeat='i in item.children' class='dropdown-submenu'>";
        } else {
        	template +=  "<li ng-repeat='i in item.children' ng-click='executeString(i)'>";
        }

        	template += "<a>{{ i.label | translate }}</a>";
        if (scope.item.children.length != 0) {
        	template += "<menu-item item='i'></menu-item>";
        }
        template += " </li>"
        	+"</ul>";
       	element.replaceWith($compile(template)(scope));
        
    }
    };
  });
