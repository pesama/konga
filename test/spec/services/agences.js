'use strict';
/** 
 * @author mdaouda2
 */
 
describe('Service: Agences', function () {
	

  // load the service's module
  beforeEach(module('sigmaNgApp'));

  // instantiate service
  var Agences;
  var httpMock;
  var id1 =  {id:'test1'}, id2= {id:'test2'};
  
  beforeEach(inject(function (_Agences_,$httpBackend) {
    Agences = _Agences_;  
    httpMock = $httpBackend;
    httpMock.whenGET (/^\/locale.*/).respond({});
	httpMock.whenGET (/^views.*/).respond({});
	
  })
  );

  //test basic
  it('should be true', function () {
    expect(!!Agences).toBe(true);
  });
  
 //check if the test is defined
  it('should be defined', function () {
    expect(Agences).toBeDefined();
  });
  
  //testing agence.get
  it('Should respond an object id', function () {
	  
	  httpMock.when('GET',constants.API_HOST + '/eds/agence/' + id1.id).respond({id:'test1'});
	  Agences.get(id1, function success (data){
		  expect(data.id).toBe('test1');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });
		  
//testing agence.search
  it('should respond an array of two object ', function () {
	  
	  var myString ='{"total": "20","agences":[{"agence" : "hello"},{"agence":"hola"}]}';
	  
	  httpMock.when('GET', constants.API_HOST + '/eds/agence').respond(myString);

      Agences.search(function (response) {
    	  expect(angular.isArray(response)).toBe(true);
    	  expect(response.length).toBe(2);
      });
	  httpMock.flush();
   }); 
  
  		  
//testing agence.update
  it('should respond an object ', function () {
	
	  httpMock.when('PUT', constants.API_HOST + '/eds/agence/'+ id2.id).respond({id: 'test2'});
       Agences.update(id2, function success (data){
		  expect(data.id).toBe('test2');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });
  
  //testing agence.create
  it('should respond an object ', function () {
	
	  httpMock.when('POST', constants.API_HOST + '/eds/agence').respond({id: 'test2'});
       Agences.create(function (data){
		  expect(data.id).toBe('test2');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });
  
  //testing agence.deleteObj
  it('should respond an object ', function () {
	
	  httpMock.when('DELETE', constants.API_HOST + '/eds/agence/'+ id2.id).respond({id: 'test2'});
       Agences.deleteObj(id2, function success (data){
		  expect(data.id).toBe('test2');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });    		  

  
});
