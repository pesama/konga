'use strict';

/**
 * @ngdoc service
 * @name ui.konga.Metadata
 * @description
 * Factory to connect to metadata's endpoint. 
 */
angular.module('ui.konga')
  .factory('Metadata', ['$resource', 'ENV', function ($resource, ENV) {
    return $resource(ENV.apiEndpoint + '/metadata/:operation/:lang', {}, {

      /**
       * @ngdoc method
       * @name get
       * @methodOf ui.konga.Metadata
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
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
        // cache: true
      },

      /**
       * @ngdoc method
       * @name codes
       * @methodOf ui.konga.Metadata
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
      },

      mainmenu: {
        method: 'GET',
        params: {
          operation: 'mainmenu',
          lang: undefined
        },
        cache: false
      }

      // Other methods for the metadata?
      
    });
}]);