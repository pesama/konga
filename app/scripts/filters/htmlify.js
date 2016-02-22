'use strict';

/*
 * @ngdoc filter
 * @name konga.filter:htmlify
 * @function
 * @description
 * # htmlify
 * Filter in the konga.
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
