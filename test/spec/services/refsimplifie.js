'use strict';
/**
 * @author edenis2
 */
describe('Service: RefSimplifie', function () {

  // load the service's module
  beforeEach(module('sigmaNgApp'));

  // instantiate service
  var RefSimplifie;
  var httpMock;

  beforeEach(inject(function (_RefSimplifie_, $httpBackend) {
    RefSimplifie = _RefSimplifie_;
    httpMock = $httpBackend;
    httpMock.whenGET (/^\/locale.*/).respond({});
	httpMock.whenGET (/^views.*/).respond({});
  }));
  
 //testing RefSimplifie.get
  it('should show "ok1" ', function () {
	  var id1 =  {id:'test1'};
	  httpMock.when('GET', constants.API_HOST + '/refSimplifie/' + id1.id).respond({response:'ok1'});
	  
	  RefSimplifie.get(id1, function success (data){
		  expect(data.response).toBe('ok1');
	  }, function failure() {
		  console.log('error');
	  });
	  httpMock.flush();
  });
  
//testing RefSimplifie.search
  it('should respond an array of two object ', function () {
	  var rep = '{"total": "20", "refSimplifies": [{"RefSimplifies1" : "hello"} , {"RefSimplifies2" : "world"}]}';
	  httpMock.when('GET', constants.API_HOST + '/refSimplifie').respond(rep);
	  
	  RefSimplifie.search(function (response) {
    	  expect(angular.isArray(response)).toBe(true);
    	  expect(response.length).toBe(2);
      });
	  httpMock.flush();
   });
  
  //testing RefSimplifie.update
  it('should show "ok3" ', function () {
	  var id3 =  {id:'test3'};
	  httpMock.when('PUT', constants.API_HOST + '/refSimplifie/' + id3.id).respond({response:'ok3'});
	  
	  RefSimplifie.update(id3, function success (data){
		  expect(data.response).toBe('ok3');
	  }, function failure() {
		  console.log('error');
	  });
	  httpMock.flush();
  });
  
  
  //testing RefSimplifie.create
  it('should show "ok4" ', function () {
	  httpMock.when('POST', constants.API_HOST + '/refSimplifie').respond({response:'ok4'});
	  RefSimplifie.create(function success (data){
		  expect(data.response).toBe('ok4');
	  }, function failure() {
		  console.log('error');
	  });
	  httpMock.flush();
  });
  

  //testing RefSimplifie.deleteObj
  it('should show "ok5" ', function () {
	  var id5 =  {id:'test5'};
	  httpMock.when('DELETE', constants.API_HOST + '/refSimplifie/' + id5.id).respond({response:'ok5'});
	  
	  RefSimplifie.deleteObj(id5, function success (data){
		  expect(data.response).toBe('ok5');
	  }, function failure() {
		  console.log('error');
	  });
	  httpMock.flush();
  });
  
});
