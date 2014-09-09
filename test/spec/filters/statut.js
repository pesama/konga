'use strict';
/**
 * @author edenis2
 */
describe('Filter: statut', function() {

	// load the filter's module
	beforeEach(module('sigmaNgApp'));

	// initialize a new instance of the filter before each test
	var statut;
	beforeEach(inject(function($filter) {
		statut = $filter('statut');
	}));

	it('should verify if the filter is available/loaded', function() {
		expect(statut).toBeDefined();
	});

	it('should show "message.radio.active" ', function() {
		expect(statut(true)).toBe('message.radio.active');
	});

	it('should show "message.radio.inactive" ', function() {
		expect(statut(false)).toBe('message.radio.inactive');
	});
});