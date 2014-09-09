'use strict';

angular.module('sigmaNgApp')
  .factory('CodeRef', ['$resource','$routeParams', function ($resource,$routeParams) {
    return $resource(constants.API_HOST + '/codeRef/:id', {}, {
      get: {
        method: 'GET',
        params: {
          id: '@id'
        }
      },
      search: {
        method: 'GET',
        params: {
          id: null
        },
        isArray: true,
        transformResponse: function (data, headers) {
        	var jsonData = JSON.parse(data);
        	$routeParams.total = jsonData.total;
        	return jsonData.codeRefs; 
        }
      },
      update: {
        method: 'PUT',
        params: {
          id: '@id'
        }
      },
      create: {
        method: 'POST',
        params: {
          id: null
        }
      },
      deleteObj: {
        method: 'DELETE',
        params: {
          id: '@id'
        }
      }
    });
}]);
