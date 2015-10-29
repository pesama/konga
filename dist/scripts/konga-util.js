'use strict';

/**
 * @ngdoc object
 * @name ui.konga.constants
 * @description
 * Stores common constants used all across the application
 * @property {String} API_HOST Defines where is the api located
 * @property {String} ENTITY_ID_PREFFIX Defines the preffix for ENTITY operations
 * @property {String} SEARCH_SUFFIX Defines the suffix for search purposes
 * @property {String} STRING_SEPARATOR Defines the separator for Strings
 * @property {String} NEW_ENTITY_ID Defines the eds id when creating a new one
 * @property {String} SOURCE_METADATA Defines the entity name of the metadata
 * @property {String} SCOPE_SEARCH Defines the search scope name
 * @property {String} SCOPE_UPDATE Defines the update scope name
 * @property {String} FIELD_BOOLEAN Defines the type name of a boolean field
 * @property {String} FIELD_CHECKBOX Defines the type name of a checkbox field
 * @property {String} FIELD_DATE Defines the type name of a date field
 * @property {String} FIELD_TEXT Defines the type name of a text field
 * @property {String} FIELD_COMPLEX Defines the type name of a complex field
 * @property {String} DATE_DEFAULT_NOW Defines the default value for date objects, to set-up as current date
 * @property {String} MULTIPLICITY_ONE Defines the String to define one-to-one multiplicity
 * @property {String} MULTIPLICITY_MANY Defines the String to define many-to-many multiplicity
 *
 */
