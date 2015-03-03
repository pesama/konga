'use strict';

/**
 * @ngdoc filter
 * @name sigmaNgApp.filter:htmlify
 * @function
 * @description
 * # htmlify
 * Filter in the sigmaNgApp.
 */
angular.module('sigmaNgApp')
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
