'use strict';
/** 
 * @author mdaouda2
 *Note: in the method search you put jsonData.chantieres 
 *but i think is jsonData.chantiers :)
 */
 
describe('Service: Chantiers', function () {

  // load the service's module
  beforeEach(module('sigmaNgApp'));

  // instantiate service
  var Chantiers;
  var httpMock;
  var id1 =  {id:'test1'}, id2= {id:'test2'};
  
  beforeEach(inject(function (_Chantiers_,$httpBackend) {
    Chantiers = _Chantiers_;
    httpMock = $httpBackend;
    httpMock.whenGET (/^\/locale.*/).respond({});
	httpMock.whenGET (/^views.*/).respond({});
  }));

  //test basic
  it('should do something', function () {
    expect(!!Chantiers).toBe(true);
  });
  
//check if the test is defined
  it('should be defined', function () {
    expect(Chantiers).toBeDefined();
  });
  
  //testing chantier.get
  it('Should respond an object id', function () {
	  
	  httpMock.when('GET',constants.API_HOST + '/eds/chantier/' + id1.id).respond({id:'test1'});
	  Chantiers.get(id1, function success (data){
		  expect(data.id).toBe('test1');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });
		  
//testing chantier.search
  it('should respond an object ', function () {
	  
	  var myString ='{"total": "20","chantieres":[{"agence" : "hello"},{"agence":"hola"}]}';
	  httpMock.when('GET', constants.API_HOST + '/eds/chantier').respond(myString);

	  Chantiers.search(function (response) {
    	  expect(angular.isArray(response)).toBe(true);
    	  expect(response.length).toBe(2);
      });
	  httpMock.flush();
   }); 
  
  		  
//testing chantier.update
  it('should respond an object ', function () {
	
	  httpMock.when('PUT', constants.API_HOST + '/eds/chantier/'+ id2.id).respond({id: 'test2'});
	  Chantiers.update(id2, function success (data){
		  expect(data.id).toBe('test2');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });
  
  //testing chantier.create
  it('should respond an object ', function () {
	
	  httpMock.when('POST', constants.API_HOST + '/eds/chantier').respond({id: 'test2'});
	  Chantiers.create(function (data){
		  expect(data.id).toBe('test2');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });
  
  //testing chantier.deleteObj
  it('should respond an object ', function () {
	
	  httpMock.when('DELETE', constants.API_HOST + '/eds/chantier/'+ id2.id).respond({id: 'test2'});
	  Chantiers.deleteObj(id2, function success (data){
		  expect(data.id).toBe('test2');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });    		  


});
