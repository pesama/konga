'use strict';

/**
 * @ngdoc service
 * @name sigmaNgApp.Api
 * @description
 * This factory connects the source to a factory, depending on the type of entity that's being looked for. 
 */
angular.module('sigmaNgApp')
  .factory('api', function (Agences, Chantiers, CtrOperat, Secteures, Societes, Metiers, Devise, CodeRef, RefSimplifie, CtrMecanique, UniteMesure, Utilisateurs, PosteTec, PosteDepense, Role, Action, Dossier, RubDepense, CodeTva, CompteComptable, Glac) {

    // Public API here
    return {
      getLocalEndpoint : function (source) {
        var endpoint = null;
        switch(source) {
        case constants.SOURCE_ENTITY_CTR_OPERAT:
          endpoint = CtrOperat;
          break;
        case constants.SOURCE_ENTITY_METIER:
          endpoint = Metiers;
          break;
        case constants.SOURCE_ENTITY_SOCIETES:
          endpoint = Societes;
          break;
        case constants.SOURCE_ENTITY_AGENCES:
          endpoint = Agences;
          break;
        case constants.SOURCE_ENTITY_SECTEURES:
          endpoint = Secteures;
          break;
        case constants.SOURCE_ENTITY_CHANTIERS:
          endpoint = Chantiers;
          break;
        case constants.SOURCE_ENTITY_CTR_MECANIQUE:
            endpoint = CtrMecanique;
            break;
   
        case constants.SOURCE_ENTITY_UTILISATEURS:
            endpoint = Utilisateurs;
            break;
        case constants.SOURCE_ENTITY_POSTETECHNIQUE:
        	endpoint = PosteTec;
        	break;
        case constants.SOURCE_ENTITY_POSTEDEPENSE:
           	endpoint = PosteDepense;
        	break;
        case constants.SOURCE_ENTITY_CODETVA:
           	endpoint = CodeTva;
        	break;	
        
        /*
         * Util entities
         */
        case constants.SOURCE_DEVISE:
          endpoint = Devise;
          break;
        case constants.SOURCE_METADATA:
          endpoint = Agences;
          break;
          
        /*
         * Not entity ENTITY 
         */  
        case constants.SOURCE_CODE_REF:
            endpoint = CodeRef;
            break;
        case constants.SOURCE_REF_SIMPLIFIE:
            endpoint = RefSimplifie;
            break;
            
        case constants.SOURCE_UNITE_MESURE:
            endpoint = UniteMesure;
            break;
        case constants.SOURCE_ROLE:
            endpoint = Role;
            break;
        case constants.SOURCE_ACTION:
            endpoint = Action;
            break;
        case constants.SOURCE_RUBDEPENSE:
            endpoint = RubDepense;
            break;    
        case constants.SOURCE_DOSSIER:
            endpoint = Dossier;
            break; 
        case constants.SOURCE_COMPTE_COMPTABLE:
            endpoint = CompteComptable;
            break; 
        case constants.SOURCE_GLAC:
            endpoint = Glac;
            break;
        }
        
        return endpoint;
      }
    };
  });

// Document the operations
/**
 * @ngdoc method
 * @name get
 * @methodOf sigmaNgApp.Api
 * @description
 * Returns an entity identified with the unique id provided
 * @param {*} id The unique id for the entity
 * @param {Function} [success=undefined] Function to call if the operation successes.
 * @param {Function} [error=undefined] Function to call if the operation fails.
 * @returns {Object} The `$resource` with that entity
 */

 /**
 * @ngdoc method
 * @name search
 * @methodOf sigmaNgApp.Api
 * @description
 * Search for entities filtering with the input query
 * @param {Object} query Query to filter with (sent via `GET` parameters, so they must be serializable, and serialized).
 * @param {Number} offset Defines where to place the starting cursor.
 * @param {Number} limit Defines how many results to get.
 * @param {Function} [success=undefined] Function to call if the operation successes.
 * @param {Function} [error=undefined] Function to call if the operation fails.
 * @returns {Array} Array containing all results. Each result is a `$resource` that contains an entity which matched the search criteria.
 */