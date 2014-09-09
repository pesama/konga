'use strict';

/** 
 * @author mdaouda2
 */
 
describe('Service: compteComptable', function () {

  // load the service's module
  beforeEach(module('sigmaNgApp'));

  // instantiate service
  var CompteComptable;
  var httpMock;
  var id1 =  {id:'test1'}, id2= {id:'test2'};
  
  beforeEach(inject(function (_CompteComptable_,$httpBackend) {
	CompteComptable = _CompteComptable_;
    httpMock = $httpBackend;
    httpMock.whenGET (/^\/locale.*/).respond({});
	httpMock.whenGET (/^views.*/).respond({});
  }));

//test basic
  it('should do something', function () {
    expect(!!CompteComptable).toBe(true);
  });

  
//check if the test is defined
  it('should be defined', function () {
    expect(CompteComptable).toBeDefined();
  });
  
  //testing CompteComptable.get
  it('Should respond an object id', function () {
	  
	  httpMock.when('GET',constants.API_HOST + '/compteComptable/' + id1.id).respond({id:'test1'});
	  CompteComptable.get(id1, function success (data){
		  expect(data.id).toBe('test1');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });
		  
//testing CompteComptable.search
  it('should respond an array of two object ', function () {
	  
	  var myString ='{"total": "20","comptesCompt":[{"compteCompt" : "hello"},{"compteCompt":"hola"}]}';
	  httpMock.when('GET', constants.API_HOST + '/compteComptable').respond(myString);

	  CompteComptable.search(function (response) {
    	  expect(angular.isArray(response)).toBe(true);
    	  expect(response.length).toBe(2);
      });
	  httpMock.flush();
   }); 
  
  		  
//testing CompteComptable.update
  it('should respond an object ', function () {
	
	  httpMock.when('PUT', constants.API_HOST + '/compteComptable/'+ id2.id).respond({id: 'test2'});
	  CompteComptable.update(id2, function success (data){
		  expect(data.id).toBe('test2');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });
  
  //testing CompteComptable.create
  it('should respond an object ', function () {
	
	  httpMock.when('POST', constants.API_HOST + '/compteComptable').respond({id: 'test2'});
	  CompteComptable.create(function (data){
		  expect(data.id).toBe('test2');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });
  
  //testing CompteComptable.deleteObj
  it('should respond an object ', function () {
	
	  httpMock.when('DELETE', constants.API_HOST + '/compteComptable/'+ id2.id).respond({id: 'test2'});
	  CompteComptable.deleteObj(id2, function success (data){
		  expect(data.id).toBe('test2');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });    		  

  
});
