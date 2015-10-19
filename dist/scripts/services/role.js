'use strict';

/**
 * @ngdoc service
 * @name ui.konga.Role
 * @description
 * # Role
 * Factory in the ui.konga.
 */
angular.module('ui.konga')
  .factory('Role', ['$resource','$routeParams', 'ENV', function ($resource, $routeParams, ENV) {
	// Public API here
	    return $resource(ENV.apiEndpoint + '/role/:id/ ', {}, {
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
	          transformResponse: function (data) {
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
