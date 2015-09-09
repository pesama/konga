'use strict';

/**
 * @ngdoc service
 * @name ui.konga.user
 * @description
 * # user
 * Factory in the ui.konga.
 */
angular.module('ui.konga')
  .factory('User', ['$resource', 'ENV', 
    function ($resource, ENV) {
      return $resource(ENV.apiEndpoint + '/users/:id/:operation', {}, {
        get: {
          method: 'GET',
          params: {
            id: '@id',
            operation: undefined
          }
        },
        full: {
          method: 'GET',
          params: {
            id: '@id',
            operation: 'full'
          }
        }
      });
    }]);
