'use strict';

/**
 * @ngdoc service
 * @name sigmaNgApp.Metadata
 * @description
 * Factory to connect to metadata's endpoint. 
 */
angular.module('sigmaNgApp')
  .factory('Metadata', ['$resource', function ($resource) {
    return $resource(constants.API_HOST + '/metadata/:operation/:lang', {}, {

      /**
       * @ngdoc method
       * @name get
       * @methodOf sigmaNgApp.Metadata
       * @description
       * Retrieves the metadata for the application
       * @param {String} lang The language the user logged in with
       * @returns {Array} The metadata information for all entities available
       */
      get: {
        method: 'GET',
        params: {
          operation: undefined,
        	lang: '@lang'
        },
        cache: true
      },

      /**
       * @ngdoc method
       * @name codes
       * @methodOf sigmaNgApp.Metadata
       * @description
       * Returns all product codes available for the application.
       * @returns {Array} An array containing all list of codes for each entity type
       */
      codes: {
        method: 'GET',
        params: {
          operation: 'codes',
          lang: undefined
        },
        cache: true
      },

      messages: {
        method: 'GET',
        params: {
          operation: 'messages',
          lang: '@lang'
        },
        cache: true
      }

      // Other methods for the metadata?
      
    });
}]);