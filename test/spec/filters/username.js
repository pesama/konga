'use strict';
/**
 * @author mdaouda2, edenis2
 */
describe('Filter: username', function () {

  // load the filter's module
  beforeEach(module('sigmaNgApp'));

  // initialize a new instance of the filter before each test
  var username;
  beforeEach(inject(function ($filter) {
    username = $filter('username');
  }));

  it('should verify if the filter is available/loaded', function () {
    expect(username).toBeDefined();
  });

  it('should show "" when nothing is passed', function () {
	  expect(username()).toBe('');
  });

  it('should show "" when the input does not contain the argument nom', function () {
	  var test1 = {"prenom" : "test1"};
	  expect(username(test1)).toBe('');
  });

  it('should return the value of input.nom ("test2" here) when passing the input with the argument nom', function () {	
	  var test2 = {"nom": "test2"};
	  expect(username(test2)).toEqual('test2');
  });
});
