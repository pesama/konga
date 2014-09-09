'use strict';
/**
 * @author edenis2
 */

describe('Service: Role', function () {

  // load the service's module
  beforeEach(module('sigmaNgApp'));

  // instantiate service
  var Role;
  var httpMock;

  beforeEach(inject(function (_Role_, $httpBackend) {
    Role = _Role_;
    httpMock = $httpBackend;
    httpMock.whenGET (/^\/locale.*/).respond({});
	httpMock.whenGET (/^views.*/).respond({});
  }));
  
 //testing Role.get
  it('should show "ok1" ', function () {
	  var id1 =  {id:'test1'};
	  httpMock.when('GET', constants.API_HOST + '/role/' + id1.id).respond({response:'ok1'});
	  
	  Role.get(id1, function success (data){
		  expect(data.response).toBe('ok1');
	  }, function failure() {
		  console.log('error');
	  });
	  httpMock.flush();
  });
  
//testing Role.search
  it('should respond an array of two object ', function () {
	  var rep = '{"total": "20", "roles": [{"roles1" : "hello"} , {"roles2" : "world"}]}';
	  httpMock.when('GET', constants.API_HOST + '/role').respond(rep);
	  
	  Role.search(function (response) {
    	  expect(angular.isArray(response)).toBe(true);
    	  expect(response.length).toBe(2);
      });
	  httpMock.flush();
   });
  
  //testing Role.update
  it('should show "ok3" ', function () {
	  var id3 =  {id:'test3'};
	  httpMock.when('PUT', constants.API_HOST + '/role/' + id3.id).respond({response:'ok3'});
	  
	  Role.update(id3, function success (data){
		  expect(data.response).toBe('ok3');
	  }, function failure() {
		  console.log('error');
	  });
	  httpMock.flush();
  });
  
  
  //testing Role.create
  it('should show "ok4" ', function () {
	  httpMock.when('POST', constants.API_HOST + '/role').respond({response:'ok4'});
	  Role.create(function success (data){
		  expect(data.response).toBe('ok4');
	  }, function failure() {
		  console.log('error');
	  });
	  httpMock.flush();
  });
  

  //testing Role.deleteObj
  it('should show "ok5" ', function () {
	  var id5 =  {id:'test5'};
	  httpMock.when('DELETE', constants.API_HOST + '/role/' + id5.id).respond({response:'ok5'});
	  
	  Role.deleteObj(id5, function success (data){
		  expect(data.response).toBe('ok5');
	  }, function failure() {
		  console.log('error');
	  });
	  httpMock.flush();
  });
  
});
