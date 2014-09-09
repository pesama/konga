'use strict';

/**
 * @ngdoc service
 * @name sigmaNgApp.uniteMesure
 * @description
 * # uniteMesure
 * Factory in the sigmaNgApp.
 */
angular.module('sigmaNgApp')
  .factory('UniteMesure',  ['$resource','$routeParams', function ($resource,$routeParams) {
	    return $resource(constants.API_HOST + '/common/uniteMesure/:id', {}, {
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
	            	return jsonData.unitesMesure; 
	            }
	        },
	        update: {
	          method: 'PUT',
	          params: {
	            id: '@id'
	          }
	        },
	        save: {
	            method: 'PUT',
	            params: {
	              id: null
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