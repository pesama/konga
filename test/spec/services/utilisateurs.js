'use strict';
/**
 * @author edenis2
 */

describe('Service: Utilisateurs', function () {

  // load the service's module
  beforeEach(module('sigmaNgApp'));

  // instantiate service
  var Utilisateurs;
  var httpMock;

  
  beforeEach(inject(function (_Utilisateurs_, $httpBackend) {
    Utilisateurs = _Utilisateurs_;
    httpMock = $httpBackend;
    httpMock.whenGET (/^\/locale.*/).respond({});
	httpMock.whenGET (/^views.*/).respond({});
  }));
  
 //testing Utilisateurs.get
  it('should show "ok1" ', function () {
	  var id1 =  {id:'test1'};
	  httpMock.when('GET', constants.API_HOST + '/utilisateurs/' + id1.id).respond({response:'ok1'});
	  
	  Utilisateurs.get(id1, function success (data){
		  expect(data.response).toBe('ok1');
	  }, function failure() {
		  console.log('error');
	  });
	  httpMock.flush();
  });
  
//testing Utilisateurs.search
  it('should respond an array of two object ', function () {
	  var rep = '{"total": "20", "users": [{"user1" : "hello"} , {"user2" : "world"}]}';
	  httpMock.when('GET', constants.API_HOST + '/utilisateurs').respond(rep);
	  
      Utilisateurs.search(function (response) {
    	  expect(angular.isArray(response)).toBe(true);
    	  expect(response.length).toBe(2);
      });
	  httpMock.flush();
   });
  
  //testing Utilisateurs.update
  it('should show "ok3" ', function () {
	  var id3 =  {id:'test3'};
	  httpMock.when('PUT', constants.API_HOST + '/utilisateurs/' + id3.id).respond({response:'ok3'});
	  
	  Utilisateurs.update(id3, function success (data){
		  expect(data.response).toBe('ok3');
	  }, function failure() {
		  console.log('error');
	  });
	  httpMock.flush();
  });
  
  
  //testing Utilisateurs.create
  it('should show "ok4" ', function () {
	  httpMock.when('POST', constants.API_HOST + '/utilisateurs').respond({response:'ok4'});
	  Utilisateurs.create(function success (data){
		  expect(data.response).toBe('ok4');
	  }, function failure() {
		  console.log('error');
	  });
	  httpMock.flush();
  });
  

  //testing Utilisateurs.deleteObj
  it('should show "ok5" ', function () {
	  var id5 =  {id:'test5'};
	  httpMock.when('DELETE', constants.API_HOST + '/utilisateurs/' + id5.id).respond({response:'ok5'});
	  
	  Utilisateurs.deleteObj(id5, function success (data){
		  expect(data.response).toBe('ok5');
	  }, function failure() {
		  console.log('error');
	  });
	  httpMock.flush();
  });
  
});
