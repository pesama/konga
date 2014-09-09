'use strict';
/** 
 * @author mdaouda2
 *
 */
describe('Service: Common', function () {

  // load the service's module
  beforeEach(module('sigmaNgApp'));

  // instantiate service
  var Common;
  var httpMock;
  var id = 123;
  var CtrOperatChoixCtrl, scope;
  beforeEach(inject(function (_common_,$httpBackend,$rootScope) {
    Common = _common_;
    httpMock = $httpBackend;
	httpMock.whenGET (/^\/locale.*/).respond({});
    httpMock.whenGET (/^views.*/).respond({});
    
  }));

  it('should do something', function () {
    expect(!!Common).toBe(true);
  });

//check if the test is defined
  it('Check is the test is defined', function () {
    expect(Common).toBeDefined();
  });
 
  //test the function store and read and delete
  it('Should return the id ', function () {
	  var key='ctr-operat', value= id;
	  
	  Common.store(key,value); 
	  
    expect(Common.read(key)).toEqual(value);
    
    Common.deleteKey(key);
    
    expect(Common.read(key)).toBeUndefined();
  });
  
  //test the function store and read and delete
  it('Should return null ', function () {
	 var metadata= {code :'EUR'};
	  var type= 'devise';
	 
    expect(Common.getMetadata(metadata,type)).toBeNull();
    
    
  });
  
  //test the function getMetadata
  it('Should return the objet devise ', function () {
	  var devise ={entityName :'devise'}
	 var metadata= [devise,{entityName :'agence'}];
	  var type= 'devise';	 
    expect(Common.getMetadata(metadata,type)).toEqual(devise);
    metadata= [{entityName :'agence'},devise];
    expect(Common.getMetadata(metadata,type)).toEqual(devise);
    metadata= [devise,devise];
    expect(Common.getMetadata(metadata,type)).toEqual(devise);
    
  });
  
//test the function getPageData
  it('Should return the var ret ', function () {
	  var ret= { pageId: id, init: false };
    expect(Common.getPageData(id)).toEqual(ret);
   
  });
  
//test the function deletePageData
  it('Should be defined ', function () {
	
	  	Common.getPageData(id);
	  	Common.deletePageData(id)
	    expect(Common.pageData).toBeUndefined();	    
   
  });
  
//test The Method for instantiating
  it('Should be defined ', function () {	
	     
	    expect(Common.get).toBe(Common.storage);
  });

  
});
