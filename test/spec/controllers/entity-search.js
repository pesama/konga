'use strict';

describe('Controller: EntitySearchCtrl', function() {
	// load the controller's module
	beforeEach(module('sigmaNgApp'));

	var EntitySearchCtrl, rootScope, scope, routeParams, httpMock, CtrOperat, timeout;

	var MockOperations = {
		hasCallRequestLoading : false,
		hasCallFreeLoading : false,
		init : function() {
			this.hasCallRequestLoading = false;
			this.hasCallFreeLoading = false;
		},
		requestLoading : function(source) {
			this.hasCallRequestLoading = true;
		},
		freeLoading : function(source) {
			this.hasCallFreeLoading = true;
		}
	};

	var MockCommon = {
		hasCallCommonStoreService : false,
		init : function() {
			this.hasCallCommonStoreService = false;
		},
		read : function(key) {
			switch (key) {
			case 'metadata':
				var fieldArray = {
					"multiplicity" : constants.MULTIPLICITY_MANY,
					"fieldType" : constants.FIELD_TEXT,
					"defaultValue" : 'test',
					"isPrimary" : false,
					"isKey" : false,
					"related" : null,
					"realFieldName" : null,
					"fieldName" : 'myArrayField'
				}
				var entityMetadata = {
					"fields" : [ fieldArray ]
				};
				return entityMetadata;

			case 'product-codes':
				return {
					nousage : true
				};
			}
		},
		getMetadata : function(metadata, entity) {
			switch (entity) {
			case constants.SOURCE_ENTITY_CTR_OPERAT:
				var centre = [ Mock.CtrOperat.newMock() ];
				var fieldArray = {
					"multiplicity" : constants.MULTIPLICITY_ONE,
					"fieldType" : constants.FIELD_TEXT,
					"defaultValue" : 'test',
					"isPrimary" : false,
					"isKey" : false,
					"related" : null,
					"realFieldName" : null,
					"fieldName" : 'myArrayField'
				}

				centre.fields = [ fieldArray ];
				return centre;
			}
		},
		store : function(key, value) {
			this.hasCallCommonStoreService = true;
		}
	};

	var MockApi = {
		getLocalEndpoint : function(source) {
			return CtrOperat;
		}
	};

	var MockScaffold = {
		newQuery : function(metadata) {
			return {};
		}
	};

	// Initialize the controller and a mock scope
	beforeEach(inject(function($controller, $rootScope, $httpBackend, _CtrOperat_, $timeout) {
		timeout= $timeout;
		CtrOperat = _CtrOperat_;
		scope = $rootScope.$new();
		rootScope = $rootScope;
	    httpMock = $httpBackend;
	    httpMock.whenGET (/^\/locale.*/).respond({});
		httpMock.whenGET (/^views.*/).respond({});
		routeParams = {};
		routeParams.entityType = constants.SOURCE_ENTITY_CTR_OPERAT;
		$rootScope.operations = MockOperations;
		$rootScope.pageData = {};
		$rootScope.pageData.init = false;
		EntitySearchCtrl = $controller('EntitySearchCtrl', {
			$scope : scope,
			$routeParams : routeParams,
			api : MockApi,
			common : MockCommon,
			scaffold : MockScaffold
		});
	}));

	it('submit search', function() {
		var response = {
			"total" : "3",
			"ctrOperats" : [ Mock.CtrOperat.newMock(), Mock.CtrOperat.newMock(), Mock.CtrOperat.newMock() ]
		};
		httpMock.when('GET', /^.*ctroperat.*/).respond(angular.toJson(response));
		scope.submit();
		var promise = scope.searchResults.$promise;	    
	    promise.then(function(message) {
			expect("searchResults:" + scope.searchResults.length).toBe("searchResults:3");
	    }, function(error){
	        expect("submit search received error: " + error).toFail();
	    });
		httpMock.flush();
	});

	it('check closeFiltre', function() {
		scope.closeFiltre();
		expect("filterHideBtn:" + scope.filterHideBtn).toBe("filterHideBtn:false");
		expect("filterClass:" + scope.filterClass).toBe("filterClass:filterHide");
		expect("resultTableWidth:" + scope.resultTableWidth).toBe("resultTableWidth:widthUp");
	});

	it('check openFiltre', function() {
		scope.openFiltre();
		expect("filterHideBtn:" + scope.filterHideBtn).toBe("filterHideBtn:true");
		expect("filterClass:" + scope.filterClass).toBe("filterClass:filterShow");
		expect("resultTableWidth:" + scope.resultTableWidth).toBe("resultTableWidth:widthDown");
	});
});
