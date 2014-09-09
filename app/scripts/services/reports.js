'use strict';

/**
 * @ngdoc service
 * @name sigmaNgApp.reports
 * @description
 * # reports
 * Service in the sigmaNgApp.
 */
angular.module('sigmaNgApp')
  .service('Reports', ['$resource', function reports($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return $resource(constants.API_HOST + '/report/:typeEntity:typeReport', {}, {
      generate: {
        method: 'POST',
        params: {
          typeEntity: '@typeEntity',
          typeReport: '@typeReport',
          data: '@data'
        }
      },
     });
  }]);
