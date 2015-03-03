'use strict';

/**
 * @ngdoc service
 * @name sigmaNgApp.user
 * @description
 * # user
 * Factory in the sigmaNgApp.
 */
angular.module('sigmaNgApp')
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
