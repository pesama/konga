'use strict';
/**
 * @author mdaouda2, edenis2
 */
describe('Filter: onlyIdEds', function () {

  // load the filter's module
  beforeEach(module('sigmaNgApp'));

  // initialize a new instance of the filter before each test
  var onlyIdEds;
  beforeEach(inject(function ($filter) {
    onlyIdEds = $filter('onlyIdEds');
  }));

//check if a onlyIdEds is defined :
  it('check if onlyIdEds is defined ', function () {
   
    expect(onlyIdEds).toBeDefined();
  });
  
  //test with a wrong param
   it('test with a wrong param', function () {
    var test1 = 'ok';
    expect(onlyIdEds(test1)).toEqual([undefined, undefined]);
  });
  
   //Test with a table of one value
   it('should return the only value the table "[ok]"', function () {
    var test2 = [{"id":'ok' }];
    expect(onlyIdEds(test2)).toEqual(['ok']);
  });
  
  //Test with a table of two value but the first value is wrong 
  it('should return the second value "{ id : 10}" ', function () {
   
   var test3 = [{ "wrong" : '3'}, { "id" : '10'}];
  expect(onlyIdEds(test3)).toEqual([ undefined, '10' ]);
  });
  
  //Test with a table of two value but the second value is wrong 
  it('should return the second value "{ id : 10}" ', function () {
   
   var test4 = [{ "id" : '3'}, { "wrong" : '10'}];
  expect(onlyIdEds(test4)).toEqual( [ '3', undefined ]);
  });
  
  //Test with a table of two value 
  it('should return the first value of the id in a table  [ 5, 10 ] ', function () {
   
   var test5 = [{ "id" : '5'}, {"id" : '10'}];
  expect(onlyIdEds(test5)).toEqual( [ '5', '10' ]);
  });
  
  //Test with a table of two same value 
  it('should return  [ 5, 5 ] ', function () {
   
   var test5 = [{ "id" : '5'}, {"id" : '5'}];
  expect(onlyIdEds(test5)).toEqual( [ '5','5']);
  });
  
});
