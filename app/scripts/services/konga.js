'use strict';

/**
 * @ngdoc service
 * @name kongaApp.konga
 * @description
 * # konga
 * Service in the kongaApp.
 */
angular.module('konga')
  .service('konga', ['kongaConfig', 'mapper', 'util', 'common', '$rootScope', 'userData', function (kongaConfig, mapper, util, common, $rootScope, userData) {
    
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
