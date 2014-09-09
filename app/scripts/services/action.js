'use strict';

/**
 * @ngdoc service
 * @name sigmaNgApp.action
 * @description
 * # action
 * Factory in the sigmaNgApp.
 */
angular.module('sigmaNgApp')
  .factory('Action',  ['$resource','$routeParams', function ($resource, $routeParams) {
	    return $resource(constants.API_HOST + '/action/:id', {}, {
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
	          	return jsonData.actions; 
	          }
	        }
	    });
  }]);
