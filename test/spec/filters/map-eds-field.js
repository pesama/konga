'use strict';
/**
 * @author mdaouda2, edenis2
 */
describe('Filter: mapEdsField', function () {

  // load the filter's module
  beforeEach(module('sigmaNgApp'));

  // initialize a new instance of the filter before each test
  var mapEdsField;
  beforeEach(inject(function ($filter) {
    mapEdsField = $filter('mapEdsField');
  }));

//check if a searchParams is defined :
  it('should check if mapEdsField is defined ', function () {
   expect(mapEdsField).toBeDefined();
  });

//test with an empty value
  it('should return null', function () {
  expect(mapEdsField()).toBe(null);
  });

 //test with a wrong path
  it('should return the value null', function () {
    var entity = {"param1":null};
	var path = "param1";
    expect(mapEdsField(entity,path)).toBe(null);
  });

  //test with correct inputs
  it('should work', function () {
	  var field = {"departement":'testdpt'}
	  var entity = {"param1":field};

   expect(mapEdsField(entity,"param1.departement")).toEqual('testdpt');
   expect(mapEdsField(entity,"param1")).toBe(field);

  });
});