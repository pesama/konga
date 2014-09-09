'use strict';

/**
 * @author edenis2
 */

describe('Service: RubDepense', function () {

  // load the service's module
  beforeEach(module('sigmaNgApp'));

  // instantiate service
  var RubDepense;
  var httpMock;
  
  beforeEach(inject(function (_RubDepense_, $httpBackend) {
    RubDepense = _RubDepense_;
    httpMock = $httpBackend;
    httpMock.whenGET (/^\/locale.*/).respond({});
	httpMock.whenGET (/^views.*/).respond({});
  }));
  
 //testing RubDepense.get
  it('should show "ok1" ', function () {
	  var id1 =  {id:'test1'};
	  httpMock.when('GET', constants.API_HOST + '/common/rubDepense/' + id1.id).respond({response:'ok1'});
	  
	  RubDepense.get(id1, function success (data){
		  expect(data.response).toBe('ok1');
	  }, function failure() {
		  console.log('error');
	  });
	  httpMock.flush();
  });
  
//testing RubDepense.search
  it('should respond an array of two object ', function () {
	  var rep = '{"total": "20", "rubDepenses": [{"rubDepenses1" : "hello"} , {"rubDepenses2" : "world"}]}';
	  httpMock.when('GET', constants.API_HOST + '/common/rubDepense').respond(rep);
	  
	  RubDepense.search(function (response) {
    	  expect(angular.isArray(response)).toBe(true);
    	  expect(response.length).toBe(2);
      });
	  httpMock.flush();
   });
  
  //testing RubDepense.update
  it('should show "ok3" ', function () {
	  var id3 =  {id:'test3'};
	  httpMock.when('PUT', constants.API_HOST + '/common/rubDepense/' + id3.id).respond({response:'ok3'});
	  
	  RubDepense.update(id3, function success (data){
		  expect(data.response).toBe('ok3');
	  }, function failure() {
		  console.log('error');
	  });
	  httpMock.flush();
  });
  
  
  //testing RubDepense.create
  it('should show "ok4" ', function () {
	  httpMock.when('POST', constants.API_HOST + '/common/rubDepense').respond({response:'ok4'});
	  RubDepense.create(function success (data){
		  expect(data.response).toBe('ok4');
	  }, function failure() {
		  console.log('error');
	  });
	  httpMock.flush();
  });
  

  //testing RubDepense.deleteObj
  it('should show "ok5" ', function () {
	  var id5 =  {id:'test5'};
	  httpMock.when('DELETE', constants.API_HOST + '/common/rubDepense/' + id5.id).respond({response:'ok5'});
	  
	  RubDepense.deleteObj(id5, function success (data){
		  expect(data.response).toBe('ok5');
	  }, function failure() {
		  console.log('error');
	  });
	  httpMock.flush();
  });
  
});
