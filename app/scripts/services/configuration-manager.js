'use strict';

/**
 * @ngdoc service
 * @name konga.configurationManager
 * @description
 * # configurationManager
 * Provider in the konga.
 */
angular.module('konga')
  .provider('configurationManager', ['util', function (util) {

    // Private constructor
    function ConfigurationManager($rootScope, $filter) {

      /*
       * Returns a configuration param following the configuraion priority hierarchy
       * @param param {string} The name of the parameter to read
       * @param [Object] {Object} The object to read the configuration from
       * @param [mode] {string} The form mode
       * @param [order] {string} The order of the priority (SPLIT BY '_')
       */
      this.get = function (param, source, mode, order) {
        // TODO Finish this
        var configuration = null;

        if(source) {
          configuration = source.configuration;
          if(mode) {
            configuration = $filter('filter')(source.configuration, { key: param });
            if(configuration.length) {
              return configuration[0].value;
            }

            // Go up a level (if we are on fields)
            if(source.owner) {
              var entityMetadata = util.getMetadata(source.owner);
              var entityConfiguration = entityMetadata.configuration;
              configuration = configuration = $filter('filter')(entityConfiguration, { key: param });
              if(configuration.length) {
                return configuration[0].value;
              }
            }
          }
        }

        // General metadata configuration
        var rootConfiguration = $rootScope.metadata.configuration;
        configuration = $filter('filter')(rootConfiguration, { key: param });

        return configuration && configuration.length ? configuration[0].value : undefined;
      };
    }

    // Method for instantiating
    this.$get = function ($injector) {
      var rScope = $injector.get('$rootScope');
      var filter = $injector.get('$filter');
      return new ConfigurationManager(rScope, filter);
    };
  }]);