'use strict';

/**
 * @ngdoc service
 * @name sigmaNgApp.compteComptable
 * @description
 * # compteComptable
 * Factory in the sigmaNgApp.
 */
angular.module('sigmaNgApp')
  .factory('CompteComptable', ['$resource','$routeParams', function ($resource,$routeParams) {
	    return $resource(constants.API_HOST + '/compteComptable/:id', {}, {
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
	          	return jsonData.comptesCompt; 
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
