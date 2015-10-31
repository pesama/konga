'use strict';

/**
 * @ngdoc function
 * @name uikongaApp.controller:AppLoaderCtrl
 * @description
 * # AppLoaderCtrl
 * Controller of the uikongaApp
 */
angular.module('ui.konga')
  .controller('AppLoaderCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 
  	function ($scope, $routeParams, $location) {
  		var after = $routeParams.after ? decodeUriComponent($routeParams.after) : '/';

  		$scope.$on('load-ready', function(evt, data) {
  			var code = data.code;

  			var loaders = $rootScope.status.loaders;
  			var index = loaders.indexOf(code);
  			if(index !== -1) {
  				loaders.splice(index, 1);
  			}

  			if(!loaders.length) {
  				$location.path(after);
  			}
  		});

	}]);
