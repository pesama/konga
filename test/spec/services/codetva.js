'use strict';
/** 
 * @author mdaouda2
 */
 

describe('Service: codeTva', function () {

  // load the service's module
  beforeEach(module('sigmaNgApp'));

  // instantiate service
  var CodeTva;
  var httpMock;
  var id1 =  {id:'test1'}, id2= {id:'test2'};
  
  beforeEach(inject(function (_CodeTva_,$httpBackend) {
	  CodeTva = _CodeTva_;
    httpMock = $httpBackend;
    httpMock.whenGET (/^\/locale.*/).respond({});
	httpMock.whenGET (/^views.*/).respond({});
  }));

//test basic
  it('should do something', function () {
    expect(!!CodeTva).toBe(true);
  });

  
//check if the test is defined
  it('should be defined', function () {
    expect(CodeTva).toBeDefined();
  });
  
  //testing codeTva.get
  it('Should respond an object id', function () {
	  
	  httpMock.when('GET',constants.API_HOST + '/common/codeTva/' + id1.id).respond({id:'test1'});
	  CodeTva.get(id1, function success (data){
		  expect(data.id).toBe('test1');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });
		  
//testing codeTva.search
  it('should respond an array of two object ', function () {
	  
	  var myString ='{"total": "20","codesTva":[{"codeTva" : "hello"},{"codeTva":"hola"}]}';
	  
	  httpMock.when('GET', constants.API_HOST + '/common/codeTva').respond(myString);

	  CodeTva.search(function (response) {
    	  expect(angular.isArray(response)).toBe(true);
    	  expect(response.length).toBe(2);
      });
	  httpMock.flush();
   }); 
  
  		  
//testing codeTva.update
  it('should respond an object ', function () {
	
	  httpMock.when('PUT', constants.API_HOST + '/common/codeTva/'+ id2.id).respond({id: 'test2'});
	  CodeTva.update(id2, function success (data){
		  expect(data.id).toBe('test2');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });
  
  //testing codeTva.create
  it('should respond an object ', function () {
	
	  httpMock.when('POST', constants.API_HOST + '/common/codeTva').respond({id: 'test2'});
	  CodeTva.create(function (data){
		  expect(data.id).toBe('test2');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });
  
  //testing codeTva.deleteObj
  it('should respond an object ', function () {
	
	  httpMock.when('DELETE', constants.API_HOST + '/common/codeTva/'+ id2.id).respond({id: 'test2'});
	  CodeTva.deleteObj(id2, function success (data){
		  expect(data.id).toBe('test2');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });    		  

  
});
