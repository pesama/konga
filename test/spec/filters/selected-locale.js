'use strict';
/**
 * @author mdaouda2, edenis2
 */
describe('Filter: selectedLocale', function () {

  // load the filter's module
  beforeEach(module('sigmaNgApp'));

  // initialize a new instance of the filter before each test
  var selectedLocale;
  beforeEach(inject(function ($filter) {
    selectedLocale = $filter('selectedLocale');
  }));
  
  //check if a selectedLocale is defined :
  it('check if selectedLocale is defined ', function () {
   
    expect(selectedLocale).toBeDefined();
  });
    
//Test with an empty param
  it('should return  "{}" ', function () {
    var test1 = {};
    expect(selectedLocale()).toEqual(test1);
  });
  
  //Test with wrong param (the param is wrong if it is not a table)
  it('should return  "{}" ', function () {
    var test2 = 'test';
    expect(selectedLocale(test2)).toEqual({});
  });
  
  //Test with a table of one value
  it('should return the only value "{ selected : selected1}" ', function () {
   
   var test3 = [{ "selected" : 'selected1'}];
  expect(selectedLocale(test3)).toEqual({ selected : 'selected1'});
  });
  
  //Test with a table of two value but first value is wrong 
  it('should return the second value "{ selected : selected2}" ', function () {
   
   var test4 = [{ "sel" : 'selected1'}, { "selected" : 'selected2'}];
  expect(selectedLocale(test4)).toEqual({ selected : 'selected2'});
  });
  
  //Test with a table of two value 
  it('should return the first value "{ selected : selected1}" ', function () {
   
   var test5 = [{ "selected": 'selected1'}, { "selected" : 'selected2'}];
  expect(selectedLocale(test5)).toEqual({ selected : 'selected1'});
  });
  
  
  });
