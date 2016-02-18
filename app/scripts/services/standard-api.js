'use strict';

/**
 * @ngdoc service
 * @name Konga Reference.standardApi
 * @description
 * # standardApi
 * Factory in the Konga Reference.
 */
angular.module('konga')
  .factory('standardApi', ['$resource', '$routeParams', '$upload', 'configurationManager', 'kongaConfig', 'util', function ($resource, $routeParams, $upload, configurationManager, kongaConfig, util) {
    
    // function readResponseObject(data, parent, paramName) {
    //   for(var param in data) {

    //     // Avoid JSON_IDENTITY_INFO id object
    //     if(param === '@id') {
    //       continue;
    //     }
    //     var current = data[param];

    //     if(!current) {
    //       continue;
    //     }

    //     if(typeof current === 'object') {
    //       if(current.length) {
    //         for(var i = 0; i < current.length; i++) {
    //           readResponseObject(current[i], null, null);
    //         }
    //         continue;
    //       }
    //       // Verify JSON identity
    //       if(current.reason && current.reason === util.constants.JSON_IDENTITY_INFO) {
    //         var metadata = util.getMetadata(current.source);
    //         data[param] = service.get({ path: metadata.apiPath, id: current.id });
    //       }
    //       else {
    //         readResponseObject(current, data, paramName);
    //       }
    //     }
    //   }
    // }

    //var total;
    var service = $resource(kongaConfig.apiEndpoint + '/:path/:id/:operation/:opId', {}, {
      get: {
        method: 'GET',
        params: {
          id: '@id'
        },
        transformResponse: function(resp) {
          var data = angular.fromJson(resp);

          return data;
        }
      },

      search: {
        method: 'GET',
        params: {
          id: null,
          path: '@path',
          opId: null
        },
        isArray: true,
        transformResponse: function (data) {
          var jsonData = angular.fromJson(data);
          if(jsonData.data) {
            $routeParams.count = jsonData.count;
            return jsonData.data; 
          }

          return jsonData;
        }
      },
      
      update: {
        method: 'PUT',
        params: {
          path: '@path',
          id: '@id'
        }
      },
      save: {
        method: 'PUT',
        params: {
          path: '@path',
          id: '@id'
        }
      },
      create: {
        method: 'POST',
        params: {
          path: '@path',
          id: null
        }
      },
      deleteObj: {
        method: 'DELETE',
        params: {
          path: '@path',
          id: '@id'
        }
      },
      upload: function (path, data) {
        var upload = $upload.upload({
            url: path, 
            data: {myObj: data},
            file: data.file[0]
          }).progress(function(evt) {
            console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total) + '% file :'+ evt.config.file.name);
          }).success(function(data, status, headers, config) {
            // file is uploaded successfully
            console.log('file ' + config.file.name + 'is uploaded successfully. Response: ' + data);
          });
      }
    });

  return service;
    
  }]);