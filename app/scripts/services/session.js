'use strict';

/**
 * @ngdoc service
 * @name sigmaNgApp.Session
 * @description
 * # Session
 * Factory in the sigmaNgApp.
 */
angular.module('sigmaNgApp')
  .factory('Session', function() {
      var Session = {
        data: {}
      };
      return Session; 
  });
  
