'use strict';

/** 
 * @author mdaouda2
 */
describe('Service: CtrMecanique', function () {

  // load the service's module
  beforeEach(module('sigmaNgApp'));

  // instantiate service
  var CtrMecanique;
  var httpMock;
  var id1 =  {id:'test1'}, id2= {id:'test2'};
  
  beforeEach(inject(function (_CtrMecanique_,$httpBackend) {
    CtrMecanique = _CtrMecanique_;
    httpMock = $httpBackend;
    httpMock.whenGET (/^\/locale.*/).respond({});
	httpMock.whenGET (/^views.*/).respond({});
  }));

  it('should do something', function () {
    expect(!!CtrMecanique).toBe(true);
  });

//check if the test is defined
  it('should be defined', function () {
    expect(CtrMecanique).toBeDefined();
  });
  
  //testing CtrMecanique.get
  it('Should respond an object id', function () {
	  
	  httpMock.when('GET',constants.API_HOST + '/eds/ctrmecan/' + id1.id).respond({id:'test1'});
	  CtrMecanique.get(id1, function success (data){
		  expect(data.id).toBe('test1');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });
		  
//testing CtrMecanique.search
  it('should respond an array of two object ', function () {
	  
	  var myString ='{"total": "20","ctrMecaniques":[{"compteCompt" : "hello"},{"compteCompt":"hola"}]}';
	  httpMock.when('GET', constants.API_HOST + '/eds/ctrmecan').respond(myString);

	  CtrMecanique.search(function (response) {
    	  expect(angular.isArray(response)).toBe(true);
    	  expect(response.length).toBe(2);
      });
	  httpMock.flush();
   }); 
  
  		  
//testing CtrMecanique.update
  it('should respond an object ', function () {
	
	  httpMock.when('PUT', constants.API_HOST + '/eds/ctrmecan/'+ id2.id).respond({id: 'test2'});
	  CtrMecanique.update(id2, function success (data){
		  expect(data.id).toBe('test2');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });
  
  //testing CtrMecanique.create
  it('should respond an object ', function () {
	
	  httpMock.when('POST', constants.API_HOST + '/eds/ctrmecan').respond({id: 'test2'});
	  CtrMecanique.create(function (data){
		  expect(data.id).toBe('test2');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });
  
  //testing CtrMecanique.deleteObj
  it('should respond an object ', function () {
	
	  httpMock.when('DELETE', constants.API_HOST + '/eds/ctrmecan/'+ id2.id).respond({id: 'test2'});
	  CtrMecanique.deleteObj(id2, function success (data){
		  expect(data.id).toBe('test2');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });    		  

  
});
