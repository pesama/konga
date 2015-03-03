'use strict';

/**
 * @ngdoc service
 * @name sigmaNgApp.action
 * @description
 * # action
 * Factory in the sigmaNgApp.
 */
angular.module('sigmaNgApp')
  .factory('Action',  ['$resource','$routeParams', 'ENV', function ($resource, $routeParams, ENV) {
	    return $resource(ENV.apiEndpoint + '/action/:id/ ', {}, {
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
	          	return jsonData.actions; 
	          }
	        }
	    });
  }]);
