'use strict';
/** 
 * @author mdaouda2
 * NOTE/ IN METHODE SEARCH YOU WRITE "metieres"
 */

describe('Service: PosteDepense', function () {

  // load the service's module
  beforeEach(module('sigmaNgApp'));

  // instantiate service
  var PosteDepense;
  var httpMock;
  var id1 =  {id:'test1'}, id2= {id:'test2'};
  
  beforeEach(inject(function (_PosteDepense_,$httpBackend) {
	  PosteDepense = _PosteDepense_;
    httpMock = $httpBackend;
    httpMock.whenGET (/^\/locale.*/).respond({});
	httpMock.whenGET (/^views.*/).respond({});
  }));

  it('should do something', function () {
    expect(!!PosteDepense).toBe(true);
  });


//check if the test is defined
  it('should be defined', function () {
    expect(PosteDepense).toBeDefined();
  });
  
  //testing PosteDepense.get
  it('Should respond an object id', function () {
	  
	  httpMock.when('GET',constants.API_HOST + '/common/posteDepense/' + id1.id).respond({id:'test1'});
	  PosteDepense.get(id1, function success (data){
		  expect(data.id).toBe('test1');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });
		  
//testing PosteDepense.search
  it('should respond an array of two object ', function () {
	  
	  var myString ='{"total": "20","posteDepenses":[{"posteDepense" : "hello"},{"posteDepense":"hola"}]}';
	  httpMock.when('GET', constants.API_HOST + '/common/posteDepense').respond(myString);

	  PosteDepense.search(function (response) {
    	  expect(angular.isArray(response)).toBe(true);
    	  expect(response.length).toBe(2);
      });
	  httpMock.flush();
   }); 
  
  		  
//testing PosteDepense.update
  it('should respond an object ', function () {
	
	  httpMock.when('PUT', constants.API_HOST + '/common/posteDepense/'+ id2.id).respond({id: 'test2'});
	  PosteDepense.update(id2, function success (data){
		  expect(data.id).toBe('test2');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });
  
  //testing PosteDepense.create
  it('should respond an object ', function () {
	
	  httpMock.when('POST', constants.API_HOST + '/common/posteDepense').respond({id: 'test2'});
	  PosteDepense.create(function (data){
		  expect(data.id).toBe('test2');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });
  
  //testing PosteDepense.deleteObj
  it('should respond an object ', function () {
	
	  httpMock.when('DELETE', constants.API_HOST + '/common/posteDepense/'+ id2.id).respond({id: 'test2'});
	  PosteDepense.deleteObj(id2, function success (data){
		  expect(data.id).toBe('test2');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });
  
});
