'use strict';
/** 
 * @author mdaouda2
 */

describe('Service: filterManager', function () {

  // load the service's module
  beforeEach(module('sigmaNgApp'));

  // instantiate service
  var FilterManager;
  var httpMock;
  var id1 =  {id:'test1'}, id2= {id:'test2'};
  
  beforeEach(inject(function (_FilterManager_,$httpBackend) {
    FilterManager = _FilterManager_;
    httpMock = $httpBackend;
    httpMock.whenGET (/^\/locale.*/).respond({});
	httpMock.whenGET (/^views.*/).respond({});
  }));

  it('should do something', function () {
    expect(!!FilterManager).toBe(true);
  });


//check if the test is defined
  it('should be defined', function () {
    expect(FilterManager).toBeDefined();
  });
  
  //testing FilterManager.get
  it('Should respond an object id', function () {
	  
	  httpMock.when('GET',constants.API_HOST + '/filtrefavoris/filter/' + id1.id).respond({id:'test1'});
	  FilterManager.get(id1, function success (data){
		  expect(data.id).toBe('test1');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });
		  
//testing FilterManager.search
  it('should respond an array of two object ', function () {
	  
	  var myString =[{'data': 'hello'}, {'data': 'world'}];
	  httpMock.when('GET', constants.API_HOST + '/filtrefavoris/filter').respond(myString);

	  FilterManager.search(function (response) {
    	  expect(angular.isArray(response)).toBe(true);
    	  expect(response.length).toBe(2);
      });
	  httpMock.flush();
   }); 
  
  		  
//testing FilterManager.update
  it('should respond an object ', function () {
	
	  httpMock.when('PUT', constants.API_HOST + '/filtrefavoris/filter/'+ id2.id).respond({id: 'test2'});
	  FilterManager.update(id2, function success (data){
		  expect(data.id).toBe('test2');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });
  
  //testing FilterManager.create
  it('should respond an object ', function () {
	
	  httpMock.when('POST', constants.API_HOST + '/filtrefavoris/filter').respond({id: 'test2'});
	  FilterManager.create(function (data){
		  expect(data.id).toBe('test2');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });
  
  //testing FilterManager.deleteObj
  it('should respond an object ', function () {
	
	  httpMock.when('DELETE', constants.API_HOST + '/filtrefavoris/filter/'+ id2.id).respond({id: 'test2'});
	  FilterManager.deleteObj(id2, function success (data){
		  expect(data.id).toBe('test2');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });
  
});
