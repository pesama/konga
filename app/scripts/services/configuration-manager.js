'use strict';

/*
 * @ngdoc service
 * @name konga.configurationManager
 * @description
 * # configurationManager
 * Provider in the konga.
 */
angular.module('konga')
  .provider('configurationManager', function () {

    // Private constructor
    function ConfigurationManager($rootScope, $filter) {

      /*
       * Returns a configuration param following the configuraion priority hierarchy
       * @param param {String} The name of the parameter to read
       * @param [Object] {Object} The object to read the configuration from
       * @param [mode] {String} The form mode
       * @param [order] {String} The order of the priority (SPLIT BY '_')
       */
      this.getConf = function (param, source, mode, order) {
        // TODO Finish this
        if(source) {
          var configuration = source.configuration;
          if(mode) {
            // configuration = $filter('filter')(source.configuration, {  })
          }
        }

        // General metadata configuration
        var configuration = $rootScope.metadata.configuration;

        return $filter('filter')(configuration, { key: param });
      };
    }

    // Method for instantiating
    this.$get = function ($injector) {
      var rScope = $injector.get('$rootScope');
      var filter = $injector.get('$filter');
      return new ConfigurationManager(rScope, filter);
    };
  });