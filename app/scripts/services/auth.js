'use strict';

/**
 * @ngdoc service
 * @name sigmaNgApp.auth
 * @description
 * # auth
 * Factory in the sigmaNgApp.
 */
angular.module('sigmaNgApp')
  .factory('auth', ['$http', 'TokenHandler', 
    function ($http, TokenHandler) {


        // Methods
        return {
          auth: function(loginData) {
            return $http.post(constants.API_HOST + '/user/auth', loginData);
          },
          fullauth: function(ctrOperatId) {
            return $http.post(constants.API_HOST + '/user/fullauth', ctrOperatId);
          }
        };
    }]);
