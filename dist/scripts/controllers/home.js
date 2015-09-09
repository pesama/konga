'use strict';

angular.module('presupuestorApp')
  .controller('HomeCtrl', ['$scope', '$filter', 'Metadata', 'common', '$rootScope', 'Session', 'scaffold', 
  	function ($scope, $filter, Metadata, common, $rootScope, Session, scaffold) {

      if(!Session.data.roleStoreUser) {
        $rootScope.operations.dispatchAction({ name: 'select-store' }, { self: $scope });
      }
      else {
        $scope.store = Session.data.roleStoreUser;
      }

      $scope.appActive = function(app) {
        var matches = $filter('filter')($rootScope.tabs, { id: app });
        return !!matches.length;
      };

      $scope.catalog = function() {
      	// Create the cart
      	var cartMetadata = util.getMetadata('catalog-cart');
      	var cart = scaffold.newEntity(cartMetadata);
      	common.store('cart', cart);

        common.store('settings', {});

        var params = {
          type: constants.TAB_TYPE_GRID_LARGE,
          title: 'Catálogo'
        };

      	// Load screen
        $rootScope.operations.openEntitySearch('catalog-product', params);
      };

      $scope.tailorings = function() {

        var params = {
          type: constants.TAB_TYPE_CONFIG,
          title: 'Confecciones'
        };

        // Load screen
        $rootScope.operations.openEntitySearch('tailoring', params);
      };
	}]);
