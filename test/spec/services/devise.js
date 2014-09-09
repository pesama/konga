'use strict';
/** 
 * @author mdaouda2
 */
describe('Service: devise', function () {

  // load the service's module
  beforeEach(module('sigmaNgApp'));

  // instantiate service
  var Devise;
  var httpMock;
  var id1 =  {id:'test1'}, id2= {id:'test2'};
  
  beforeEach(inject(function (_Devise_,$httpBackend) {
    Devise = _Devise_;
    httpMock = $httpBackend;
    httpMock.whenGET (/^\/locale.*/).respond({});
	httpMock.whenGET (/^views.*/).respond({});
	
  }));

  it('should do something', function () {
    expect(!!Devise).toBe(true);
  });

//check if the test is defined
  it('should be defined', function () {
    expect(Devise).toBeDefined();
  });
  
  //testing Devise.get
  it('Should respond an object id', function () {
	  
	  
	  httpMock.when('GET',constants.API_HOST + '/common/devise/' + id1.id).respond({id:'test1'});
	  Devise.get(id1, function success (data){
		  expect(data.id).toBe('test1');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });
		  
//testing Devise.search
  it('should respond an array of two object ', function () {
	  
	  var myString ='{"total": "20","devises":[{"devise" : "hello"},{"devise":"hola"}]}';
	  httpMock.when('GET', constants.API_HOST + '/common/devise').respond(myString);

	  Devise.search(function (response) {
    	  expect(angular.isArray(response)).toBe(true);
    	  expect(response.length).toBe(2);
      });
	  httpMock.flush();
   }); 
  
  		  
//testing Devise.update
  it('should respond an object ', function () {
	
	  httpMock.when('PUT', constants.API_HOST + '/common/devise/'+ id2.id).respond({id: 'test2'});
	  Devise.update(id2, function success (data){
		  expect(data.id).toBe('test2');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });
  
  //testing Devise.create
  it('should respond an object ', function () {
	
	  httpMock.when('POST', constants.API_HOST + '/common/devise').respond({id: 'test2'});
	  Devise.create(function (data){
		  expect(data.id).toBe('test2');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });
  
  //testing Devise.deleteObj
  it('should respond an object ', function () {
	
	  httpMock.when('DELETE', constants.API_HOST + '/common/devise/'+ id2.id).respond({id: 'test2'});
	  Devise.deleteObj(id2, function success (data){
		  expect(data.id).toBe('test2');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });    		  

  
});
