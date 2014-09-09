'use strict';
/**
 * @author edenis2
 */

describe('Service: UniteMesure', function () {

  // load the service's module
  beforeEach(module('sigmaNgApp'));

  // instantiate service
  var UniteMesure;
  var httpMock;

  
  beforeEach(inject(function (_UniteMesure_, $httpBackend) {
    UniteMesure = _UniteMesure_;
    httpMock = $httpBackend;
    httpMock.whenGET (/^\/locale.*/).respond({});
	httpMock.whenGET (/^views.*/).respond({});
  }));
  
 //testing UniteMesure.get
  it('should show "ok1" ', function () {
	  var id1 =  {id:'test1'};
	  httpMock.when('GET', constants.API_HOST + '/common/uniteMesure/' + id1.id).respond({response:'ok1'});
	  
	  UniteMesure.get(id1, function success (data){
		  expect(data.response).toBe('ok1');
	  }, function failure() {
		  console.log('error');
	  });
	  httpMock.flush();
  });
  
//testing UniteMesure.search
  it('should respond an array of two object ', function () {
	  var rep = '{"total": "20", "unitesMesure": [{"mesure1" : "hello"} , {"mesure2" : "world"}]}';
	  httpMock.when('GET', constants.API_HOST + '/common/uniteMesure').respond(rep);
	  
      UniteMesure.search(function (response) {
    	  expect(angular.isArray(response)).toBe(true);
    	  expect(response.length).toBe(2);
      });
	  httpMock.flush();
   });
  
  //testing UniteMesure.update
  it('should show "ok3" ', function () {
	  var id3 =  {id:'test3'};
	  httpMock.when('PUT', constants.API_HOST + '/common/uniteMesure/' + id3.id).respond({response:'ok3'});
	  
	  UniteMesure.update(id3, function success (data){
		  expect(data.response).toBe('ok3');
	  }, function failure() {
		  console.log('error');
	  });
	  httpMock.flush();
  });
  
  //testing UniteMesure.save
  it('should show "ok3" ', function () {
	  httpMock.when('PUT', constants.API_HOST + '/common/uniteMesure').respond({response:'ok'});
	  
	  UniteMesure.save(function success (data){
		  expect(data.response).toBe('ok');
	  }, function failure() {
		  console.log('error');
	  });
	  httpMock.flush();
  });
  
  
  //testing UniteMesure.create
  it('should show "ok4" ', function () {
	  httpMock.when('POST', constants.API_HOST + '/common/uniteMesure').respond({response:'ok4'});
	  UniteMesure.create(function success (data){
		  expect(data.response).toBe('ok4');
	  }, function failure() {
		  console.log('error');
	  });
	  httpMock.flush();
  });
  

  //testing UniteMesure.deleteObj
  it('should show "ok5" ', function () {
	  var id5 =  {id:'test5'};
	  httpMock.when('DELETE', constants.API_HOST + '/common/uniteMesure/' + id5.id).respond({response:'ok5'});
	  
	  UniteMesure.deleteObj(id5, function success (data){
		  expect(data.response).toBe('ok5');
	  }, function failure() {
		  console.log('error');
	  });
	  httpMock.flush();
  });
  
});
