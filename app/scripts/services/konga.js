'use strict';

/**
 * @ngdoc service
 * @name konga.konga
 * @description
 * # konga
 * Service in the konga.
 */
angular.module('konga')
  .provider('konga', ['kongaConfig', 'mapper', 'util', 
    function KongaProvider(kongaConfig, mapper, util) {
    
      var apiResolutions = {};

      function Konga(common, $rootScope, userData) {
        this.api = function(entity, API) {
          if(API !== undefined) {
            apiResolutions[entity] = API;
          }

          return apiResolutions[entity];
        };

        this.config = function(key, value) {
          if(value !== undefined) {
            kongaConfig[key] = value;
          }

          return kongaConfig[key];
        };

        this.viewMapper = function(map, view) {
          if(view !== undefined) {
            mapper[map] = view;
          }

          return mapper[map];
        };

        this.util = util;

        this.storage = common;

        this.init = function(metadata) {
          $rootScope.metadata = metadata;
          util.init(metadata);
          common.store('metadata', metadata);
        };
      }

      this.api = function(entity, API) {
        if(!entity || !API) {
          // TODO Throw exception
        }

        apiResolutions[entity] = API;
      };

      this.config = function(key, value) {
        if(!key || !value) {
          // TODO Throw exception
        }

        kongaConfig[key] = value;
      };

      this.viewMapper = function(map, view) {
        if(!map || !view) {
          // TODO THrow exception
        }
        mapper[map] = view;
      };

      this.$get = ['common', '$rootScope', 'userData', 
        function(common, $rootScope, userData) {
          return new Konga(common, $rootScope, userData);
        }];
  }]);
