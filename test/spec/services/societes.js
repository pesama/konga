'use strict';
/**
 * @author edenis2
 */

describe('Service: Societes', function () {

  // load the service's module
  beforeEach(module('sigmaNgApp'));

  // instantiate service
  var Societes;
  var httpMock;
  
  beforeEach(inject(function (_Societes_, $httpBackend) {
    Societes = _Societes_;
    httpMock = $httpBackend;
    httpMock.whenGET (/^\/locale.*/).respond({});
	httpMock.whenGET (/^views.*/).respond({});
  }));
  
 //testing Societes.get
  it('should show "ok1" ', function () {
	  var id1 =  {id:'test1'};
	  httpMock.when('GET', constants.API_HOST + '/eds/societe/' + id1.id).respond({response:'ok1'});
	  
	  Societes.get(id1, function success (data){
		  expect(data.response).toBe('ok1');
	  }, function failure() {
		  console.log('error');
	  });
	  httpMock.flush();
  });
  
//testing Societes.search
  it('should respond an array of two object ', function () {
	  var rep = '{"total": "20", "societes": [{"societe1" : "hello"} , {"societe2" : "world"}]}';
	  httpMock.when('GET', constants.API_HOST + '/eds/societe').respond(rep);
	  
      Societes.search(function (response) {
    	  expect(angular.isArray(response)).toBe(true);
    	  expect(response.length).toBe(2);
      });
	  httpMock.flush();
   });
  
  //testing Societes.update
  it('should show "ok3" ', function () {
	  var id3 =  {id:'test3'};
	  httpMock.when('PUT', constants.API_HOST + '/eds/societe/' + id3.id).respond({response:'ok3'});
	  
	  Societes.update(id3, function success (data){
		  expect(data.response).toBe('ok3');
	  }, function failure() {
		  console.log('error');
	  });
	  httpMock.flush();
  });
  
  
  //testing Societes.create
  it('should show "ok4" ', function () {
	  httpMock.when('POST', constants.API_HOST + '/eds/societe').respond({response:'ok4'});
	  Societes.create(function success (data){
		  expect(data.response).toBe('ok4');
	  }, function failure() {
		  console.log('error');
	  });
	  httpMock.flush();
  });
  

  //testing Societes.deleteObj
  it('should show "ok5" ', function () {
	  var id5 =  {id:'test5'};
	  httpMock.when('DELETE', constants.API_HOST + '/eds/societe/' + id5.id).respond({response:'ok5'});
	  
	  Societes.deleteObj(id5, function success (data){
		  expect(data.response).toBe('ok5');
	  }, function failure() {
		  console.log('error');
	  });
	  httpMock.flush();
  });
  
});
