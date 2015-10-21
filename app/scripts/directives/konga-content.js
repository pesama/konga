'use strict';

/**
 * @ngdoc directive
 * @name uikongaApp.directive:kongaContent
 * @description
 * # kongaContent
 */
angular.module('ui.konga')
  .directive('kongaContent', ['$filter', 
  	function ($filter) {
	    return {
	      templateUrl: '/views/konga/konga-content.html',
	      restrict: 'E',
	      link: function postLink(scope, element, attrs) {

	        var appConfiguration = util.getConfiguration();
	        
	        var appLookAndFeel = constants.LOOK_AND_FEEL_PLAIN;
	        var lookAndFeelConf = $filter('filter')(appConfiguration, { key: constants.CONFIG_LOOK_AND_FEEL }, true)[0];
	        if(lookAndFeelConf) {
	        	appLookAndFeel = lookAndFeelConf.value;
	        }

	        scope.contentView = '/views/konga/konga-content-' + appLookAndFeel + '.html';
	      }
	    };
	  }]);
