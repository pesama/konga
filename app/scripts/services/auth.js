'use strict';

/**
 * @ngdoc service
 * @name sigmaNgApp.auth
 * @description
 * # auth
 * Factory in the sigmaNgApp.
 */
angular.module('sigmaNgApp')
  .factory('auth', ['$http', 'TokenHandler', 'ENV', 
    function ($http, TokenHandler, ENV) {


        // Methods
        return {
          auth: function(loginData) {
            return $http.post(ENV.apiEndpoint + '/auth/login', loginData);
          },
          fullauth: function(ctrOperatId) {
            return $http.post(ENV.apiEndpoint + '/user/fullauth', ctrOperatId);
          }
        };
    }]);
