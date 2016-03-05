'use strict';

/**
 * @ngdoc service
 * @name konga.standardApi
 * @description
 * # standardApi
 * Factory in the konga.
 */
angular.module('konga')
  .factory('standardApi', ['$resource', '$routeParams', 'configurationManager', 'kongaConfig', 'util', function ($resource, $routeParams, configurationManager, kongaConfig, util) {
  
    var service = $resource(kongaConfig.apiEndpoint + '/:path/:id/:operation/:opId', {}, {
      get: {
        method: 'GET',
        params: {
          id: '@id'
        },
        transformResponse: function(resp) {
          var data = angular.fromJson(resp);

          return data;
        }
      },

      search: {
        method: 'GET',
        params: {
          id: null,
          path: '@path',
          opId: null
        },
        isArray: true,
        transformResponse: function (data) {
          var jsonData = angular.fromJson(data);
          if(jsonData.data) {
            $routeParams.count = jsonData.count;
            return jsonData.data; 
          }

          return jsonData;
        }
      },
      
      update: {
        method: 'PUT',
        params: {
          path: '@path',
          id: '@id'
        }
      },
      save: {
        method: 'PUT',
        params: {
          path: '@path',
          id: '@id'
        }
      },
      create: {
        method: 'POST',
        params: {
          path: '@path',
          id: null
        }
      },
      deleteObj: {
        method: 'DELETE',
        params: {
          path: '@path',
          id: '@id'
        }
      }
    });

  return service;
    
  }]);