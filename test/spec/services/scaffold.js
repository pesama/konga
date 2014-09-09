'use strict';
/**
 * @author edenis2
 */
describe('Service: scaffold', function() {

	// load the service's module
	beforeEach(module('sigmaNgApp'));

	// instantiate service
	var scaffold;
	beforeEach(inject(function(_scaffold_) {
		scaffold = _scaffold_;
	}));

	it('checks array', function() {
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
		var meta = {
			"fields" : [ fieldArray ]
		};
		function MyObject() {
			this.myArrayField = [ '123', '456' ];
		}
		var entity = scaffold.newEntity(meta, MyObject);
		expect(entity.myArrayField).not.toBe(null);
		expect(entity.myArrayField.length).toBe(0);
	});

	it('checks boolean', function() {
		var fieldBoolean = {
			"multiplicity" : constants.MULTIPLICITY_ONE,
			"fieldType" : constants.FIELD_BOOLEAN,
			"defaultValue" : 'true',
			"isPrimary" : false,
			"isKey" : false,
			"related" : null,
			"realFieldName" : null,
			"fieldName" : 'myBooleanField'
		}
		var meta = {
			"fields" : [ fieldBoolean ]
		};
		function MyObject() {
			this.myBooleanField = true;
		}
		var entity = scaffold.newEntity(meta, MyObject);
		expect(entity.myBooleanField).toBe(true);
	});

	it('checks date', function() {
		var fieldDate = {
			"multiplicity" : constants.MULTIPLICITY_ONE,
			"fieldType" : constants.FIELD_DATE,
			"defaultValue" : constants.DATE_DEFAULT_NOW,
			"isPrimary" : false,
			"isKey" : false,
			"related" : null,
			"realFieldName" : null,
			"fieldName" : 'myDateField'
		}
		var meta = {
			"fields" : [ fieldDate ]
		};
		function MyObject() {
			this.myDateField = '00';
		}
		var entity = scaffold.newEntity(meta, MyObject);
		expect(entity.myDateField).toEqual(jasmine.any(Number));
		expect(entity.myDateField).toBeCloseTo(((new Date().getTime()) / 1000) | 0);
	});

	it('checks with other', function() {
		var fieldIndirect = {
			"multiplicity" : constants.MULTIPLICITY_MANY,
			"fieldType" : constants.FIELD_TEXT,
			"defaultValue" : 'test',
			"isPrimary" : false,
			"isKey" : true,
			"related" : true,
			"realFieldName" : 'myIndirectField',
			"fieldName" : 'myOtherField'
		}
		var meta = {
			"fields" : [ fieldIndirect ]
		};
		function MyObject() {
			this.myIndirectField = 'realField';
			this.myOtherField = 'test';
		}
		var entity = scaffold.newEntity(meta, MyObject);
		expect(entity.myIndirectField).toBe(null);
	});

	it('checks new query', function() {
		var fieldSearch = {
			"searchable" : true,
			"multiplicity" : constants.MULTIPLICITY_ONE,
			"fieldType" : constants.FIELD_DATE,
			"defaultValue" : null,
			"isPrimary" : false,
			"isKey" : false,
			"related" : false,
			"realFieldName" : null,
			"fieldName" : 'mySearchDate'
		}
		var meta = {
			"fields" : [ fieldSearch ]
		};
		var entity = scaffold.newQuery(meta);
		expect(entity).not.toBe(null);
		expect(entity.mySearchDate).not.toBe(null);
		expect(entity.mySearchDate.startDate).toBe(0);
		expect(entity.mySearchDate.endDate).toBe(0);
		expect(entity.mySearchDate.comparator).toBe(
				constants.DATE_COMPARATOR_EQUALS);
	});

});
