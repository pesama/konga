'use strict';

/**
 * @ngdoc service
 * @name sigmaNgApp.user
 * @description
 * # user
 * Factory in the sigmaNgApp.
 */
angular.module('sigmaNgApp')
  .factory('user', ['$resource', 
    function ($resource) {
      return $resource(constants.API_HOST + '/user/:operation', {}, {
        get: {
          method: 'GET',
          params: {
            operation: null
          }
        },
        roles: {
          method: 'GET',
          params: {
            operation: 'roles'
          },
          isArray: true
        },  
      });
    }]);
