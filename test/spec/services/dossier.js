'use strict';
/** 
 * @author mdaouda2
 */

describe('Service: dossier', function () {

  // load the service's module
  beforeEach(module('sigmaNgApp'));

  // instantiate service
  var Dossier;
  var httpMock;
  var id1 =  {id:'test1'}, id2= {id:'test2'};
  
  beforeEach(inject(function (_Dossier_,$httpBackend) {
    Dossier = _Dossier_;
    httpMock = $httpBackend;
    httpMock.whenGET (/^\/locale.*/).respond({});
	httpMock.whenGET (/^views.*/).respond({});
  }));

  it('should do something', function () {
    expect(!!Dossier).toBe(true);
  });

//check if the test is defined
  it('should be defined', function () {
    expect(Dossier).toBeDefined();
  });
  
  //testing Dossier.get
  it('Should respond an object id', function () {
	  
	  httpMock.when('GET',constants.API_HOST + '/dossier/' + id1.id).respond({id:'test1'});
	  Dossier.get(id1, function success (data){
		  expect(data.id).toBe('test1');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });
		  
//testing Dossier.search
  it('should respond an array of two object ', function () {
	  
	  var myString ='{"total": "20","dossiers":[{"dossier" : "hello"},{"dossier":"hola"}]}';
	  httpMock.when('GET', constants.API_HOST + '/dossier').respond(myString);

	  Dossier.search(function (response) {
    	  expect(angular.isArray(response)).toBe(true);
    	  expect(response.length).toBe(2);
      });
	  httpMock.flush();
   }); 
  
  		  
//testing Dossier.update
  it('should respond an object ', function () {
	
	  httpMock.when('PUT', constants.API_HOST + '/dossier/'+ id2.id).respond({id: 'test2'});
	  Dossier.update(id2, function success (data){
		  expect(data.id).toBe('test2');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });
  
  //testing Dossier.create
  it('should respond an object ', function () {
	
	  httpMock.when('POST', constants.API_HOST + '/dossier').respond({id: 'test2'});
	  Dossier.create(function (data){
		  expect(data.id).toBe('test2');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });
  
  //testing Dossier.deleteObj
  it('should respond an object ', function () {
	
	  httpMock.when('DELETE', constants.API_HOST + '/dossier/'+ id2.id).respond({id: 'test2'});
	  Dossier.deleteObj(id2, function success (data){
		  expect(data.id).toBe('test2');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });    		  

  
  
});
