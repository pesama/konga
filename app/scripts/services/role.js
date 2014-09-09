'use strict';

/**
 * @ngdoc service
 * @name sigmaNgApp.Role
 * @description
 * # Role
 * Factory in the sigmaNgApp.
 */
angular.module('sigmaNgApp')
  .factory('Role', ['$resource','$routeParams', function ($resource,$routeParams) {
	// Public API here
	    return $resource(constants.API_HOST + '/role/:id', {}, {
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
	            	return jsonData.roles; 
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
