'use strict';

/*
 * @ngdoc service
 * @name Konga Reference.actionManager
 * @description
 * # actionManager
 * Provider in the Konga Reference.
 */
angular.module('konga')
  .provider('actionManager', ['util', function (util) {

    var actions = {
      /*
       * Native actions
       */
      'save-ok': {
        type: util.constants.ACTION_TYPE_FUNCTION,
        params: {
          fn: function(params) {
              var entityId = params.id;
              var $rootScope = params.dependencyInjector.get('$rootScope');
              var $scope = params.self;
              var data = params.data;
            
              // Verify if the entity is new
              if(entityId === util.constants.NEW_ENTITY_ID) {
                  $rootScope.operations.addAlert(util.constants.ALERT_TYPE_SUCCESS, 'message.action-confirmation.create.success');
              } else {
                  $rootScope.operations.addAlert(util.constants.ALERT_TYPE_SUCCESS, 'message.action-confirmation.update.success');
              }
              
              $rootScope.pageData.original = angular.copy(data);
              $scope.entity = $rootScope.pageData.entity = data;
              $scope.changes = [];
              $scope.operations.updateChanges();
  
              // Request a tab closing and a tab opening in update mode
              $rootScope.operations.closeTabById($rootScope.pageData.pageId);
          }
        }
      },

      'save-ko': {
        type: util.constants.ACTION_TYPE_FUNCTION,
        params: {
          fn: function(params) {
            var exceptionManager = params.dependencyInjector.get('exceptionManager');
            exceptionManager.analyzeException(params);
             
          }
        } 
      },
      
      'delete-ko': {
        type: util.constants.ACTION_TYPE_FUNCTION,
        params: {
          fn: function(params) {
            var exceptionManager = params.dependencyInjector.get('exceptionManager');
            exceptionManager.analyzeException(params);          
             
          }
        } 
      },
      'search-entity': {
        type: util.constants.ACTION_TYPE_TAB,
        params: {
          id : util.constants.ENTITY_ID_PREFFIX + '{entityType}' + util.constants.SEARCH_SUFFIX,
          title : 'message.tabs.entity.search',
          href : '/entity/{entityType}/search/',
          closable : true,
          hasChanges : false,
          entityType: '{entityType}',
          type: util.constants.TAB_TYPE_SEARCH
        }
      },
      'update-entity': {
        type: util.constants.ACTION_TYPE_TAB,
        params: {
          id : util.constants.ENTITY_ID_PREFFIX + '{entityType}' + util.constants.STRING_SEPARATOR + '{id}',
          title : 'message.tabs.entity.search',
          href : '/entity/{entityType}/{id}/',
          closable : true,
          hasChanges : false,
          entityType: '{entityType}',
          type: util.constants.TAB_TYPE_UPDATE
        }
      },
      'action-form-invalid': {
        type: util.constants.ACTION_TYPE_NOTIFY,
        params: {
          type: 'error',
          title: 'message.action.form-invalid.title',
          message: 'message.action.form-invalid.message'
        }
      },
      'action-forbidden': {
        type: util.constants.ACTION_TYPE_NOTIFY,
        params: {
          type: 'error',
          title: 'message.action.forbidden.title',
          message: 'message.action.forbidden.message'
        }
      },
      'action-under-development': {
        type: util.constants.ACTION_TYPE_NOTIFY,
        params: {
          type: 'notify',
          title: 'message.action.under-development.title',
          message: 'message.action.under-development.message'
        }
      }

    };

    // Private constructor
    function Greeter($rootScope, Session, configurationManager, $injector) {

      this.dispatch = function(action, parameters) {
        if(typeof action === 'string') {
          action = { name: action };
        }
        var actionDefinitionOriginal = configurationManager.getCustomActions()[action.name];
        if(!actionDefinitionOriginal) {
          actionDefinitionOriginal = actions[action.name];
        }
        if(!actionDefinitionOriginal) {
          // TODO Throw exception
        }
        var actionDefinition = angular.copy(actionDefinitionOriginal);
        
        //we add the parameters of the call
        actionDefinition.params.parameters = parameters;

        // Include the reference to the action manager
        actionDefinition.params.parameters.actionManager = this;

        // Include the dependency injector
        actionDefinition.params.parameters.dependencyInjector = $injector;
        
        var authorized = true;

        // Verify authorization
        if(actionDefinition.restrict) {
          // Get the user roles
          var rolesNative = userData.roles;

          // We need to stringify each role, as all come in array-form (as a buffer)
          var userRoles = [];
          for(var i = 0; i < rolesNative.length; i++) {
            var role = "";
            var f = -1;
            while(rolesNative[i][++f] !== undefined) {
              role += rolesNative[i][f];
            }
            userRoles.push(role);
          }

          authorized = false;

          for(var i = 0; i < actionDefinition.restrict.length; i++) {
            var role = actionDefinition.restrict[i];

            if(userRoles.indexOf(role) !== -1) {
              // We have this role
              // So dispatch!
              authorized = true;

              // TODO Verify restriction policy
              break;
            }
          }
        }

        
        if(!authorized) {
          actionDefinition = actions['action-forbidden'];
        }

        switch(actionDefinition.type) {
        case util.constants.ACTION_TYPE_MODAL:
          $rootScope.operations.openModal(actionDefinition.params);
          break;
        case util.constants.ACTION_TYPE_NOTIFY:
          $rootScope.operations.notify(actionDefinition.params.title, actionDefinition.params.message, actionDefinition.params.type, actionDefinition.params);
          break;
        case util.constants.ACTION_TYPE_CONFIRM:
          $rootScope.operations.confirm(actionDefinition.params.title, actionDefinition.params.message, actionDefinition.params.okHandler, actionDefinition.params.koHandler, actionDefinition.params);
          break;
        case util.constants.ACTION_TYPE_TAB:
          // Setup params
          for(var encodedParam in parameters) {
            for(var actionParam in actionDefinition.params) {
              if(typeof actionDefinition.params[actionParam] === 'string') {
                actionDefinition.params[actionParam] = actionDefinition.params[actionParam].split('{' + encodedParam + '}').join(parameters[encodedParam]);
              }
              // TODO Verify object params too
            }
          }
          $rootScope.operations.addTab(actionDefinition.params);
          break;
        case util.constants.ACTION_TYPE_FUNCTION:
          var params = actionDefinition.params.parameters;
          var functionToCall = actionDefinition.params['fn'];
          functionToCall.call(params.self, params);
          break;
        }
      };

    }

    // Public API for configuration
    this.setSalutation = function (s) {
      salutation = s;
    };

    // Method for instantiating
    this.$get = function ($injector) {
      var rScope = $injector.get('$rootScope');
      var session = $injector.get('userData');
      var configurationManager = $injector.get('configurationManager');
      return new Greeter(rScope, session, configurationManager, $injector);
    };
  }]);
