'use strict';

/*
 * @ngdoc directive
 * @name uikongaApp.directive:kongaContent
 * @description
 * # kongaContent
 */
angular.module('konga')
  .directive('kongaContent', ['$filter', 'util', 
  	function ($filter, util) {
	    return {
	      templateUrl: '/konga/views/konga-content.html',
	      restrict: 'E',
	      replace: true,
	      link: function postLink(scope, element, attrs) {

	        function init() {
	        	var appConfiguration = util.getConfiguration();
	        
		        var appLookAndFeel = util.constants.LOOK_AND_FEEL_PLAIN;
		        var lookAndFeelConf = $filter('filter')(appConfiguration, { key: util.constants.CONFIG_LOOK_AND_FEEL }, true)[0];
		        if(lookAndFeelConf) {
		        	appLookAndFeel = lookAndFeelConf.value;
		        }

		        scope.contentView = '/konga/views/konga-content-' + appLookAndFeel + '.html';
	        }

	        if(util.metadataObject) {
	        	init();
	        }
	        else {
	        	scope.$on('metadata-ready', function() {
	        		init();
	        	});
	        }
	      }
	    };
	  }]);
