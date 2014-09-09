'use strict';
/**
 * @author edenis2
 */
describe('Service: Secteures', function () {

  // load the service's module
  beforeEach(module('sigmaNgApp'));

  // instantiate service
  var Secteures;
  var httpMock;

  beforeEach(inject(function (_Secteures_, $httpBackend) {
    Secteures = _Secteures_;
    httpMock = $httpBackend;
    httpMock.whenGET (/^\/locale.*/).respond({});
	httpMock.whenGET (/^views.*/).respond({});
  }));
  
 //testing Secteures.get
  it('should show "ok1" ', function () {
	  var id1 =  {id:'test1'};
	  httpMock.when('GET', constants.API_HOST + '/eds/secteur/' + id1.id).respond({response:'ok1'});
	  
	  Secteures.get(id1, function success (data){
		  expect(data.response).toBe('ok1');
	  }, function failure() {
		  console.log('error');
	  });
	  httpMock.flush();
  });
  
//testing Secteures.search
  it('should respond an array of two object ', function () {
	  var rep = '{"total": "20", "secteures": [{"secteur1" : "hello"} , {"secteur2" : "world"}]}';
	  httpMock.when('GET', constants.API_HOST + '/eds/secteur').respond(rep);
	  
      Secteures.search(function (response) {
    	  expect(angular.isArray(response)).toBe(true);
    	  expect(response.length).toBe(2);
      });
	  httpMock.flush();
   });
  
  //testing Secteures.update
  it('should show "ok3" ', function () {
	  var id3 =  {id:'test3'};
	  httpMock.when('PUT', constants.API_HOST + '/eds/secteur/' + id3.id).respond({response:'ok3'});
	  
	  Secteures.update(id3, function success (data){
		  expect(data.response).toBe('ok3');
	  }, function failure() {
		  console.log('error');
	  });
	  httpMock.flush();
  });
  
  
  //testing Secteures.create
  it('should show "ok4" ', function () {
	  httpMock.when('POST', constants.API_HOST + '/eds/secteur').respond({response:'ok4'});
	  Secteures.create(function success (data){
		  expect(data.response).toBe('ok4');
	  }, function failure() {
		  console.log('error');
	  });
	  httpMock.flush();
  });
  

  //testing Secteures.deleteObj
  it('should show "ok5" ', function () {
	  var id5 =  {id:'test5'};
	  httpMock.when('DELETE', constants.API_HOST + '/eds/secteur/' + id5.id).respond({response:'ok5'});
	  
	  Secteures.deleteObj(id5, function success (data){
		  expect(data.response).toBe('ok5');
	  }, function failure() {
		  console.log('error');
	  });
	  httpMock.flush();
  });
  
});
