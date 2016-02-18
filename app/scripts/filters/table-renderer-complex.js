'use strict';

/**
 * @ngdoc filter
 * @name Konga Reference.filter:tableRendererComplex
 * @function
 * @description
 * # tableRendererComplex
 * It receives value and metadata , and it returns the value of column which shows the result of complex fields base on these parameters.
 * @param {Object} metadata Defines the metadata of the entity to manage
 * @param {Object} value Defines the entity of each row
 */
angular.module('konga')
  .filter('tableRendererComplex', ['util', function (util) {
    return function (value, metadata) {
      if(metadata.type.type === constants.FIELD_COMPLEX) {
   	      var complexType = metadata.type.complexType;

	      var metadata = util.getMetadata(complexType);

	      var key = util.getEntityCode(metadata, value);

	      var label = util.getEntityLabel(metadata, value);
	      
	      //if there are no values
	      if (!label && !key)
	    	  return "";
	      
	      return label + ' (#' + key + ')';
      }
      return '';
    };
  });
