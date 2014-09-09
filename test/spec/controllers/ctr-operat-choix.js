'use strict';

describe('Controller: CtrOperatChoixCtrl', function() {
	// load the controller's module
	beforeEach(module('sigmaNgApp'));

	var MockCommon = {
		hasCallCommonStoreService : false,
		init : function() {
			this.hasCallCommonStoreService = false;
		},
		store : function(key, value) {
			this.hasCallCommonStoreService = true;
		}
	};
	var MockOperations = {
		hasCallCompleteAuthentication : false,
		hasCallAlert : false,
		init : function() {
			this.hasCallCompleteAuthentication = false;
			this.hasCallAlert = false;
		},
		completeAuthentication : function(ctrOperat) {
			this.hasCallCompleteAuthentication = true;
		},
		addAlert : function(type, message) {
			this.hasCallAlert = true;
		}
	};
	var MockCtrOperat = {
		hasCallCtrOperat : false,
		init : function() {
			this.hasCallCtrOperat = false;
		},
		get : function(data, success, failure) {
			this.hasCallCtrOperat = true;
			if (data.id == 123) {
				return success(Mock.CtrOperat.newMock())
			} else {
				return failure(Mock.CtrOperat.newMock())
			}
		}
	};
	var hasCallLogout = false;
	var MockLogout = function() {
		hasCallLogout = true;
	};
	var CtrOperatChoixCtrl, scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function($controller, $rootScope) {
		scope = $rootScope.$new();
		scope.saveSessionInformation(Mock.User.newMock());
		$rootScope.operations = MockOperations;
		scope.logout = MockLogout;
		CtrOperatChoixCtrl = $controller('CtrOperatChoixCtrl', {
			$rootScope : $rootScope,
			$scope : scope,
			common : MockCommon,
			CtrOperat : MockCtrOperat
		});
	}));

	it('should be affect by default to user ctrOperationnel', function() {
		expect(scope.ctrOperatChoix.selectedCtrOperat).toBe(scope.user.ctrOperationnel.id);
	});

	it('validate should store ctrOperat and call completeAuthentication', function() {
		var id = 123;
		scope.ctrOperatChoix.selectedCtrOperat = id;
		MockCtrOperat.init();
		MockCommon.init();
		MockOperations.init();
		hasCallLogout = false;
		scope.valider();
		expect("MockCtrOperat:" + MockCtrOperat.hasCallCtrOperat).toBe("MockCtrOperat:" + true);
		expect("MockCommon:" + MockCommon.hasCallCommonStoreService).toBe("MockCommon:" + true);
		expect("MockOperations:complete" + MockOperations.hasCallCompleteAuthentication).toBe(
				"MockOperations:complete" + true);
		expect("MockOperations:alert" + MockOperations.hasCallAlert).toBe("MockOperations:alert" + false);
		expect("hasCallLogout:" + hasCallLogout).toBe("hasCallLogout:" + false);
	});

	it('validate should call logout on error', function() {
		var id = 456;
		scope.ctrOperatChoix.selectedCtrOperat = id;
		MockCtrOperat.init();
		MockCommon.init();
		MockOperations.init();
		hasCallLogout = false;
		scope.valider();
		expect("MockCtrOperat:" + MockCtrOperat.hasCallCtrOperat).toBe("MockCtrOperat:" + true);
		expect("MockCommon:" + MockCommon.hasCallCommonStoreService).toBe("MockCommon:" + false);
		expect("MockOperations:complete" + MockOperations.hasCallCompleteAuthentication).toBe(
				"MockOperations:complete" + false);
		expect("hasCallLogout:" + hasCallLogout).toBe("hasCallLogout:" + true);
		expect("MockOperations:alert" + MockOperations.hasCallAlert).toBe("MockOperations:alert" + false);
	});

	it('validate should not call CtrOperat when no id defined', function() {
		var id = null;
		scope.ctrOperatChoix.selectedCtrOperat = id;
		MockCtrOperat.init();
		MockCommon.init();
		MockOperations.init();
		hasCallLogout = false;
		scope.valider();
		expect("MockCtrOperat:" + MockCtrOperat.hasCallCtrOperat).toBe("MockCtrOperat:" + false);
		expect("MockCommon:" + MockCommon.hasCallCommonStoreService).toBe("MockCommon:" + false);
		expect("MockOperations:complete" + MockOperations.hasCallCompleteAuthentication).toBe(
				"MockOperations:complete" + false);
		expect("hasCallLogout:" + hasCallLogout).toBe("hasCallLogout:" + false);
		expect("MockOperations:alert" + MockOperations.hasCallAlert).toBe("MockOperations:alert" + true);
	});
});
