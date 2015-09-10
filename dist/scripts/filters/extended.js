'use strict';

/**
 * @ngdoc filter
 * @name ui.konga.filter:extended
 * @function
 * @description
 * # extended
 * It receives an array of fields in metadata and a name of field which are checked, and it returns true/false (i.e. isExtended or not).
 * @param {Array} metadata Defines the array of fields of metadata
 * @param {String} name Defines the name of checked field
 */
angular.module('ui.konga')
  .filter('extended', function () {
    return function (metadata,name) {
      
    	for(var i = 0; i < metadata.length; i++) {
            if(metadata[i].name == name) {
              return metadata[i].isExtended;
            }
          }
      	return false;
    };
  });
