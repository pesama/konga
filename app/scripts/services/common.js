'use strict';

/**
 * @ngdoc service
 * @name kongaUI.Common
 * @description
 * It contains common tools and methods for storing data, managing tab information, saving page parameters, etcetera.
 */
angular.module('sigmaNgApp')
  .provider('common', function () {

    // Private variables
    var storage = {};
    var pageData = {};

    /**
     * @ngdoc method
     * @name store
     * @methodOf kongaUI.Common
     * @description
     * Stores an object with a given key as identifier
     * @param {String} key the key for the storage
     * @param {Object} value The value to store
     */
    
    /**
     * @ngdoc method
     * @name read
     * @methodOf kongaUI.Common
     * @description
     * Reads the object identified with the given key
     * @param {String} key the key for the storage
     * @returns {Object} The value from the storage.
     */
    
    /**
     * @ngdoc method
     * @name delete
     * @methodOf kongaUI.Common
     * @description
     * Deletes the object identified with the given key
     * @param {String} key the key for the storage
     */

    function Storer() {
      this.store = function (key, value) {
        storage[key] = value;
      };

      this.read = function(key) {
        return storage[key];
      };

      this.deleteKey = function(key) {
        delete storage[key];
      };

      /**
       * @ngdoc method
       * @name getMetadata
       * @methodOf kongaUI.Common
       * @description
       * Returns the metadata of the given type, from an also given array of metadata information.
       * @param {Array} metadata The array of metadata information
       * @param {String} type The type of entity that's needed
       * @returns {Object} The metadata for that entity type
       */
      this.getMetadata = function(type) {
        var metadata = this.read('metadata');

        for(var i = 0; i < metadata.entities.length; i++) {
          var c_metadata = metadata.entities[i];
          if(c_metadata.name === type) {
            return c_metadata;
          }
        }
        return null;
      };

      /**
       * @ngdoc method
       * @name getPageData
       * @methodOf kongaUI.Common
       * @description
       * Returns the page data of the tab with an id given. This page data is used to preserve data upon navigation.
       * @param {String} id The identifier of the tab.
       * @returns {Object} The page data information for that tab.
       */
      this.getPageData = function(id) {
        var ret = pageData[id];

        // If we don't have a page data yet, we initialize
        if(!ret) ret = pageData[id] = { pageId: id, init: false };
        
        return ret;
      };

      /**
       * @ngdoc method
       * @name deletePageData
       * @methodOf kongaUI.Common
       * @description Removes the page data of a tab, identified with an id given. Used when the tab closes mostly.
       * @param {String} id The identifier of the tab.
       */
      this.deletePageData = function(id) {
        var ret = pageData[id];
        if(ret) {
          delete pageData[id];
        }
      };
    }

    // Method for instantiating
    this.$get = function () {
      return new Storer();
    };
  });
