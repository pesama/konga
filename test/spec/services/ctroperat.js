'use strict';
/** 
 * @author mdaouda2
 */
describe('Service: CtrOperat', function () {

  // load the service's module
  beforeEach(module('sigmaNgApp'));

  // instantiate service
  var CtrOperat;
  var httpMock;
  var id1 =  {id:'test1'}, id2= {id:'test2'},id3= {id:'allreferences'};
  
  beforeEach(inject(function (_CtrOperat_,$httpBackend) {
    CtrOperat = _CtrOperat_;
    httpMock = $httpBackend;
    httpMock.whenGET (/^\/locale.*/).respond({});
	httpMock.whenGET (/^views.*/).respond({});
  }));

  it('should do something', function () {
    expect(!!CtrOperat).toBe(true);
  });

//check if the test is defined
  it('should be defined', function () {
    expect(CtrOperat).toBeDefined();
  });
  
  //testing CtrOperat.get
  it('Should respond an object id', function () {
	  
	  httpMock.when('GET',constants.API_HOST + '/ctroperat/' + id1.id).respond({id:'test1'});
	  CtrOperat.get(id1, function success (data){
		  expect(data.id).toBe('test1');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });
		  
//testing CtrOperat.search
  it('should respond an array of two object ', function () {
	  
	  var myString ='{"total": "20","ctrOperats":[{"ctrOperat" : "hello"},{"ctrOperat":"hola"}]}';
	  httpMock.when('GET', constants.API_HOST + '/ctroperat').respond(myString);

	  CtrOperat.search(function (response) {
    	  expect(angular.isArray(response)).toBe(true);
    	  expect(response.length).toBe(2);
      });
	  httpMock.flush();
   }); 
  
  		  
//testing CtrOperat.update
  it('should respond an object ', function () {
	
	  httpMock.when('PUT', constants.API_HOST + '/ctroperat/'+ id2.id).respond({id: 'test2'});
	  CtrOperat.update(id2, function success (data){
		  expect(data.id).toBe('test2');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });
  
  //testing CtrOperat.create
  it('should respond an object ', function () {
	
	  httpMock.when('POST', constants.API_HOST + '/ctroperat').respond({id: 'test2'});
	  CtrOperat.create(function (data){
		  expect(data.id).toBe('test2');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });
  
  //testing CtrOperat.deleteObj
  it('should respond an object ', function () {
	
	  httpMock.when('DELETE', constants.API_HOST + '/ctroperat/'+ id2.id).respond({id: 'test2'});
	  CtrOperat.deleteObj(id2, function success (data){
		  expect(data.id).toBe('test2');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });    		  

// TODO testing CtrOperat.getAllReferences
  it('should respond an table of object ', function () {
	
	  // httpMock.when('DELETE', constants.API_HOST + '/ctroperat/'+ id3.id).respond({id: ['test1','test2','test3']});
	  // CtrOperat.deleteObj(id3, function success (data){
      // expect(data.id).toEqual(['test1','test2','test3']);
	  // }, function failure() {
      // console.log('error');
      // });
      // httpMock.flush();
		  });  
  
});
