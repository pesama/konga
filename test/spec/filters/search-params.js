'use strict';
/**
 * @author mdaouda2, edenis2
 */
describe('Filter: searchParams', function () {

  // load the filter's module
  beforeEach(module('sigmaNgApp'));

  // initialize a new instance of the filter before each test
  var searchParams;
  beforeEach(inject(function ($filter) {
    searchParams = $filter('searchParams');
  }));
  
//check if a searchParams is defined :
  it('check if searchParams is defined ', function () {
   
   expect(searchParams).toBeDefined();

  });
  
  //test with a wrong objet 
  it('Should return [] ', function () {
   
   var test1= 'vide';
   expect(searchParams(test1)).toEqual([]);
   
   var field1 = { "direct":'devis' };
   var field2 = {"isKey": 'devisKey', "isId":'devisId'};
   
   var test2= { "fields" : [field1]} ;
   expect(searchParams(test2)).toEqual([]);
   
   var test3= { "fields" : [field2]} ;
    expect(searchParams(test3)).toEqual([]);
   
  });
  
   
   //test with a TABLE OF ONE OBJET 
  it('Should return [field1] ', function () {
  
   var field1 = { "searchable": 'devisUpdate' };
   
   var test4= { "fields" : [field1]} ;
   expect(searchParams(test4)).toEqual([field1]);

  });
  
//test with a TABLE OF MANY OBJET 
  
   it('Should return [field1,field2,field3]', function () {
  
   var field1 = { "searchable": 'devisSearch' };
   var field2 = { "searchable": 'chantierSearch' };
   var field3 = { "searchable": 'agenceSearch' };
   var test5= { "fields" : [field1,field2,field3]} ;
   expect(searchParams(test5)).toEqual([field1,field2,field3]);

  });
  
});