var constants = {

	ALERT_TYPE_ERROR 					: 'danger',
	ALERT_TYPE_SUCCESS 					: 'success',
	ALERT_TYPE_DEFAULT 					: 'default',
	ALERT_TYPE_WARNING 					: 'warning',

	ENTITY_ID_PREFFIX 					: 'entity_',

	SEARCH_SUFFIX 						: '_search',

	STRING_SEPARATOR					: '_',

	NEW_ENTITY_ID 						: 'new',

	REFRESH_SEARCH_KEY 					: 'refreshSearchKey_',

	SCOPE_SEARCH 						: 'search',
	SCOPE_RESULTS 						: 'results',
	SCOPE_UPDATE 						: 'update',

	FIELD_STRING 						: 'STRING',
	FIELD_NUMBER 						: 'NUMBER',
	FIELD_PLAIN 						: 'PLAIN',
	FIELD_PASSWORD 						: 'PASSWORD',
	FIELD_BOOLEAN 						: 'BOOLEAN',
	FIELD_CHECKBOX 						: 'CHECKBOX',
	FIELD_COMBOBOX 						: 'COMBOBOX',
	FIELD_DATE 							: 'DATE',
	FIELD_DATETIME 						: 'DATETIME',
	FIELD_DATESEARCH 					: 'DATE-SEARCH',
	FIELD_TEXT 							: 'TEXT',
	FIELD_TEXTAREA 						: 'TEXTAREA',
	FIELD_COMPLEX 						: 'COMPLEX',
	FIELD_LIST 							: 'LIST',
	FIELD_PICK_LIST 					: 'PICK_LIST',
	FIELD_SELECT 						: 'SELECT',
	FIELD_FILTERED_SELECT 				: 'FILTERED_SELECT',
	FIELD_TICS 							: 'TICS',
	FIELD_COLOR 						: 'COLOR',
	FIELD_CSS 							: 'CSS',
	FIELD_FILE 							: 'FILE',
	FIELD_IMAGE 						: 'IMAGE',
	FIELD_PRICE 						: 'PRICE',
	FIELD_CUSTOM 						: 'CUSTOM',
	FIELD_PLAIN_FILTERED 				: 'PLAIN_FILTERED',
	FIELD_TABLE 						: 'TABLE',
	// FIELD_LIST_SEARCH					: 'list_search',
	// FIELD_LIST_LINK						: 'list_link',

	DATE_DEFAULT_NOW 					: 'now',

	MULTIPLICITY_ONE 					: 'ONE',
	MULTIPLICITY_MANY 					: 'MANY',

	TRIGGER_MOMENT_IMMEDIATE 			: 'IMMEDIATE',
	TRIGGER_MOMENT_COMMIT 				: 'COMMIT',
	TRIGGER_TYPE_CONFIRM 				: 'CONFIRM',
	TRIGGER_TYPE_ALERT 					: 'ALERT',
	TRIGGER_PARAM_LABEL 				: 'label',

	TRIGGER_MATCH_VALUE 				: 'VALUE',
	TRIGGER_MATCH_LENGTH 				: 'LENGTH',

	TRIGGER_MATCH_TYPE_EXACT			: 'EXACT_MATCH',
	TRIGGER_MATCH_TYPE_RANGE	  		: 'RANGE',

	CASCADE_FORM 						: 'CASCADE',
	TABBED_FORM 						: 'TABBED',
	CUSTOM_TABBED_FORM 					: 'CUSTOM_TABBED',
	CUSTOM_FORM 						: 'CUSTOM',

	CATEGORIZED_CASCADE_FORM 			: 'CATEGORIZED_CASCADE',

	LANGUAGE_MESSAGE_PREFFIX 			: 'message.languages.',

	DATE_COMPARATOR_LOWER_THAN 			: 'LOWER_THAN',
	DATE_COMPARATOR_LOWER_EQUALS 		: 'LOWER_EQUALS',
	DATE_COMPARATOR_EQUALS 				: 'EQUALS',
	DATE_COMPARATOR_GREATER_EQUALS 		: 'GREATER_EQUALS',
	DATE_COMPARATOR_GREATER_THAN 		: 'GREATER_THAN',
	DATE_COMPARATOR_BETWEEN 			: 'BETWEEN',

	NUMBER_COMPARATOR_LOWER_THAN 		: 'LOWER_THAN',
	NUMBER_COMPARATOR_LOWER_EQUALS 		: 'LOWER_EQUALS',
	NUMBER_COMPARATOR_EQUALS 			: 'EQUALS',
	NUMBER_COMPARATOR_GREATER_EQUALS 	: 'GREATER_EQUALS',
	NUMBER_COMPARATOR_GREATER_THAN 		: 'GREATER_THAN',
	NUMBER_COMPARATOR_BETWEEN 			: 'BETWEEN',

	VALIDATOR_EXACT_MATCH 				: 'EXACT_MATCH',
	VALIDATOR_RANGE 					: 'RANGE',

	
	MAXLEN_FILTER_NAME              	: 30,

	ACTION_TYPE_MODAL 					: 'modal',
	ACTION_TYPE_NOTIFY 					: 'notify',
	ACTION_TYPE_CONFIRM 				: 'confirm',
	ACTION_TYPE_TAB 					: 'tab',
	ACTION_TYPE_FUNCTION 				: 'function',
	
	ACTION_RESTRICTION_POLICY_ALL 		: 'all'	,

	USER_ID								: 'userId',
	
	COMBO_NATURE_TIERS					: 'natTiers',	

	CONFIGURATION_IGNORE_PARENT_FIELD 	: 'IGNORE_PARENT_FIELD',
	CONFIGURATION_USE_VIEW 				: 'USE_VIEW',

	TAB_TYPE_SEARCH 					: 'glyphicon glyphicon-search',
	TAB_TYPE_UPDATE 					: 'glyphicon glyphicon-pencil',
	TAB_TYPE_HOME 						: 'glyphicon glyphicon-home',
	TAB_TYPE_TASKS 						: 'glyphicon glyphicon-tasks',
	TAB_TYPE_GRID 						: 'glyphicon glyphicon-th',
	TAB_TYPE_GRID_LARGE 				: 'glyphicon glyphicon-th-large',
	TAB_TYPE_STORE 						: 'glyphicon glyphicon-shopping-cart',
	TAB_TYPE_CONFIG 					: 'glyphicon glyphicon-cog',

	FORM_STYLE_HORIZONTAL 				: 'HORIZONTAL',
	USE_SHORT_LABEL 					: 'USE_SHORT_LABEL',
	
	FILE_TYPE_PDF						: 'application/pdf',
	FILE_TYPE_PNG						: 'image/png',
	FILE_TYPE_JPG						: 'image/jpeg',
	FILE_TYPE_GIF						: 'image/gif',
	FILE_EXT_PNG						: '.png',
	FILE_EXT_JPG						: '.jpg',
	FILE_EXT_GIF						: '.gif',

	CASCADE_UPDATE 						: 'CASCADE_UPDATE',
	PROPAGATE_UPDATE 					: 'PROPAGATE_UPDATE',
	DISABLE_COMPLEX_FIELD 				: 'DISABLE_FIELD',

	SELF_FIELD 							: '$self',
	COMPLEX_FIELD_AS					: 'as',
	
	UPDATE_CUSTOM_VIEW 					: 'UPDATE_CUSTOM_VIEW',
	SEARCH_CUSTOM_VIEW 					: 'SEARCH_CUSTOM_VIEW',

	UPDATE_HIDE_BUTTONS 				: 'UPDATE_HIDE_BUTTONS',

	WEEKDAYS 							: ['day.sunday', 'day.monday', 'day.tuesday', 'day.wednesday', 'day.thursday', 'day.friday', 'day.saturday'],
	WEEKEND_DAYS 						: ['day.saturday', 'day.sunday'],

	MONTHS 								: ['month.january', 'month.february', 'month.march', 'month.april', 'month.may', 'month.june', 'month.july', 'month.august', 'month.september', 'month.october', 'month.november', 'month.december'],

	SEARCH_USE_CATEGORY 				: 'USE_SEARCH_CATEGORY',
	RESULTS_USE_CATEGORY 				: 'USE_RESULTS_CATEGORY',
	HIDE_CATEGORY_HEADER 				: 'HIDE_CATEGORY_HEADER',

	QUERY_PARAM_REGEXP 					: /^{\w+}$/,
	QUERY_COMPLEX_PARAM_REGEXP 			: /^{(\w+\.\w+)*}$/,

	SHOW_PAGINATION 					: 'SHOW_PAGINATION',
	TABLE_CELL_RENDERER 				: 'TABLE_CELL_RENDERER',
	TABLE_CELL_FILTER 					: 'TABLE_CELL_FILTER',
	READ_ONLY 							: 'READ_ONLY',

	TABLE_CONF_X_AXIS_PROPERTY 			: 'X_AXIS_PROPERTY',
	TABLE_CONF_Y_AXIS_PROPERTY 			: 'Y_AXIS_PROPERTY',
	TABLE_CONF_X_AXIS_MIN 				: 'X_AXIS_MIN',
	TABLE_CONF_Y_AXIS_MIN 				: 'Y_AXIS_MIN',
	TABLE_CONF_X_AXIS_MAX 				: 'X_AXIS_MAX',
	TABLE_CONF_Y_AXIS_MAX 				: 'Y_AXIS_MAX',
	TABLE_CONF_X_AXIS_STEP 				: 'X_AXIS_STEP',
	TABLE_CONF_Y_AXIS_STEP 				: 'Y_AXIS_STEP',

	LOOK_AND_FEEL_PLAIN 				: 'plain',
	LOOK_AND_FEEL_TABS 					: 'tabs',
	CONFIG_LOOK_AND_FEEL 				: 'look-and-feel',

	HIDE_WHEN_CREATING 					: 'hide-when-creation',
	HIDE_WHEN_UPDATING 					: 'hide-when-updating'
};
'use strict';

