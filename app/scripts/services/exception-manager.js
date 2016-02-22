'use strict';

/*
 * @ngdoc service
 * @name konga.exceptionManager
 * @description
 * # exceptionManager
 * Service in the konga.
 */
angular.module('konga')
  .service('exceptionManager', ['util', function exceptionManager(util) {
	  this.analyzeException = function(params){
		  //var entityId = params.id;
	  	  var $rootScope = params.dependencyInjector.get('$rootScope');
	  	  var $filter = params.dependencyInjector.get('$filter');
	  		  var $scope = params.self;
	      var error = params.error;
	      var exceptionCode;
	      
	      if (error.data.length)
	    	  exceptionCode = error.data && error.data.length ? error.data[0].exceptionCode : 'GENERIC_TECHNICAL_ERROR';
	      else 
	    	  exceptionCode = error.data? error.data.exceptionCode : 'GENERIC_TECHNICAL_ERROR';
	      
	      var involvedFields = "";
	      
	      // Verify if the entity is new
	      //if(entityId !== util.constants.NEW_ENTITY_ID) { 

    		  //if(error.data.exceptionCode == 'DATA_INTEGRITY_VIOLATION_SAVE_OR_UPDATE') {
			  //	 exceptionCode = 'DATA_INTEGRITY_VIOLATION_SAVE_OR_UPDATE';
	    	  //}
    		  if(error.data.exceptionCode == 'UNIQUE_CONSTRAINT_VIOLATION') {
    			  
    			  var fieldArray = $scope.entityMetadata.fields;
    			  
    			  if($scope.entityMetadata.superClass){
    				  for(var i = 0; i<$scope.metadata.entities.length; i++){
    					  if($scope.metadata.entities[i].name == $scope.entityMetadata.superClass){
    						  
    						  fieldArray = fieldArray.concat($scope.metadata.entities[i].fields);
    						  break;
    					  }
    				  }
    			  }
    			  
    			  var usedFields = [];
    			  exceptionCode = "UNIQUE_CONSTRAINT_VIOLATION";
    			  for(var ind = 0; ind <error.data.fieldNames.length; ind++){
	    			  for(var i = 0; i<fieldArray.length; i++){
	    				  if(error.data.fieldNames[ind] == fieldArray[i]["name"] && usedFields.indexOf(fieldArray[i]["name"]) < 0){
	    					  usedFields.push(fieldArray[i]["name"]);
	    					  if(ind > 0){
	    						  involvedFields += ", ";
	    					  }
	    					  if($scope.entityMetadata.superClass){
	    						  
	    						  var owner = $filter('translate')(fieldArray[i].owner ? $scope.entityMetadata.label : "");
	    						  
	    						  involvedFields += $filter('translate')(fieldArray[i].label, {label:owner});
	    					  }
	    					  else{
	    						  involvedFields += $filter('translate')(fieldArray[i].label);
	    					  }
	    					  
	    				  }
	    			  }
    			  }
    			  
    			  involvedFields = "("+involvedFields+")";
    			  
    		  }

	      //}
	      $rootScope.operations.addAlert(util.constants.ALERT_TYPE_ERROR, exceptionCode, {fields:involvedFields});
	  };
  }]);
