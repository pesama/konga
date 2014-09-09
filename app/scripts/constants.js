'use strict';

/**
 * @ngdoc object
 * @name sigmaTools.Constants
 * @description
 * Stores common constants used all across the application
 * @property {String} API_HOST Defines where is the api located
 * @property {String} ENTITY_ID_PREFFIX Defines the preffix for ENTITY operations
 * @property {String} SEARCH_SUFFIX Defines the suffix for search purposes
 * @property {String} STRING_SEPARATOR Defines the separator for Strings
 * @property {String} NEW_ENTITY_ID Defines the eds id when creating a new one
 * @property {String} SOURCE_METADATA Defines the entity name of the metadata
 * @property {String} SOURCE_ENTITY_AGENCES Defines the entity name of the agences
 * @property {String} SOURCE_ENTITY_CHANTIERS Defines the entity name of the chantiers
 * @property {String} SOURCE_ENTITY_CTR_OPERAT Defines the entity name of the centres opérationels
 * @property {String} SOURCE_ENTITY_SECTEURES Defines the entity name of the secteures
 * @property {String} SOURCE_ENTITY_SOCIETES Defines the entity name of the societés
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
	
	API_HOST 						: 'http://localhost:8080/sigma-ihm/api',      //local
	//API_HOST 						: 'http://20.34.36.150:8080/sigma-ihm/api',   //serve

	ALERT_TYPE_ERROR 				: 'danger',
	ALERT_TYPE_SUCCESS 				: 'success',
	ALERT_TYPE_DEFAULT 				: 'default',

	ENTITY_ID_PREFFIX 				: 'eds_',

	SEARCH_SUFFIX 					: '_search',

	STRING_SEPARATOR				: '_',

	NEW_ENTITY_ID 					: 'new',
	 

	SOURCE_METADATA					: 'metadata',
	SOURCE_DEVISE 					: 'devise',

	SOURCE_ENTITY_AGENCES			: 'Agence',
	SOURCE_ENTITY_CHANTIERS			: 'Chantier',
	SOURCE_ENTITY_CTR_OPERAT		: 'CtrOperat',
	SOURCE_ENTITY_SECTEURES			: 'Secteur',
	SOURCE_ENTITY_SOCIETES			: 'Societe',
	SOURCE_ENTITY_METIER 			: 'Metier',
	SOURCE_CODE_REF 				: 'codeRef',
	SOURCE_REF_SIMPLIFIE 			: 'refSimplifie',
	SOURCE_ENTITY_CTR_MECANIQUE 	: 'ctrMecanique',
	SOURCE_UNITE_MESURE 	 		: 'uniteMesure',
	SOURCE_ENTITY_POSTEDEPENSE  	: 'posteDepense',
	SOURCE_ENTITY_POSTETECHNIQUE	: 'posteTechnique',
	SOURCE_RUBDEPENSE 				: 'rubDepense',
	SOURCE_ENTITY_CODETVA			: 'codeTva',
	SOURCE_ENTITY_UTILISATEURS 		: 'user',
	SOURCE_ROLE			 	 		: 'role',
	SOURCE_ACTION					: 'action',
	SOURCE_DOSSIER					: 'dossier',
	SOURCE_COMPTE_COMPTABLE			: 'compteComptable',
	SOURCE_GLAC						: 'glac',
	
	SCOPE_SEARCH 					: 'search',
	SCOPE_UPDATE 					: 'update',

	FIELD_PLAIN 					: 'PLAIN',
	FIELD_BOOLEAN 					: 'BOOLEAN',
	FIELD_CHECKBOX 					: 'CHECKBOX',
	FIELD_DATE 						: 'DATE',
	FIELD_DATESEARCH 				: 'DATE-SEARCH',
	FIELD_TEXT 						: 'TEXT',
	FIELD_TEXTAREA 					: 'TEXTAREA',
	FIELD_COMPLEX 					: 'COMPLEX',
	FIELD_LIST 						: 'LIST',
	// FIELD_LIST_SEARCH				: 'list_search',
	// FIELD_LIST_LINK					: 'list_link',

	DATE_DEFAULT_NOW 				: 'now',


	MULTIPLICITY_ONE 				: 'ONE',
	MULTIPLICITY_MANY 				: 'MANY',

	TRIGGER_MOMENT_IMMEDIATE 		: 'IMMEDIATE',

	TRIGGER_ACTION_CONFIRM 			: 'CONFIRM',

	CASCADE_FORM 					: 'CASCADE',
	TABBED_FORM 					: 'TABBED',

	LANGUAGE_MESSAGE_PREFFIX 		: 'message.languages.',

	DATE_COMPARATOR_LOWER_THAN 		: 'LOWER_THAN',
	DATE_COMPARATOR_LOWER_EQUALS 	: 'LOWER_EQUALS',
	DATE_COMPARATOR_EQUALS 			: 'EQUALS',
	DATE_COMPARATOR_GREATER_EQUALS 	: 'GREATER_EQUALS',
	DATE_COMPARATOR_GREATER_THAN 	: 'GREATER_THAN',
	DATE_COMPARATOR_BETWEEN 		: 'BETWEEN'
};