'use strict';

/**
 * @ngdoc service
 * @name kongaUI.configurationManager
 * @description
 * # configurationManager
 * Provider in the sigmaNgApp.
 */
angular.module('sigmaNgApp')
  .provider('configurationManager', function () {

    // Private constructor
    function ConfigurationManager($rootScope, $filter) {

      /**
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

      this.getCustomActions = function() {
        // TODO Get this from configuration (read the end of this file)
        return customActions;
      };
    }

    // Method for instantiating
    this.$get = function ($injector) {
      var rScope = $injector.get('$rootScope');
      var filter = $injector.get('$filter');
      return new ConfigurationManager(rScope, filter);
    };
  });

// FIXME Please move this the shit elsewhere
var customActions = {

  'select-store': {
    type: constants.ACTION_TYPE_MODAL,
    params: {
      template : '/views/custom/select-store.html',
      controller: 'StoreSelectorCtrl',
      backdrop: 'static',
      parameters: {

      },
      okHandler: function(data) {
        this.parameters.self.store = data;
      },
      koHandler: function(reason) {

      }
    }
  },

  // Add a new relationship between Roles Stores and Users
  'add-role-store-user': {
    type: constants.ACTION_TYPE_MODAL,
    params: {
      template : '/views/custom/add-role-store-user.html',
      controller: 'AddRoleStoreUserCtrl',
      parameters: {

      },
      okHandler: function(data) {
        this.parameters.self.value.entity.push(data);
      },
      koHandler: function(reason) {

      }
    }
  },

  // Remove a relationship between Roles Stores and Users
  'remove-role-store-user': {
    type: constants.ACTION_TYPE_CONFIRM,
    params: {
      title: 'Confirma tu acción',
      message: '¿Realmente deseas eliminar este elemento?',
      parameters: {

      },
      okHandler: function(data, params) {
        var dependencyInjector = params.parameters.dependencyInjector;
        var standardApi = dependencyInjector.get('standardApi');

        var entity = params.parameters.self.value.entity;
        var value = params.parameters.data.entity;

        var query = {
          path: 'stores',
          operation: 'users',
          id: value.id
        };

        standardApi.delete(query, params.parameters.data.entity, 
          function(data) {
            var index = entity.indexOf(value);

            entity.splice(index, 1);

          }, 
          function(error) {
            // TODO Throw exception
          })
      },
      koHandler: function(reason, params) {
        void(0);
      }
    }
  },

  // Add a new relationship between Products and Characteristics
  'add-product-characteristic': {
    type: constants.ACTION_TYPE_MODAL,
    params: {
      template : '/views/custom/add-product-characteristic.html',
      controller: 'AddProductCharacteristicCtrl',
      parameters: {

      },
      okHandler: function(data) {
        this.parameters.self.value.entity.push(data);
      },
      koHandler: function(reason) {

      }
    }
  },

  // Remove a relationship between Products and Characteristics
  'remove-product-characteristic': {
    type: constants.ACTION_TYPE_CONFIRM,
    params: {
      title: 'Confirma tu acción',
      message: '¿Realmente deseas eliminar este elemento?',
      parameters: {

      },
      okHandler: function(data, params) {
        var dependencyInjector = params.parameters.dependencyInjector;
        var standardApi = dependencyInjector.get('standardApi');

        var entity = params.parameters.self.value.entity;
        var value = params.parameters.data.entity;

        var query = {
          path: 'products',
          operation: 'characteristics',
          id: params.parameters.item.id,
          opId: value.characteristic.id
        };

        standardApi.delete(query, params.parameters.data.entity, 
          function(data) {
            var index = entity.indexOf(value);

            entity.splice(index, 1);
          }, 
          function(error) {
            // TODO Throw exception
          })
      },
      koHandler: function(reason, params) {
        void(0);
      }
    }
  },

  // Add a new relationship between Products and Stores
  'add-product-storetype': {
    type: constants.ACTION_TYPE_MODAL,
    params: {
      template : '/views/custom/add-product-storetype.html',
      controller: 'AddProductStoreTypeCtrl',
      parameters: {

      },
      okHandler: function(data) {
        this.parameters.self.value.entity.push(data);
      },
      koHandler: function(reason) {

      }
    }
  },

  // Remove a relationship between Products and Stores
  'remove-product-storetype': {
    type: constants.ACTION_TYPE_CONFIRM,
    params: {
      title: 'Confirma tu acción',
      message: '¿Realmente deseas eliminar este elemento?',
      parameters: {

      },
      okHandler: function(data, params) {
        var dependencyInjector = params.parameters.dependencyInjector;
        var standardApi = dependencyInjector.get('standardApi');

        var entity = params.parameters.self.value.entity;
        var value = params.parameters.data.entity;

        var query = {
          path: 'products',
          operation: 'stores',
          id: params.parameters.item.id,
          opId: value.storeType.id
        };

        standardApi.delete(query, params.parameters.data.entity, 
          function(data) {
            var index = entity.indexOf(value);

            entity.splice(index, 1);

          }, 
          function(error) {
            // TODO Throw exception
          })
      },
      koHandler: function(reason, params) {
        void(0);
      }
    }
  },

  // Upload products in batch mode (via .CSV files)
  // Add a new relationship between Roles Stores and Users
  'product-batch-upload': {
    type: constants.ACTION_TYPE_MODAL,
    params: {
      template : '/views/custom/product-batch-upload.html',
      controller: 'ProductBatchUploadCtrl',
      parameters: {

      },
      okHandler: function(data, params) {
        
      },
      koHandler: function(reason) {

      }
    }
  },

  // Add a new relationship between Products and Stores
  'add-order-product': {
    type: constants.ACTION_TYPE_MODAL,
    params: {
      template : '/views/custom/add-order-product.html',
      controller: 'AddOrderProductCtrl',
      parameters: {

      },
      okHandler: function(data) {
        this.parameters.self.value.entity.push(data);
      },
      koHandler: function(reason) {

      }
    }
  },

  // Remove a relationship between Products and Stores
  'remove-order-product': {
    type: constants.ACTION_TYPE_CONFIRM,
    params: {
      title: 'Confirma tu acción',
      message: '¿Realmente deseas eliminar este elemento?',
      parameters: {

      },
      okHandler: function(data, params) {
        var dependencyInjector = params.parameters.dependencyInjector;
        var standardApi = dependencyInjector.get('standardApi');

        var entity = params.parameters.self.value.entity;
        var value = params.parameters.data.entity;

        var query = {
          path: 'orders',
          operation: 'products',
          id: params.parameters.item.id,
          opId: value.product.id
        };

        standardApi.delete(query, params.parameters.data.entity, 
          function(data) {
            var index = entity.indexOf(value);

            entity.splice(index, 1);

          }, 
          function(error) {
            // TODO Throw exception
          })
      },
      koHandler: function(reason, params) {
        void(0);
      }
    }
  },

  // Avoid relationship insertion when creating
  'not-when-creating': {
    type: constants.ACTION_TYPE_NOTIFY,
    params: {
      type: 'error',
      title: 'Error en la operación',
      message: 'Cuando crea un elemento no se pueden añadir relaciones. Guarde el elemento y edítelo posteriormente.'
    },
    okHandler: function(data, params) {
      void(0);
    }
  },

  // Catalog!
  'catalog-search': {
    type: constants.ACTION_TYPE_TAB,
    params: {
      id : 'catalog-search',
      title : 'Búsqueda en el catálogo',
      href : '/catalog/search/',
      closable : true,
      hasChanges : false,
      type: constants.TAB_TYPE_SEARCH
    }
  },

  'catalog-request-details': {
    type: constants.ACTION_TYPE_FUNCTION,
    params: {
      'function': function(params) {
        var $rootScope = params.dependencyInjector.get('$rootScope');
        var common = params.dependencyInjector.get('common');
        var $filter = params.dependencyInjector.get('$filter');

        var settings = common.read('settings');
        if(settings && settings.autoCart) {
          var scaffold = params.dependencyInjector.get('scaffold');

          var metadata = util.getMetadata('catalog-cart-item');
          
          var cartItem = scaffold.newEntity(metadata);

          cartItem.quantity = 1;
          cartItem.product = params.item;
          cartItem.policy = settings.globalPolicy;
          cartItem.buyPrice = params.item.buy_price;
          cartItem.sellPrice = params.item.sell_price * (1 - params.item.discount);
          cartItem.price *= (1 - (cartItem.policy ? cartItem.policy.discount : 0));

          var cart = common.read('cart');

          var existing = $filter('filter')(cart.items, function(product) {
            if(cartItem.product.id !== product.product.id) return false;
            if(!cartItem.policy && product.policy) return false;
            if(cartItem.policy && !product.policy) return false;
            if(cartItem.policy && product.policy && cartItem.policy.id !== product.policy.id) return false;
            if(cartItem.buyPrice !== product.buyPrice) return false;
            if(cartItem.sellPrice !== product.sellPrice) return false;

            return true;
          });

          if(existing.length) {
            cartItem.quantity += existing[0].quantity;
            cart.items.splice(cart.items.indexOf(existing[0]), 1);
          }

          cart.items.push(cartItem);
          $rootScope.operations.addAlert(constants.ALERT_TYPE_SUCCESS, 'entity.catalog-product-details.cart.add.success', cartItem);
        }
        else {
          $rootScope.operations.dispatchAction({ name: 'catalog-product-details' }, params);
        }
      }
    }
  },

  // Add a new relationship between Products and Stores
  'catalog-product-details': {
    type: constants.ACTION_TYPE_MODAL,
    params: {
      template : '/views/custom/catalog-product-details.html',
      controller: 'CatalogProductDetailsCtrl',
      parameters: {

      },
      okHandler: function(data) {
        
      },
      koHandler: function(reason) {

      }
    }
  },

  // Add a new relationship between Products and Stores
  'catalog-show-cart': {
    type: constants.ACTION_TYPE_MODAL,
    params: {
      template : '/views/custom/catalog-cart.html',
      controller: 'CatalogCartCtrl',
      parameters: {

      },
      okHandler: function(data) {
        
      },
      koHandler: function(reason) {

      }
    }
  },

  // Remove a product from the cart
  'catalog-cart-remove-item': {
    type: constants.ACTION_TYPE_CONFIRM,
    params: {
      title: 'Confirma tu acción',
      message: '¿Realmente deseas eliminar este elemento del carrito?',
      parameters: {

      },
      okHandler: function(data, params) {
        var dependencyInjector = params.parameters.dependencyInjector;

        var entity = params.parameters.self.value.entity;
        var value = params.parameters.data.entity;

        var index = entity.indexOf(value);
        entity.splice(index, 1);
      },
      koHandler: function(reason, params) {
        void(0);
      }
    }
  },

  // Edit a product from the cart
  'catalog-cart-edit-item': {
    type: constants.ACTION_TYPE_MODAL,
    params: {
      template : '/views/custom/catalog-cart-edit-item.html',
      controller: 'CatalogCartEditItemCtrl',
      parameters: {

      },
      okHandler: function(data) {
        
      },
      koHandler: function(reason) {

      }
    }
  },

  // Proceed order
  'catalog-order': {
    type: constants.ACTION_TYPE_TAB,
    params: {
      id : 'catalog-order',
      title : 'Nuevo pedido',
      href : '/catalog/order/',
      closable : true,
      hasChanges : false,
      type: constants.TAB_TYPE_STORE
    }
  },

  // Settings from the catalog
  'catalog-settings': {
    type: constants.ACTION_TYPE_MODAL,
    params: {
      template : '/views/custom/catalog-settings.html',
      controller: 'CatalogSettingsCtrl',
      parameters: {

      },
      okHandler: function(data) {
        
      },
      koHandler: function(reason) {

      }
    }
  },

  'logout': {
    type: constants.ACTION_TYPE_CONFIRM,
    params: {
      title: 'Desconexión',
      message: '¿Realmente quieres cerrar el sistema?',
      parameters: {

      },
      okHandler: function(data, params) {
        var dependencyInjector = params.parameters.dependencyInjector;
        var $rootScope = dependencyInjector.get('$rootScope');

        $rootScope.logout();
      },
      koHandler: function(reason, params) {
        
      }
    }
  }
};