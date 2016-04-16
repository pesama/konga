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

    function parse(source) {
      if(source === 'true') return true;
      if(source === 'false') return false;
      if(!isNaN(parseFloat(source))) return parseFloat(source);

      return source;
    }

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
        var confSource = null;

        if(source) {
          confSource = source.configuration;
          
          if(mode) {

            switch(mode) {
            case util.constants.SCOPE_SEARCH:
              confSource = source.searchable ? source.searchable.configuration : [];
              break;
            case util.constants.SCOPE_RESULTS:
              confSource = source.showInResults ? source.showInResults.configuration : [];
              break;
            case util.constants.SCOPE_UPDATE:
              confSource = source.showInUpdate ? source.showInUpdate.configuration : [];
              break;
            }

            configuration = $filter('filter')(confSource, { key: param });
            if(configuration && configuration.length) {
              return parse(configuration[0].value);
            }

            // Go up a level (if we are on fields)
            if(source.owner) {
              var entityMetadata = util.getMetadata(source.owner);
              var entityConfiguration = entityMetadata.configuration;
              configuration = $filter('filter')(entityConfiguration, { key: param });
              if(configuration && configuration.length) {
                return parse(configuration[0].value);
              }
            }
          }
          else {
            if(!confSource) {
              return undefined;
            }

            configuration = $filter('filter')(confSource, { key: param });
            if(configurationc && configuration.length) {
              return parse(configuration[0].value);
            }
            else {
              configuration = $filter('filter')($rootScope.metadata.configuration, { key: param });
              if(configuration && configuration.length) {
                return parse(configuration[0].value);
              } 
            }

          }
          return undefined;
        }

        // General metadata configuration
        var rootConfiguration = $rootScope.metadata.configuration;
        configuration = $filter('filter')(rootConfiguration, { key: param });

        if(configuration && configuration.length) {
          return configuration[0].value;
        }

        // TODO Throw exception
      };
    }

    // Method for instantiating
    this.$get = function ($injector) {
      var rScope = $injector.get('$rootScope');
      var filter = $injector.get('$filter');
      return new ConfigurationManager(rScope, filter);
    };
  }]);