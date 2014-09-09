'use strict';

/** 
 * @author mdaouda2
 * V2
 */
 
describe('Service: action', function () {

  // load the service's module
  beforeEach(module('sigmaNgApp'));

  // instantiate service
  var Action;
  var httpMock;
  var id1 =  {id:'test1'}, id2= {id:'test2'};
  
  beforeEach(inject(function (_Action_,$httpBackend) {
	  Action = _Action_;
    httpMock = $httpBackend;
    httpMock.whenGET (/^\/locale.*/).respond({});
	httpMock.whenGET (/^views.*/).respond({});
  }));

//test basic
  it('should do something', function () {
    expect(!!Action).toBe(true);
  });

  
//check if the test is defined
  it('should be defined', function () {
    expect(Action).toBeDefined();
  });
  
  //testing action.get
  it('Should respond an object id', function () {
	  
	  httpMock.when('GET',constants.API_HOST + '/action/' + id1.id).respond({id:'test1'});
	  Action.get(id1, function success (data){
		  expect(data.id).toBe('test1');
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });
		  
//testing action.search
  it('should respond an array of two object ', function () {
	  
	  
	  var myString ='{"total": "20","actions":[{"action" : "hello"},{"action":"hola"}]}';
	 
	  httpMock.when('GET', constants.API_HOST + '/action').respond(myString);

	  Action.search(function (response) {
    	  expect(angular.isArray(response)).toBe(true);
    	  expect(response.length).toEqual(2);
      });
	  httpMock.flush();
   }); 
  
  		  

});
