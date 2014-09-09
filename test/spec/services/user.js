'use strict';
/**
 * @author edenis2
 */

describe('Service: User', function () {

  // load the service's module
  beforeEach(module('sigmaNgApp'));

  // instantiate service
  var User;
  var httpMock;
  beforeEach(inject(function (_user_, $httpBackend) {
    User = _user_;
    httpMock = $httpBackend;
    httpMock.whenGET (/^\/locale.*/).respond({});
	httpMock.whenGET (/^views.*/).respond({});
  }));
  
 //testing User.get
  it('should show "ok1" ', function () {
	  httpMock.when('GET', constants.API_HOST + '/user').respond({response:'ok1'});
	  
	  User.get(function success (data){
		  expect(data.response).toBe('ok1');
	  }, function failure() {
		  console.log('error');
	  });
	  httpMock.flush();
  });
  
//testing User.roles
  it('should respond an array of two object ', function () {
	  var result;
	  httpMock.when('GET', constants.API_HOST + '/user/roles').respond([{'data': 'hello'}, {'data': 'world'}]);
	  
      User.roles(function (response) {
    	  expect(angular.isArray(response)).toBe(true);
    	  expect(response.length).toBe(2);
      });
	  httpMock.flush();
   });
});
