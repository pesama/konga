'use strict';
/**
 * @author mdaouda2, edenis2
 */
describe('Filter: onlyCodeEds', function () {

  // load the filter's module
  beforeEach(module('sigmaNgApp'));

  // initialize a new instance of the filter before each test
  var onlyCodeEds;
  beforeEach(inject(function ($filter) {
    onlyCodeEds = $filter('onlyCodeEds');
  }));

//check if a onlyCodeEds is defined :
  it('check if onlyCodeEds is defined ', function () {
   
    expect(onlyCodeEds).toBeDefined();
	});
	

  //test with a wrong param
   it('test with a wrong param', function () {
    var test1 = 'ok';
    expect(onlyCodeEds(test1)).toEqual([undefined, undefined]);
  });
  
   //Test with a table of one value
   it('should return the only value the table "[ok]"', function () {
    var test2 = [{"key":'ok' }];
    expect(onlyCodeEds(test2)).toEqual(['ok']);
  });
  
  //Test with a table of two value but the first value is wrong 
  it('should return the second value "{ key : 10}" ', function () {
   
   var test3 = [{ "wrong" : '3'}, { "key" : '10'}];
  expect(onlyCodeEds(test3)).toEqual([ undefined, '10' ]);
  });
  
  //Test with a table of two value but the second value is wrong 
  it('should return the second value "{ key : 10}" ', function () {
   
   var test4 = [{ "key" : '3'}, { "wrong" : '10'}];
  expect(onlyCodeEds(test4)).toEqual( [ '3', undefined ]);
  });
  
  //Test with a table of two value 
  it('should return the first value of the key in a table  [ 5, 10 ] ', function () {
   
   var test5 = [{ "key" : '5'}, {"key" : '10'}];
  expect(onlyCodeEds(test5)).toEqual( [ '5', '10' ]);
  });
  
//Test with a table of two value TODO Controle de gestion
  it('should return  [ 5, 5 ] ', function () {
   
   var test5 = [{ "key" : '5'}, {"key" : '5'}];
  expect(onlyCodeEds(test5)).toEqual( [ '5','5']);
  });

});
