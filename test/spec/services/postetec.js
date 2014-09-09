'use strict';
/** 
 * @author mdaouda2
 * NOTE/ IN METHODE SEARCH YOU WRITE "metieres"
 */

describe('Service: PosteDepense', function () {

  // load the service's module
  beforeEach(module('sigmaNgApp'));

  // instantiate service
  var PosteTec;
  var httpMock;
  var id1 =  {id:'test1'}, id2= {id:'test2'};
  
  beforeEach(inject(function (_PosteTec_,$httpBackend) {
	  PosteTec = _PosteTec_;
    httpMock = $httpBackend;
    httpMock.whenGET (/^\/locale.*/).respond({});
	httpMock.whenGET (/^views.*/).respond({});
  }));

  it('should do something', function () {
    expect(!!PosteTec).toBe(true);
  });


//check if the test is defined
  it('should be defined', function () {
    expect(PosteTec).toBeDefined();
  });
  
  //testing PosteTec.get
  it('Should respond an object id', function () {
	  
	  httpMock.when('GET',constants.API_HOST + '/common/posteTec/' + id1.id).respond({id:'test1'});
	  PosteTec.get(id1, function success (data){
		  expect(data.id).toBe('test1');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });
		  
//testing PosteTec.search
  it('should respond an array of two object ', function () {
	  
	  var myString ='{"total": "20","postesTechniques":[{"posteTechniques" : "hello"},{"posteTechniques":"hola"}]}';
	  httpMock.when('GET', constants.API_HOST + '/common/posteTec').respond(myString);

	  PosteTec.search(function (response) {
    	  expect(angular.isArray(response)).toBe(true);
    	  expect(response.length).toBe(2);
      });
	  httpMock.flush();
   }); 
  
  		  
//testing PosteTec.update
  it('should respond an object ', function () {
	
	  httpMock.when('PUT', constants.API_HOST + '/common/posteTec/'+ id2.id).respond({id: 'test2'});
	  PosteTec.update(id2, function success (data){
		  expect(data.id).toBe('test2');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });
  
  //testing PosteTec.create
  it('should respond an object ', function () {
	
	  httpMock.when('POST', constants.API_HOST + '/common/posteTec').respond({id: 'test2'});
	  PosteTec.create(function (data){
		  expect(data.id).toBe('test2');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });
  
  //testing PosteTec.deleteObj
  it('should respond an object ', function () {
	
	  httpMock.when('DELETE', constants.API_HOST + '/common/posteTec/'+ id2.id).respond({id: 'test2'});
	  PosteTec.deleteObj(id2, function success (data){
		  expect(data.id).toBe('test2');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });
  
});
