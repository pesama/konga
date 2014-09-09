'use strict';

/**
 * @ngdoc service
 * @name sigmaNgApp.CtrMecanique
 * @description
 * # CtrMecanique
 * Factory in the sigmaNgApp.
 */
angular.module('sigmaNgApp')
  .factory('CtrMecanique', ['$resource','$routeParams', function ($resource,$routeParams) {

    // Public API here
    return $resource(constants.API_HOST + '/eds/ctrmecan/:id', {}, {
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
          	return jsonData.ctrMecaniques; 
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
