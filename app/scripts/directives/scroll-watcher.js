'use strict';

/*
 * @ngdoc directive
 * @name konga.directive:Scroll watcher
 * @description
 * # scrollWatcher
 */
angular.module('konga')
  .directive('scrollWatcher', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element) {
      	angular.element(element).bind('scroll', function() {

      		var height = element[0].scrollHeight - element.height();
      		var scroll = element.scrollTop();

      		var msg = {
      			absolute: scroll,
      			height: height,
      			relative: (scroll / height)
      		};

      		scope.$emit(scope.id + '-scroll-watcher', msg);
      	});

      	scope.$on('set-scroll', function(event, data) {
      		if(data.relative) {
      			var height = element[0].scrollHeight - element.height();

      			var newScroll = height * data.relative;

      			element.scrollTop(newScroll);
      		}
      	});
      }
    };
  });