/**
 * @ngdoc object
 * @name lib.konga.util
 * @description
 * 
 * Provides a set of common utils used all across the application.
 *
 */
var util = {

	metadataObject : null,

	getConfiguration: function() {
		return util.metadataObject.configuration;
	},

	getMetadata: function(name) {
		for(var i = 0; i < util.metadataObject.entities.length; i++) {
			var current = util.metadataObject.entities[i];
			if(current.name === name) {
				return current;
			}
		}
		return null;
	},

	/**
	 * @ngdoc method
	 * @methodOf lib.konga.util
	 * @name getEntityFields
	 * @description
	 * Returns all fields for an entity type following all hierarchy upwards.
	 * @param {Object} entity Entity metadata information
	 * @returns {Array} All fields for that entity type
	 */
	getEntityFields: function(entity) {

		// Get direct fields
		var fields = angular.copy(entity.fields);

		// Does it have a superClass?
		// TODO Follow hierarchy
		if(entity.superClass) {
			var superClass = util.getMetadata(entity.superClass);

			// Get the entity configuration
			var entityConfiguration = entity.configuration;

			var superFields = superClass.fields;
			var superFieldsCopy = [];
			for(var i = 0; i < superFields.length; i++) {
				// Is there any IGNORE_PARENT_FIELD configuration?
				var ignore = false;
				for(var f = 0; f < entityConfiguration.length; f++) {
					var param = entityConfiguration[f];

					if(param.key === constants.CONFIGURATION_IGNORE_PARENT_FIELD) {
						var fieldName = param.value;
						if(superFields[i].name === fieldName) {
							ignore = true;
							break;
						}
					}
				}

				if(!ignore) {
					var newField = angular.copy(superFields[i]);
					newField.owner = entity.name;
					superFieldsCopy.push(newField);
				}
			}

			// Get its fields
			fields = fields.concat(superFieldsCopy);
		}

		return fields;
	},

	/**
	 * @ngdoc method
	 * @methodOf lib.konga.util
	 * @name getEntityId
	 * @description
	 * Returns the ID of an entity, or 'new' if the entity is not provided or the id does not exist
	 * @param {Object} metadata Entity metadata information
	 * @param {Object} entity The entity to retrieve the id from
	 * @param {Boolean} fieldName If true, returns only the name of the field
	 * @returns {*} The id of the entity
	 */
	getEntityId: function(metadata, entity, fieldName) {
		var id = constants.NEW_ENTITY_ID;

		var fields = util.getEntityFields(metadata);
		for(var i = 0; i < fields.length; i++) {
			var field = fields[i];

			// Is it the id?
			if(field.isId) {
				// TODO This will fail for indirect paths. However an id should NEVER be indirect.
				if (entity) { 
					id = entity[field.name];
				}
				if(fieldName) {
					id = field.name;
				}
				break;
			}
		}

		return id;
	},

	/**
	 * @ngdoc method
	 * @methodOf lib.konga.util
	 * @name getEntityCode
	 * @description
	 * Returns the code of an entity, or 'new' if the entity is not provided or the code does not exist
	 * @param {Object} metadata Entity metadata information
	 * @param {Object} entity The entity to retrieve the code from
	 * @param {Boolean} fieldName If true, returns only the name of the field
	 * @returns {*} The code of the entity
	 */
	getEntityCode: function(metadata, entity, fieldName) {
		var code = null;

		var fields = util.getEntityFields(metadata);
		for(var i = 0; i < fields.length; i++) {
			var field = fields[i];

			// Is it the key?
			if (field.isKey && !field.related) {
				// TODO This will fail for indirect paths. However an id should NEVER be indirect.
				if (entity) {
					code = entity[field.name];
				}
				if (fieldName) {
					code = field.name;
				}
				break;
			}
		}

		return code;
	},

	/**
	 * @ngdoc method
	 * @methodOf lib.konga.util
	 * @name getEntityLabel
	 * @description
	 * Returns the label of an entity, or 'new' if the entity is not provided or the label does not exist
	 * @param {Object} metadata Entity metadata information
	 * @param {Object} entity The entity to retrieve the label from
	 * @param {Boolean} fieldName If true, returns only the name of the field
	 * @returns {String} The label of the entity
	 */
	getEntityLabel: function(metadata, entity, fieldName) {
		var label = null;

		var fields = util.getEntityFields(metadata);
		for(var i = 0; i < fields.length; i++) {
			var field = fields[i];
			// Is it the label?
			// TODO Finish annotation
			if(field.isLabel && !field.related) {
				// TODO This will fail for indirect paths. However an id should NEVER be indirect.
				if(entity) {
					label = entity[field.name];
				}
				if(fieldName) {
					label = field.name;
				}
				break;
			}
		}

		return label;
	},
	
	/**
	 * @ngdoc method
	 * @methodOf lib.konga.util
	 * @name downloadFile
	 * @description
	 * Download the file that we get from a service
	 * @param {Object} href Data of the file. Pattern: "data:" + resp.mimetype + ";base64, " + resp.value
	 * @param {Object} name Name of the file
	 */
	downloadFile: function(href, name){
	 		var a = document.createElement('a');
	 	    a.href = href;
	 	    a.download = name;
	 	    a.click();
	},
	
	/**
	 * @ngdoc method
	 * @methodOf lib.konga.util
	 * @name getEntityCategories
	 * @description
	 * Returns all Categories for an entity 
	 * @param {Object} entity Entity metadata information
	 * @returns {Array} All Categories for that entity type
	 */
	getEntityCategories: function(entity, level) {

		var categories = [];
		
		var fields = util.getEntityFields(entity);

		for(var i = 0; i < fields.length; i++){

			// Get only the first category
			if(level == 1) {
				if(fields[i].categories.length) {
					if(categories.indexOf(fields[i].categories[0]) == -1){
						//It means we've found a new category
						categories.push(fields[i].categories[0]);
					}	
				}
				
			}
			
		}

		return categories;
	},

	/**
	 * @ngdoc method
	 * @methodOf lib.konga.util
	 * @name getEntityFieldSets
	 * @description
	 * Returns all Field sets for an entity 
	 * @param {Object} entity Entity metadata information
	 * @returns {Array} All Field sets for that entity type
	 */
	getEntityFieldSets: function(entity) {

		var fieldsets = [];

		// Get field sets of the current entity
		fieldsets = fieldsets.concat(entity.fieldSets);

		// Does it have a superclass?
		// TODO Follow hierarchy
		if(entity.superClass) {

			// Get the superclass
			var superClass = util.getMetadata(entity.superClass);

			// Concat the fieldsets of the superclass
			fieldsets = fieldsets.concat(superClass.fieldSets);
		}

		return fieldsets;
	},

	/**
	 * @ngdoc method
	 * @methodOf lib.konga.util
	 * @name convertUtf8ToWindow1250
	 * @description
	 * Convert an UTF8 string to window-1250 page code 
	 * @param {string} utf8Str UTF-8 string
	 * @returns {string} string convert o window-1250
	 */
	convertUtf8ToWindow1250: function(utf8Str) {
		var utf8 = [	
			'%0A', /* CR */		'%E2%82%AC', /* € */'%20', /* BLANK */	'%21', /* ! */		'%22', /* " */		'%23', /* # */		'%24', /* $ */
			'%25', /* % */		'%26', /* & */		'%26', /* ' */		'%27', /* ' */		'%28', /* ( */		'%29', /* ) */		'%2C', /* , */		'%3A', /* : */
			'%3B', /* ; */		'%3D', /* = */		'%3F', /* ? */		'%5B', /* [ */		'%5C', /* \ */		'%5D', /* ] */		'%5E', /* ^ */
			'%60', /* ` */		'%7B', /* { */		'%7C', /* | */		'%7D', /* } */		'%7E', /* ~ */		'%C2%A0', /* blank */ '%C2%A3', /* £ */	'%C2%A4', /* ¤ */
			'%C2%A8', /* ¨ */	'%C2%A7', /* § */	'%C2%A9', /* @ */	'%C2%B0', /* ° */	'%C2%B5', /* µ */	'%C3%A0', /* à */	'%C3%A1', /* á */	
			'%C3%A2', /* â */	'%C3%A3', /* ã */	'%C3%A4', /* ä */	'%C3%A6', /* æ */	'%C3%A7', /* ç */	'%C3%A8', /* è */	'%C3%A9', /* é */
			'%C3%AA', /* ê */	'%C3%AB', /* ë */	'%C3%AE', /* î */	'%C3%AF', /* ï */	'%C3%B4', /* ô */	'%C3%B5', /* õ */	'%C3%B6', /* ö */
			'%C3%B9', /* ù */	'%C3%BB', /* û */	'%C3%BC', /* ü */ 	'%C3%80', /* À */ 	'%C3%81', /* Á */ 	'%C3%82', /* Â */ 	'%C3%83', /* Ã */ 	
			'%C3%84', /* Ä */	'%C3%85', /* Å */	'%C3%86', /* Æ */	'%C3%87', /* Ç */	'%C3%88', /* È */	'%C3%89', /* É */ 	'%C3%8A', /* Ê */
			'%C3%8B', /* Ë */	'%C3%8C', /* Ì */	'%C3%8D', /* Í */	'%C3%8E', /* Î */	'%C3%8F', /* Ï */	'%C3%91', /* Ñ */
			'%C3%92', /* Ò */	'%C3%93', /* Ó */	'%C3%94', /* Ô */	'%C3%95', /* Õ */	'%C3%96', /* Ö */	'%C3%98', /* Ø */
			'%C3%99', /* Ù */	'%C3%9A', /* Ú */	'%C3%9B', /* Û */	'%C3%9C', /* Ü */	'%C3%9D'  /* Ý */
		];

		var latin1 = [	
			'\n', /* CR */		'\x80', /* € */		' ', /* BLANK */	'!', /* ! */		'"', /* " */		'#', /* # */		'$', /* $ */
			'%', /* % */		'&', /* & */		'\'', /* ' */		'\'', /* ' */		'(', /* ( */		')', /* ) */		',', /* , */		':', /* : */
			';', /* ; */		'=', /* = */		'?', /* ? */		'[', /* [ */		'\\', /* \ */		']', /* ] */		'^', /* ^ */
			'`', /* ` */		'{', /* { */		'|', /* | */		'}', /* } */		'~', /* ~ */		' ', /* normal blank */		'\xA3', /* £ */		'\xA4', /* ¤ */
			'\xA8', /* ¨ */		'\xA7', /* § */		'@', /* @ */		'\xB0', /* ° */		'\xB5', /* µ */		'\xE0', /* à */		'\xE1', /* á */
			'\xE2', /* â */		'\xE3', /* ã */		'\xE4', /* ä */		'\xE6', /* æ */		'\xE7', /* ç */		'\xE8', /* è */		'\xE9', /* é */
			'\xEA', /* ê */		'\xEB', /* ë */		'\xEE', /* î */		'\xEF', /* ï */		'\xF4', /* ô */		'\xF5', /* õ */		'\xF6', /* ö */
			'\xF9', /* ù */		'\xFB', /* û */		'\xFC', /* ü */ 	'\xC0', /* À */ 	'\xC1', /* Á */ 	'\xC2', /* Â */ 	'\xC3', /* Ã */ 	
			'\xC4', /* Ä */		'\xC5', /* Å */		'\xC6', /* Æ */		'\xC7', /* Ç */		'\xC8', /* È */		'\xC9', /* É */ 	'\xCA', /* Ê */
			'\xCB', /* Ë */		'\xCC', /* Ì */		'\xCD', /* Í */		'\xCE', /* Î */		'\xCF', /* Ï */		'\xD1', /* Ñ */
			'\xD2', /* Ò */		'\xD3', /* Ó */		'\xD4', /* Ô */		'\xD5', /* Õ */		'\xD6', /* Ö */		'\xD8', /* Ø */
			'\xD9', /* Ù */		'\xDA', /* Ú */		'\xDB', /* Û */		'\xDC', /* Ü */		'\xDD' /* Ý */
		];
				
		for (var i = 0; i < utf8.length; i ++) {
		  var value = utf8[i];
		  var re = new RegExp(value, 'g');
		  utf8Str = utf8Str.replace(re, latin1[i]);		  
		}		

		return utf8Str;
	},
	
	removeDiacritics : function (str) {

		  var defaultDiacriticsRemovalMap = [
		    {'base':'A', 'letters':/[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g},
		    {'base':'AA','letters':/[\uA732]/g},
		    {'base':'AE','letters':/[\u00C6\u01FC\u01E2]/g},
		    {'base':'AO','letters':/[\uA734]/g},
		    {'base':'AU','letters':/[\uA736]/g},
		    {'base':'AV','letters':/[\uA738\uA73A]/g},
		    {'base':'AY','letters':/[\uA73C]/g},
		    {'base':'B', 'letters':/[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g},
		    {'base':'C', 'letters':/[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g},
		    {'base':'D', 'letters':/[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g},
		    {'base':'DZ','letters':/[\u01F1\u01C4]/g},
		    {'base':'Dz','letters':/[\u01F2\u01C5]/g},
		    {'base':'E', 'letters':/[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g},
		    {'base':'F', 'letters':/[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g},
		    {'base':'G', 'letters':/[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g},
		    {'base':'H', 'letters':/[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g},
		    {'base':'I', 'letters':/[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g},
		    {'base':'J', 'letters':/[\u004A\u24BF\uFF2A\u0134\u0248]/g},
		    {'base':'K', 'letters':/[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g},
		    {'base':'L', 'letters':/[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g},
		    {'base':'LJ','letters':/[\u01C7]/g},
		    {'base':'Lj','letters':/[\u01C8]/g},
		    {'base':'M', 'letters':/[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g},
		    {'base':'N', 'letters':/[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g},
		    {'base':'NJ','letters':/[\u01CA]/g},
		    {'base':'Nj','letters':/[\u01CB]/g},
		    {'base':'O', 'letters':/[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g},
		    {'base':'OI','letters':/[\u01A2]/g},
		    {'base':'OO','letters':/[\uA74E]/g},
		    {'base':'OU','letters':/[\u0222]/g},
		    {'base':'P', 'letters':/[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g},
		    {'base':'Q', 'letters':/[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g},
		    {'base':'R', 'letters':/[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g},
		    {'base':'S', 'letters':/[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g},
		    {'base':'T', 'letters':/[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g},
		    {'base':'TZ','letters':/[\uA728]/g},
		    {'base':'U', 'letters':/[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g},
		    {'base':'V', 'letters':/[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g},
		    {'base':'VY','letters':/[\uA760]/g},
		    {'base':'W', 'letters':/[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g},
		    {'base':'X', 'letters':/[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g},
		    {'base':'Y', 'letters':/[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g},
		    {'base':'Z', 'letters':/[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g},
		    {'base':'a', 'letters':/[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g},
		    {'base':'aa','letters':/[\uA733]/g},
		    {'base':'ae','letters':/[\u00E6\u01FD\u01E3]/g},
		    {'base':'ao','letters':/[\uA735]/g},
		    {'base':'au','letters':/[\uA737]/g},
		    {'base':'av','letters':/[\uA739\uA73B]/g},
		    {'base':'ay','letters':/[\uA73D]/g},
		    {'base':'b', 'letters':/[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g},
		    {'base':'c', 'letters':/[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g},
		    {'base':'d', 'letters':/[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g},
		    {'base':'dz','letters':/[\u01F3\u01C6]/g},
		    {'base':'e', 'letters':/[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g},
		    {'base':'f', 'letters':/[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g},
		    {'base':'g', 'letters':/[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g},
		    {'base':'h', 'letters':/[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g},
		    {'base':'hv','letters':/[\u0195]/g},
		    {'base':'i', 'letters':/[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g},
		    {'base':'j', 'letters':/[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g},
		    {'base':'k', 'letters':/[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g},
		    {'base':'l', 'letters':/[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g},
		    {'base':'lj','letters':/[\u01C9]/g},
		    {'base':'m', 'letters':/[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g},
		    {'base':'n', 'letters':/[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g},
		    {'base':'nj','letters':/[\u01CC]/g},
		    {'base':'o', 'letters':/[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g},
		    {'base':'oi','letters':/[\u01A3]/g},
		    {'base':'ou','letters':/[\u0223]/g},
		    {'base':'oo','letters':/[\uA74F]/g},
		    {'base':'p','letters':/[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g},
		    {'base':'q','letters':/[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g},
		    {'base':'r','letters':/[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g},
		    {'base':'s','letters':/[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g},
		    {'base':'t','letters':/[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g},
		    {'base':'tz','letters':/[\uA729]/g},
		    {'base':'u','letters':/[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g},
		    {'base':'v','letters':/[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g},
		    {'base':'vy','letters':/[\uA761]/g},
		    {'base':'w','letters':/[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g},
		    {'base':'x','letters':/[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g},
		    {'base':'y','letters':/[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g},
		    {'base':'z','letters':/[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g}
		  ];

		  if(str!=null){
			  for(var i=0; i<defaultDiacriticsRemovalMap.length; i++) {
			    str = str.replace(defaultDiacriticsRemovalMap[i].letters, defaultDiacriticsRemovalMap[i].base);
			  }
		  }

		  return str;

	},
	
	init: function(metadataObject) {
		util.metadataObject = metadataObject;
	}
};

