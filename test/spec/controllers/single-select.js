'use strict';
/**
 * edenis2
 */

describe('Controller: SingleSelectCtrl', function() {

	// load the controller's module
	beforeEach(module('sigmaNgApp'));

	var SingleSelectCtrl, scope;
	var MockItems = [['key1','value1'],['key2','value2']];
	var MockModel = {
		text : '0',
		ids : '0'
	};
	var MockModalInstance = {
		hasCallClose : false,
		hasCallDismiss : false,

		close : function(value) {
			this.hasCallClose = true;
		},
		dismiss : function(value) {
			this.hasCallDismiss = true;
		}
	}

	// Initialize the controller and a mock scope
	beforeEach(inject(function($controller, $rootScope) {
		scope = $rootScope.$new();

		SingleSelectCtrl = $controller('SingleSelectCtrl', {
			$scope : scope,
			$modalInstance : MockModalInstance,
			items : MockItems,
			model : MockModel
		});
	}));

	it('calls MockModalInstance.close ', function() {
		scope.singleselectModal.save();
		expect(MockModalInstance.hasCallClose).toBe(true);
	});

	it('calls MockModalInstance.dismiss ', function() {
		scope.singleselectModal.cancel();
		expect(MockModalInstance.hasCallDismiss).toBe(true);
	});

	it('calls init', function() {
		scope.sourceList = MockItems;
		scope.operations.init();
		expect(scope.sourceList.length).toBe(2);
		expect(scope.sourceList[0].id).toEqual('0');
	});
	
	it('calls init and match the if condition', function() {
		scope.sourceList = MockItems;
		scope.selected=null 
		scope.model=MockModel 
		scope.operations.init();
		expect(scope.sourceList.length).toBe(2);
		expect(scope.sourceList[0].id).toEqual('0');
		expect(scope.selected).toBe(scope.sourceList[0]);
	});

	it('calls toggle with the item already selected', function() {
		var Items = [ [ {
			key : 1,
			id : 1
		} ] ];
		var item = Items[0][0];
		scope.selected = item;
		scope.operations.toggle(item);
		expect(scope.selected).toBe(null);
		expect(scope.model.text).toBe(null);
		expect(scope.model.ids).toBe(null);
	});

	it('calls toggle with no item selected', function() {
		var Items = [ [ {
			key : 1,
			id : 1
		} ] ];
		var item = Items[0][0];
		scope.selected = null;
		scope.operations.toggle(item);
		expect(scope.selected).toBe(item);
		expect(scope.model.text).toEqual([ '1' ]);
		expect(scope.model.ids).toEqual([ 1 ]);
	});

});