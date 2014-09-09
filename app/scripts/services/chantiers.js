'use strict';

angular.module('sigmaNgApp')
  .factory('Chantiers', ['$resource', '$routeParams', function ($resource,$routeParams) {
    return $resource(constants.API_HOST + '/eds/chantier/:id', {}, {
      get: {
        method: 'GET',
        params: {
          id: '@id'
        }
      },
      search: {
        method: 'GET',
        params: {
          id: undefined
        },
        isArray: true,
        transformResponse: function (data, headers) {
        	var jsonData = JSON.parse(data);
        	$routeParams.total = jsonData.total;
        	return jsonData.chantieres; 
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
          id: undefined
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
