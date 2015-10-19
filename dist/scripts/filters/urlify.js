'use strict';

/**
 * @ngdoc filter
 * @name ui.konga.filter:urlify
 * @function
 * @description
 * # urlify
 * Filter in the ui.konga.
 */
angular.module('ui.konga')
  .filter('urlify', function () {
    return function (text) {
	    var urlRegex = /(https?:\/\/[^\s]+)/g;
	    return text.replace(urlRegex, function(url) {
	        return '<a href="' + url + '" target="_blank">' + url + '</a>';
	    });
	    // or alternatively
	    // return text.replace(urlRegex, '<a href="$1">$1</a>')
	};
  });
