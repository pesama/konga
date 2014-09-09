'use strict';
/**
 * @author edenis2
 */
describe('Service: reports', function () {

  // load the service's module
  beforeEach(module('sigmaNgApp'));

  // instantiate service
  var Reports;
  var httpMock;

  beforeEach(inject(function (_Reports_, $httpBackend) {
    Reports = _Reports_;
    httpMock = $httpBackend;
    httpMock.whenGET (/^\/locale.*/).respond({});
	httpMock.whenGET (/^views.*/).respond({});
  }));
  
 //testing Role.generate
  it('should show "ok1" ', function () {
	  var param1 =  {typeEntity:'ent1',
			  typeReport:'rep1',
			  data:'data1'			  
				  };
	  httpMock.when('POST', constants.API_HOST + '/report/' + param1.typeEntity + param1.typeReport + '?data=data1' ).respond({response:'ok1'});
	  Reports.generate(param1, function success (data){
		  expect(data.response).toBe('ok1');
	  }, function failure() {
		  console.log('error');
	  });
	  httpMock.flush();
  });
  

});
