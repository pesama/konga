'use strict';

/**
 * @ngdoc service
 * @name sigmaNgApp.glac
 * @description
 * # glac
 * Factory in the sigmaNgApp.
 */
angular.module('sigmaNgApp')
  .factory('Glac',['$resource', '$routeParams',  function ($resource, $routeParams) {
	  
	  var total;
    return $resource(constants.API_HOST + '/glac/:id', {}, {
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
        },isArray: true,
        transformResponse: function (data, headers) {
        	var jsonData = JSON.parse(data);
        	$routeParams.total = jsonData.total;
        	return jsonData.agences; 
        }
      },
   
    });
    
  }]);
