'use strict';

/** 
 * @author mdaouda2
 *
 */

describe('Service: Metadata', function () {

  // load the service's module
  beforeEach(module('sigmaNgApp'));

  // instantiate service
  var Metadata;
  var httpMock;
  var id1 =  {"operation":undefined,"lang":"lang1"};
  var id2 =  {"operation":"codes","lang":undefined};
  var id3 =  {"operation":"messages","lang":"lang2"};
  
  beforeEach(inject(function (_Metadata_,$httpBackend) {
    Metadata = _Metadata_;
    httpMock = $httpBackend;
    httpMock.whenGET (/^\/locale.*/).respond({});
	httpMock.whenGET (/^views.*/).respond({});
  }));

  it('should do something', function () {
    expect(!!Metadata).toBe(true);
  });
  
  //check if the test is defined
  it('should be defined', function () {
    expect(Metadata).toBeDefined();
  });
  
  //testing Metadata.get
  it('Should respond an table of two object ', function () {
	  
	  httpMock.when('GET',constants.API_HOST + '/metadata/'+ id1.lang).respond([{data:'data1'},{data:'data2'}]);
	  Metadata.get(id1, function success (response){
		  expect(angular.isArray(response)).toBe(true);
    	  expect(response.length).toBe(2);
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });

//testing Metadata.codes
  it('Should respond an object ', function () {
	  
	  httpMock.when('GET',constants.API_HOST + '/metadata/'+id2.operation).respond({data:'data1'});
	  Metadata.codes(id2, function success (response){
		  expect(response.data).toBe('data1');
		  
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });

//testing Metadata.messages
  it('Should respond an object ', function () {
	  
	  httpMock.when('GET',constants.API_HOST + '/metadata/'+id3.operation +'/'+id3.lang).respond({data:'data2'});
	  Metadata.messages(id3, function success (response){
		  expect(response.data).toBe('data2');
		  
	  }, function failure() {
		  console.log('error');
		  });
		  httpMock.flush();
		  });

  
});
