'use strict';

/**
 * @ngdoc filter
 * @name Konga Reference.filter:urlify
 * @function
 * @description
 * # urlify
 * Filter in the Konga Reference.
 */
angular.module('konga')
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
