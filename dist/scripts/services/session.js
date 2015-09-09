'use strict';

/**
 * @ngdoc service
 * @name ui.konga.Session
 * @description
 * # Session
 * Factory in the ui.konga.
 */
angular.module('ui.konga')
  .factory('Session', function() {
      var Session = {
        data: {}
      };
      return Session; 
  });
  
