'use strict';

/**
 * @ngdoc service
 * @name konga.konga
 * @description
 * # konga
 * Service in the konga.
 */
angular.module('konga')
  .service('konga', ['kongaConfig', 'mapper', 'util', 'common', '$rootScope', 'userData', 'api', function (kongaConfig, mapper, util, common, $rootScope, userData, api) {
    
    this.api = function(entity, API) {
      if(API !== undefined) {
        api.resolutions[entity] = API;
      }

      return api.resolutions[entity];
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
  }]);
