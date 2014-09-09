'use strict';
/**
 * @author mdaouda2, edenis2
 */
describe('Filter: locale', function () {

  // load the filter's module
  beforeEach(module('sigmaNgApp'));

  // initialize a new instance of the filter before each test
  var locale;
  beforeEach(inject(function ($filter) {
  
    locale = $filter('locale');
  }));

  //check if a locale is defined 
   it('check if a locale is defined  ', function () {
    
    expect(locale).toBeDefined();
	
  });
  

});
