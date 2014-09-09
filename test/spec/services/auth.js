'use strict';

/** 
 * @author mdaouda2
 *
 */
describe('Service: auth', function () {

  // load the service's module
  beforeEach(module('sigmaNgApp'));

  // instantiate service
  var Auth;
  var httpMock;
  var id1 =  {loginData:'test1', ctrOperatId: 'p'};
  beforeEach(inject(function (_auth_,$httpBackend) {
    Auth = _auth_;
	httpMock = $httpBackend;
	httpMock.whenGET (/^\/locale.*/).respond({});
    httpMock.whenGET (/^views.*/).respond({});
  }));

  it('should do something', function () {
    expect(!!Auth).toBe(true);
  });

//check if the test is defined
  it('Check is the test is defined', function () {
    expect(Auth).toBeDefined();
  });
  
//testing Auth.auth
  it('Should respond an objet ', function () {
	  
	  httpMock.when('POST',constants.API_HOST + '/user/auth').respond({data:'data1'});
	  
	  Auth.auth(id1.loginData) 
		.success(function(token) {
			
			 expect(token.data).toEqual('data1');
			  
			
		})
		.error(function(error) {
			
		});
	
	 
		  httpMock.flush();
		  });
   

  //testing Auth.fullauth
  it('Should respond an objet ', function () {
	  
	  httpMock.when('POST',constants.API_HOST + '/user/fullauth').respond({data:'data2'});
	  
	  Auth.fullauth(id1.ctrOperatId) 
		.success(function(token) {
			
			 expect(token.data).toEqual('data2');
			  
			
		})
		.error(function(error) {
			
		});
	
	 
		  httpMock.flush();
		  });
});
