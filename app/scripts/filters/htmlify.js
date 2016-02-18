'use strict';

/*
 * @ngdoc filter
 * @name Konga Reference.filter:htmlify
 * @function
 * @description
 * # htmlify
 * Filter in the Konga Reference.
 */
angular.module('konga')
  .filter('htmlify', ['$filter', function ($filter) {
    return function (text) {
      var parsedText = text;

      // Line breaks
      var lineBreakRegex = /\n/g;
      var lineBreakReplace = '<br />';
      parsedText = parsedText.replace(lineBreakRegex, lineBreakReplace);

      // Urls
      parsedText = $filter('urlify')(parsedText);

      return parsedText;
    };
  }]);
