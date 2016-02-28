'use strict';

/**
 * @ngdoc filter
 * @name konga.filter:quickSearch
 * @function
 * @description
 * # quickSearch
 * It receives an metadata , and it returns an array of Objects(i.e quickSearchField)
 * @param {Object} metadata Defines the metadata of entity
 */
angular.module('konga')
  .filter('quickSearch', ['$filter', 'util', function ($filter, util) {
    return function (metadata) {
    	var ret = [];

    	var fields = util.getEntityFields(metadata);

    	for(var i = 0; i < fields.length; i++) {
    		var field = fields[i];
    		if(field.quickSearch.value !== null) {
    			var quickSearchField = {
    				metadata: field,
    				value: ''
    			};
    			ret.push(quickSearchField);
    		}
    	}

    	if(!ret.length) {
    		// TODO Verify configuration
    		var codeField = $filter('filter')(fields, { isKey: true });

    		var relatedMetadata = util.getMetadata(field.owner);

    		var extra = {
    			label: $filter('translate')(relatedMetadata.label),
	      		labelPlaceholder: relatedMetadata.label
    		};

    		var quickSearchField = {
				metadata: codeField[0],
				value: '',
				extra: extra
			};
			ret.push(quickSearchField);
    	}

    	return ret;
    };
  }]);
