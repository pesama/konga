'use strict';

describe('Controller: CtroperatcreatectrlCtrl', function () {
	var CtroperatcreatectrlCtrl, rootScope, scope, httpMock, CtrOperat, routeParams, entityMetadata;


  // load the controller's module
  beforeEach(module('sigmaNgApp'));

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
				var entityMetadata = {};
				entityMetadata.societes = [ Mock.Societe.newMock() ];
				entityMetadata.agences = [ Mock.Agence.newMock() ];
				entityMetadata.secteurs = [ Mock.Secteur.newMock() ];
				entityMetadata.chantieres = [];
				entityMetadata.ctrsMecaniques = [];
				return entityMetadata;
			},
			getMetadata : function(metadata, entity) {
		        switch(entity) {
		        case constants.SOURCE_ENTITY_CTR_OPERAT:
		        	return [ Mock.CtrOperat.newMock() ];
				}
			},
			store : function(key, value) {
				this.hasCallCommonStoreService = true;
			}
		};

	var MockApi = {
			getLocalEndpoint : function (source) {
				return CtrOperat;
			}
		};
	
	var MockScaffold = {
			getLocalEndpoint : function (source) {
				return CtrOperat;
			}
		};

  
  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _CtrOperat_, $httpBackend) {
	rootScope = $rootScope;
    scope = $rootScope.$new();
    scope.pageData = {};
    scope.pageData.entity = [];
    scope.selectedIds = {};
    httpMock = $httpBackend;
    CtrOperat = _CtrOperat_;
    routeParams = {};
    routeParams.entityType = constants.SOURCE_ENTITY_CTR_OPERAT;
    $rootScope.createCtrOperat = undefined;
    $rootScope.operations = MockOperations;
    CtroperatcreatectrlCtrl = $controller('CtroperatcreateCtrl', {
    	$scope: scope, $routeParams : routeParams, $rootScope : $rootScope,
    	api : MockApi, common : MockCommon, scaffold : MockScaffold
    });
  }));

	it('check createCtrOperat', function() {
		expect(rootScope.createCtrOperat).toBe(true);
	});


	it('check setSelectedAllElements secteurs', function() {
	    rootScope.ctrOperatCreationData.chantieres = [ Mock.Chantier.newMock() ];
		scope.selectedElements['secteurs'] = [ Mock.Eds.newMock().id ];
		scope.setSelectedAllElements('secteurs')
		expect(scope.pageData.entity['secteurs'].length).toBe(1);
	});

	it('check setSelectedAllElements agences', function() {
	    rootScope.ctrOperatCreationData.chantieres = [ Mock.Chantier.newMock() ];
	    rootScope.ctrOperatCreationData.secteurs = [ Mock.Secteur.newMock() ];
		scope.selectedElements['agences'] = [ Mock.Eds.newMock().id ];
		scope.setSelectedAllElements('agences')
		expect(scope.pageData.entity['agences'].length).toBe(1);
	});

	it('check setSelectedAllElements societes', function() {
	    rootScope.ctrOperatCreationData.chantieres = [ Mock.Chantier.newMock() ];
	    rootScope.ctrOperatCreationData.secteurs = [ Mock.Secteur.newMock() ];
	    rootScope.ctrOperatCreationData.agences = [ Mock.Agence.newMock() ];
	    rootScope.ctrOperatCreationData.ctrsMecaniques = [ Mock.CtrMecanique.newMock() ];
		scope.selectedElements['societes'] = [ Mock.Eds.newMock().id ];
		scope.setSelectedAllElements('societes')
		expect(scope.pageData.entity['societes'].length).toBe(1);
	});

	it('check setSelectedElements secteurs', function() {
	    rootScope.ctrOperatCreationData.chantieres = [ Mock.Chantier.newMock() ];
	    rootScope.ctrOperatCreationData.secteurs = [ Mock.Secteur.newMock() ];
	    rootScope.ctrOperatCreationData.agences = [ Mock.Agence.newMock() ];
	    rootScope.ctrOperatCreationData.ctrsMecaniques = [ Mock.CtrMecanique.newMock() ];
		scope.setSelectedElements('societes', [ Mock.Eds.newMock().id ])
		expect(scope.pageData.entity['societes'].length).toBe(1);
	});
	
	it('check validateDefault ', function() {
		scope.pageData.entity = 'societes';
		scope.validateDefault();
		expect(scope.entity).toBe('societes');
	});

	/** TODO activate and adpat for testing
	it('check cancelDefault ', function() {
		scope.cancelDefault();
		expect("Controller should be implemented").toBe('fails');
	});
	**/

	it('check validate ', function() {
		scope.selectedElements['societes'] = [ Mock.Eds.newMock().id ];
		scope.validate();
		expect(scope.entity['societes'].length).toBe(1);
	});

});

