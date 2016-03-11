'use strict';

/**
 * @ngdoc object
 * @name Standards.Tools
 * @description 

Konga comes with a set of built-in tools to access quick metadata-parsing features, along with other handy things needed to manage metadata and other common features. This tools are allocated in a service called {@link konga.util `util`}. However, you can find here all the tools included, how to use them...

 */
 angular.module('konga').constant('util', {

 	metadataObject : null,

 	getConfiguration: function() {
 		return this.metadataObject.configuration;
 	},

 	/**
	 * @ngdoc function
	 * @methodOf Standards.Tools
	 * @name getMetadata
	 * @description 
	 * This method will give you the metadata definition of the entity named with the param `name` provided.

<pre>
angular.module('myAwesomeApp')
  .something(['util', function(util) {
    // Here you got your metadata
    var metadata = util.getMetadata('demo-entity');
  }]);
</pre>

	 * @param {string} name
	 The name of the entity to get it's metadata.
	 */
 	getMetadata: function(name) {
 		for(var i = 0; i < this.metadataObject.entities.length; i++) {
 			var current = this.metadataObject.entities[i];
 			if(current.name === name) {
 				return current;
 			}
 		}
 		return null;
 	},

	/**
	 * @ngdoc function
	 * @methodOf Standards.Tools
	 * @name getEntityFields
	 * @description 
	 * Returns all the fields of the {@link Metadata.Entity `entity metadata`} you give as input. This moves bottom-up through all hierarchy of entities, fetching all the fields from upper-level entities too. 

	 * @param {Object} entity
	 <span class="label type-hint type-hint-object">{@link Metadata.Entity Entity}</span>
	 The name of the entity to get it's metadata.
	 */
	 getEntityFields: function(entity) {

		// Get direct fields
		var fields = angular.copy(entity.fields);

		// Does it have a superClass?
		// TODO Follow hierarchy
		if(entity.superClass) {
			var superClass = this.getMetadata(entity.superClass);

			// Get the entity configuration
			var entityConfiguration = entity.configuration;

			var superFields = superClass.fields;
			var superFieldsCopy = [];
			for(var i = 0; i < superFields.length; i++) {
				// Is there any IGNORE_PARENT_FIELD configuration?
				var ignore = false;
				for(var f = 0; f < entityConfiguration.length; f++) {
					var param = entityConfiguration[f];

					if(param.key === this.constants.CONFIGURATION_IGNORE_PARENT_FIELD) {
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
	 * @methodOf Standards.Tools
	 * @name getEntityId
	 * @description
	 * Returns the ID of an entity, or 'new' if the entity is not provided or the id does not exist
	 * @param {Object} metadata Entity metadata information
	 * @param {Object} entity The entity to retrieve the id from
	 * @param {Boolean} fieldName If true, returns only the name of the field
	 * @returns {Number} The id of the entity
	 */
	 getEntityId: function(metadata, entity, fieldName) {
	 	var id = this.constants.NEW_ENTITY_ID;

	 	var fields = this.getEntityFields(metadata);
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
	 * @methodOf Standards.Tools
	 * @name getEntityCode
	 * @description
	 * Returns the code of an entity, or 'new' if the entity is not provided or the code does not exist
	 * @param {Object} metadata Entity metadata information
	 * @param {Object} entity The entity to retrieve the code from
	 * @param {Boolean} fieldName If true, returns only the name of the field
	 * @returns {string} The code of the entity
	 */
	 getEntityCode: function(metadata, entity, fieldName) {
	 	var code = null;

	 	var fields = this.getEntityFields(metadata);
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
	 * @methodOf Standards.Tools
	 * @name getEntityLabel
	 * @description
	 * Returns the label of an entity, or 'new' if the entity is not provided or the label does not exist
	 * @param {Object} metadata Entity metadata information
	 * @param {Object} entity The entity to retrieve the label from
	 * @param {Boolean} fieldName If true, returns only the name of the field
	 * @returns {string} The label of the entity
	 */
	 getEntityLabel: function(metadata, entity, fieldName) {
	 	var label = null;

	 	var fields = this.getEntityFields(metadata);
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
	 * @methodOf Standards.Tools
	 * @name getEntityCategories
	 * @description
	 * Returns all Categories for an entity 
	 * @param {Object} entity Entity metadata information
	 * @returns {Array} All Categories for that entity type
	 */
	 getEntityCategories: function(entity, level) {

	 	var categories = [];

	 	var fields = this.getEntityFields(entity);

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
	 * @methodOf Standards.Tools
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
			var superClass = this.getMetadata(entity.superClass);

			// Concat the fieldsets of the superclass
			fieldsets = fieldsets.concat(superClass.fieldSets);
		}

		return fieldsets;
	},

	/**
	 * @ngdoc method
	 * @methodOf Standards.Tools
	 * @name init
	 * @description
	 * Initialises the tools. It needs to receive the metadata (see how we used this method on the {@link Standards.Apps}).
	 *
	 * @param {Object} metadata
	 The metadata object to store within the tools
	 */
	init: function(metadata) {
		/**
		 * @ngdoc object
		 * @propertyOf Standards.Tools
		 * @name metadataObject
		 * @description
		 * Stores the metadata object. This metadata object is stored in the {@link Standards.Tools#methods_init `init`} method call, once you have your metadata to initialise Konga
		 *
		 */
		this.metadataObject = metadata;
	},

	constants: {

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
		RESULTS_CUSTOM_VIEW 				: 'RESULTS_CUSTOM_VIEW',

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
		HIDE_WHEN_UPDATING 					: 'hide-when-updating',

		'FIELD_TYPE_CUSTOM' 				: 'CUSTOM',
		'CUSTOM_FIELD_TYPE' 				: 'CUSTOM_FIELD_TYPE',
		'RESULTS_CUSTOM_FIELD_TYPE' 		: 'RESULTS_CUSTOM_FIELD_TYPE',

		'SHOW_HINT_SEARCH' 					: 'SHOW_HINT_SEARCH',
		'SHOW_HINT_UPDATE' 					: 'SHOW_HINT_UPDATE',
		'NUMBER_CONF_STEP' 					: 'NUMBER_CONF_STEP'
	}
});

