'use strict';
/**
 * @author mdaouda2, edenis2
 */
describe('Filter: updateParams', function () {

  // load the filter's module
  beforeEach(module('sigmaNgApp'));

  // initialize a new instance of the filter before each test
  var updateParams;
  beforeEach(inject(function ($filter) {
    updateParams = $filter('updateParams');
  }));
  
//check if a updateParams is defined :
  it('check if updateParams is defined ', function () {
   
   expect(updateParams).toBeDefined();

  });
  
  //test with a wrong objet 
  it('Should return [] ', function () {
   
   var test1= 'vide';
   expect(updateParams(test1)).toEqual([]);
   
   var field1 = { "direct":'devis' };
   var field2 = {"isKey": 'devisKey', "isId":'devisId'};
   
   var test2= { "fields" : [field1]} ;
   expect(updateParams(test2)).toEqual([]);
   var test3= { "fields" : [field2]} ;
    expect(updateParams(test3)).toEqual([]);
   

  });
  
  //test with a TABLE OF ONE OBJET 
  it('Should return [field1] ', function () {
  
   var field1 = { "showInUpdate": 'devisUpdate' };
   
   var test4= { "fields" : [field1]} ;
   expect(updateParams(test4)).toEqual([field1]);

  });
  
//test with a TABLE OF MANY OBJET 
  
   it('Should return [field1,field2,field3]', function () {
  
   var field1 = { "showInUpdate": 'devisUpdate' };
   var field2 = { "showInUpdate": 'chantierUpdate' };
   var field3 = { "showInUpdate": 'agenceUpdate' };
   var test5= { "fields" : [field1,field2,field3]} ;
   expect(updateParams(test5)).toEqual([field1,field2,field3]);

  });
  
});
