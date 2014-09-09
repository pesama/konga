'use strict';

/**
 * @ngdoc service
 * @name sigmaNgApp.filterManager
 * @description
 * # filterManager
 * Service in the sigmaNgApp.
 */
angular.module('sigmaNgApp')
  .service('FilterManager', ['$resource', function ($resource) {
	    return $resource(constants.API_HOST + '/filtrefavoris/filter/:id', {}, {
	        get: {
	          method: 'GET',
	          params: {
	            id: '@id'
	          }
	        },
	        search: {
	          method: 'GET',
	          params: {
	            id: undefined,
	          },
	          isArray: true
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
