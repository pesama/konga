'use strict';
/**
 * @ngdoc service
 * @name sigmaNgApp.loadUserData
 * @description
 * # loadUserData
 * Factory in the sigmaNgApp.
 */
angular.module('sigmaNgApp')
	.factory("loadDataService", function($q, $interval, $rootScope, Session){
	   return {
		   loadData: function(){
				var deferred = $q.defer();
				
				$rootScope.stopSearchingForLoadDataFunction = function(){   
					if(angular.isDefined($rootScope.stopSearchingForLoadData)){
						$interval.cancel($rootScope.stopSearchingForLoadData);
					    $rootScope.stopSearchingForLoadData = undefined;
					}
				};	
				
				if(Session!=null && Session.data!=null && Session.data.user!=null && $rootScope.pageData != null && $rootScope.mainmenu != null) {
					deferred.resolve();	
				}else{
					$rootScope.stopSearchingForLoadDataFunction();
					$rootScope.stopSearchingForLoadData = $interval(function(){					
						if(Session!=null && Session.data!=null && Session.data.user!=null && $rootScope.pageData != null && $rootScope.mainmenu != null) {
							deferred.resolve();	 
							$rootScope.stopSearchingForLoadDataFunction();	
						} 
					}, 500);
				}
				
				
				
				return deferred.promise;
			}	
	   };
});